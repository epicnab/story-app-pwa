import CONFIG from "../config.js";

let pushSubscription = null;
let isPushEnabled = false;

export async function initPushNotification() {
  if ("serviceWorker" in navigator && "PushManager" in window) {
    try {
      // Wait for service worker to be ready (registered by VitePWA)
      const registration = await navigator.serviceWorker.ready;
      console.log("Service Worker ready for push notifications:", registration);

      if (!("showNotification" in ServiceWorkerRegistration.prototype)) {
        console.warn("Notifications aren't supported.");
        return;
      }

      if (Notification.permission === "granted") {
        await subscribeToPush();
      } else if (Notification.permission === "default") {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          await subscribeToPush();
        }
      }

      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("Message from service worker:", event.data);
      });
    } catch (error) {
      console.error("Service Worker initialization failed:", error);
    }
  } else {
    console.warn("Service workers or Push messaging aren't supported.");
  }
}

async function subscribeToPush() {
  try {
    const registration = await navigator.serviceWorker.ready;
    pushSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(CONFIG.VAPID_PUBLIC_KEY),
    });

    console.log("Push notification subscription:", pushSubscription);
    isPushEnabled = true;
  } catch (error) {
    console.error("Failed to subscribe to push notifications:", error);
  }
}

export async function unsubscribeFromPush() {
  try {
    if (pushSubscription) {
      await pushSubscription.unsubscribe();
      pushSubscription = null;
      isPushEnabled = false;
      console.log("Successfully unsubscribed from push notifications");
    }
  } catch (error) {
    console.error("Failed to unsubscribe from push notifications:", error);
  }
}

export function isPushNotificationEnabled() {
  return isPushEnabled;
}

export async function togglePushNotification() {
  if (isPushEnabled) {
    await unsubscribeFromPush();
  } else {
    await subscribeToPush();
  }
  return isPushEnabled;
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function sendSubscriptionToServer(subscription) {
  try {
    const response = await fetch(`${CONFIG.BASE_URL}/push-subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        subscription: subscription.toJSON(),
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send subscription to server");
    }

    console.log("Subscription sent to server successfully");
  } catch (error) {
    console.error("Failed to send subscription to server:", error);
  }
}
