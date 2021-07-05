"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _index = _interopRequireDefault(require("./firebase/index"));

var _snippets = _interopRequireDefault(require("./routes/snippets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use(_bodyParser["default"].json());
var port = 4000;
app.get('/', function (req, res) {
  res.send('Hello World!');
});
(0, _snippets["default"])(app, _index["default"]);
app.listen(port, function () {
  console.log("Example app listening at http://localhost:".concat(port));
});