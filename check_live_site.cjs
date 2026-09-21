const https = require('https');

https.get('https://buildup-os.web.app/assets/', (res) => {
  // Can't list assets this way, but we can check index.html
});

https.get('https://buildup-os.web.app/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Find the JS file
    const match = data.match(/src="(\/assets\/index-[^.]*\.js)"/);
    if (match) {
      console.log("Found JS file:", match[1]);
      https.get('https://buildup-os.web.app' + match[1], (jsRes) => {
        let jsData = '';
        jsRes.on('data', chunk => jsData += chunk);
        jsRes.on('end', () => {
          if (jsData.includes('setIsAuthLoading(!0)')) {
            console.log("SUCCESS! The live site has setIsAuthLoading(true) in the login function!");
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
