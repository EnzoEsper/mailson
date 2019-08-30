// "proxy": {
//   "/auth/google": {
//       "target": "http://localhost:5000"
//   }
// }
// this code replaces the code from above that earlier went in the package.json file

const proxy = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(proxy('/auth/google', 
        { target: 'http://localhost:5000/' }
    ));
}