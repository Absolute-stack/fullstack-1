import fs from 'fs';
import 'dotenv/config';
import path from 'path';
import express from 'express';
import { render } from './dist/entry-server.js';
import { Transform } from 'stream';
import { fileURLToPath } from 'url';
import { renderToPipeableStream } from 'react-dom/server';

const app = express();
const PORT = process.env.PORT;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const template = fs.readFileSync('./dist/index.html', 'utf-8');
const [head, tail] = template.split('<!--ssr-outlet-->');

app.use('/assets', express.static(path.resolve(__dirname, './dist/assets')));

app.use('*', (req, res) => {
  const { tree, dehydratedState } = render(req.url);

  const { pipe } = renderToPipeableStream(tree, {
    onShellReady() {
      res.status(200);
      res.setHeader('content-type', 'text/html');
      const headWithState = head.replace(
        '</head>',
        `<script>window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)}</script></head>`,
      );
      res.write(headWithState);
      const appendTail = new Transform({
        transform(chunk, encoding, callback) {
          callback(null, chunk);
        },
        flush(callback) {
          this.push(tail);
          callback();
        },
      });
      pipe(appendTail);
      appendTail.pipe(res);
    },
  });
});

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
