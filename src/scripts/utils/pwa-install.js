let deferredPrompt = null;
let isInstallable = false;

export function initPWAInstall() {
  // Listen for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later
    deferredPrompt = e;
    isInstallable = true;

    console.log('PWA install prompt is available');

    // Dispatch custom event to notify UI
    window.dispatchEvent(new CustomEvent('pwa-installable', { detail: { installable: true } }));
  });

  // Listen for successful installation
  window.addEventListener('appinstalled', (evt) => {
    console.log('PWA was installed successfully');
    deferredPrompt = null;
    isInstallable = false;

    // Dispatch custom event
    window.dispatchEvent(new CustomEvent('pwa-installed'));
  });
}

export function isPWAInstallable() {
  return isInstallable;
}

export async function showInstallPrompt() {
  if (!deferredPrompt) {
    console.warn('Install prompt not available');
    return false;
  }

  // Show the install prompt
  deferredPrompt.prompt();

  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice;

  // Reset the deferred prompt
  deferredPrompt = null;
  isInstallable = false;

  // Dispatch custom event
  window.dispatchEvent(new CustomEvent('pwa-install-choice', { detail: { outcome } }));

  return outcome === 'accepted';
}

export function canInstallPWA() {
  // Check if the app is already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return false;
  }

  // Check if running on iOS Safari
  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    return navigator.standalone === false;
  }

  // For other browsers, check if beforeinstallprompt was fired
  return isInstallable;
}
