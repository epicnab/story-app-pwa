import { ENDPOINTS } from "../data/api.js";
import CONFIG from "../config.js";

const VAPID_PUBLIC_KEY = "BCCs2eonMI-6H2ctvFaWg-UYdDv387Vno_bzUzALpB442r2lCnsHmtrx8biyPi_E-1fSGABK_Qs_GlvPoJJqxbk";

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

  const convertedKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: convertedKey,
  });

  await sendSubscriptionToServer(subscription);
}

async function sendSubscriptionToServer(subscription) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token");
  }

  const subData = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.toJSON().keys.p256dh,
      auth: subscription.toJSON().keys.auth
    }
  }

  const response = await fetch(ENDPOINTS.SUBSCRIBE_NOTIFICATIONS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subData),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(`Failed to send push subscription: ${errorData.message}`);
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
  }
}


async function sendUnsubscriptionToServer(subscription) {
  const token = localStorage.getItem("token");

  const response = await fetch(ENDPOINTS.SUBSCRIBE_NOTIFICATIONS, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ endpoint: subscription.endpoint }),
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
