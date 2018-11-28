const express = require("express");
const session = require("express-session");
const MemoryStore = require("session-memory-store")(session);
const cookieParser = require("cookie-parser");
const path = require("path");
var bodyParser = require("body-parser");
const app = express();

app.use(cookieParser());

app.use(bodyParser.json({ limit: "50mb" }));

app.get("/", function(req, res, next) {
  next();
});

app.use("/public", express.static(path.join(__dirname, "public")));

if (process.env.NODE_ENV !== "production") {
  const webpackMiddleware = require("webpack-dev-middleware");
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config.js");
  const compiler = webpack(webpackConfig);
  var historyApiFallback = require("connect-history-api-fallback");
  const instance = webpackMiddleware(compiler);
  app.use(instance);
  app.use(historyApiFallback());
  app.use(instance);

  app.use(require("webpack-hot-middleware")(compiler));
} else {
  app.use(express.static("dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
  });
}
app.listen(process.env.PORT || 3000, () => console.log("Listening"));
