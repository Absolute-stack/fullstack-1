import fs from 'fs';
import path from 'path';
import express from 'express';
import { Transform } from 'stream';
import { fileURLToPath } from 'url';
import { render } from './dist/entry-server.js';
import { renderToPipeableStream } from 'react-dom/server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const template = fs.readFileSync('./dist/index.html', 'utf-8');
const [head, tail] = template.split('<!--srr-outlet-->');

app.use('/assets', express.static(path.resolve(__dirname, './dist/assets')));

app.get('*', async (req, res) => {
  const { tree, dehydratedState } = await render(req.url);

  const stateScript = `<script>
      window.__REACT_QUERY_STATE= ${JSON.stringify(dehydratedState)}
    </script>`;

  const { pipe } = renderToPipeableStream(tree, {
    onShellReady() {
      res.status(200);
      res.setHeader('content-type', 'text/html');
      res.write(head + stateScript);
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
    onError(err) {
      console.error(`Error:${err.message}`);
    },
  });
});

app.listen(7000, () =>
  console.log(`🎏🎏🎏💦💦Rendering Pipeable Stream of HTML from 7000`),
);
