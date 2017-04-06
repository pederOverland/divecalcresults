var fsbx = require("fuse-box");
var FuseBox = fsbx.FuseBox;

const fuse = FuseBox.init({
  homeDir: "./src/client",
  outFile: "./build/bundle.js",
  sourcemaps: true,
  plugins: [
    fsbx.BabelPlugin(),
    [fsbx.SassPlugin(),
    fsbx.CSSPlugin()]
  ]
});

fuse.devServer(">index.js")
