var fsbx = require("fuse-box");
var FuseBox = fsbx.FuseBox;

const fuse = FuseBox.init({
  homeDir: "./src/client",
  outFile: "./build/bundle.js",
  plugins: [
    fsbx.BabelPlugin({
      config: {
        sourceMaps: true,
        presets: ["latest"],
        plugins: [["transform-react-jsx"]]
      }
    })
  ]
});


fuse.bundle(">index.js", {httpServer: false})