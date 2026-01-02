import CONFIG from "../config.js";

let subscription = null;

async function getVapidKey() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const response = await fetch(`${CONFIG.BASE_URL}/notifications/keys`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch VAPID key");
  }

  const data = await response.json();
  return data.vapidPublicKey;
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export async function subscribePushNotification() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.warn("Push notification not supported");
    return;
  }

  const registration = await navigator.serviceWorker.ready;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("Notification permission denied");
    return;
  }

  const vapidKey = await getVapidKey();
  const convertedKey = urlBase64ToUint8Array(vapidKey);

  subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedKey,
  });

  await sendSubscriptionToServer(subscription);
}

async function sendSubscriptionToServer(subscription) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${CONFIG.BASE_URL}/notifications/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscription),
  });

  if (!response.ok) {
    throw new Error("Failed to send push subscription");
  }

  console.log("Push subscription sent successfully");
}


export async function unsubscribePushNotification() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.warn("Push notification not supported");
    return;
  }

  const registration = await navigator.serviceWorker.ready;
  const existingSubscription = await registration.pushManager.getSubscription();

  if (existingSubscription) {
    await existingSubscription.unsubscribe();
    await sendUnsubscriptionToServer(existingSubscription);
    subscription = null;
  }
}


async function sendUnsubscriptionToServer(subscription) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${CONFIG.BASE_URL}/notifications/unsubscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscription),
  });

  if (!response.ok) {
    throw new Error("Failed to send push unsubscription");
  }

  console.log("Push unsubscription sent successfully");
}


export async function isPushNotificationEnabled() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    return false;
  }

  const registration = await navigator.serviceWorker.ready;
  const existingSubscription = await registration.pushManager.getSubscription();
  return !!existingSubscription;
}


export async function togglePushNotification() {
  const enabled = await isPushNotificationEnabled();
  if (enabled) {
    await unsubscribePushNotification();
    return false;
  } else {
    await subscribePushNotification();
    return true;
  }
}


export async function initPushNotification() {

  const token = localStorage.getItem("token");
  if (token && "serviceWorker" in navigator && "PushManager" in window) {
    try {
      const registration = await navigator.serviceWorker.ready;
      const existingSubscription = await registration.pushManager.getSubscription();
      if (!existingSubscription) {
        await subscribePushNotification();
      }
    } catch (error) {
      console.warn("Auto-subscribe failed:", error);
    }
  }
}
