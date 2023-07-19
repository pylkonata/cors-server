const { onRequest } = require('firebase-functions/v2/https');
const corsAnywhere = require('cors-anywhere');
const cors = require('cors');

const corsServer = corsAnywhere.createServer({
    originWhitelist: [
      'http://localhost:3000',
      'http://localhost:8080',
      'https://cmpetmanager.github.io/CM-memory-seller/',
    ],
    requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
});

const corsHandler = cors({ origin: true });

exports.proxy = onRequest({ maxInstances: 10 }, (request, response) => {
    corsHandler(request, response, () => {
      corsServer.emit('request', request, response);
    })
});
