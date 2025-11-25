const fs = require('fs');
const https = require('https');
const path = require('path');

const url = "https://fonts.gstatic.com/s/robotoslab/v24/BngbUXZYTXPIvIBgJJSb6s3BzlRRfKOFbvjojISwb2RiVw.woff2";
const dest = path.join(__dirname, 'blq-site/public/fonts/RobotoSlab-Regular.woff2');

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
