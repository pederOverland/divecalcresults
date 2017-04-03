const net = require("net");
const Koa = require("koa");
const serve = require("koa-static");
const IO = require("koa-socket");
const notifier = require("node-notifier");

const app = new Koa();
const io = new IO({
  namespace: "divecalc"
});
app.use(serve("./build"));
io.attach(app);

io.on("connection", (ctx, data) => {});

const server = net.createServer(socket => {
  socket.write("Echo server\r\n");
  socket.pipe(socket);
  socket.on("data", function(data) {
    try {
      const result = JSON.parse(data.toString("utf-8"));
      io.broadcast("divecalc", result);
    } catch (error) {
      socket.write("Error");
      notifier.notify({
        title: "Feil input",
        message: "Feil i melding fra DiveCalc. Send melding om igjen.",
        icon: "logo.png",
        sound: true
      });
    }
  });
});

server.listen(9090, "127.0.0.1");
app.listen(9000);

notifier.notify("Listening on 9000");
