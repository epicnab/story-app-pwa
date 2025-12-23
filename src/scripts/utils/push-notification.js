import CONFIG from "../config.js";

let subscription = null;

/**
 * Ambil VAPID key dari API Dicoding
 */
async function getVapidKey() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated");

  const response = await fetch(`${CONFIG.BASE_URL}/push-keys`, {
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

/**
 * Convert base64 ke Uint8Array
 */
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

/**
 * Subscribe push notification
 */
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

/**
 * Kirim subscription ke server Dicoding
 */
async function sendSubscriptionToServer(subscription) {
  const token = localStorage.getItem("token");

  const response = await fetch(`${CONFIG.BASE_URL}/push-subscription`, {
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
