import CONFIG from "../config.js";

let pushSubscription = null;
let isPushEnabled = false;
let vapidKey = null;

/* =========================
   FETCH VAPID KEY
========================= */
async function fetchVAPIDKey() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }

  const response = await fetch(`${CONFIG.BASE_URL}/push-keys`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch VAPID key (${response.status})`);
  }

  const data = await response.json();
  const key = data.vapidPublicKey || data.publicKey || data.key;

  if (!key || typeof key !== "string") {
    throw new Error("VAPID key missing or invalid");
  }

  // Basic sanity check (VAPID public key length usually ~87 chars)
  if (key.length < 80) {
    throw new Error("VAPID key length is invalid");
  }

  return key.trim();
}

/* =========================
   INIT
========================= */
export async function initPushNotification() {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    console.warn("Push notifications not supported");
    return;
  }

  await navigator.serviceWorker.ready;
  console.log("✅ Service Worker ready for push");
}

/* =========================
   SUBSCRIBE
========================= */
async function subscribeToPush() {
  const registration = await navigator.serviceWorker.ready;

  if (Notification.permission !== "granted") {
    throw new Error("Notification permission not granted");
  }

  if (!vapidKey) {
    vapidKey = await fetchVAPIDKey();
  }

  const applicationServerKey = urlBase64ToUint8Array(vapidKey);

  pushSubscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });

  isPushEnabled = true;
  await sendSubscriptionToServer(pushSubscription);
}

/* =========================
   UNSUBSCRIBE
========================= */
export async function unsubscribeFromPush() {
  if (pushSubscription) {
    await pushSubscription.unsubscribe();
    pushSubscription = null;
    isPushEnabled = false;
  }
}

export function isPushNotificationEnabled() {
  return isPushEnabled;
}

export async function togglePushNotification() {
  if (isPushEnabled) {
    await unsubscribeFromPush();
    return false;
  }

  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    console.warn("Notification permission denied");
    return false;
  }

  await subscribeToPush();
  return true;
}

/* =========================
   BASE64 → UINT8ARRAY
========================= */
function urlBase64ToUint8Array(base64String) {
  const base64 = base64String
    .replace(/\s/g, "")
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);

  try {
    const rawData = window.atob(padded);
    return Uint8Array.from(rawData, c => c.charCodeAt(0));
  } catch {
    throw new Error("Invalid VAPID public key format");
  }
}

/* =========================
   SEND TO SERVER
========================= */
async function sendSubscriptionToServer(subscription) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No auth token");

  const response = await fetch(`${CONFIG.BASE_URL}/push-subscription`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ subscription }),
  });

  if (!response.ok) {
    throw new Error(`Failed to send subscription (${response.status})`);
  }
}
