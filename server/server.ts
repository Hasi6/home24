import { createProxyMiddleware } from 'http-proxy-middleware';
import express from 'express';
import apicache from 'apicache';

const app = express();
const cache = apicache.middleware;

const proxy = createProxyMiddleware({
  target: 'https://www.home24.de',
  changeOrigin: true,
  logLevel: 'debug',
});

app.post('/graphql', cache('5 minutes'), proxy);
app.listen(3001);
