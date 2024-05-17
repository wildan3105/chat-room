import WebSocket from 'ws';

import { roomService } from '../services';

const sockets: { roomId: string; ws: WebSocket[] }[] = [];

const storeMessageToDb = async (data: any) => {
  const savedMessage = await roomService.savedMessageFromRealTime(data);

  const socketExists = findSocketByRoomId(data);

  if (savedMessage) {
    const conversation = await roomService.getConversationFromRealTime(
      data.roomId,
    );

    socketExists?.ws.forEach(async (socket) => {
      socket.send(JSON.stringify(conversation));
    });
  }
};

const storeSockets = (ws: WebSocket, data: any) => {
  const socketExists = findSocketByRoomId(data);

  if (socketExists) {
    socketExists.ws.push(ws);
  } else {
    sockets.push({
      roomId: data.roomId,
      ws: [ws],
    });
  }

  return sockets;
};

const removeConnection = (ws: WebSocket) => {
  const finalSocket = sockets.forEach((socket) => {
    socket.ws = socket.ws.filter((item) => item !== ws);

    return socket;
  });
};

const findSocketByRoomId = (data: any) => {
  const chatRoomId = data.roomId;

  return sockets.find((socket) => socket.roomId === chatRoomId);
};

export const readTimeHandler = {
  storeMessageToDb,
  storeSockets,
  removeConnection,
};
