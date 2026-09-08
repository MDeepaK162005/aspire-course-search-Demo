const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, '..', 'assets', 'images', 'institutions');

const fixSources = {
  'university-of-galway.jpg': 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=85',
  'university-of-limerick.jpg': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=85'
};

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return download(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        file.close();
        fs.unlink(dest, () => {});
        return reject(new Error(`Status ${response.statusCode}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve());
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  for (const [filename, url] of Object.entries(fixSources)) {
    const destPath = path.join(dir, filename);
    try {
      await download(url, destPath);
      console.log(`Successfully saved ${filename}`);
    } catch (e) {
      console.error(`Failed ${filename}: ${e.message}`);
    }
  }
}

run();
