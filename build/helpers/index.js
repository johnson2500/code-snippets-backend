"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserId = getUserId;
exports.isAuthorizedFor = isAuthorizedFor;
exports.getDataFromSnapshot = getDataFromSnapshot;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* eslint-disable import/prefer-default-export */

/* eslint-disable no-console */
function getUserId(_x, _x2) {
  return _getUserId.apply(this, arguments);
}

function _getUserId() {
  _getUserId = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(admin, token) {
    var decodedToken;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return admin.auth().verifyIdToken(token);

          case 3:
            decodedToken = _context.sent;
            return _context.abrupt("return", decodedToken.uid);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            return _context.abrupt("return", null);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _getUserId.apply(this, arguments);
}

function isAuthorizedFor(_x3, _x4, _x5) {
  return _isAuthorizedFor.apply(this, arguments);
}

function _isAuthorizedFor() {
  _isAuthorizedFor = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(admin, token, uuid) {
    var uid;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return getUserId(admin, token);

          case 3:
            uid = _context2.sent;
            console.log(uuid, uid);

            if (!(!uid || uuid !== uid)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", false);

          case 7:
            return _context2.abrupt("return", true);

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            return _context2.abrupt("return", false);

          case 14:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return _isAuthorizedFor.apply(this, arguments);
}

function getDataFromSnapshot(snapshot) {
  var data = [];
  snapshot.forEach(function (doc) {
    console.log(doc.id);
    data.push(_objectSpread(_objectSpread({}, doc.data()), {}, {
      id: doc.id
    }));
  });
  return data;
}