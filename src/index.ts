import { httpServer } from "./http";
import "./db/index";
import websocket from "./websocket/index";
const port = process.env.PORT || 5001;

websocket.connectInWebsocket();

httpServer.listen(port, () => console.log(`Server is running on port ${port}`));
