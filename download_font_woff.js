const fs = require('fs');
const https = require('https');
const path = require('path');

// WOFF format (more widely supported by Three.js font loaders like Troika usually)
// But Troika supports woff2 if the browser does.
// The error "Offset is outside the bounds of the DataView" suggests binary corruption or bad parsing.
// Let's try the TTF or WOFF version instead.
const url = "https://fonts.gstatic.com/s/robotoslab/v24/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISwb2RiVw.woff";
const dest = path.join(__dirname, 'blq-site/public/fonts/RobotoSlab-Regular.woff');

// Ensure directory exists
const dir = path.dirname(dest);
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

const file = fs.createWriteStream(dest);
https.get(url, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close(() => console.log('Download completed'));
  });
}).on('error', function(err) {
  fs.unlink(dest);
  console.error('Error downloading file:', err);
});
