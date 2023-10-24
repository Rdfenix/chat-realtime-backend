import { httpServer } from "./http";
import "./db/index";
import websocket from "./websocket/index";

websocket.connectInWebsocket();

httpServer.listen(3333, () => console.log("server running on port 3333"));
