const net = require("net");
const Koa = require("koa");
const serve = require("koa-static");
const IO = require("koa-socket");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const notifier = require("node-notifier");
const _ = require("lodash");
const config = { tcpPort: 9090, port: 9000 };

const app = new Koa();
const router = new Router();
const io = new IO({
  namespace: "divecalc"
});
const state = {};

router.post("/data/:channel", ctx => {
  console.log(ctx)
  state[ctx.params.channel] = state[ctx.params.channel] || {};
  state[ctx.params.channel][ctx.request.body.event.name] = ctx.request.body;
  state[ctx.params.channel][ctx.request.body.event.name].transmitted = new Date().getTime();
  io.broadcast(ctx.params.channel, state[ctx.params.channel]);
  ctx.body = { hi: true };
});

app
  .use(
    bodyParser({
      detectJSON: function (ctx) {
        return true;
      }
    })
  )
  .use(router.routes())
  .use(router.allowedMethods())
  .use(serve("./build"));
io.attach(app);

io.on("connection", (ctx, data) => {
  _.forEach(state, (c, k) => {
    ctx.socket.emit(k, c);
  });
});

io.on("command", (ctx, data) => {
  switch (data.command) {
    case "commercial":
      console.log(data.channel + "_commercial", data);
      io.broadcast(data.channel + "_commercial", data);
      break;
    case "clearAll":
      state[data.channel || 'screen'] = {};
    case "clear":
      delete state[data.channel || 'screen'][data.argument];
    default:
      io.broadcast(data.channel || 'screen', state[data.channel || 'screen']);
  }
});

app.listen(config.port);
notifier.notify("Listening on " + config.port);
