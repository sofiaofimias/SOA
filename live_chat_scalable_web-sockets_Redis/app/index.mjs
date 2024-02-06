import http from "http";
import ws from "websocket"
import redis from "redis";
const APPID = process.env.APPID;
let connections = [];
const WebSocketServer = ws.server


const subscriber = redis.createClient({
  port      : 6379,              
  host      : 'rds'} );

const publisher = redis.createClient({
  port      : 6379,              
  host      : 'rds'} );
  
 
subscriber.on("subscribe", function(channel, count) {
  console.log(`Server ${APPID} subscribed successfully to livechat`)
  publisher.publish("livechat", "a message");
});
 
subscriber.on("message", function(channel, message) {
  try{
    console.log(`Server ${APPID} received message in channel ${channel} msg: ${message}`);
    connections.forEach(c => c.send(APPID + ":" + message)) 
  }
  catch(ex){
    console.log("ERR::" + ex)
  }
});

subscriber.subscribe("livechat");

const httpserver = http.createServer()

const websocket = new WebSocketServer({
    "httpServer": httpserver
})

httpserver.listen(8080, () => console.log("My server is listening on port 8080"))

websocket.on("request", request=> {

    const con = request.accept(null, request.origin)
    con.on("open", () => console.log("opened"))
    con.on("close", () => console.log("CLOSED!!!"))
    con.on("message", message => {
        console.log(`${APPID} Received message ${message.utf8Data}`)
        publisher.publish("livechat", message.utf8Data)
    })

    setTimeout(() => con.send(`Connected successfully to server ${APPID}`), 5000)
    connections.push(con)
})

