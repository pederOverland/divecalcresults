import net from "net";
import Koa from "koa";
import serve from "koa-static";
import IO from "koa-socket";

const app = new Koa();
const io = new IO({
  namespace: 'divecalc'
});
app.use(serve("./build"));
io.attach(app);

io.on('connection', (ctx, data) => {
  console.log('connect')
})

const server = net.createServer(socket => {
  socket.write("Echo server\r\n");
  socket.pipe(socket);
  socket.on("data", function(data) {
    const result = data.toString("utf-8");
    console.log(result.split(/\n/));
    io.broadcast('divecalc', result);
  });
});

server.listen(9090, "127.0.0.1");
app.listen(9000);
