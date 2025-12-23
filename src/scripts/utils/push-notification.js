import CONFIG from "../config.js";

let pushSubscription = null;
let isPushEnabled = false;
let vapidKey = null;

async function fetchVAPIDKey() {
  try {
    const token = localStorage.getItem("token");
    console.log("Fetching VAPID key with token:", token ? "present" : "missing");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${CONFIG.BASE_URL}/push-keys`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("VAPID key fetch response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("VAPID key fetch failed:", response.status, errorText);
      throw new Error(`Failed to fetch VAPID key: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log("VAPID key response data:", data);

    const vapidKey = data.vapidPublicKey || data.publicKey || data.key;
    if (!vapidKey) {
      throw new Error("No VAPID key found in response");
    }

    console.log("VAPID key obtained:", vapidKey.substring(0, 20) + "...");
    return vapidKey;
  } catch (error) {
    console.error("Failed to fetch VAPID key:", error);
    throw error;
  }
}

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

    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn("Push notifications not supported in this browser");
      return;
    }

    if (!window.location.protocol.includes('https') && window.location.hostname !== 'localhost') {
      console.warn("Push notifications require HTTPS");
      return;
    }

    // Fetch VAPID key from API
    if (!vapidKey) {
      vapidKey = await fetchVAPIDKey();
    }

    pushSubscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKey),
    });

    console.log("Push notification subscription:", pushSubscription);
    isPushEnabled = true;

    // Send subscription to server
    await sendSubscriptionToServer(pushSubscription);

  } catch (error) {
    console.error("Failed to subscribe to push notifications:", error);
    isPushEnabled = false;

    if (error.name === 'NotAllowedError') {
      console.warn("Push notifications permission denied by user");
    } else if (error.name === 'AbortError') {
      console.warn("Push subscription aborted");
    } else {
      console.error("Push notification subscription failed:", error.message);
    }
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
  try {
    console.log("Converting VAPID key to Uint8Array:", base64String.substring(0, 20) + "...");

    // Remove any whitespace
    const cleanedBase64 = base64String.replace(/\s/g, '');

    // Ensure proper padding
    const padding = "=".repeat((4 - (cleanedBase64.length % 4)) % 4);
    const base64 = (cleanedBase64 + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    console.log("Processed base64 string:", base64.substring(0, 20) + "...");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }

    console.log("Successfully converted VAPID key to Uint8Array, length:", outputArray.length);
    return outputArray;
  } catch (error) {
    console.error("Failed to convert VAPID key:", error);
    console.error("Original VAPID key:", base64String);
    throw new Error(`Invalid VAPID key format: ${error.message}`);
  }
}

async function sendSubscriptionToServer(subscription) {
  try {
    const token = localStorage.getItem("token");
    console.log("Sending subscription to server with token:", token ? "present" : "missing");

    const subscriptionData = subscription.toJSON();
    console.log("Subscription data to send:", subscriptionData);

    const requestBody = {
      subscription: {
        endpoint: subscriptionData.endpoint,
        keys: {
          p256dh: subscriptionData.keys?.p256dh,
          auth: subscriptionData.keys?.auth
        }
      }
    };

    console.log("Request body:", requestBody);

    const response = await fetch(`${CONFIG.BASE_URL}/push-subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    console.log("Subscription send response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Subscription send failed:", response.status, errorText);
      throw new Error(`Failed to send subscription to server: ${response.status} ${errorText}`);
    }

    const responseData = await response.json();
    console.log("Subscription send response:", responseData);
    console.log("Subscription sent to server successfully");
  } catch (error) {
    console.error("Failed to send subscription to server:", error);
    throw error;
  }
}
