import { io } from "socket.io-client";

// .env'deki backend URL'sine bağlanır
const socket = io(process.env.REACT_APP_BACKEND_URL, {
  transports: ["websocket"],
  autoConnect: false, // elle başlatacağız
});

export default socket;
