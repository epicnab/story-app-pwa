export function getLeaflet() {
  if (window.L) {
    return window.L;
  }

  throw new Error('Leaflet is not loaded. Please ensure the CDN script is included in the HTML.');
}
