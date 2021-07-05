"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _index = require("../helpers/index");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = function _default(app, admin) {
  app.post('/snippet', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var _req$body, userId, language, code, title, db;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, userId = _req$body.userId, language = _req$body.language, code = _req$body.code, title = _req$body.title;

              if (!(!userId || !language || !code)) {
                _context.next = 4;
                break;
              }

              res.status(400).send('uuid, language and code are required!');
              return _context.abrupt("return");

            case 4:
              _context.prev = 4;
              console.log("Writing to snippets ".concat(req.body));
              db = admin.firestore();
              _context.next = 9;
              return db.collection('snippets').doc().set({
                userId: userId,
                language: language,
                code: code,
                title: title
              });

            case 9:
              res.send('Sucess');
              _context.next = 16;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](4);
              console.log(_context.t0);
              res.status(500).send(_context.t0.message);

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[4, 12]]);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
  app.get('/snippet', /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var _req$query, userId, token, isAuthed, db, snippetsRef, queryRef;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _req$query = req.query, userId = _req$query.userId, token = _req$query.token;
              _context2.next = 3;
              return (0, _index.isAuthorizedFor)(admin, token, userId);

            case 3:
              isAuthed = _context2.sent;

              if (!isAuthed) {
                res.code(401).send('Not Authorized for uuid');
              }

              db = admin.firestore(); // Create a reference to the cities collection

              snippetsRef = db.collection('snippets'); // Create a query against the collection

              _context2.next = 9;
              return snippetsRef.where('userId', '==', userId).get();

            case 9:
              queryRef = _context2.sent;
              res.send(queryRef);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
  app.get('/snippets', /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
      var _req$query2, userId, token, isAuthed, db, snippetsRef, queryRef;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _req$query2 = req.query, userId = _req$query2.userId, token = _req$query2.token;
              _context3.next = 3;
              return (0, _index.isAuthorizedFor)(admin, token, userId);

            case 3:
              isAuthed = _context3.sent;

              if (isAuthed) {
                _context3.next = 7;
                break;
              }

              res.status(401).send('Not Authorized for uuid');
              return _context3.abrupt("return");

            case 7:
              db = admin.firestore(); // Create a reference to the cities collection

              snippetsRef = db.collection('snippets'); // Create a query against the collection

              _context3.next = 11;
              return snippetsRef.where('userId', '==', userId).get();

            case 11:
              queryRef = _context3.sent;
              res.send((0, _index.getDataFromSnapshot)(queryRef));

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
  app["delete"]('/snippet', /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
      var _req$query3, userId, token, id, isAuthed, db;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _req$query3 = req.query, userId = _req$query3.userId, token = _req$query3.token, id = _req$query3.id;
              _context4.next = 3;
              return (0, _index.isAuthorizedFor)(admin, token, userId);

            case 3:
              isAuthed = _context4.sent;

              if (isAuthed) {
                _context4.next = 7;
                break;
              }

              res.status(401).send('Not Authorized for uuid');
              return _context4.abrupt("return");

            case 7:
              db = admin.firestore(); // delete document

              db.collection('snippets').doc(id)["delete"]().then(function () {
                console.log('Document successfully deleted!');
                res.send("Deleted ".concat(id));
              })["catch"](function (error) {
                console.error('Error removing document: ', error);
                res.status(500).send(error);
              });

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};

exports["default"] = _default;