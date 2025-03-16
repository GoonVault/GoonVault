console.log('Starting Electron app...');
(async () => {
  await import('./dist/main.js').catch(err => {
    console.error('Failed to load main.js:', err);
  }).then(() => {
    console.log('Electron app started successfully');
  });
})();