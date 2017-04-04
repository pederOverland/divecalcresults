const net = require("net");
const Koa = require("koa");
const serve = require("koa-static");
const IO = require("koa-socket");
const notifier = require("node-notifier");
const config = process.env.NODE_ENV == 'stream' ? { tcpPort: 8080, port: 8000 } : { tcpPort: 9090, port: 9000 };

const app = new Koa();
const io = new IO({
  namespace: "divecalc"
});
app.use(serve("./build"));
io.attach(app);

io.on("connection", (ctx, data) => { });

const server = net.createServer(socket => {
  let msg = "";
  socket.write("Echo server\r\n");
  socket.pipe(socket);
  socket.on("data", function (data) {
    let send = false;
    msg += data.toString("utf-8");
    try {
      const result = JSON.parse(msg);
      msg = "";
      io.broadcast("divecalc", result);
    } catch (error) {
      /*
      console.log(error.message);
      socket.write("Error");
      notifier.notify({
        title: "Feil input",
        message: "Feil i melding fra DiveCalc. Send melding om igjen.",
        icon: "logo.png",
        sound: true
      });
      */
    }
  });
});

server.listen(config.tcpPort);
app.listen(config.port);

notifier.notify("Listening on " + config.port);
