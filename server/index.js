"use strict";var _net = require("net");var _net2 = _interopRequireDefault(_net);
var _koa = require("koa");var _koa2 = _interopRequireDefault(_koa);
var _koaStatic = require("koa-static");var _koaStatic2 = _interopRequireDefault(_koaStatic);
var _koaSocket = require("koa-socket");var _koaSocket2 = _interopRequireDefault(_koaSocket);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var app = new _koa2.default();
var io = new _koaSocket2.default({
  namespace: 'divecalc' });

app.use((0, _koaStatic2.default)("./build"));
io.attach(app);

io.on('connection', function (ctx, data) {
});

var server = _net2.default.createServer(function (socket) {
  socket.write("Echo server\r\n");
  socket.pipe(socket);
  socket.on("data", function (data) {
    var result = JSON.parse(data.toString("utf-8"));
    io.broadcast('divecalc', result);
  });
});

server.listen(9090, "127.0.0.1");
app.listen(9000);