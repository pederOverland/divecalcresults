"use strict";var _net = require("net");var _net2 = _interopRequireDefault(_net);
var _koa = require("koa");var _koa2 = _interopRequireDefault(_koa);
var _koaStatic = require("koa-static");var _koaStatic2 = _interopRequireDefault(_koaStatic);
var _koaSocket = require("koa-socket");var _koaSocket2 = _interopRequireDefault(_koaSocket);
var _nodeNotifier = require("node-notifier");var _nodeNotifier2 = _interopRequireDefault(_nodeNotifier);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var app = new _koa2.default();
var io = new _koaSocket2.default({
  namespace: "divecalc" });

app.use((0, _koaStatic2.default)("./build"));
io.attach(app);

io.on("connection", function (ctx, data) {});

var server = _net2.default.createServer(function (socket) {
  socket.write("Echo server\r\n");
  socket.pipe(socket);
  socket.on("data", function (data) {
    try {
      var result = JSON.parse(data.toString("utf-8"));
      io.broadcast("divecalc", result);
    } catch (error) {
      socket.write("Error");
      _nodeNotifier2.default.notify({
        title: "Feil input",
        message: "Feil i melding fra DiveCalc. Send melding om igjen.",
        icon: "logo.png",
        sound: true });

    }
  });
});

server.listen(9090, "127.0.0.1");
app.listen(9000);

_nodeNotifier2.default.notify("Listening on 9000");