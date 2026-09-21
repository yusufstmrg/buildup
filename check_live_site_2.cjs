const https = require('https');

https.get('https://buildup-os.web.app/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const match = data.match(/src="(\/assets\/index-[^.]*\.js)"/);
    if (match) {
      console.log("Found JS file:", match[1]);
      https.get('https://buildup-os.web.app' + match[1], (jsRes) => {
        let jsData = '';
        jsRes.on('data', chunk => jsData += chunk);
        jsRes.on('end', () => {
          if (jsData.includes('Login error:')) {
            console.log("SUCCESS! The live site has the new error message handling.");
          } else {
            console.log("FAILED! The live site DOES NOT have the fix!");
          }
        });
      });
    } else {
      console.log("No JS file found in index.html");
    }
  });
});
