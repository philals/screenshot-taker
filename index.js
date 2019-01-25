const { getScreenshot } = require('./chromium');
const { parse } = require('url');
const { isValidUrl } = require('./validator');
const storeImage = require('./imageStore');

module.exports = async function(req, res) {
   try {
      const { query } = parse(req.url, true);
      const url = query.site;
      const { host, path } = parse(url)

      if (!isValidUrl(url)) {
         res.statusCode = 400;
         res.setHeader('Content-Type', 'text/html');
         res.end(`<h1>Bad Request</h1><p>The url <em>${url}</em> is not valid.</p>`);
      } else {
         const file = await getScreenshot(url);
         let key = host + path;
         console.log("​key: ", key)
         await storeImage(file, key);
         res.statusCode = 201;
         res.end();
      }
   } catch (e) {
      console.log("catch -> e", e)
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Server Error</h1><p>Sorry, there was a problem</p>');
   }
};