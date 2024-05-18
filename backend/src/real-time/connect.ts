import WebSocket, { WebSocketServer } from 'ws';

import { WSS_PORT } from '../config';

import { readTimeHandler } from './handler';

const handlerMessage = (ws: WebSocket, data: any) => {
  switch (data.action) {
    case 'send-message':
      return readTimeHandler.storeMessageToDb(data);
    case 'open-connection':
      return readTimeHandler.storeSockets(ws, data);
  }
};

export const realtimeConnect = () => {
  const wss = new WebSocketServer({
    port: WSS_PORT
  });

  wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (e) => {
      const data: any = JSON.parse(e?.toString() || '{}');

      console.log(data);

      return handlerMessage(ws, data);
    });

    // tslint:disable-next-line:no-shadowed-variable
    ws.on('close', (ws: WebSocket) => {
      return readTimeHandler.removeConnection(ws);
    });
  });
};
