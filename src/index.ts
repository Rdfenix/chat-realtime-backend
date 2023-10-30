import { httpServer } from "./http";
import "./db/index";
import websocket from "./websocket/index";
const port = process.env.PORT || 3333;

websocket.connectInWebsocket();

httpServer.listen(port, () => console.log("server running on port 3333"));
