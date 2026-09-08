const fs = require('fs');
const path = require('path');
const https = require('https');

const dir = path.join(__dirname, '..', 'assets', 'images', 'institutions');
const destPath = path.join(dir, 'university-of-limerick.jpg');
const url = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=85';

const file = fs.createWriteStream(destPath);
https.get(url, (res) => {
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    console.log('Saved university-of-limerick.jpg');
  });
});
