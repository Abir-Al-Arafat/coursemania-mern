import { register } from 'node:module';
import { pathToFileURL } from 'node:url';

register('ts-node/esm', pathToFileURL('./'));

// Wrap the import in an async function to handle errors
(async () => {
  try {
    await import('./src/app.ts');
  } catch (err) {
    console.error('Error during app startup', err);
    process.exit(1);
  }
})();
