import CONFIG from "../config.js";

let pushSubscription = null;
let isPushEnabled = false;

const VAPID_PUBLIC_KEY =
  "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";

export async function initPushNotification() {
  try {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
      console.warn("Push notifications not supported in this browser");
      return;
    }

    const registration = await navigator.serviceWorker.ready;
    console.log("Service Worker ready for push notifications:", registration);

    if (!("showNotification" in ServiceWorkerRegistration.prototype)) {
      console.warn("Notifications aren't supported.");
      return;
    }

    const existingSubscription =
      await registration.pushManager.getSubscription();
    if (existingSubscription) {
      console.log("Existing push subscription found");
      pushSubscription = existingSubscription;
      isPushEnabled = true;
    }

    if (Notification.permission === "granted") {
      console.log("Notification permission already granted");
    } else if (Notification.permission === "default") {
      console.log("Notification permission not requested yet");
    } else {
      console.log("Notification permission denied");
    }

    navigator.serviceWorker.addEventListener("message", (event) => {
      console.log("Message from service worker:", event.data);
    });

    console.log("Push notification initialization completed successfully");
  } catch (error) {
    console.error("Service Worker initialization failed:", error);
  }
}

async function subscribeToPush() {
  try {
    const registration = await navigator.serviceWorker.ready;

    if (
      !window.location.protocol.includes("https") &&
      window.location.hostname !== "localhost"
    ) {
      console.warn("Push notifications require HTTPS");
      return;
    }

    pushSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
    });

    console.log("Push notification subscription:", pushSubscription);
    isPushEnabled = true;

    await sendSubscriptionToServer(pushSubscription, "subscribe");
  } catch (error) {
    console.error("Failed to subscribe to push notifications:", error);
    isPushEnabled = false;

    if (error.name === "NotAllowedError") {
      console.warn("Push notifications permission denied by user");
    } else if (error.name === "AbortError") {
      console.warn("Push subscription aborted");
    } else {
      console.error("Push notification subscription failed:", error.message);
    }
  }
}

export async function unsubscribeFromPush() {
  try {
    if (pushSubscription) {
      const endpoint = pushSubscription.endpoint;
      await sendSubscriptionToServer(endpoint, "unsubscribe");
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
    if (Notification.permission === "default") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        console.warn("Notification permission denied");
        return false;
      }
    } else if (Notification.permission === "denied") {
      console.warn("Notification permission was denied previously");
      return false;
    }

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

async function sendSubscriptionToServer(subscription, type) {
  try {
    const endpoint =
      type === "subscribe"
        ? `${CONFIG.BASE_URL}/subscribe`
        : `${CONFIG.BASE_URL}/unsubscribe`;
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    if (type === "subscribe") {
      options.method = "POST";
      options.body = JSON.stringify(subscription.toJSON());
    } else if (type === "unsubscribe") {
      options.method = "DELETE";
      options.body = JSON.stringify({
        endpoint: subscription,
      });
    }

    const response = await fetch(endpoint, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Failed to ${type} subscription on server: ${errorData.message}`
      );
    }

    console.log(`Subscription ${type}d on server successfully`);
  } catch (error) {
    console.error(`Failed to ${type} subscription on server:`, error);
  }
}

