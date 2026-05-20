if ('serviceWorker' in navigator) {
  // Force the service worker to explicitly run inside your GitHub repository subfolder
  navigator.serviceWorker.register('./sw.js', { 
    scope: '/ScramJet-test/' 
  }).then(() => {
    console.log('Scramjet Service Worker successfully active on GitHub Pages!');
  }).catch((err) => {
    console.error('Service Worker registration failed:', err);
  });
}
