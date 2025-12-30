let deferredPrompt = null;
let isInstallable = false;

export function initPWAInstall() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    isInstallable = true;

    console.log('PWA install prompt is available');

    window.dispatchEvent(new CustomEvent('pwa-installable', { detail: { installable: true } }));
  });

  window.addEventListener('appinstalled', (evt) => {
    console.log('PWA was installed successfully');
    deferredPrompt = null;
    isInstallable = false;

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

  deferredPrompt.prompt();

  const { outcome } = await deferredPrompt.userChoice;

  deferredPrompt = null;
  isInstallable = false;

  window.dispatchEvent(new CustomEvent('pwa-install-choice', { detail: { outcome } }));

  return outcome === 'accepted';
}

export function canInstallPWA() {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return false;
  }

  if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
    return navigator.standalone === false;
  }

  return isInstallable;
}
