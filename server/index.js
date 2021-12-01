import { executor } from "../engine/configured.js";
import { SerialView } from "./serial.js";
import { WebSocketServer } from 'ws';
import { createServer } from 'http';

executor.addView("a", new SerialView(executor, 48));
executor.start();

const server = createServer();
const wss = new WebSocketServer({ server });

executor.addListener((msg) => {
  const m = JSON.stringify(msg);
  wss.clients.forEach((ws) => {
    ws.send(m);
  });
});

wss.on('connection', function connection(ws) {
  for (const m of executor.getSyncMessages())
    ws.send(JSON.stringify(m));
  executor.runOnce();

  ws.on('message', function message(msg) {
    executor.control(JSON.parse(msg));
  });
});

server.listen(8080);