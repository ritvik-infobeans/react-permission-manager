"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePermission = exports.setUserRole = exports.setPermissions = exports.configurePermissions = exports.PermissionsProvider = exports.PermissionsContext = void 0;
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var PermissionsContext = exports.PermissionsContext = /*#__PURE__*/(0, _react.createContext)();
var permissionsState = {
  roles: [],
  permissions: {},
  defaultRoles: []
};
var configurePermissions = exports.configurePermissions = function configurePermissions(_ref) {
  var _ref$roles = _ref.roles,
    roles = _ref$roles === void 0 ? [] : _ref$roles,
    _ref$permissions = _ref.permissions,
    permissions = _ref$permissions === void 0 ? {} : _ref$permissions,
    _ref$defaultRoles = _ref.defaultRoles,
    defaultRoles = _ref$defaultRoles === void 0 ? [] : _ref$defaultRoles;
  permissionsState = {
    roles: roles,
    permissions: permissions,
    defaultRoles: defaultRoles
  };
  return permissionsState;
};
var setUserRole = exports.setUserRole = function setUserRole(userRole) {
  configurePermissions({
    roles: [userRole],
    defaultRoles: [userRole]
  });
};
var setPermissions = exports.setPermissions = function setPermissions(dynamicPermissions) {
  configurePermissions({
    roles: permissionsState.roles,
    permissions: dynamicPermissions,
    defaultRoles: permissionsState.defaultRoles
  });
};
var PermissionsProvider = exports.PermissionsProvider = function PermissionsProvider(_ref2) {
  var children = _ref2.children;
  var _useState = (0, _react.useState)(permissionsState),
    _useState2 = _slicedToArray(_useState, 2),
    state = _useState2[0],
    setState = _useState2[1];
  (0, _react.useEffect)(function () {
    setState(permissionsState);
  }, []);
  return /*#__PURE__*/_react["default"].createElement(PermissionsContext.Provider, {
    value: state
  }, children);
};
var usePermission = exports.usePermission = function usePermission(requiredPermission, getUserRolesFn) {
  var contextValue = (0, _react.useContext)(PermissionsContext);
  if (!contextValue || !contextValue.roles || !contextValue.permissions) {
    console.error('Permissions not configured. Make sure to use PermissionsProvider.');
    return false;
  }
  var roles = contextValue.roles,
    permissions = contextValue.permissions;
  var userRoles = getUserRolesFn ? getUserRolesFn() : roles;
  return userRoles.some(function (role) {
    var _permissions$role;
    return (_permissions$role = permissions[role]) === null || _permissions$role === void 0 ? void 0 : _permissions$role.includes(requiredPermission);
  });
};