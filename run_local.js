const screenshot = require('.');
require('dotenv').config();

(async () => {
   try {
      const req = {
         url: '/?site=https%3A%2F%2Fexample.com%2Fsdf%2Fd'
      };
      await screenshot(req, { end: () => { } });

   } catch (e) {
      console.log("​offline: catch -> e", e)
   }
})();