import express from 'express';
import { ParseServer } from 'parse-server';
import path from 'path';
const __dirname = path.resolve();
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
export const config = {
  databaseURI: process.env.DATABASE_URI,
  cloud: '/cloud/main.js',
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY, //Add your master key here. Keep it secret!
  serverURL: `http://localhost:${process.env.PORT}/parse`, // Don't forget to change to https if needed
  liveQuery: {
    classNames: [], // List of classes to support for query subscriptions
    //
  },
  masterKeyIps: ['0.0.0.0/0', '::1'],
};
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

export const app = express();

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
const mountPath = process.env.PARSE_MOUNT || '/parse';
const server = new ParseServer(config);
await server.start();
app.use(mountPath, server.app);
app.use(express.json());

// Parse Server plays nicely with the rest of your web routes
app.get('/', function (req, res) {
  res.status(200).send('working');
});


// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/ping', function (req, res) {
  res.status(200).send({
    status: true,
  })
});

const port = process.env.PORT || 8080;
const httpServer = http.createServer(app);
httpServer.listen(port, function () {
  console.log('parse-server-example running on port ' + port + '.');
});
  // This will enable the Live Query real-time server
await ParseServer.createLiveQueryServer(httpServer,{
  websocketTimeout: 10000,
  pingInterval: 5000,
  pongTimeout: 5000
  });




