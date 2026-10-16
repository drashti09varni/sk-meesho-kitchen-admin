
function h1(f, m) {
  for (var S = 0; S < m.length; S++) {
    const o = m[S];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const T in o)
        if (T !== "default" && !(T in f)) {
          const D = Object.getOwnPropertyDescriptor(o, T);
          D &&
            Object.defineProperty(
              f,
              T,
              D.get ? D : { enumerable: !0, get: () => o[T] },
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(f, Symbol.toStringTag, { value: "Module" }),
  );
}
(function () {
  const m = document.createElement("link").relList;
  if (m && m.supports && m.supports("modulepreload")) return;
  for (const T of document.querySelectorAll('link[rel="modulepreload"]')) o(T);
  new MutationObserver((T) => {
    for (const D of T)
      if (D.type === "childList")
        for (const U of D.addedNodes)
          U.tagName === "LINK" && U.rel === "modulepreload" && o(U);
  }).observe(document, { childList: !0, subtree: !0 });
  function S(T) {
    const D = {};
    return (
      T.integrity && (D.integrity = T.integrity),
      T.referrerPolicy && (D.referrerPolicy = T.referrerPolicy),
      T.crossOrigin === "use-credentials"
        ? (D.credentials = "include")
        : T.crossOrigin === "anonymous"
          ? (D.credentials = "omit")
          : (D.credentials = "same-origin"),
      D
    );
  }
  function o(T) {
    if (T.ep) return;
    T.ep = !0;
    const D = S(T);
    fetch(T.href, D);
  }
})();
function m1(f) {
  return f && f.__esModule && Object.prototype.hasOwnProperty.call(f, "default")
    ? f.default
    : f;
}
var us = { exports: {} },
  Mn = {};
var dd;
function v1() {
  if (dd) return Mn;
  dd = 1;
  var f = Symbol.for("react.transitional.element"),
    m = Symbol.for("react.fragment");
  function S(o, T, D) {
    var U = null;
    if (
      (D !== void 0 && (U = "" + D),
      T.key !== void 0 && (U = "" + T.key),
      "key" in T)
    ) {
      D = {};
      for (var Z in T) Z !== "key" && (D[Z] = T[Z]);
    } else D = T;
    return (
      (T = D.ref),
      { $$typeof: f, type: o, key: U, ref: T !== void 0 ? T : null, props: D }
    );
  }
  return ((Mn.Fragment = m), (Mn.jsx = S), (Mn.jsxs = S), Mn);
}
var hd;
function y1() {
  return (hd || ((hd = 1), (us.exports = v1())), us.exports);
}
var u = y1(),
  cs = { exports: {} },
  zn = {},
  ss = { exports: {} },
  fs = {};
var md;
function g1() {
  return (
    md ||
      ((md = 1),
      (function (f) {
        function m(j, B) {
          var Q = j.length;
          j.push(B);
          e: for (; 0 < Q; ) {
            var re = (Q - 1) >>> 1,
              d = j[re];
            if (0 < T(d, B)) ((j[re] = B), (j[Q] = d), (Q = re));
            else break e;
          }
        }
        function S(j) {
          return j.length === 0 ? null : j[0];
        }
        function o(j) {
          if (j.length === 0) return null;
          var B = j[0],
            Q = j.pop();
          if (Q !== B) {
            j[0] = Q;
            e: for (var re = 0, d = j.length, z = d >>> 1; re < z; ) {
              var G = 2 * (re + 1) - 1,
                R = j[G],
                K = G + 1,
                ee = j[K];
              if (0 > T(R, Q))
                K < d && 0 > T(ee, R)
                  ? ((j[re] = ee), (j[K] = Q), (re = K))
                  : ((j[re] = R), (j[G] = Q), (re = G));
              else if (K < d && 0 > T(ee, Q))
                ((j[re] = ee), (j[K] = Q), (re = K));
              else break e;
            }
          }
          return B;
        }
        function T(j, B) {
          var Q = j.sortIndex - B.sortIndex;
          return Q !== 0 ? Q : j.id - B.id;
        }
        if (
          ((f.unstable_now = void 0),
          typeof performance == "object" &&
            typeof performance.now == "function")
        ) {
          var D = performance;
          f.unstable_now = function () {
            return D.now();
          };
        } else {
          var U = Date,
            Z = U.now();
          f.unstable_now = function () {
            return U.now() - Z;
          };
        }
        var A = [],
          b = [],
          _ = 1,
          O = null,
          X = 3,
          H = !1,
          L = !1,
          P = !1,
          F = !1,
          Y = typeof setTimeout == "function" ? setTimeout : null,
          De = typeof clearTimeout == "function" ? clearTimeout : null,
          je = typeof setImmediate < "u" ? setImmediate : null;
        function Le(j) {
          for (var B = S(b); B !== null; ) {
            if (B.callback === null) o(b);
            else if (B.startTime <= j)
              (o(b), (B.sortIndex = B.expirationTime), m(A, B));
            else break;
            B = S(b);
          }
        }
        function le(j) {
          if (((P = !1), Le(j), !L))
            if (S(A) !== null) ((L = !0), Ge || ((Ge = !0), Ce()));
            else {
              var B = S(b);
              B !== null && Ue(le, B.startTime - j);
            }
        }
        var Ge = !1,
          Te = -1,
          Oe = 5,
          Ke = -1;
        function Ct() {
          return F ? !0 : !(f.unstable_now() - Ke < Oe);
        }
        function dt() {
          if (((F = !1), Ge)) {
            var j = f.unstable_now();
            Ke = j;
            var B = !0;
            try {
              e: {
                ((L = !1), P && ((P = !1), De(Te), (Te = -1)), (H = !0));
                var Q = X;
                try {
                  t: {
                    for (
                      Le(j), O = S(A);
                      O !== null && !(O.expirationTime > j && Ct());
                    ) {
                      var re = O.callback;
                      if (typeof re == "function") {
                        ((O.callback = null), (X = O.priorityLevel));
                        var d = re(O.expirationTime <= j);
                        if (((j = f.unstable_now()), typeof d == "function")) {
                          ((O.callback = d), Le(j), (B = !0));
                          break t;
                        }
                        (O === S(A) && o(A), Le(j));
                      } else o(A);
                      O = S(A);
                    }
                    if (O !== null) B = !0;
                    else {
                      var z = S(b);
                      (z !== null && Ue(le, z.startTime - j), (B = !1));
                    }
                  }
                  break e;
                } finally {
                  ((O = null), (X = Q), (H = !1));
                }
                B = void 0;
              }
            } finally {
              B ? Ce() : (Ge = !1);
            }
          }
        }
        var Ce;
        if (typeof je == "function")
          Ce = function () {
            je(dt);
          };
        else if (typeof MessageChannel < "u") {
          var Ut = new MessageChannel(),
            ye = Ut.port2;
          ((Ut.port1.onmessage = dt),
            (Ce = function () {
              ye.postMessage(null);
            }));
        } else
          Ce = function () {
            Y(dt, 0);
          };
        function Ue(j, B) {
          Te = Y(function () {
            j(f.unstable_now());
          }, B);
        }
        ((f.unstable_IdlePriority = 5),
          (f.unstable_ImmediatePriority = 1),
          (f.unstable_LowPriority = 4),
          (f.unstable_NormalPriority = 3),
          (f.unstable_Profiling = null),
          (f.unstable_UserBlockingPriority = 2),
          (f.unstable_cancelCallback = function (j) {
            j.callback = null;
          }),
          (f.unstable_forceFrameRate = function (j) {
            0 > j || 125 < j
              ? console.error(
                  "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported",
                )
              : (Oe = 0 < j ? Math.floor(1e3 / j) : 5);
          }),
          (f.unstable_getCurrentPriorityLevel = function () {
            return X;
          }),
          (f.unstable_next = function (j) {
            switch (X) {
              case 1:
              case 2:
              case 3:
                var B = 3;
                break;
              default:
                B = X;
            }
            var Q = X;
            X = B;
            try {
              return j();
            } finally {
              X = Q;
            }
          }),
          (f.unstable_requestPaint = function () {
            F = !0;
          }),
          (f.unstable_runWithPriority = function (j, B) {
            switch (j) {
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
                break;
              default:
                j = 3;
            }
            var Q = X;
            X = j;
            try {
              return B();
            } finally {
              X = Q;
            }
          }),
          (f.unstable_scheduleCallback = function (j, B, Q) {
            var re = f.unstable_now();
            switch (
              (typeof Q == "object" && Q !== null
                ? ((Q = Q.delay),
                  (Q = typeof Q == "number" && 0 < Q ? re + Q : re))
                : (Q = re),
              j)
            ) {
              case 1:
                var d = -1;
                break;
              case 2:
                d = 250;
                break;
              case 5:
                d = 1073741823;
                break;
              case 4:
                d = 1e4;
                break;
              default:
                d = 5e3;
            }
            return (
              (d = Q + d),
              (j = {
                id: _++,
                callback: B,
                priorityLevel: j,
                startTime: Q,
                expirationTime: d,
                sortIndex: -1,
              }),
              Q > re
                ? ((j.sortIndex = Q),
                  m(b, j),
                  S(A) === null &&
                    j === S(b) &&
                    (P ? (De(Te), (Te = -1)) : (P = !0), Ue(le, Q - re)))
                : ((j.sortIndex = d),
                  m(A, j),
                  L || H || ((L = !0), Ge || ((Ge = !0), Ce()))),
              j
            );
          }),
          (f.unstable_shouldYield = Ct),
          (f.unstable_wrapCallback = function (j) {
            var B = X;
            return function () {
              var Q = X;
              X = B;
              try {
                return j.apply(this, arguments);
              } finally {
                X = Q;
              }
            };
          }));
      })(fs)),
    fs
  );
}
var vd;
function p1() {
  return (vd || ((vd = 1), (ss.exports = g1())), ss.exports);
}
var rs = { exports: {} },
  I = {};
var yd;
function x1() {
  if (yd) return I;
  yd = 1;
  var f = Symbol.for("react.transitional.element"),
    m = Symbol.for("react.portal"),
    S = Symbol.for("react.fragment"),
    o = Symbol.for("react.strict_mode"),
    T = Symbol.for("react.profiler"),
    D = Symbol.for("react.consumer"),
    U = Symbol.for("react.context"),
    Z = Symbol.for("react.forward_ref"),
    A = Symbol.for("react.suspense"),
    b = Symbol.for("react.memo"),
    _ = Symbol.for("react.lazy"),
    O = Symbol.iterator;

  
  function X(d) {
    return d === null || typeof d != "object"
      ? null
      : ((d = (O && d[O]) || d["@@iterator"]),
        typeof d == "function" ? d : null);
  }
  var H = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    L = Object.assign,
    P = {};
  function F(d, z, G) {
    ((this.props = d),
      (this.context = z),
      (this.refs = P),
      (this.updater = G || H));
  }
  ((F.prototype.isReactComponent = {}),
    (F.prototype.setState = function (d, z) {
      if (typeof d != "object" && typeof d != "function" && d != null)
        throw Error(
          "takes an object of state variables to update or a function which returns an object of state variables.",
        );
      this.updater.enqueueSetState(this, d, z, "setState");
    }),
    (F.prototype.forceUpdate = function (d) {
      this.updater.enqueueForceUpdate(this, d, "forceUpdate");
    }));
  function Y() {}
  Y.prototype = F.prototype;
  function De(d, z, G) {
    ((this.props = d),
      (this.context = z),
      (this.refs = P),
      (this.updater = G || H));
  }
  var je = (De.prototype = new Y());
  ((je.constructor = De), L(je, F.prototype), (je.isPureReactComponent = !0));
  var Le = Array.isArray,
    le = { H: null, A: null, T: null, S: null, V: null },
    Ge = Object.prototype.hasOwnProperty;
  function Te(d, z, G, R, K, ee) {
    return (
      (G = ee.ref),
      { $$typeof: f, type: d, key: z, ref: G !== void 0 ? G : null, props: ee }
    );
  }
  function Oe(d, z) {
    return Te(d.type, z, void 0, void 0, void 0, d.props);
  }
  function Ke(d) {
    return typeof d == "object" && d !== null && d.$$typeof === f;
  }
  function Ct(d) {
    var z = { "=": "=0", ":": "=2" };
    return (
      "$" +
      d.replace(/[=:]/g, function (G) {
        return z[G];
      })
    );
  }
  var dt = /\/+/g;
  function Ce(d, z) {
    return typeof d == "object" && d !== null && d.key != null
      ? Ct("" + d.key)
      : z.toString(36);
  }
  function Ut() {}
  function ye(d) {
    switch (d.status) {
      case "fulfilled":
        return d.value;
      case "rejected":
        throw d.reason;
      default:
        switch (
          (typeof d.status == "string"
            ? d.then(Ut, Ut)
            : ((d.status = "pending"),
              d.then(
                function (z) {
                  d.status === "pending" &&
                    ((d.status = "fulfilled"), (d.value = z));
                },
                function (z) {
                  d.status === "pending" &&
                    ((d.status = "rejected"), (d.reason = z));
                },
              )),
          d.status)
        ) {
          case "fulfilled":
            return d.value;
          case "rejected":
            throw d.reason;
        }
    }
    throw d;
  }
  function Ue(d, z, G, R, K) {
    var ee = typeof d;
    (ee === "undefined" || ee === "boolean") && (d = null);
    var W = !1;
    if (d === null) W = !0;
    else
      switch (ee) {
        case "bigint":
        case "string":
        case "number":
          W = !0;
          break;
        case "object":
          switch (d.$$typeof) {
            case f:
            case m:
              W = !0;
              break;
            case _:
              return ((W = d._init), Ue(W(d._payload), z, G, R, K));
          }
      }
    if (W)
      return (
        (K = K(d)),
        (W = R === "" ? "." + Ce(d, 0) : R),
        Le(K)
          ? ((G = ""),
            W != null && (G = W.replace(dt, "$&/") + "/"),
            Ue(K, z, G, "", function (Tt) {
              return Tt;
            }))
          : K != null &&
            (Ke(K) &&
              (K = Oe(
                K,
                G +
                  (K.key == null || (d && d.key === K.key)
                    ? ""
                    : ("" + K.key).replace(dt, "$&/") + "/") +
                  W,
              )),
            z.push(K)),
        1
      );
    W = 0;
    var ke = R === "" ? "." : R + ":";
    if (Le(d))
      for (var ge = 0; ge < d.length; ge++)
        ((R = d[ge]), (ee = ke + Ce(R, ge)), (W += Ue(R, z, G, ee, K)));
    else if (((ge = X(d)), typeof ge == "function"))
      for (d = ge.call(d), ge = 0; !(R = d.next()).done; )
        ((R = R.value), (ee = ke + Ce(R, ge++)), (W += Ue(R, z, G, ee, K)));
    else if (ee === "object") {
      if (typeof d.then == "function") return Ue(ye(d), z, G, R, K);
      throw (
        (z = String(d)),
        Error(
          "Objects are not valid as a React child (found: " +
            (z === "[object Object]"
              ? "object with keys {" + Object.keys(d).join(", ") + "}"
              : z) +
            "). If you meant to render a collection of children, use an array instead.",
        )
      );
    }
    return W;
  }
  function j(d, z, G) {
    if (d == null) return d;
    var R = [],
      K = 0;
    return (
      Ue(d, R, "", "", function (ee) {
        return z.call(G, ee, K++);
      }),
      R
    );
  }
  function B(d) {
    if (d._status === -1) {
      var z = d._result;
      ((z = z()),
        z.then(
          function (G) {
            (d._status === 0 || d._status === -1) &&
              ((d._status = 1), (d._result = G));
          },
          function (G) {
            (d._status === 0 || d._status === -1) &&
              ((d._status = 2), (d._result = G));
          },
        ),
        d._status === -1 && ((d._status = 0), (d._result = z)));
    }
    if (d._status === 1) return d._result.default;
    throw d._result;
  }
  var Q =
    typeof reportError == "function"
      ? reportError
      : function (d) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var z = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof d == "object" &&
                d !== null &&
                typeof d.message == "string"
                  ? String(d.message)
                  : String(d),
              error: d,
            });
            if (!window.dispatchEvent(z)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", d);
            return;
          }
          console.error(d);
        };
  function re() {}
  return (
    (I.Children = {
      map: j,
      forEach: function (d, z, G) {
        j(
          d,
          function () {
            z.apply(this, arguments);
          },
          G,
        );
      },
      count: function (d) {
        var z = 0;
        return (
          j(d, function () {
            z++;
          }),
          z
        );
      },
      toArray: function (d) {
        return (
          j(d, function (z) {
            return z;
          }) || []
        );
      },
      only: function (d) {
        if (!Ke(d))
          throw Error(
            "React.Children.only expected to receive a single React element child.",
          );
        return d;
      },
    }),
    (I.Component = F),
    (I.Fragment = S),
    (I.Profiler = T),
    (I.PureComponent = De),
    (I.StrictMode = o),
    (I.Suspense = A),
    (I.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = le),
    (I.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function (d) {
        return le.H.useMemoCache(d);
      },
    }),
    (I.cache = function (d) {
      return function () {
        return d.apply(null, arguments);
      };
    }),
    (I.cloneElement = function (d, z, G) {
      if (d == null)
        throw Error(
          "The argument must be a React element, but you passed " + d + ".",
        );
      var R = L({}, d.props),
        K = d.key,
        ee = void 0;
      if (z != null)
        for (W in (z.ref !== void 0 && (ee = void 0),
        z.key !== void 0 && (K = "" + z.key),
        z))
          !Ge.call(z, W) ||
            W === "key" ||
            W === "__self" ||
            W === "__source" ||
            (W === "ref" && z.ref === void 0) ||
            (R[W] = z[W]);
      var W = arguments.length - 2;
      if (W === 1) R.children = G;
      else if (1 < W) {
        for (var ke = Array(W), ge = 0; ge < W; ge++)
          ke[ge] = arguments[ge + 2];
        R.children = ke;
      }
      return Te(d.type, K, void 0, void 0, ee, R);
    }),
    (I.createContext = function (d) {
      return (
        (d = {
          $$typeof: U,
          _currentValue: d,
          _currentValue2: d,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (d.Provider = d),
        (d.Consumer = { $$typeof: D, _context: d }),
        d
      );
    }),
    (I.createElement = function (d, z, G) {
      var R,
        K = {},
        ee = null;
      if (z != null)
        for (R in (z.key !== void 0 && (ee = "" + z.key), z))
          Ge.call(z, R) &&
            R !== "key" &&
            R !== "__self" &&
            R !== "__source" &&
            (K[R] = z[R]);
      var W = arguments.length - 2;
      if (W === 1) K.children = G;
      else if (1 < W) {
        for (var ke = Array(W), ge = 0; ge < W; ge++)
          ke[ge] = arguments[ge + 2];
        K.children = ke;
      }
      if (d && d.defaultProps)
        for (R in ((W = d.defaultProps), W)) K[R] === void 0 && (K[R] = W[R]);
      return Te(d, ee, void 0, void 0, null, K);
    }),
    (I.createRef = function () {
      return { current: null };
    }),
    (I.forwardRef = function (d) {
      return { $$typeof: Z, render: d };
    }),
    (I.isValidElement = Ke),
    (I.lazy = function (d) {
      return { $$typeof: _, _payload: { _status: -1, _result: d }, _init: B };
    }),
    (I.memo = function (d, z) {
      return { $$typeof: b, type: d, compare: z === void 0 ? null : z };
    }),
    (I.startTransition = function (d) {
      var z = le.T,
        G = {};
      le.T = G;
      try {
        var R = d(),
          K = le.S;
        (K !== null && K(G, R),
          typeof R == "object" &&
            R !== null &&
            typeof R.then == "function" &&
            R.then(re, Q));
      } catch (ee) {
        Q(ee);
      } finally {
        le.T = z;
      }
    }),
    (I.unstable_useCacheRefresh = function () {
      return le.H.useCacheRefresh();
    }),
    (I.use = function (d) {
      return le.H.use(d);
    }),
    (I.useActionState = function (d, z, G) {
      return le.H.useActionState(d, z, G);
    }),
    (I.useCallback = function (d, z) {
      return le.H.useCallback(d, z);
    }),
    (I.useContext = function (d) {
      return le.H.useContext(d);
    }),
    (I.useDebugValue = function () {}),
    (I.useDeferredValue = function (d, z) {
      return le.H.useDeferredValue(d, z);
    }),
    (I.useEffect = function (d, z, G) {
      var R = le.H;
      if (typeof G == "function")
        throw Error(
          "useEffect CRUD overload is not enabled in this build of React.",
        );
      return R.useEffect(d, z);
    }),
    (I.useId = function () {
      return le.H.useId();
    }),
    (I.useImperativeHandle = function (d, z, G) {
      return le.H.useImperativeHandle(d, z, G);
    }),
    (I.useInsertionEffect = function (d, z) {
      return le.H.useInsertionEffect(d, z);
    }),
    (I.useLayoutEffect = function (d, z) {
      return le.H.useLayoutEffect(d, z);
    }),
    (I.useMemo = function (d, z) {
      return le.H.useMemo(d, z);
    }),
    (I.useOptimistic = function (d, z) {
      return le.H.useOptimistic(d, z);
    }),
    (I.useReducer = function (d, z, G) {
      return le.H.useReducer(d, z, G);
    }),
    (I.useRef = function (d) {
      return le.H.useRef(d);
    }),
    (I.useState = function (d) {
      return le.H.useState(d);
    }),
    (I.useSyncExternalStore = function (d, z, G) {
      return le.H.useSyncExternalStore(d, z, G);
    }),
    (I.useTransition = function () {
      return le.H.useTransition();
    }),
    (I.version = "19.1.0"),
    I
  );
}
var gd;
function ki() {
  return (gd || ((gd = 1), (rs.exports = x1())), rs.exports);
}
var os = { exports: {} },
  $e = {};
var pd;
function b1() {
  if (pd) return $e;
  pd = 1;
  var f = ki();
  function m(A) {
    var b = "https://react.dev/errors/" + A;
    if (1 < arguments.length) {
      b += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var _ = 2; _ < arguments.length; _++)
        b += "&args[]=" + encodeURIComponent(arguments[_]);
    }
    return (
      "Minified React error #" +
      A +
      "; visit " +
      b +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function S() {}
  var o = {
      d: {
        f: S,
        r: function () {
          throw Error(m(522));
        },
        D: S,
        C: S,
        L: S,
        m: S,
        X: S,
        S,
        M: S,
      },
      p: 0,
      findDOMNode: null,
    },
    T = Symbol.for("react.portal");
  function D(A, b, _) {
    var O =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: T,
      key: O == null ? null : "" + O,
      children: A,
      containerInfo: b,
      implementation: _,
    };
  }
  var U = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function Z(A, b) {
    if (A === "font") return "";
    if (typeof b == "string") return b === "use-credentials" ? b : "";
  }
  return (
    ($e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = o),
    ($e.createPortal = function (A, b) {
      var _ =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!b || (b.nodeType !== 1 && b.nodeType !== 9 && b.nodeType !== 11))
        throw Error(m(299));
      return D(A, b, null, _);
    }),
    ($e.flushSync = function (A) {
      var b = U.T,
        _ = o.p;
      try {
        if (((U.T = null), (o.p = 2), A)) return A();
      } finally {
        ((U.T = b), (o.p = _), o.d.f());
      }
    }),
    ($e.preconnect = function (A, b) {
      typeof A == "string" &&
        (b
          ? ((b = b.crossOrigin),
            (b =
              typeof b == "string"
                ? b === "use-credentials"
                  ? b
                  : ""
                : void 0))
          : (b = null),
        o.d.C(A, b));
    }),
    ($e.prefetchDNS = function (A) {
      typeof A == "string" && o.d.D(A);
    }),
    ($e.preinit = function (A, b) {
      if (typeof A == "string" && b && typeof b.as == "string") {
        var _ = b.as,
          O = Z(_, b.crossOrigin),
          X = typeof b.integrity == "string" ? b.integrity : void 0,
          H = typeof b.fetchPriority == "string" ? b.fetchPriority : void 0;
        _ === "style"
          ? o.d.S(A, typeof b.precedence == "string" ? b.precedence : void 0, {
              crossOrigin: O,
              integrity: X,
              fetchPriority: H,
            })
          : _ === "script" &&
            o.d.X(A, {
              crossOrigin: O,
              integrity: X,
              fetchPriority: H,
              nonce: typeof b.nonce == "string" ? b.nonce : void 0,
            });
      }
    }),
    ($e.preinitModule = function (A, b) {
      if (typeof A == "string")
        if (typeof b == "object" && b !== null) {
          if (b.as == null || b.as === "script") {
            var _ = Z(b.as, b.crossOrigin);
            o.d.M(A, {
              crossOrigin: _,
              integrity: typeof b.integrity == "string" ? b.integrity : void 0,
              nonce: typeof b.nonce == "string" ? b.nonce : void 0,
            });
          }
        } else b == null && o.d.M(A);
    }),
    ($e.preload = function (A, b) {
      if (
        typeof A == "string" &&
        typeof b == "object" &&
        b !== null &&
        typeof b.as == "string"
      ) {
        var _ = b.as,
          O = Z(_, b.crossOrigin);
        o.d.L(A, _, {
          crossOrigin: O,
          integrity: typeof b.integrity == "string" ? b.integrity : void 0,
          nonce: typeof b.nonce == "string" ? b.nonce : void 0,
          type: typeof b.type == "string" ? b.type : void 0,
          fetchPriority:
            typeof b.fetchPriority == "string" ? b.fetchPriority : void 0,
          referrerPolicy:
            typeof b.referrerPolicy == "string" ? b.referrerPolicy : void 0,
          imageSrcSet:
            typeof b.imageSrcSet == "string" ? b.imageSrcSet : void 0,
          imageSizes: typeof b.imageSizes == "string" ? b.imageSizes : void 0,
          media: typeof b.media == "string" ? b.media : void 0,
        });
      }
    }),
    ($e.preloadModule = function (A, b) {
      if (typeof A == "string")
        if (b) {
          var _ = Z(b.as, b.crossOrigin);
          o.d.m(A, {
            as: typeof b.as == "string" && b.as !== "script" ? b.as : void 0,
            crossOrigin: _,
            integrity: typeof b.integrity == "string" ? b.integrity : void 0,
          });
        } else o.d.m(A);
    }),
    ($e.requestFormReset = function (A) {
      o.d.r(A);
    }),
    ($e.unstable_batchedUpdates = function (A, b) {
      return A(b);
    }),
    ($e.useFormState = function (A, b, _) {
      return U.H.useFormState(A, b, _);
    }),
    ($e.useFormStatus = function () {
      return U.H.useHostTransitionStatus();
    }),
    ($e.version = "19.1.0"),
    $e
  );
}
var xd;
function S1() {
  if (xd) return os.exports;
  xd = 1;
  function f() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (m) {
        console.error(m);
      }
  }
  return (f(), (os.exports = b1()), os.exports);
}
var bd;
function j1() {
  if (bd) return zn;
  bd = 1;
  var f = p1(),
    m = ki(),
    S = S1();
  function o(e) {
    var t = "https://react.dev/errors/" + e;
    if (1 < arguments.length) {
      t += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var l = 2; l < arguments.length; l++)
        t += "&args[]=" + encodeURIComponent(arguments[l]);
    }
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  function T(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function D(e) {
    var t = e,
      l = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (l = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? l : null;
  }
  function U(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function Z(e) {
    if (D(e) !== e) throw Error(o(188));
  }
  function A(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = D(e)), t === null)) throw Error(o(188));
      return t !== e ? null : e;
    }
    for (var l = e, a = t; ; ) {
      var n = l.return;
      if (n === null) break;
      var i = n.alternate;
      if (i === null) {
        if (((a = n.return), a !== null)) {
          l = a;
          continue;
        }
        break;
      }
      if (n.child === i.child) {
        for (i = n.child; i; ) {
          if (i === l) return (Z(n), e);
          if (i === a) return (Z(n), t);
          i = i.sibling;
        }
        throw Error(o(188));
      }
      if (l.return !== a.return) ((l = n), (a = i));
      else {
        for (var c = !1, s = n.child; s; ) {
          if (s === l) {
            ((c = !0), (l = n), (a = i));
            break;
          }
          if (s === a) {
            ((c = !0), (a = n), (l = i));
            break;
          }
          s = s.sibling;
        }
        if (!c) {
          for (s = i.child; s; ) {
            if (s === l) {
              ((c = !0), (l = i), (a = n));
              break;
            }
            if (s === a) {
              ((c = !0), (a = i), (l = n));
              break;
            }
            s = s.sibling;
          }
          if (!c) throw Error(o(189));
        }
      }
      if (l.alternate !== a) throw Error(o(190));
    }
    if (l.tag !== 3) throw Error(o(188));
    return l.stateNode.current === l ? e : t;
  }
  function b(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e;
    for (e = e.child; e !== null; ) {
      if (((t = b(e)), t !== null)) return t;
      e = e.sibling;
    }
    return null;
  }
  var _ = Object.assign,
    O = Symbol.for("react.element"),
    X = Symbol.for("react.transitional.element"),
    H = Symbol.for("react.portal"),
    L = Symbol.for("react.fragment"),
    P = Symbol.for("react.strict_mode"),
    F = Symbol.for("react.profiler"),
    Y = Symbol.for("react.provider"),
    De = Symbol.for("react.consumer"),
    je = Symbol.for("react.context"),
    Le = Symbol.for("react.forward_ref"),
    le = Symbol.for("react.suspense"),
    Ge = Symbol.for("react.suspense_list"),
    Te = Symbol.for("react.memo"),
    Oe = Symbol.for("react.lazy"),
    Ke = Symbol.for("react.activity"),
    Ct = Symbol.for("react.memo_cache_sentinel"),
    dt = Symbol.iterator;
  function Ce(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (dt && e[dt]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var Ut = Symbol.for("react.client.reference");
  function ye(e) {
    if (e == null) return null;
    if (typeof e == "function")
      return e.$$typeof === Ut ? null : e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case L:
        return "Fragment";
      case F:
        return "Profiler";
      case P:
        return "StrictMode";
      case le:
        return "Suspense";
      case Ge:
        return "SuspenseList";
      case Ke:
        return "Activity";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case H:
          return "Portal";
        case je:
          return (e.displayName || "Context") + ".Provider";
        case De:
          return (e._context.displayName || "Context") + ".Consumer";
        case Le:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case Te:
          return (
            (t = e.displayName || null),
            t !== null ? t : ye(e.type) || "Memo"
          );
        case Oe:
          ((t = e._payload), (e = e._init));
          try {
            return ye(e(t));
          } catch {}
      }
    return null;
  }
  var Ue = Array.isArray,
    j = m.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    B = S.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
    Q = { pending: !1, data: null, method: null, action: null },
    re = [],
    d = -1;
  function z(e) {
    return { current: e };
  }
  function G(e) {
    0 > d || ((e.current = re[d]), (re[d] = null), d--);
  }
  function R(e, t) {
    (d++, (re[d] = e.current), (e.current = t));
  }
  var K = z(null),
    ee = z(null),
    W = z(null),
    ke = z(null);
  function ge(e, t) {
    switch ((R(W, t), R(ee, e), R(K, null), t.nodeType)) {
      case 9:
      case 11:
        e = (e = t.documentElement) && (e = e.namespaceURI) ? Yo(e) : 0;
        break;
      default:
        if (((e = t.tagName), (t = t.namespaceURI)))
          ((t = Yo(t)), (e = Lo(t, e)));
        else
          switch (e) {
            case "svg":
              e = 1;
              break;
            case "math":
              e = 2;
              break;
            default:
              e = 0;
          }
    }
    (G(K), R(K, e));
  }
  function Tt() {
    (G(K), G(ee), G(W));
  }
  function Ma(e) {
    e.memoizedState !== null && R(ke, e);
    var t = K.current,
      l = Lo(t, e.type);
    t !== l && (R(ee, e), R(K, l));
  }
  function Yl(e) {
    (ee.current === e && (G(K), G(ee)),
      ke.current === e && (G(ke), (Nn._currentValue = Q)));
  }
  var C = Object.prototype.hasOwnProperty,
    ce = f.unstable_scheduleCallback,
    Xe = f.unstable_cancelCallback,
    On = f.unstable_shouldYield,
    za = f.unstable_requestPaint,
    At = f.unstable_now,
    kd = f.unstable_getCurrentPriorityLevel,
    ps = f.unstable_ImmediatePriority,
    xs = f.unstable_UserBlockingPriority,
    Cn = f.unstable_NormalPriority,
    Jd = f.unstable_LowPriority,
    bs = f.unstable_IdlePriority,
    Wd = f.log,
    $d = f.unstable_setDisableYieldValue,
    Da = null,
    at = null;
  function Wt(e) {
    if (
      (typeof Wd == "function" && $d(e),
      at && typeof at.setStrictMode == "function")
    )
      try {
        at.setStrictMode(Da, e);
      } catch {}
  }
  var nt = Math.clz32 ? Math.clz32 : Id,
    Pd = Math.log,
    Fd = Math.LN2;
  function Id(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((Pd(e) / Fd) | 0)) | 0);
  }
  var Un = 256,
    Rn = 4194304;
  function bl(e) {
    var t = e & 42;
    if (t !== 0) return t;
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194048;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return e & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return e;
    }
  }
  function Bn(e, t, l) {
    var a = e.pendingLanes;
    if (a === 0) return 0;
    var n = 0,
      i = e.suspendedLanes,
      c = e.pingedLanes;
    e = e.warmLanes;
    var s = a & 134217727;
    return (
      s !== 0
        ? ((a = s & ~i),
          a !== 0
            ? (n = bl(a))
            : ((c &= s),
              c !== 0
                ? (n = bl(c))
                : l || ((l = s & ~e), l !== 0 && (n = bl(l)))))
        : ((s = a & ~i),
          s !== 0
            ? (n = bl(s))
            : c !== 0
              ? (n = bl(c))
              : l || ((l = a & ~e), l !== 0 && (n = bl(l)))),
      n === 0
        ? 0
        : t !== 0 &&
            t !== n &&
            (t & i) === 0 &&
            ((i = n & -n),
            (l = t & -t),
            i >= l || (i === 32 && (l & 4194048) !== 0))
          ? t
          : n
    );
  }
  function Oa(e, t) {
    return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
  }
  function eh(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return t + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ss() {
    var e = Un;
    return ((Un <<= 1), (Un & 4194048) === 0 && (Un = 256), e);
  }
  function js() {
    var e = Rn;
    return ((Rn <<= 1), (Rn & 62914560) === 0 && (Rn = 4194304), e);
  }
  function Wi(e) {
    for (var t = [], l = 0; 31 > l; l++) t.push(e);
    return t;
  }
  function Ca(e, t) {
    ((e.pendingLanes |= t),
      t !== 268435456 &&
        ((e.suspendedLanes = 0), (e.pingedLanes = 0), (e.warmLanes = 0)));
  }
  function th(e, t, l, a, n, i) {
    var c = e.pendingLanes;
    ((e.pendingLanes = l),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.warmLanes = 0),
      (e.expiredLanes &= l),
      (e.entangledLanes &= l),
      (e.errorRecoveryDisabledLanes &= l),
      (e.shellSuspendCounter = 0));
    var s = e.entanglements,
      r = e.expirationTimes,
      g = e.hiddenUpdates;
    for (l = c & ~l; 0 < l; ) {
      var N = 31 - nt(l),
        M = 1 << N;
      ((s[N] = 0), (r[N] = -1));
      var p = g[N];
      if (p !== null)
        for (g[N] = null, N = 0; N < p.length; N++) {
          var x = p[N];
          x !== null && (x.lane &= -536870913);
        }
      l &= ~M;
    }
    (a !== 0 && Ns(e, a, 0),
      i !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(c & ~t)));
  }
  function Ns(e, t, l) {
    ((e.pendingLanes |= t), (e.suspendedLanes &= ~t));
    var a = 31 - nt(t);
    ((e.entangledLanes |= t),
      (e.entanglements[a] = e.entanglements[a] | 1073741824 | (l & 4194090)));
  }
  function Es(e, t) {
    var l = (e.entangledLanes |= t);
    for (e = e.entanglements; l; ) {
      var a = 31 - nt(l),
        n = 1 << a;
      ((n & t) | (e[a] & t) && (e[a] |= t), (l &= ~n));
    }
  }
  function $i(e) {
    switch (e) {
      case 2:
        e = 1;
        break;
      case 8:
        e = 4;
        break;
      case 32:
        e = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        e = 128;
        break;
      case 268435456:
        e = 134217728;
        break;
      default:
        e = 0;
    }
    return e;
  }
  function Pi(e) {
    return (
      (e &= -e),
      2 < e ? (8 < e ? ((e & 134217727) !== 0 ? 32 : 268435456) : 8) : 2
    );
  }
  function Ts() {
    var e = B.p;
    return e !== 0 ? e : ((e = window.event), e === void 0 ? 32 : ud(e.type));
  }
  function lh(e, t) {
    var l = B.p;
    try {
      return ((B.p = e), t());
    } finally {
      B.p = l;
    }
  }
  var $t = Math.random().toString(36).slice(2),
    Je = "__reactFiber$" + $t,
    Fe = "__reactProps$" + $t,
    Ll = "__reactContainer$" + $t,
    Fi = "__reactEvents$" + $t,
    ah = "__reactListeners$" + $t,
    nh = "__reactHandles$" + $t,
    As = "__reactResources$" + $t,
    Ua = "__reactMarker$" + $t;
  function Ii(e) {
    (delete e[Je], delete e[Fe], delete e[Fi], delete e[ah], delete e[nh]);
  }
  function Xl(e) {
    var t = e[Je];
    if (t) return t;
    for (var l = e.parentNode; l; ) {
      if ((t = l[Ll] || l[Je])) {
        if (
          ((l = t.alternate),
          t.child !== null || (l !== null && l.child !== null))
        )
          for (e = Vo(e); e !== null; ) {
            if ((l = e[Je])) return l;
            e = Vo(e);
          }
        return t;
      }
      ((e = l), (l = e.parentNode));
    }
    return null;
  }
  function Ql(e) {
    if ((e = e[Je] || e[Ll])) {
      var t = e.tag;
      if (t === 5 || t === 6 || t === 13 || t === 26 || t === 27 || t === 3)
        return e;
    }
    return null;
  }
  function Ra(e) {
    var t = e.tag;
    if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
    throw Error(o(33));
  }
  function Zl(e) {
    var t = e[As];
    return (
      t ||
        (t = e[As] =
          { hoistableStyles: new Map(), hoistableScripts: new Map() }),
      t
    );
  }
  function He(e) {
    e[Ua] = !0;
  }
  var _s = new Set(),
    Ms = {};
  function Sl(e, t) {
    (Vl(e, t), Vl(e + "Capture", t));
  }
  function Vl(e, t) {
    for (Ms[e] = t, e = 0; e < t.length; e++) _s.add(t[e]);
  }
  var ih = RegExp(
      "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$",
    ),
    zs = {},
    Ds = {};
  function uh(e) {
    return C.call(Ds, e)
      ? !0
      : C.call(zs, e)
        ? !1
        : ih.test(e)
          ? (Ds[e] = !0)
          : ((zs[e] = !0), !1);
  }
  function Gn(e, t, l) {
    if (uh(t))
      if (l === null) e.removeAttribute(t);
      else {
        switch (typeof l) {
          case "undefined":
          case "function":
          case "symbol":
            e.removeAttribute(t);
            return;
          case "boolean":
            var a = t.toLowerCase().slice(0, 5);
            if (a !== "data-" && a !== "aria-") {
              e.removeAttribute(t);
              return;
            }
        }
        e.setAttribute(t, "" + l);
      }
  }
  function Hn(e, t, l) {
    if (l === null) e.removeAttribute(t);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(t);
          return;
      }
      e.setAttribute(t, "" + l);
    }
  }
  function Rt(e, t, l, a) {
    if (a === null) e.removeAttribute(l);
    else {
      switch (typeof a) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          e.removeAttribute(l);
          return;
      }
      e.setAttributeNS(t, l, "" + a);
    }
  }
  var eu, Os;
  function Kl(e) {
    if (eu === void 0)
      try {
        throw Error();
      } catch (l) {
        var t = l.stack.trim().match(/\n( *(at )?)/);
        ((eu = (t && t[1]) || ""),
          (Os =
            -1 <
            l.stack.indexOf(`
    at`)
              ? " (<anonymous>)"
              : -1 < l.stack.indexOf("@")
                ? "@unknown:0:0"
                : ""));
      }
    return (
      `
` +
      eu +
      e +
      Os
    );
  }
  var tu = !1;
  function lu(e, t) {
    if (!e || tu) return "";
    tu = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var a = {
        DetermineComponentFrameRoot: function () {
          try {
            if (t) {
              var M = function () {
                throw Error();
              };
              if (
                (Object.defineProperty(M.prototype, "props", {
                  set: function () {
                    throw Error();
                  },
                }),
                typeof Reflect == "object" && Reflect.construct)
              ) {
                try {
                  Reflect.construct(M, []);
                } catch (x) {
                  var p = x;
                }
                Reflect.construct(e, [], M);
              } else {
                try {
                  M.call();
                } catch (x) {
                  p = x;
                }
                e.call(M.prototype);
              }
            } else {
              try {
                throw Error();
              } catch (x) {
                p = x;
              }
              (M = e()) &&
                typeof M.catch == "function" &&
                M.catch(function () {});
            }
          } catch (x) {
            if (x && p && typeof x.stack == "string") return [x.stack, p.stack];
          }
          return [null, null];
        },
      };
      a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var n = Object.getOwnPropertyDescriptor(
        a.DetermineComponentFrameRoot,
        "name",
      );
      n &&
        n.configurable &&
        Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot",
        });
      var i = a.DetermineComponentFrameRoot(),
        c = i[0],
        s = i[1];
      if (c && s) {
        var r = c.split(`
`),
          g = s.split(`
`);
        for (
          n = a = 0;
          a < r.length && !r[a].includes("DetermineComponentFrameRoot");
        )
          a++;
        for (; n < g.length && !g[n].includes("DetermineComponentFrameRoot"); )
          n++;
        if (a === r.length || n === g.length)
          for (
            a = r.length - 1, n = g.length - 1;
            1 <= a && 0 <= n && r[a] !== g[n];
          )
            n--;
        for (; 1 <= a && 0 <= n; a--, n--)
          if (r[a] !== g[n]) {
            if (a !== 1 || n !== 1)
              do
                if ((a--, n--, 0 > n || r[a] !== g[n])) {
                  var N =
                    `
` + r[a].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      N.includes("<anonymous>") &&
                      (N = N.replace("<anonymous>", e.displayName)),
                    N
                  );
                }
              while (1 <= a && 0 <= n);
            break;
          }
      }
    } finally {
      ((tu = !1), (Error.prepareStackTrace = l));
    }
    return (l = e ? e.displayName || e.name : "") ? Kl(l) : "";
  }
  function ch(e) {
    switch (e.tag) {
      case 26:
      case 27:
      case 5:
        return Kl(e.type);
      case 16:
        return Kl("Lazy");
      case 13:
        return Kl("Suspense");
      case 19:
        return Kl("SuspenseList");
      case 0:
      case 15:
        return lu(e.type, !1);
      case 11:
        return lu(e.type.render, !1);
      case 1:
        return lu(e.type, !0);
      case 31:
        return Kl("Activity");
      default:
        return "";
    }
  }
  function Cs(e) {
    try {
      var t = "";
      do ((t += ch(e)), (e = e.return));
      while (e);
      return t;
    } catch (l) {
      return (
        `
Error generating stack: ` +
        l.message +
        `
` +
        l.stack
      );
    }
  }
  function ht(e) {
    switch (typeof e) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function Us(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function sh(e) {
    var t = Us(e) ? "checked" : "value",
      l = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      a = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof l < "u" &&
      typeof l.get == "function" &&
      typeof l.set == "function"
    ) {
      var n = l.get,
        i = l.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return n.call(this);
          },
          set: function (c) {
            ((a = "" + c), i.call(this, c));
          },
        }),
        Object.defineProperty(e, t, { enumerable: l.enumerable }),
        {
          getValue: function () {
            return a;
          },
          setValue: function (c) {
            a = "" + c;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function qn(e) {
    e._valueTracker || (e._valueTracker = sh(e));
  }
  function Rs(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var l = t.getValue(),
      a = "";
    return (
      e && (a = Us(e) ? (e.checked ? "true" : "false") : e.value),
      (e = a),
      e !== l ? (t.setValue(e), !0) : !1
    );
  }
  function wn(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var fh = /[\n"\\]/g;
  function mt(e) {
    return e.replace(fh, function (t) {
      return "\\" + t.charCodeAt(0).toString(16) + " ";
    });
  }
  function au(e, t, l, a, n, i, c, s) {
    ((e.name = ""),
      c != null &&
      typeof c != "function" &&
      typeof c != "symbol" &&
      typeof c != "boolean"
        ? (e.type = c)
        : e.removeAttribute("type"),
      t != null
        ? c === "number"
          ? ((t === 0 && e.value === "") || e.value != t) &&
            (e.value = "" + ht(t))
          : e.value !== "" + ht(t) && (e.value = "" + ht(t))
        : (c !== "submit" && c !== "reset") || e.removeAttribute("value"),
      t != null
        ? nu(e, c, ht(t))
        : l != null
          ? nu(e, c, ht(l))
          : a != null && e.removeAttribute("value"),
      n == null && i != null && (e.defaultChecked = !!i),
      n != null &&
        (e.checked = n && typeof n != "function" && typeof n != "symbol"),
      s != null &&
      typeof s != "function" &&
      typeof s != "symbol" &&
      typeof s != "boolean"
        ? (e.name = "" + ht(s))
        : e.removeAttribute("name"));
  }
  function Bs(e, t, l, a, n, i, c, s) {
    if (
      (i != null &&
        typeof i != "function" &&
        typeof i != "symbol" &&
        typeof i != "boolean" &&
        (e.type = i),
      t != null || l != null)
    ) {
      if (!((i !== "submit" && i !== "reset") || t != null)) return;
      ((l = l != null ? "" + ht(l) : ""),
        (t = t != null ? "" + ht(t) : l),
        s || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((a = a ?? n),
      (a = typeof a != "function" && typeof a != "symbol" && !!a),
      (e.checked = s ? e.checked : !!a),
      (e.defaultChecked = !!a),
      c != null &&
        typeof c != "function" &&
        typeof c != "symbol" &&
        typeof c != "boolean" &&
        (e.name = c));
  }
  function nu(e, t, l) {
    (t === "number" && wn(e.ownerDocument) === e) ||
      e.defaultValue === "" + l ||
      (e.defaultValue = "" + l);
  }
  function kl(e, t, l, a) {
    if (((e = e.options), t)) {
      t = {};
      for (var n = 0; n < l.length; n++) t["$" + l[n]] = !0;
      for (l = 0; l < e.length; l++)
        ((n = t.hasOwnProperty("$" + e[l].value)),
          e[l].selected !== n && (e[l].selected = n),
          n && a && (e[l].defaultSelected = !0));
    } else {
      for (l = "" + ht(l), t = null, n = 0; n < e.length; n++) {
        if (e[n].value === l) {
          ((e[n].selected = !0), a && (e[n].defaultSelected = !0));
          return;
        }
        t !== null || e[n].disabled || (t = e[n]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Gs(e, t, l) {
    if (
      t != null &&
      ((t = "" + ht(t)), t !== e.value && (e.value = t), l == null)
    ) {
      e.defaultValue !== t && (e.defaultValue = t);
      return;
    }
    e.defaultValue = l != null ? "" + ht(l) : "";
  }
  function Hs(e, t, l, a) {
    if (t == null) {
      if (a != null) {
        if (l != null) throw Error(o(92));
        if (Ue(a)) {
          if (1 < a.length) throw Error(o(93));
          a = a[0];
        }
        l = a;
      }
      (l == null && (l = ""), (t = l));
    }
    ((l = ht(t)),
      (e.defaultValue = l),
      (a = e.textContent),
      a === l && a !== "" && a !== null && (e.value = a));
  }
  function Jl(e, t) {
    if (t) {
      var l = e.firstChild;
      if (l && l === e.lastChild && l.nodeType === 3) {
        l.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var rh = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " ",
    ),
  );
  function qs(e, t, l) {
    var a = t.indexOf("--") === 0;
    l == null || typeof l == "boolean" || l === ""
      ? a
        ? e.setProperty(t, "")
        : t === "float"
          ? (e.cssFloat = "")
          : (e[t] = "")
      : a
        ? e.setProperty(t, l)
        : typeof l != "number" || l === 0 || rh.has(t)
          ? t === "float"
            ? (e.cssFloat = l)
            : (e[t] = ("" + l).trim())
          : (e[t] = l + "px");
  }
  function ws(e, t, l) {
    if (t != null && typeof t != "object") throw Error(o(62));
    if (((e = e.style), l != null)) {
      for (var a in l)
        !l.hasOwnProperty(a) ||
          (t != null && t.hasOwnProperty(a)) ||
          (a.indexOf("--") === 0
            ? e.setProperty(a, "")
            : a === "float"
              ? (e.cssFloat = "")
              : (e[a] = ""));
      for (var n in t)
        ((a = t[n]), t.hasOwnProperty(n) && l[n] !== a && qs(e, n, a));
    } else for (var i in t) t.hasOwnProperty(i) && qs(e, i, t[i]);
  }
  function iu(e) {
    if (e.indexOf("-") === -1) return !1;
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var oh = new Map([
      ["acceptCharset", "accept-charset"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
      ["crossOrigin", "crossorigin"],
      ["accentHeight", "accent-height"],
      ["alignmentBaseline", "alignment-baseline"],
      ["arabicForm", "arabic-form"],
      ["baselineShift", "baseline-shift"],
      ["capHeight", "cap-height"],
      ["clipPath", "clip-path"],
      ["clipRule", "clip-rule"],
      ["colorInterpolation", "color-interpolation"],
      ["colorInterpolationFilters", "color-interpolation-filters"],
      ["colorProfile", "color-profile"],
      ["colorRendering", "color-rendering"],
      ["dominantBaseline", "dominant-baseline"],
      ["enableBackground", "enable-background"],
      ["fillOpacity", "fill-opacity"],
      ["fillRule", "fill-rule"],
      ["floodColor", "flood-color"],
      ["floodOpacity", "flood-opacity"],
      ["fontFamily", "font-family"],
      ["fontSize", "font-size"],
      ["fontSizeAdjust", "font-size-adjust"],
      ["fontStretch", "font-stretch"],
      ["fontStyle", "font-style"],
      ["fontVariant", "font-variant"],
      ["fontWeight", "font-weight"],
      ["glyphName", "glyph-name"],
      ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
      ["glyphOrientationVertical", "glyph-orientation-vertical"],
      ["horizAdvX", "horiz-adv-x"],
      ["horizOriginX", "horiz-origin-x"],
      ["imageRendering", "image-rendering"],
      ["letterSpacing", "letter-spacing"],
      ["lightingColor", "lighting-color"],
      ["markerEnd", "marker-end"],
      ["markerMid", "marker-mid"],
      ["markerStart", "marker-start"],
      ["overlinePosition", "overline-position"],
      ["overlineThickness", "overline-thickness"],
      ["paintOrder", "paint-order"],
      ["panose-1", "panose-1"],
      ["pointerEvents", "pointer-events"],
      ["renderingIntent", "rendering-intent"],
      ["shapeRendering", "shape-rendering"],
      ["stopColor", "stop-color"],
      ["stopOpacity", "stop-opacity"],
      ["strikethroughPosition", "strikethrough-position"],
      ["strikethroughThickness", "strikethrough-thickness"],
      ["strokeDasharray", "stroke-dasharray"],
      ["strokeDashoffset", "stroke-dashoffset"],
      ["strokeLinecap", "stroke-linecap"],
      ["strokeLinejoin", "stroke-linejoin"],
      ["strokeMiterlimit", "stroke-miterlimit"],
      ["strokeOpacity", "stroke-opacity"],
      ["strokeWidth", "stroke-width"],
      ["textAnchor", "text-anchor"],
      ["textDecoration", "text-decoration"],
      ["textRendering", "text-rendering"],
      ["transformOrigin", "transform-origin"],
      ["underlinePosition", "underline-position"],
      ["underlineThickness", "underline-thickness"],
      ["unicodeBidi", "unicode-bidi"],
      ["unicodeRange", "unicode-range"],
      ["unitsPerEm", "units-per-em"],
      ["vAlphabetic", "v-alphabetic"],
      ["vHanging", "v-hanging"],
      ["vIdeographic", "v-ideographic"],
      ["vMathematical", "v-mathematical"],
      ["vectorEffect", "vector-effect"],
      ["vertAdvY", "vert-adv-y"],
      ["vertOriginX", "vert-origin-x"],
      ["vertOriginY", "vert-origin-y"],
      ["wordSpacing", "word-spacing"],
      ["writingMode", "writing-mode"],
      ["xmlnsXlink", "xmlns:xlink"],
      ["xHeight", "x-height"],
    ]),
    dh =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function Yn(e) {
    return dh.test("" + e)
      ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')"
      : e;
  }
  var uu = null;
  function cu(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Wl = null,
    $l = null;
  function Ys(e) {
    var t = Ql(e);
    if (t && (e = t.stateNode)) {
      var l = e[Fe] || null;
      e: switch (((e = t.stateNode), t.type)) {
        case "input":
          if (
            (au(
              e,
              l.value,
              l.defaultValue,
              l.defaultValue,
              l.checked,
              l.defaultChecked,
              l.type,
              l.name,
            ),
            (t = l.name),
            l.type === "radio" && t != null)
          ) {
            for (l = e; l.parentNode; ) l = l.parentNode;
            for (
              l = l.querySelectorAll(
                'input[name="' + mt("" + t) + '"][type="radio"]',
              ),
                t = 0;
              t < l.length;
              t++
            ) {
              var a = l[t];
              if (a !== e && a.form === e.form) {
                var n = a[Fe] || null;
                if (!n) throw Error(o(90));
                au(
                  a,
                  n.value,
                  n.defaultValue,
                  n.defaultValue,
                  n.checked,
                  n.defaultChecked,
                  n.type,
                  n.name,
                );
              }
            }
            for (t = 0; t < l.length; t++)
              ((a = l[t]), a.form === e.form && Rs(a));
          }
          break e;
        case "textarea":
          Gs(e, l.value, l.defaultValue);
          break e;
        case "select":
          ((t = l.value), t != null && kl(e, !!l.multiple, t, !1));
      }
    }
  }
  var su = !1;
  function Ls(e, t, l) {
    if (su) return e(t, l);
    su = !0;
    try {
      var a = e(t);
      return a;
    } finally {
      if (
        ((su = !1),
        (Wl !== null || $l !== null) &&
          (Ti(), Wl && ((t = Wl), (e = $l), ($l = Wl = null), Ys(t), e)))
      )
        for (t = 0; t < e.length; t++) Ys(e[t]);
    }
  }
  function Ba(e, t) {
    var l = e.stateNode;
    if (l === null) return null;
    var a = l[Fe] || null;
    if (a === null) return null;
    l = a[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((a = !a.disabled) ||
          ((e = e.type),
          (a = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !a));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (l && typeof l != "function") throw Error(o(231, t, typeof l));
    return l;
  }
  var Bt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    fu = !1;
  if (Bt)
    try {
      var Ga = {};
      (Object.defineProperty(Ga, "passive", {
        get: function () {
          fu = !0;
        },
      }),
        window.addEventListener("test", Ga, Ga),
        window.removeEventListener("test", Ga, Ga));
    } catch {
      fu = !1;
    }
  var Pt = null,
    ru = null,
    Ln = null;
  function Xs() {
    if (Ln) return Ln;
    var e,
      t = ru,
      l = t.length,
      a,
      n = "value" in Pt ? Pt.value : Pt.textContent,
      i = n.length;
    for (e = 0; e < l && t[e] === n[e]; e++);
    var c = l - e;
    for (a = 1; a <= c && t[l - a] === n[i - a]; a++);
    return (Ln = n.slice(e, 1 < a ? 1 - a : void 0));
  }
  function Xn(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Qn() {
    return !0;
  }
  function Qs() {
    return !1;
  }
  function Ie(e) {
    function t(l, a, n, i, c) {
      ((this._reactName = l),
        (this._targetInst = n),
        (this.type = a),
        (this.nativeEvent = i),
        (this.target = c),
        (this.currentTarget = null));
      for (var s in e)
        e.hasOwnProperty(s) && ((l = e[s]), (this[s] = l ? l(i) : i[s]));
      return (
        (this.isDefaultPrevented = (
          i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
        )
          ? Qn
          : Qs),
        (this.isPropagationStopped = Qs),
        this
      );
    }
    return (
      _(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var l = this.nativeEvent;
          l &&
            (l.preventDefault
              ? l.preventDefault()
              : typeof l.returnValue != "unknown" && (l.returnValue = !1),
            (this.isDefaultPrevented = Qn));
        },
        stopPropagation: function () {
          var l = this.nativeEvent;
          l &&
            (l.stopPropagation
              ? l.stopPropagation()
              : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0),
            (this.isPropagationStopped = Qn));
        },
        persist: function () {},
        isPersistent: Qn,
      }),
      t
    );
  }
  var jl = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Zn = Ie(jl),
    Ha = _({}, jl, { view: 0, detail: 0 }),
    hh = Ie(Ha),
    ou,
    du,
    qa,
    Vn = _({}, Ha, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: mu,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== qa &&
              (qa && e.type === "mousemove"
                ? ((ou = e.screenX - qa.screenX), (du = e.screenY - qa.screenY))
                : (du = ou = 0),
              (qa = e)),
            ou);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : du;
      },
    }),
    Zs = Ie(Vn),
    mh = _({}, Vn, { dataTransfer: 0 }),
    vh = Ie(mh),
    yh = _({}, Ha, { relatedTarget: 0 }),
    hu = Ie(yh),
    gh = _({}, jl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    ph = Ie(gh),
    xh = _({}, jl, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    bh = Ie(xh),
    Sh = _({}, jl, { data: 0 }),
    Vs = Ie(Sh),
    jh = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Nh = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Eh = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Th(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Eh[e])
        ? !!t[e]
        : !1;
  }
  function mu() {
    return Th;
  }
  var Ah = _({}, Ha, {
      key: function (e) {
        if (e.key) {
          var t = jh[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Xn(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Nh[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: mu,
      charCode: function (e) {
        return e.type === "keypress" ? Xn(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Xn(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    _h = Ie(Ah),
    Mh = _({}, Vn, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Ks = Ie(Mh),
    zh = _({}, Ha, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: mu,
    }),
    Dh = Ie(zh),
    Oh = _({}, jl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ch = Ie(Oh),
    Uh = _({}, Vn, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Rh = Ie(Uh),
    Bh = _({}, jl, { newState: 0, oldState: 0 }),
    Gh = Ie(Bh),
    Hh = [9, 13, 27, 32],
    vu = Bt && "CompositionEvent" in window,
    wa = null;
  Bt && "documentMode" in document && (wa = document.documentMode);
  var qh = Bt && "TextEvent" in window && !wa,
    ks = Bt && (!vu || (wa && 8 < wa && 11 >= wa)),
    Js = " ",
    Ws = !1;
  function $s(e, t) {
    switch (e) {
      case "keyup":
        return Hh.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Ps(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var Pl = !1;
  function wh(e, t) {
    switch (e) {
      case "compositionend":
        return Ps(t);
      case "keypress":
        return t.which !== 32 ? null : ((Ws = !0), Js);
      case "textInput":
        return ((e = t.data), e === Js && Ws ? null : e);
      default:
        return null;
    }
  }
  function Yh(e, t) {
    if (Pl)
      return e === "compositionend" || (!vu && $s(e, t))
        ? ((e = Xs()), (Ln = ru = Pt = null), (Pl = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return ks && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Lh = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Fs(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Lh[e.type] : t === "textarea";
  }
  function Is(e, t, l, a) {
    (Wl ? ($l ? $l.push(a) : ($l = [a])) : (Wl = a),
      (t = Oi(t, "onChange")),
      0 < t.length &&
        ((l = new Zn("onChange", "change", null, l, a)),
        e.push({ event: l, listeners: t })));
  }
  var Ya = null,
    La = null;
  function Xh(e) {
    Bo(e, 0);
  }
  function Kn(e) {
    var t = Ra(e);
    if (Rs(t)) return e;
  }
  function ef(e, t) {
    if (e === "change") return t;
  }
  var tf = !1;
  if (Bt) {
    var yu;
    if (Bt) {
      var gu = "oninput" in document;
      if (!gu) {
        var lf = document.createElement("div");
        (lf.setAttribute("oninput", "return;"),
          (gu = typeof lf.oninput == "function"));
      }
      yu = gu;
    } else yu = !1;
    tf = yu && (!document.documentMode || 9 < document.documentMode);
  }
  function af() {
    Ya && (Ya.detachEvent("onpropertychange", nf), (La = Ya = null));
  }
  function nf(e) {
    if (e.propertyName === "value" && Kn(La)) {
      var t = [];
      (Is(t, La, e, cu(e)), Ls(Xh, t));
    }
  }
  function Qh(e, t, l) {
    e === "focusin"
      ? (af(), (Ya = t), (La = l), Ya.attachEvent("onpropertychange", nf))
      : e === "focusout" && af();
  }
  function Zh(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Kn(La);
  }
  function Vh(e, t) {
    if (e === "click") return Kn(t);
  }
  function Kh(e, t) {
    if (e === "input" || e === "change") return Kn(t);
  }
  function kh(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var it = typeof Object.is == "function" ? Object.is : kh;
  function Xa(e, t) {
    if (it(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var l = Object.keys(e),
      a = Object.keys(t);
    if (l.length !== a.length) return !1;
    for (a = 0; a < l.length; a++) {
      var n = l[a];
      if (!C.call(t, n) || !it(e[n], t[n])) return !1;
    }
    return !0;
  }
  function uf(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function cf(e, t) {
    var l = uf(e);
    e = 0;
    for (var a; l; ) {
      if (l.nodeType === 3) {
        if (((a = e + l.textContent.length), e <= t && a >= t))
          return { node: l, offset: t - e };
        e = a;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = uf(l);
    }
  }
  function sf(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? sf(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function ff(e) {
    e =
      e != null &&
      e.ownerDocument != null &&
      e.ownerDocument.defaultView != null
        ? e.ownerDocument.defaultView
        : window;
    for (var t = wn(e.document); t instanceof e.HTMLIFrameElement; ) {
      try {
        var l = typeof t.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) e = t.contentWindow;
      else break;
      t = wn(e.document);
    }
    return t;
  }
  function pu(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  var Jh = Bt && "documentMode" in document && 11 >= document.documentMode,
    Fl = null,
    xu = null,
    Qa = null,
    bu = !1;
  function rf(e, t, l) {
    var a =
      l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    bu ||
      Fl == null ||
      Fl !== wn(a) ||
      ((a = Fl),
      "selectionStart" in a && pu(a)
        ? (a = { start: a.selectionStart, end: a.selectionEnd })
        : ((a = (
            (a.ownerDocument && a.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (a = {
            anchorNode: a.anchorNode,
            anchorOffset: a.anchorOffset,
            focusNode: a.focusNode,
            focusOffset: a.focusOffset,
          })),
      (Qa && Xa(Qa, a)) ||
        ((Qa = a),
        (a = Oi(xu, "onSelect")),
        0 < a.length &&
          ((t = new Zn("onSelect", "select", null, t, l)),
          e.push({ event: t, listeners: a }),
          (t.target = Fl))));
  }
  function Nl(e, t) {
    var l = {};
    return (
      (l[e.toLowerCase()] = t.toLowerCase()),
      (l["Webkit" + e] = "webkit" + t),
      (l["Moz" + e] = "moz" + t),
      l
    );
  }
  var Il = {
      animationend: Nl("Animation", "AnimationEnd"),
      animationiteration: Nl("Animation", "AnimationIteration"),
      animationstart: Nl("Animation", "AnimationStart"),
      transitionrun: Nl("Transition", "TransitionRun"),
      transitionstart: Nl("Transition", "TransitionStart"),
      transitioncancel: Nl("Transition", "TransitionCancel"),
      transitionend: Nl("Transition", "TransitionEnd"),
    },
    Su = {},
    of = {};
  Bt &&
    ((of = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Il.animationend.animation,
      delete Il.animationiteration.animation,
      delete Il.animationstart.animation),
    "TransitionEvent" in window || delete Il.transitionend.transition);
  function El(e) {
    if (Su[e]) return Su[e];
    if (!Il[e]) return e;
    var t = Il[e],
      l;
    for (l in t) if (t.hasOwnProperty(l) && l in of) return (Su[e] = t[l]);
    return e;
  }
  var df = El("animationend"),
    hf = El("animationiteration"),
    mf = El("animationstart"),
    Wh = El("transitionrun"),
    $h = El("transitionstart"),
    Ph = El("transitioncancel"),
    vf = El("transitionend"),
    yf = new Map(),
    ju =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " ",
      );
  ju.push("scrollEnd");
  function jt(e, t) {
    (yf.set(e, t), Sl(t, [e]));
  }
  var gf = new WeakMap();
  function vt(e, t) {
    if (typeof e == "object" && e !== null) {
      var l = gf.get(e);
      return l !== void 0
        ? l
        : ((t = { value: e, source: t, stack: Cs(t) }), gf.set(e, t), t);
    }
    return { value: e, source: t, stack: Cs(t) };
  }
  var yt = [],
    ea = 0,
    Nu = 0;
  function kn() {
    for (var e = ea, t = (Nu = ea = 0); t < e; ) {
      var l = yt[t];
      yt[t++] = null;
      var a = yt[t];
      yt[t++] = null;
      var n = yt[t];
      yt[t++] = null;
      var i = yt[t];
      if (((yt[t++] = null), a !== null && n !== null)) {
        var c = a.pending;
        (c === null ? (n.next = n) : ((n.next = c.next), (c.next = n)),
          (a.pending = n));
      }
      i !== 0 && pf(l, n, i);
    }
  }
  function Jn(e, t, l, a) {
    ((yt[ea++] = e),
      (yt[ea++] = t),
      (yt[ea++] = l),
      (yt[ea++] = a),
      (Nu |= a),
      (e.lanes |= a),
      (e = e.alternate),
      e !== null && (e.lanes |= a));
  }
  function Eu(e, t, l, a) {
    return (Jn(e, t, l, a), Wn(e));
  }
  function ta(e, t) {
    return (Jn(e, null, null, t), Wn(e));
  }
  function pf(e, t, l) {
    e.lanes |= l;
    var a = e.alternate;
    a !== null && (a.lanes |= l);
    for (var n = !1, i = e.return; i !== null; )
      ((i.childLanes |= l),
        (a = i.alternate),
        a !== null && (a.childLanes |= l),
        i.tag === 22 &&
          ((e = i.stateNode), e === null || e._visibility & 1 || (n = !0)),
        (e = i),
        (i = i.return));
    return e.tag === 3
      ? ((i = e.stateNode),
        n &&
          t !== null &&
          ((n = 31 - nt(l)),
          (e = i.hiddenUpdates),
          (a = e[n]),
          a === null ? (e[n] = [t]) : a.push(t),
          (t.lane = l | 536870912)),
        i)
      : null;
  }
  function Wn(e) {
    if (50 < vn) throw ((vn = 0), (Dc = null), Error(o(185)));
    for (var t = e.return; t !== null; ) ((e = t), (t = e.return));
    return e.tag === 3 ? e.stateNode : null;
  }
  var la = {};
  function Fh(e, t, l, a) {
    ((this.tag = e),
      (this.key = l),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.refCleanup = this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = a),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function ut(e, t, l, a) {
    return new Fh(e, t, l, a);
  }
  function Tu(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Gt(e, t) {
    var l = e.alternate;
    return (
      l === null
        ? ((l = ut(e.tag, t, e.key, e.mode)),
          (l.elementType = e.elementType),
          (l.type = e.type),
          (l.stateNode = e.stateNode),
          (l.alternate = e),
          (e.alternate = l))
        : ((l.pendingProps = t),
          (l.type = e.type),
          (l.flags = 0),
          (l.subtreeFlags = 0),
          (l.deletions = null)),
      (l.flags = e.flags & 65011712),
      (l.childLanes = e.childLanes),
      (l.lanes = e.lanes),
      (l.child = e.child),
      (l.memoizedProps = e.memoizedProps),
      (l.memoizedState = e.memoizedState),
      (l.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (l.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (l.sibling = e.sibling),
      (l.index = e.index),
      (l.ref = e.ref),
      (l.refCleanup = e.refCleanup),
      l
    );
  }
  function xf(e, t) {
    e.flags &= 65011714;
    var l = e.alternate;
    return (
      l === null
        ? ((e.childLanes = 0),
          (e.lanes = t),
          (e.child = null),
          (e.subtreeFlags = 0),
          (e.memoizedProps = null),
          (e.memoizedState = null),
          (e.updateQueue = null),
          (e.dependencies = null),
          (e.stateNode = null))
        : ((e.childLanes = l.childLanes),
          (e.lanes = l.lanes),
          (e.child = l.child),
          (e.subtreeFlags = 0),
          (e.deletions = null),
          (e.memoizedProps = l.memoizedProps),
          (e.memoizedState = l.memoizedState),
          (e.updateQueue = l.updateQueue),
          (e.type = l.type),
          (t = l.dependencies),
          (e.dependencies =
            t === null
              ? null
              : { lanes: t.lanes, firstContext: t.firstContext })),
      e
    );
  }
  function $n(e, t, l, a, n, i) {
    var c = 0;
    if (((a = e), typeof e == "function")) Tu(e) && (c = 1);
    else if (typeof e == "string")
      c = e1(e, l, K.current)
        ? 26
        : e === "html" || e === "head" || e === "body"
          ? 27
          : 5;
    else
      e: switch (e) {
        case Ke:
          return (
            (e = ut(31, l, t, n)),
            (e.elementType = Ke),
            (e.lanes = i),
            e
          );
        case L:
          return Tl(l.children, n, i, t);
        case P:
          ((c = 8), (n |= 24));
          break;
        case F:
          return (
            (e = ut(12, l, t, n | 2)),
            (e.elementType = F),
            (e.lanes = i),
            e
          );
        case le:
          return (
            (e = ut(13, l, t, n)),
            (e.elementType = le),
            (e.lanes = i),
            e
          );
        case Ge:
          return (
            (e = ut(19, l, t, n)),
            (e.elementType = Ge),
            (e.lanes = i),
            e
          );
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Y:
              case je:
                c = 10;
                break e;
              case De:
                c = 9;
                break e;
              case Le:
                c = 11;
                break e;
              case Te:
                c = 14;
                break e;
              case Oe:
                ((c = 16), (a = null));
                break e;
            }
          ((c = 29),
            (l = Error(o(130, e === null ? "null" : typeof e, ""))),
            (a = null));
      }
    return (
      (t = ut(c, l, t, n)),
      (t.elementType = e),
      (t.type = a),
      (t.lanes = i),
      t
    );
  }
  function Tl(e, t, l, a) {
    return ((e = ut(7, e, a, t)), (e.lanes = l), e);
  }
  function Au(e, t, l) {
    return ((e = ut(6, e, null, t)), (e.lanes = l), e);
  }
  function _u(e, t, l) {
    return (
      (t = ut(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = l),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  var aa = [],
    na = 0,
    Pn = null,
    Fn = 0,
    gt = [],
    pt = 0,
    Al = null,
    Ht = 1,
    qt = "";
  function _l(e, t) {
    ((aa[na++] = Fn), (aa[na++] = Pn), (Pn = e), (Fn = t));
  }
  function bf(e, t, l) {
    ((gt[pt++] = Ht), (gt[pt++] = qt), (gt[pt++] = Al), (Al = e));
    var a = Ht;
    e = qt;
    var n = 32 - nt(a) - 1;
    ((a &= ~(1 << n)), (l += 1));
    var i = 32 - nt(t) + n;
    if (30 < i) {
      var c = n - (n % 5);
      ((i = (a & ((1 << c) - 1)).toString(32)),
        (a >>= c),
        (n -= c),
        (Ht = (1 << (32 - nt(t) + n)) | (l << n) | a),
        (qt = i + e));
    } else ((Ht = (1 << i) | (l << n) | a), (qt = e));
  }
  function Mu(e) {
    e.return !== null && (_l(e, 1), bf(e, 1, 0));
  }
  function zu(e) {
    for (; e === Pn; )
      ((Pn = aa[--na]), (aa[na] = null), (Fn = aa[--na]), (aa[na] = null));
    for (; e === Al; )
      ((Al = gt[--pt]),
        (gt[pt] = null),
        (qt = gt[--pt]),
        (gt[pt] = null),
        (Ht = gt[--pt]),
        (gt[pt] = null));
  }
  var Pe = null,
    Ne = null,
    fe = !1,
    Ml = null,
    _t = !1,
    Du = Error(o(519));
  function zl(e) {
    var t = Error(o(418, ""));
    throw (Ka(vt(t, e)), Du);
  }
  function Sf(e) {
    var t = e.stateNode,
      l = e.type,
      a = e.memoizedProps;
    switch (((t[Je] = e), (t[Fe] = a), l)) {
      case "dialog":
        (ie("cancel", t), ie("close", t));
        break;
      case "iframe":
      case "object":
      case "embed":
        ie("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < gn.length; l++) ie(gn[l], t);
        break;
      case "source":
        ie("error", t);
        break;
      case "img":
      case "image":
      case "link":
        (ie("error", t), ie("load", t));
        break;
      case "details":
        ie("toggle", t);
        break;
      case "input":
        (ie("invalid", t),
          Bs(
            t,
            a.value,
            a.defaultValue,
            a.checked,
            a.defaultChecked,
            a.type,
            a.name,
            !0,
          ),
          qn(t));
        break;
      case "select":
        ie("invalid", t);
        break;
      case "textarea":
        (ie("invalid", t), Hs(t, a.value, a.defaultValue, a.children), qn(t));
    }
    ((l = a.children),
      (typeof l != "string" && typeof l != "number" && typeof l != "bigint") ||
      t.textContent === "" + l ||
      a.suppressHydrationWarning === !0 ||
      wo(t.textContent, l)
        ? (a.popover != null && (ie("beforetoggle", t), ie("toggle", t)),
          a.onScroll != null && ie("scroll", t),
          a.onScrollEnd != null && ie("scrollend", t),
          a.onClick != null && (t.onclick = Ci),
          (t = !0))
        : (t = !1),
      t || zl(e));
  }
  function jf(e) {
    for (Pe = e.return; Pe; )
      switch (Pe.tag) {
        case 5:
        case 13:
          _t = !1;
          return;
        case 27:
        case 3:
          _t = !0;
          return;
        default:
          Pe = Pe.return;
      }
  }
  function Za(e) {
    if (e !== Pe) return !1;
    if (!fe) return (jf(e), (fe = !0), !1);
    var t = e.tag,
      l;
    if (
      ((l = t !== 3 && t !== 27) &&
        ((l = t === 5) &&
          ((l = e.type),
          (l =
            !(l !== "form" && l !== "button") || Kc(e.type, e.memoizedProps))),
        (l = !l)),
      l && Ne && zl(e),
      jf(e),
      t === 13)
    ) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(o(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8)
            if (((l = e.data), l === "/$")) {
              if (t === 0) {
                Ne = Et(e.nextSibling);
                break e;
              }
              t--;
            } else (l !== "$" && l !== "$!" && l !== "$?") || t++;
          e = e.nextSibling;
        }
        Ne = null;
      }
    } else
      t === 27
        ? ((t = Ne), hl(e.type) ? ((e = $c), ($c = null), (Ne = e)) : (Ne = t))
        : (Ne = Pe ? Et(e.stateNode.nextSibling) : null);
    return !0;
  }
  function Va() {
    ((Ne = Pe = null), (fe = !1));
  }
  function Nf() {
    var e = Ml;
    return (
      e !== null &&
        (lt === null ? (lt = e) : lt.push.apply(lt, e), (Ml = null)),
      e
    );
  }
  function Ka(e) {
    Ml === null ? (Ml = [e]) : Ml.push(e);
  }
  var Ou = z(null),
    Dl = null,
    wt = null;
  function Ft(e, t, l) {
    (R(Ou, t._currentValue), (t._currentValue = l));
  }
  function Yt(e) {
    ((e._currentValue = Ou.current), G(Ou));
  }
  function Cu(e, t, l) {
    for (; e !== null; ) {
      var a = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), a !== null && (a.childLanes |= t))
          : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t),
        e === l)
      )
        break;
      e = e.return;
    }
  }
  function Uu(e, t, l, a) {
    var n = e.child;
    for (n !== null && (n.return = e); n !== null; ) {
      var i = n.dependencies;
      if (i !== null) {
        var c = n.child;
        i = i.firstContext;
        e: for (; i !== null; ) {
          var s = i;
          i = n;
          for (var r = 0; r < t.length; r++)
            if (s.context === t[r]) {
              ((i.lanes |= l),
                (s = i.alternate),
                s !== null && (s.lanes |= l),
                Cu(i.return, l, e),
                a || (c = null));
              break e;
            }
          i = s.next;
        }
      } else if (n.tag === 18) {
        if (((c = n.return), c === null)) throw Error(o(341));
        ((c.lanes |= l),
          (i = c.alternate),
          i !== null && (i.lanes |= l),
          Cu(c, l, e),
          (c = null));
      } else c = n.child;
      if (c !== null) c.return = n;
      else
        for (c = n; c !== null; ) {
          if (c === e) {
            c = null;
            break;
          }
          if (((n = c.sibling), n !== null)) {
            ((n.return = c.return), (c = n));
            break;
          }
          c = c.return;
        }
      n = c;
    }
  }
  function ka(e, t, l, a) {
    e = null;
    for (var n = t, i = !1; n !== null; ) {
      if (!i) {
        if ((n.flags & 524288) !== 0) i = !0;
        else if ((n.flags & 262144) !== 0) break;
      }
      if (n.tag === 10) {
        var c = n.alternate;
        if (c === null) throw Error(o(387));
        if (((c = c.memoizedProps), c !== null)) {
          var s = n.type;
          it(n.pendingProps.value, c.value) ||
            (e !== null ? e.push(s) : (e = [s]));
        }
      } else if (n === ke.current) {
        if (((c = n.alternate), c === null)) throw Error(o(387));
        c.memoizedState.memoizedState !== n.memoizedState.memoizedState &&
          (e !== null ? e.push(Nn) : (e = [Nn]));
      }
      n = n.return;
    }
    (e !== null && Uu(t, e, l, a), (t.flags |= 262144));
  }
  function In(e) {
    for (e = e.firstContext; e !== null; ) {
      if (!it(e.context._currentValue, e.memoizedValue)) return !0;
      e = e.next;
    }
    return !1;
  }
  function Ol(e) {
    ((Dl = e),
      (wt = null),
      (e = e.dependencies),
      e !== null && (e.firstContext = null));
  }
  function We(e) {
    return Ef(Dl, e);
  }
  function ei(e, t) {
    return (Dl === null && Ol(e), Ef(e, t));
  }
  function Ef(e, t) {
    var l = t._currentValue;
    if (((t = { context: t, memoizedValue: l, next: null }), wt === null)) {
      if (e === null) throw Error(o(308));
      ((wt = t),
        (e.dependencies = { lanes: 0, firstContext: t }),
        (e.flags |= 524288));
    } else wt = wt.next = t;
    return l;
  }
  var Ih =
      typeof AbortController < "u"
        ? AbortController
        : function () {
            var e = [],
              t = (this.signal = {
                aborted: !1,
                addEventListener: function (l, a) {
                  e.push(a);
                },
              });
            this.abort = function () {
              ((t.aborted = !0),
                e.forEach(function (l) {
                  return l();
                }));
            };
          },
    e0 = f.unstable_scheduleCallback,
    t0 = f.unstable_NormalPriority,
    Re = {
      $$typeof: je,
      Consumer: null,
      Provider: null,
      _currentValue: null,
      _currentValue2: null,
      _threadCount: 0,
    };
  function Ru() {
    return { controller: new Ih(), data: new Map(), refCount: 0 };
  }
  function Ja(e) {
    (e.refCount--,
      e.refCount === 0 &&
        e0(t0, function () {
          e.controller.abort();
        }));
  }
  var Wa = null,
    Bu = 0,
    ia = 0,
    ua = null;
  function l0(e, t) {
    if (Wa === null) {
      var l = (Wa = []);
      ((Bu = 0),
        (ia = Hc()),
        (ua = {
          status: "pending",
          value: void 0,
          then: function (a) {
            l.push(a);
          },
        }));
    }
    return (Bu++, t.then(Tf, Tf), t);
  }
  function Tf() {
    if (--Bu === 0 && Wa !== null) {
      ua !== null && (ua.status = "fulfilled");
      var e = Wa;
      ((Wa = null), (ia = 0), (ua = null));
      for (var t = 0; t < e.length; t++) (0, e[t])();
    }
  }
  function a0(e, t) {
    var l = [],
      a = {
        status: "pending",
        value: null,
        reason: null,
        then: function (n) {
          l.push(n);
        },
      };
    return (
      e.then(
        function () {
          ((a.status = "fulfilled"), (a.value = t));
          for (var n = 0; n < l.length; n++) (0, l[n])(t);
        },
        function (n) {
          for (a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)
            (0, l[n])(void 0);
        },
      ),
      a
    );
  }
  var Af = j.S;
  j.S = function (e, t) {
    (typeof t == "object" &&
      t !== null &&
      typeof t.then == "function" &&
      l0(e, t),
      Af !== null && Af(e, t));
  };
  var Cl = z(null);
  function Gu() {
    var e = Cl.current;
    return e !== null ? e : xe.pooledCache;
  }
  function ti(e, t) {
    t === null ? R(Cl, Cl.current) : R(Cl, t.pool);
  }
  function _f() {
    var e = Gu();
    return e === null ? null : { parent: Re._currentValue, pool: e };
  }
  var $a = Error(o(460)),
    Mf = Error(o(474)),
    li = Error(o(542)),
    Hu = { then: function () {} };
  function zf(e) {
    return ((e = e.status), e === "fulfilled" || e === "rejected");
  }
  function ai() {}
  function Df(e, t, l) {
    switch (
      ((l = e[l]),
      l === void 0 ? e.push(t) : l !== t && (t.then(ai, ai), (t = l)),
      t.status)
    ) {
      case "fulfilled":
        return t.value;
      case "rejected":
        throw ((e = t.reason), Cf(e), e);
      default:
        if (typeof t.status == "string") t.then(ai, ai);
        else {
          if (((e = xe), e !== null && 100 < e.shellSuspendCounter))
            throw Error(o(482));
          ((e = t),
            (e.status = "pending"),
            e.then(
              function (a) {
                if (t.status === "pending") {
                  var n = t;
                  ((n.status = "fulfilled"), (n.value = a));
                }
              },
              function (a) {
                if (t.status === "pending") {
                  var n = t;
                  ((n.status = "rejected"), (n.reason = a));
                }
              },
            ));
        }
        switch (t.status) {
          case "fulfilled":
            return t.value;
          case "rejected":
            throw ((e = t.reason), Cf(e), e);
        }
        throw ((Pa = t), $a);
    }
  }
  var Pa = null;
  function Of() {
    if (Pa === null) throw Error(o(459));
    var e = Pa;
    return ((Pa = null), e);
  }
  function Cf(e) {
    if (e === $a || e === li) throw Error(o(483));
  }
  var It = !1;
  function qu(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null,
    };
  }
  function wu(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          callbacks: null,
        }));
  }
  function el(e) {
    return { lane: e, tag: 0, payload: null, callback: null, next: null };
  }
  function tl(e, t, l) {
    var a = e.updateQueue;
    if (a === null) return null;
    if (((a = a.shared), (oe & 2) !== 0)) {
      var n = a.pending;
      return (
        n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
        (a.pending = t),
        (t = Wn(e)),
        pf(e, null, l),
        t
      );
    }
    return (Jn(e, a, t, l), Wn(e));
  }
  function Fa(e, t, l) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (l & 4194048) !== 0))
    ) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (l |= a), (t.lanes = l), Es(e, l));
    }
  }
  function Yu(e, t) {
    var l = e.updateQueue,
      a = e.alternate;
    if (a !== null && ((a = a.updateQueue), l === a)) {
      var n = null,
        i = null;
      if (((l = l.firstBaseUpdate), l !== null)) {
        do {
          var c = {
            lane: l.lane,
            tag: l.tag,
            payload: l.payload,
            callback: null,
            next: null,
          };
          (i === null ? (n = i = c) : (i = i.next = c), (l = l.next));
        } while (l !== null);
        i === null ? (n = i = t) : (i = i.next = t);
      } else n = i = t;
      ((l = {
        baseState: a.baseState,
        firstBaseUpdate: n,
        lastBaseUpdate: i,
        shared: a.shared,
        callbacks: a.callbacks,
      }),
        (e.updateQueue = l));
      return;
    }
    ((e = l.lastBaseUpdate),
      e === null ? (l.firstBaseUpdate = t) : (e.next = t),
      (l.lastBaseUpdate = t));
  }
  var Lu = !1;
  function Ia() {
    if (Lu) {
      var e = ua;
      if (e !== null) throw e;
    }
  }
  function en(e, t, l, a) {
    Lu = !1;
    var n = e.updateQueue;
    It = !1;
    var i = n.firstBaseUpdate,
      c = n.lastBaseUpdate,
      s = n.shared.pending;
    if (s !== null) {
      n.shared.pending = null;
      var r = s,
        g = r.next;
      ((r.next = null), c === null ? (i = g) : (c.next = g), (c = r));
      var N = e.alternate;
      N !== null &&
        ((N = N.updateQueue),
        (s = N.lastBaseUpdate),
        s !== c &&
          (s === null ? (N.firstBaseUpdate = g) : (s.next = g),
          (N.lastBaseUpdate = r)));
    }
    if (i !== null) {
      var M = n.baseState;
      ((c = 0), (N = g = r = null), (s = i));
      do {
        var p = s.lane & -536870913,
          x = p !== s.lane;
        if (x ? (ue & p) === p : (a & p) === p) {
          (p !== 0 && p === ia && (Lu = !0),
            N !== null &&
              (N = N.next =
                {
                  lane: 0,
                  tag: s.tag,
                  payload: s.payload,
                  callback: null,
                  next: null,
                }));
          e: {
            var $ = e,
              k = s;
            p = t;
            var ve = l;
            switch (k.tag) {
              case 1:
                if ((($ = k.payload), typeof $ == "function")) {
                  M = $.call(ve, M, p);
                  break e;
                }
                M = $;
                break e;
              case 3:
                $.flags = ($.flags & -65537) | 128;
              case 0:
                if (
                  (($ = k.payload),
                  (p = typeof $ == "function" ? $.call(ve, M, p) : $),
                  p == null)
                )
                  break e;
                M = _({}, M, p);
                break e;
              case 2:
                It = !0;
            }
          }
          ((p = s.callback),
            p !== null &&
              ((e.flags |= 64),
              x && (e.flags |= 8192),
              (x = n.callbacks),
              x === null ? (n.callbacks = [p]) : x.push(p)));
        } else
          ((x = {
            lane: p,
            tag: s.tag,
            payload: s.payload,
            callback: s.callback,
            next: null,
          }),
            N === null ? ((g = N = x), (r = M)) : (N = N.next = x),
            (c |= p));
        if (((s = s.next), s === null)) {
          if (((s = n.shared.pending), s === null)) break;
          ((x = s),
            (s = x.next),
            (x.next = null),
            (n.lastBaseUpdate = x),
            (n.shared.pending = null));
        }
      } while (!0);
      (N === null && (r = M),
        (n.baseState = r),
        (n.firstBaseUpdate = g),
        (n.lastBaseUpdate = N),
        i === null && (n.shared.lanes = 0),
        (fl |= c),
        (e.lanes = c),
        (e.memoizedState = M));
    }
  }
  function Uf(e, t) {
    if (typeof e != "function") throw Error(o(191, e));
    e.call(t);
  }
  function Rf(e, t) {
    var l = e.callbacks;
    if (l !== null)
      for (e.callbacks = null, e = 0; e < l.length; e++) Uf(l[e], t);
  }
  var ca = z(null),
    ni = z(0);
  function Bf(e, t) {
    ((e = kt), R(ni, e), R(ca, t), (kt = e | t.baseLanes));
  }
  function Xu() {
    (R(ni, kt), R(ca, ca.current));
  }
  function Qu() {
    ((kt = ni.current), G(ca), G(ni));
  }
  var ll = 0,
    te = null,
    he = null,
    Me = null,
    ii = !1,
    sa = !1,
    Ul = !1,
    ui = 0,
    tn = 0,
    fa = null,
    n0 = 0;
  function Ae() {
    throw Error(o(321));
  }
  function Zu(e, t) {
    if (t === null) return !1;
    for (var l = 0; l < t.length && l < e.length; l++)
      if (!it(e[l], t[l])) return !1;
    return !0;
  }
  function Vu(e, t, l, a, n, i) {
    return (
      (ll = i),
      (te = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (j.H = e === null || e.memoizedState === null ? pr : xr),
      (Ul = !1),
      (i = l(a, n)),
      (Ul = !1),
      sa && (i = Hf(t, l, a, n)),
      Gf(e),
      i
    );
  }
  function Gf(e) {
    j.H = di;
    var t = he !== null && he.next !== null;
    if (((ll = 0), (Me = he = te = null), (ii = !1), (tn = 0), (fa = null), t))
      throw Error(o(300));
    e === null ||
      qe ||
      ((e = e.dependencies), e !== null && In(e) && (qe = !0));
  }
  function Hf(e, t, l, a) {
    te = e;
    var n = 0;
    do {
      if ((sa && (fa = null), (tn = 0), (sa = !1), 25 <= n))
        throw Error(o(301));
      if (((n += 1), (Me = he = null), e.updateQueue != null)) {
        var i = e.updateQueue;
        ((i.lastEffect = null),
          (i.events = null),
          (i.stores = null),
          i.memoCache != null && (i.memoCache.index = 0));
      }
      ((j.H = o0), (i = t(l, a)));
    } while (sa);
    return i;
  }
  function i0() {
    var e = j.H,
      t = e.useState()[0];
    return (
      (t = typeof t.then == "function" ? ln(t) : t),
      (e = e.useState()[0]),
      (he !== null ? he.memoizedState : null) !== e && (te.flags |= 1024),
      t
    );
  }
  function Ku() {
    var e = ui !== 0;
    return ((ui = 0), e);
  }
  function ku(e, t, l) {
    ((t.updateQueue = e.updateQueue), (t.flags &= -2053), (e.lanes &= ~l));
  }
  function Ju(e) {
    if (ii) {
      for (e = e.memoizedState; e !== null; ) {
        var t = e.queue;
        (t !== null && (t.pending = null), (e = e.next));
      }
      ii = !1;
    }
    ((ll = 0), (Me = he = te = null), (sa = !1), (tn = ui = 0), (fa = null));
  }
  function et() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Me === null ? (te.memoizedState = Me = e) : (Me = Me.next = e), Me);
  }
  function ze() {
    if (he === null) {
      var e = te.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = he.next;
    var t = Me === null ? te.memoizedState : Me.next;
    if (t !== null) ((Me = t), (he = e));
    else {
      if (e === null)
        throw te.alternate === null ? Error(o(467)) : Error(o(310));
      ((he = e),
        (e = {
          memoizedState: he.memoizedState,
          baseState: he.baseState,
          baseQueue: he.baseQueue,
          queue: he.queue,
          next: null,
        }),
        Me === null ? (te.memoizedState = Me = e) : (Me = Me.next = e));
    }
    return Me;
  }
  function Wu() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ln(e) {
    var t = tn;
    return (
      (tn += 1),
      fa === null && (fa = []),
      (e = Df(fa, e, t)),
      (t = te),
      (Me === null ? t.memoizedState : Me.next) === null &&
        ((t = t.alternate),
        (j.H = t === null || t.memoizedState === null ? pr : xr)),
      e
    );
  }
  function ci(e) {
    if (e !== null && typeof e == "object") {
      if (typeof e.then == "function") return ln(e);
      if (e.$$typeof === je) return We(e);
    }
    throw Error(o(438, String(e)));
  }
  function $u(e) {
    var t = null,
      l = te.updateQueue;
    if ((l !== null && (t = l.memoCache), t == null)) {
      var a = te.alternate;
      a !== null &&
        ((a = a.updateQueue),
        a !== null &&
          ((a = a.memoCache),
          a != null &&
            (t = {
              data: a.data.map(function (n) {
                return n.slice();
              }),
              index: 0,
            })));
    }
    if (
      (t == null && (t = { data: [], index: 0 }),
      l === null && ((l = Wu()), (te.updateQueue = l)),
      (l.memoCache = t),
      (l = t.data[t.index]),
      l === void 0)
    )
      for (l = t.data[t.index] = Array(e), a = 0; a < e; a++) l[a] = Ct;
    return (t.index++, l);
  }
  function Lt(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function si(e) {
    var t = ze();
    return Pu(t, he, e);
  }
  function Pu(e, t, l) {
    var a = e.queue;
    if (a === null) throw Error(o(311));
    a.lastRenderedReducer = l;
    var n = e.baseQueue,
      i = a.pending;
    if (i !== null) {
      if (n !== null) {
        var c = n.next;
        ((n.next = i.next), (i.next = c));
      }
      ((t.baseQueue = n = i), (a.pending = null));
    }
    if (((i = e.baseState), n === null)) e.memoizedState = i;
    else {
      t = n.next;
      var s = (c = null),
        r = null,
        g = t,
        N = !1;
      do {
        var M = g.lane & -536870913;
        if (M !== g.lane ? (ue & M) === M : (ll & M) === M) {
          var p = g.revertLane;
          if (p === 0)
            (r !== null &&
              (r = r.next =
                {
                  lane: 0,
                  revertLane: 0,
                  action: g.action,
                  hasEagerState: g.hasEagerState,
                  eagerState: g.eagerState,
                  next: null,
                }),
              M === ia && (N = !0));
          else if ((ll & p) === p) {
            ((g = g.next), p === ia && (N = !0));
            continue;
          } else
            ((M = {
              lane: 0,
              revertLane: g.revertLane,
              action: g.action,
              hasEagerState: g.hasEagerState,
              eagerState: g.eagerState,
              next: null,
            }),
              r === null ? ((s = r = M), (c = i)) : (r = r.next = M),
              (te.lanes |= p),
              (fl |= p));
          ((M = g.action),
            Ul && l(i, M),
            (i = g.hasEagerState ? g.eagerState : l(i, M)));
        } else
          ((p = {
            lane: M,
            revertLane: g.revertLane,
            action: g.action,
            hasEagerState: g.hasEagerState,
            eagerState: g.eagerState,
            next: null,
          }),
            r === null ? ((s = r = p), (c = i)) : (r = r.next = p),
            (te.lanes |= M),
            (fl |= M));
        g = g.next;
      } while (g !== null && g !== t);
      if (
        (r === null ? (c = i) : (r.next = s),
        !it(i, e.memoizedState) && ((qe = !0), N && ((l = ua), l !== null)))
      )
        throw l;
      ((e.memoizedState = i),
        (e.baseState = c),
        (e.baseQueue = r),
        (a.lastRenderedState = i));
    }
    return (n === null && (a.lanes = 0), [e.memoizedState, a.dispatch]);
  }
  function Fu(e) {
    var t = ze(),
      l = t.queue;
    if (l === null) throw Error(o(311));
    l.lastRenderedReducer = e;
    var a = l.dispatch,
      n = l.pending,
      i = t.memoizedState;
    if (n !== null) {
      l.pending = null;
      var c = (n = n.next);
      do ((i = e(i, c.action)), (c = c.next));
      while (c !== n);
      (it(i, t.memoizedState) || (qe = !0),
        (t.memoizedState = i),
        t.baseQueue === null && (t.baseState = i),
        (l.lastRenderedState = i));
    }
    return [i, a];
  }
  function qf(e, t, l) {
    var a = te,
      n = ze(),
      i = fe;
    if (i) {
      if (l === void 0) throw Error(o(407));
      l = l();
    } else l = t();
    var c = !it((he || n).memoizedState, l);
    (c && ((n.memoizedState = l), (qe = !0)), (n = n.queue));
    var s = Lf.bind(null, a, n, e);
    if (
      (an(2048, 8, s, [e]),
      n.getSnapshot !== t || c || (Me !== null && Me.memoizedState.tag & 1))
    ) {
      if (
        ((a.flags |= 2048),
        ra(9, fi(), Yf.bind(null, a, n, l, t), null),
        xe === null)
      )
        throw Error(o(349));
      i || (ll & 124) !== 0 || wf(a, t, l);
    }
    return l;
  }
  function wf(e, t, l) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: l }),
      (t = te.updateQueue),
      t === null
        ? ((t = Wu()), (te.updateQueue = t), (t.stores = [e]))
        : ((l = t.stores), l === null ? (t.stores = [e]) : l.push(e)));
  }
  function Yf(e, t, l, a) {
    ((t.value = l), (t.getSnapshot = a), Xf(t) && Qf(e));
  }
  function Lf(e, t, l) {
    return l(function () {
      Xf(t) && Qf(e);
    });
  }
  function Xf(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var l = t();
      return !it(e, l);
    } catch {
      return !0;
    }
  }
  function Qf(e) {
    var t = ta(e, 2);
    t !== null && ot(t, e, 2);
  }
  function Iu(e) {
    var t = et();
    if (typeof e == "function") {
      var l = e;
      if (((e = l()), Ul)) {
        Wt(!0);
        try {
          l();
        } finally {
          Wt(!1);
        }
      }
    }
    return (
      (t.memoizedState = t.baseState = e),
      (t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Lt,
        lastRenderedState: e,
      }),
      t
    );
  }
  function Zf(e, t, l, a) {
    return ((e.baseState = l), Pu(e, he, typeof a == "function" ? a : Lt));
  }
  function u0(e, t, l, a, n) {
    if (oi(e)) throw Error(o(485));
    if (((e = t.action), e !== null)) {
      var i = {
        payload: n,
        action: e,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function (c) {
          i.listeners.push(c);
        },
      };
      (j.T !== null ? l(!0) : (i.isTransition = !1),
        a(i),
        (l = t.pending),
        l === null
          ? ((i.next = t.pending = i), Vf(t, i))
          : ((i.next = l.next), (t.pending = l.next = i)));
    }
  }
  function Vf(e, t) {
    var l = t.action,
      a = t.payload,
      n = e.state;
    if (t.isTransition) {
      var i = j.T,
        c = {};
      j.T = c;
      try {
        var s = l(n, a),
          r = j.S;
        (r !== null && r(c, s), Kf(e, t, s));
      } catch (g) {
        ec(e, t, g);
      } finally {
        j.T = i;
      }
    } else
      try {
        ((i = l(n, a)), Kf(e, t, i));
      } catch (g) {
        ec(e, t, g);
      }
  }
  function Kf(e, t, l) {
    l !== null && typeof l == "object" && typeof l.then == "function"
      ? l.then(
          function (a) {
            kf(e, t, a);
          },
          function (a) {
            return ec(e, t, a);
          },
        )
      : kf(e, t, l);
  }
  function kf(e, t, l) {
    ((t.status = "fulfilled"),
      (t.value = l),
      Jf(t),
      (e.state = l),
      (t = e.pending),
      t !== null &&
        ((l = t.next),
        l === t ? (e.pending = null) : ((l = l.next), (t.next = l), Vf(e, l))));
  }
  function ec(e, t, l) {
    var a = e.pending;
    if (((e.pending = null), a !== null)) {
      a = a.next;
      do ((t.status = "rejected"), (t.reason = l), Jf(t), (t = t.next));
      while (t !== a);
    }
    e.action = null;
  }
  function Jf(e) {
    e = e.listeners;
    for (var t = 0; t < e.length; t++) (0, e[t])();
  }
  function Wf(e, t) {
    return t;
  }
  function $f(e, t) {
    if (fe) {
      var l = xe.formState;
      if (l !== null) {
        e: {
          var a = te;
          if (fe) {
            if (Ne) {
              t: {
                for (var n = Ne, i = _t; n.nodeType !== 8; ) {
                  if (!i) {
                    n = null;
                    break t;
                  }
                  if (((n = Et(n.nextSibling)), n === null)) {
                    n = null;
                    break t;
                  }
                }
                ((i = n.data), (n = i === "F!" || i === "F" ? n : null));
              }
              if (n) {
                ((Ne = Et(n.nextSibling)), (a = n.data === "F!"));
                break e;
              }
            }
            zl(a);
          }
          a = !1;
        }
        a && (t = l[0]);
      }
    }
    return (
      (l = et()),
      (l.memoizedState = l.baseState = t),
      (a = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Wf,
        lastRenderedState: t,
      }),
      (l.queue = a),
      (l = vr.bind(null, te, a)),
      (a.dispatch = l),
      (a = Iu(!1)),
      (i = ic.bind(null, te, !1, a.queue)),
      (a = et()),
      (n = { state: t, dispatch: null, action: e, pending: null }),
      (a.queue = n),
      (l = u0.bind(null, te, n, i, l)),
      (n.dispatch = l),
      (a.memoizedState = e),
      [t, l, !1]
    );
  }
  function Pf(e) {
    var t = ze();
    return Ff(t, he, e);
  }
  function Ff(e, t, l) {
    if (
      ((t = Pu(e, t, Wf)[0]),
      (e = si(Lt)[0]),
      typeof t == "object" && t !== null && typeof t.then == "function")
    )
      try {
        var a = ln(t);
      } catch (c) {
        throw c === $a ? li : c;
      }
    else a = t;
    t = ze();
    var n = t.queue,
      i = n.dispatch;
    return (
      l !== t.memoizedState &&
        ((te.flags |= 2048), ra(9, fi(), c0.bind(null, n, l), null)),
      [a, i, e]
    );
  }
  function c0(e, t) {
    e.action = t;
  }
  function If(e) {
    var t = ze(),
      l = he;
    if (l !== null) return Ff(t, l, e);
    (ze(), (t = t.memoizedState), (l = ze()));
    var a = l.queue.dispatch;
    return ((l.memoizedState = e), [t, a, !1]);
  }
  function ra(e, t, l, a) {
    return (
      (e = { tag: e, create: l, deps: a, inst: t, next: null }),
      (t = te.updateQueue),
      t === null && ((t = Wu()), (te.updateQueue = t)),
      (l = t.lastEffect),
      l === null
        ? (t.lastEffect = e.next = e)
        : ((a = l.next), (l.next = e), (e.next = a), (t.lastEffect = e)),
      e
    );
  }
  function fi() {
    return { destroy: void 0, resource: void 0 };
  }
  function er() {
    return ze().memoizedState;
  }
  function ri(e, t, l, a) {
    var n = et();
    ((a = a === void 0 ? null : a),
      (te.flags |= e),
      (n.memoizedState = ra(1 | t, fi(), l, a)));
  }
  function an(e, t, l, a) {
    var n = ze();
    a = a === void 0 ? null : a;
    var i = n.memoizedState.inst;
    he !== null && a !== null && Zu(a, he.memoizedState.deps)
      ? (n.memoizedState = ra(t, i, l, a))
      : ((te.flags |= e), (n.memoizedState = ra(1 | t, i, l, a)));
  }
  function tr(e, t) {
    ri(8390656, 8, e, t);
  }
  function lr(e, t) {
    an(2048, 8, e, t);
  }
  function ar(e, t) {
    return an(4, 2, e, t);
  }
  function nr(e, t) {
    return an(4, 4, e, t);
  }
  function ir(e, t) {
    if (typeof t == "function") {
      e = e();
      var l = t(e);
      return function () {
        typeof l == "function" ? l() : t(null);
      };
    }
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function ur(e, t, l) {
    ((l = l != null ? l.concat([e]) : null), an(4, 4, ir.bind(null, t, e), l));
  }
  function tc() {}
  function cr(e, t) {
    var l = ze();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    return t !== null && Zu(t, a[1]) ? a[0] : ((l.memoizedState = [e, t]), e);
  }
  function sr(e, t) {
    var l = ze();
    t = t === void 0 ? null : t;
    var a = l.memoizedState;
    if (t !== null && Zu(t, a[1])) return a[0];
    if (((a = e()), Ul)) {
      Wt(!0);
      try {
        e();
      } finally {
        Wt(!1);
      }
    }
    return ((l.memoizedState = [a, t]), a);
  }
  function lc(e, t, l) {
    return l === void 0 || (ll & 1073741824) !== 0
      ? (e.memoizedState = t)
      : ((e.memoizedState = l), (e = oo()), (te.lanes |= e), (fl |= e), l);
  }
  function fr(e, t, l, a) {
    return it(l, t)
      ? l
      : ca.current !== null
        ? ((e = lc(e, l, a)), it(e, t) || (qe = !0), e)
        : (ll & 42) === 0
          ? ((qe = !0), (e.memoizedState = l))
          : ((e = oo()), (te.lanes |= e), (fl |= e), t);
  }
  function rr(e, t, l, a, n) {
    var i = B.p;
    B.p = i !== 0 && 8 > i ? i : 8;
    var c = j.T,
      s = {};
    ((j.T = s), ic(e, !1, t, l));
    try {
      var r = n(),
        g = j.S;
      if (
        (g !== null && g(s, r),
        r !== null && typeof r == "object" && typeof r.then == "function")
      ) {
        var N = a0(r, a);
        nn(e, t, N, rt(e));
      } else nn(e, t, a, rt(e));
    } catch (M) {
      nn(e, t, { then: function () {}, status: "rejected", reason: M }, rt());
    } finally {
      ((B.p = i), (j.T = c));
    }
  }
  function s0() {}
  function ac(e, t, l, a) {
    if (e.tag !== 5) throw Error(o(476));
    var n = or(e).queue;
    rr(
      e,
      n,
      t,
      Q,
      l === null
        ? s0
        : function () {
            return (dr(e), l(a));
          },
    );
  }
  function or(e) {
    var t = e.memoizedState;
    if (t !== null) return t;
    t = {
      memoizedState: Q,
      baseState: Q,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Lt,
        lastRenderedState: Q,
      },
      next: null,
    };
    var l = {};
    return (
      (t.next = {
        memoizedState: l,
        baseState: l,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: Lt,
          lastRenderedState: l,
        },
        next: null,
      }),
      (e.memoizedState = t),
      (e = e.alternate),
      e !== null && (e.memoizedState = t),
      t
    );
  }
  function dr(e) {
    var t = or(e).next.queue;
    nn(e, t, {}, rt());
  }
  function nc() {
    return We(Nn);
  }
  function hr() {
    return ze().memoizedState;
  }
  function mr() {
    return ze().memoizedState;
  }
  function f0(e) {
    for (var t = e.return; t !== null; ) {
      switch (t.tag) {
        case 24:
        case 3:
          var l = rt();
          e = el(l);
          var a = tl(t, e, l);
          (a !== null && (ot(a, t, l), Fa(a, t, l)),
            (t = { cache: Ru() }),
            (e.payload = t));
          return;
      }
      t = t.return;
    }
  }
  function r0(e, t, l) {
    var a = rt();
    ((l = {
      lane: a,
      revertLane: 0,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
      oi(e)
        ? yr(t, l)
        : ((l = Eu(e, t, l, a)), l !== null && (ot(l, e, a), gr(l, t, a))));
  }
  function vr(e, t, l) {
    var a = rt();
    nn(e, t, l, a);
  }
  function nn(e, t, l, a) {
    var n = {
      lane: a,
      revertLane: 0,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    };
    if (oi(e)) yr(t, n);
    else {
      var i = e.alternate;
      if (
        e.lanes === 0 &&
        (i === null || i.lanes === 0) &&
        ((i = t.lastRenderedReducer), i !== null)
      )
        try {
          var c = t.lastRenderedState,
            s = i(c, l);
          if (((n.hasEagerState = !0), (n.eagerState = s), it(s, c)))
            return (Jn(e, t, n, 0), xe === null && kn(), !1);
        } catch {}
      if (((l = Eu(e, t, n, a)), l !== null))
        return (ot(l, e, a), gr(l, t, a), !0);
    }
    return !1;
  }
  function ic(e, t, l, a) {
    if (
      ((a = {
        lane: 2,
        revertLane: Hc(),
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      oi(e))
    ) {
      if (t) throw Error(o(479));
    } else ((t = Eu(e, l, a, 2)), t !== null && ot(t, e, 2));
  }
  function oi(e) {
    var t = e.alternate;
    return e === te || (t !== null && t === te);
  }
  function yr(e, t) {
    sa = ii = !0;
    var l = e.pending;
    (l === null ? (t.next = t) : ((t.next = l.next), (l.next = t)),
      (e.pending = t));
  }
  function gr(e, t, l) {
    if ((l & 4194048) !== 0) {
      var a = t.lanes;
      ((a &= e.pendingLanes), (l |= a), (t.lanes = l), Es(e, l));
    }
  }
  var di = {
      readContext: We,
      use: ci,
      useCallback: Ae,
      useContext: Ae,
      useEffect: Ae,
      useImperativeHandle: Ae,
      useLayoutEffect: Ae,
      useInsertionEffect: Ae,
      useMemo: Ae,
      useReducer: Ae,
      useRef: Ae,
      useState: Ae,
      useDebugValue: Ae,
      useDeferredValue: Ae,
      useTransition: Ae,
      useSyncExternalStore: Ae,
      useId: Ae,
      useHostTransitionStatus: Ae,
      useFormState: Ae,
      useActionState: Ae,
      useOptimistic: Ae,
      useMemoCache: Ae,
      useCacheRefresh: Ae,
    },
    pr = {
      readContext: We,
      use: ci,
      useCallback: function (e, t) {
        return ((et().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: We,
      useEffect: tr,
      useImperativeHandle: function (e, t, l) {
        ((l = l != null ? l.concat([e]) : null),
          ri(4194308, 4, ir.bind(null, t, e), l));
      },
      useLayoutEffect: function (e, t) {
        return ri(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        ri(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var l = et();
        t = t === void 0 ? null : t;
        var a = e();
        if (Ul) {
          Wt(!0);
          try {
            e();
          } finally {
            Wt(!1);
          }
        }
        return ((l.memoizedState = [a, t]), a);
      },
      useReducer: function (e, t, l) {
        var a = et();
        if (l !== void 0) {
          var n = l(t);
          if (Ul) {
            Wt(!0);
            try {
              l(t);
            } finally {
              Wt(!1);
            }
          }
        } else n = t;
        return (
          (a.memoizedState = a.baseState = n),
          (e = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: n,
          }),
          (a.queue = e),
          (e = e.dispatch = r0.bind(null, te, e)),
          [a.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = et();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: function (e) {
        e = Iu(e);
        var t = e.queue,
          l = vr.bind(null, te, t);
        return ((t.dispatch = l), [e.memoizedState, l]);
      },
      useDebugValue: tc,
      useDeferredValue: function (e, t) {
        var l = et();
        return lc(l, e, t);
      },
      useTransition: function () {
        var e = Iu(!1);
        return (
          (e = rr.bind(null, te, e.queue, !0, !1)),
          (et().memoizedState = e),
          [!1, e]
        );
      },
      useSyncExternalStore: function (e, t, l) {
        var a = te,
          n = et();
        if (fe) {
          if (l === void 0) throw Error(o(407));
          l = l();
        } else {
          if (((l = t()), xe === null)) throw Error(o(349));
          (ue & 124) !== 0 || wf(a, t, l);
        }
        n.memoizedState = l;
        var i = { value: l, getSnapshot: t };
        return (
          (n.queue = i),
          tr(Lf.bind(null, a, i, e), [e]),
          (a.flags |= 2048),
          ra(9, fi(), Yf.bind(null, a, i, l, t), null),
          l
        );
      },
      useId: function () {
        var e = et(),
          t = xe.identifierPrefix;
        if (fe) {
          var l = qt,
            a = Ht;
          ((l = (a & ~(1 << (32 - nt(a) - 1))).toString(32) + l),
            (t = "«" + t + "R" + l),
            (l = ui++),
            0 < l && (t += "H" + l.toString(32)),
            (t += "»"));
        } else ((l = n0++), (t = "«" + t + "r" + l.toString(32) + "»"));
        return (e.memoizedState = t);
      },
      useHostTransitionStatus: nc,
      useFormState: $f,
      useActionState: $f,
      useOptimistic: function (e) {
        var t = et();
        t.memoizedState = t.baseState = e;
        var l = {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: null,
          lastRenderedState: null,
        };
        return (
          (t.queue = l),
          (t = ic.bind(null, te, !0, l)),
          (l.dispatch = t),
          [e, t]
        );
      },
      useMemoCache: $u,
      useCacheRefresh: function () {
        return (et().memoizedState = f0.bind(null, te));
      },
    },
    xr = {
      readContext: We,
      use: ci,
      useCallback: cr,
      useContext: We,
      useEffect: lr,
      useImperativeHandle: ur,
      useInsertionEffect: ar,
      useLayoutEffect: nr,
      useMemo: sr,
      useReducer: si,
      useRef: er,
      useState: function () {
        return si(Lt);
      },
      useDebugValue: tc,
      useDeferredValue: function (e, t) {
        var l = ze();
        return fr(l, he.memoizedState, e, t);
      },
      useTransition: function () {
        var e = si(Lt)[0],
          t = ze().memoizedState;
        return [typeof e == "boolean" ? e : ln(e), t];
      },
      useSyncExternalStore: qf,
      useId: hr,
      useHostTransitionStatus: nc,
      useFormState: Pf,
      useActionState: Pf,
      useOptimistic: function (e, t) {
        var l = ze();
        return Zf(l, he, e, t);
      },
      useMemoCache: $u,
      useCacheRefresh: mr,
    },
    o0 = {
      readContext: We,
      use: ci,
      useCallback: cr,
      useContext: We,
      useEffect: lr,
      useImperativeHandle: ur,
      useInsertionEffect: ar,
      useLayoutEffect: nr,
      useMemo: sr,
      useReducer: Fu,
      useRef: er,
      useState: function () {
        return Fu(Lt);
      },
      useDebugValue: tc,
      useDeferredValue: function (e, t) {
        var l = ze();
        return he === null ? lc(l, e, t) : fr(l, he.memoizedState, e, t);
      },
      useTransition: function () {
        var e = Fu(Lt)[0],
          t = ze().memoizedState;
        return [typeof e == "boolean" ? e : ln(e), t];
      },
      useSyncExternalStore: qf,
      useId: hr,
      useHostTransitionStatus: nc,
      useFormState: If,
      useActionState: If,
      useOptimistic: function (e, t) {
        var l = ze();
        return he !== null
          ? Zf(l, he, e, t)
          : ((l.baseState = e), [e, l.queue.dispatch]);
      },
      useMemoCache: $u,
      useCacheRefresh: mr,
    },
    oa = null,
    un = 0;
  function hi(e) {
    var t = un;
    return ((un += 1), oa === null && (oa = []), Df(oa, e, t));
  }
  function cn(e, t) {
    ((t = t.props.ref), (e.ref = t !== void 0 ? t : null));
  }
  function mi(e, t) {
    throw t.$$typeof === O
      ? Error(o(525))
      : ((e = Object.prototype.toString.call(t)),
        Error(
          o(
            31,
            e === "[object Object]"
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : e,
          ),
        ));
  }
  function br(e) {
    var t = e._init;
    return t(e._payload);
  }
  function Sr(e) {
    function t(v, h) {
      if (e) {
        var y = v.deletions;
        y === null ? ((v.deletions = [h]), (v.flags |= 16)) : y.push(h);
      }
    }
    function l(v, h) {
      if (!e) return null;
      for (; h !== null; ) (t(v, h), (h = h.sibling));
      return null;
    }
    function a(v) {
      for (var h = new Map(); v !== null; )
        (v.key !== null ? h.set(v.key, v) : h.set(v.index, v), (v = v.sibling));
      return h;
    }
    function n(v, h) {
      return ((v = Gt(v, h)), (v.index = 0), (v.sibling = null), v);
    }
    function i(v, h, y) {
      return (
        (v.index = y),
        e
          ? ((y = v.alternate),
            y !== null
              ? ((y = y.index), y < h ? ((v.flags |= 67108866), h) : y)
              : ((v.flags |= 67108866), h))
          : ((v.flags |= 1048576), h)
      );
    }
    function c(v) {
      return (e && v.alternate === null && (v.flags |= 67108866), v);
    }
    function s(v, h, y, E) {
      return h === null || h.tag !== 6
        ? ((h = Au(y, v.mode, E)), (h.return = v), h)
        : ((h = n(h, y)), (h.return = v), h);
    }
    function r(v, h, y, E) {
      var w = y.type;
      return w === L
        ? N(v, h, y.props.children, E, y.key)
        : h !== null &&
            (h.elementType === w ||
              (typeof w == "object" &&
                w !== null &&
                w.$$typeof === Oe &&
                br(w) === h.type))
          ? ((h = n(h, y.props)), cn(h, y), (h.return = v), h)
          : ((h = $n(y.type, y.key, y.props, null, v.mode, E)),
            cn(h, y),
            (h.return = v),
            h);
    }
    function g(v, h, y, E) {
      return h === null ||
        h.tag !== 4 ||
        h.stateNode.containerInfo !== y.containerInfo ||
        h.stateNode.implementation !== y.implementation
        ? ((h = _u(y, v.mode, E)), (h.return = v), h)
        : ((h = n(h, y.children || [])), (h.return = v), h);
    }
    function N(v, h, y, E, w) {
      return h === null || h.tag !== 7
        ? ((h = Tl(y, v.mode, E, w)), (h.return = v), h)
        : ((h = n(h, y)), (h.return = v), h);
    }
    function M(v, h, y) {
      if (
        (typeof h == "string" && h !== "") ||
        typeof h == "number" ||
        typeof h == "bigint"
      )
        return ((h = Au("" + h, v.mode, y)), (h.return = v), h);
      if (typeof h == "object" && h !== null) {
        switch (h.$$typeof) {
          case X:
            return (
              (y = $n(h.type, h.key, h.props, null, v.mode, y)),
              cn(y, h),
              (y.return = v),
              y
            );
          case H:
            return ((h = _u(h, v.mode, y)), (h.return = v), h);
          case Oe:
            var E = h._init;
            return ((h = E(h._payload)), M(v, h, y));
        }
        if (Ue(h) || Ce(h))
          return ((h = Tl(h, v.mode, y, null)), (h.return = v), h);
        if (typeof h.then == "function") return M(v, hi(h), y);
        if (h.$$typeof === je) return M(v, ei(v, h), y);
        mi(v, h);
      }
      return null;
    }
    function p(v, h, y, E) {
      var w = h !== null ? h.key : null;
      if (
        (typeof y == "string" && y !== "") ||
        typeof y == "number" ||
        typeof y == "bigint"
      )
        return w !== null ? null : s(v, h, "" + y, E);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case X:
            return y.key === w ? r(v, h, y, E) : null;
          case H:
            return y.key === w ? g(v, h, y, E) : null;
          case Oe:
            return ((w = y._init), (y = w(y._payload)), p(v, h, y, E));
        }
        if (Ue(y) || Ce(y)) return w !== null ? null : N(v, h, y, E, null);
        if (typeof y.then == "function") return p(v, h, hi(y), E);
        if (y.$$typeof === je) return p(v, h, ei(v, y), E);
        mi(v, y);
      }
      return null;
    }
    function x(v, h, y, E, w) {
      if (
        (typeof E == "string" && E !== "") ||
        typeof E == "number" ||
        typeof E == "bigint"
      )
        return ((v = v.get(y) || null), s(h, v, "" + E, w));
      if (typeof E == "object" && E !== null) {
        switch (E.$$typeof) {
          case X:
            return (
              (v = v.get(E.key === null ? y : E.key) || null),
              r(h, v, E, w)
            );
          case H:
            return (
              (v = v.get(E.key === null ? y : E.key) || null),
              g(h, v, E, w)
            );
          case Oe:
            var ae = E._init;
            return ((E = ae(E._payload)), x(v, h, y, E, w));
        }
        if (Ue(E) || Ce(E))
          return ((v = v.get(y) || null), N(h, v, E, w, null));
        if (typeof E.then == "function") return x(v, h, y, hi(E), w);
        if (E.$$typeof === je) return x(v, h, y, ei(h, E), w);
        mi(h, E);
      }
      return null;
    }
    function $(v, h, y, E) {
      for (
        var w = null, ae = null, V = h, J = (h = 0), Ye = null;
        V !== null && J < y.length;
        J++
      ) {
        V.index > J ? ((Ye = V), (V = null)) : (Ye = V.sibling);
        var se = p(v, V, y[J], E);
        if (se === null) {
          V === null && (V = Ye);
          break;
        }
        (e && V && se.alternate === null && t(v, V),
          (h = i(se, h, J)),
          ae === null ? (w = se) : (ae.sibling = se),
          (ae = se),
          (V = Ye));
      }
      if (J === y.length) return (l(v, V), fe && _l(v, J), w);
      if (V === null) {
        for (; J < y.length; J++)
          ((V = M(v, y[J], E)),
            V !== null &&
              ((h = i(V, h, J)),
              ae === null ? (w = V) : (ae.sibling = V),
              (ae = V)));
        return (fe && _l(v, J), w);
      }
      for (V = a(V); J < y.length; J++)
        ((Ye = x(V, v, J, y[J], E)),
          Ye !== null &&
            (e &&
              Ye.alternate !== null &&
              V.delete(Ye.key === null ? J : Ye.key),
            (h = i(Ye, h, J)),
            ae === null ? (w = Ye) : (ae.sibling = Ye),
            (ae = Ye)));
      return (
        e &&
          V.forEach(function (pl) {
            return t(v, pl);
          }),
        fe && _l(v, J),
        w
      );
    }
    function k(v, h, y, E) {
      if (y == null) throw Error(o(151));
      for (
        var w = null, ae = null, V = h, J = (h = 0), Ye = null, se = y.next();
        V !== null && !se.done;
        J++, se = y.next()
      ) {
        V.index > J ? ((Ye = V), (V = null)) : (Ye = V.sibling);
        var pl = p(v, V, se.value, E);
        if (pl === null) {
          V === null && (V = Ye);
          break;
        }
        (e && V && pl.alternate === null && t(v, V),
          (h = i(pl, h, J)),
          ae === null ? (w = pl) : (ae.sibling = pl),
          (ae = pl),
          (V = Ye));
      }
      if (se.done) return (l(v, V), fe && _l(v, J), w);
      if (V === null) {
        for (; !se.done; J++, se = y.next())
          ((se = M(v, se.value, E)),
            se !== null &&
              ((h = i(se, h, J)),
              ae === null ? (w = se) : (ae.sibling = se),
              (ae = se)));
        return (fe && _l(v, J), w);
      }
      for (V = a(V); !se.done; J++, se = y.next())
        ((se = x(V, v, J, se.value, E)),
          se !== null &&
            (e &&
              se.alternate !== null &&
              V.delete(se.key === null ? J : se.key),
            (h = i(se, h, J)),
            ae === null ? (w = se) : (ae.sibling = se),
            (ae = se)));
      return (
        e &&
          V.forEach(function (d1) {
            return t(v, d1);
          }),
        fe && _l(v, J),
        w
      );
    }
    function ve(v, h, y, E) {
      if (
        (typeof y == "object" &&
          y !== null &&
          y.type === L &&
          y.key === null &&
          (y = y.props.children),
        typeof y == "object" && y !== null)
      ) {
        switch (y.$$typeof) {
          case X:
            e: {
              for (var w = y.key; h !== null; ) {
                if (h.key === w) {
                  if (((w = y.type), w === L)) {
                    if (h.tag === 7) {
                      (l(v, h.sibling),
                        (E = n(h, y.props.children)),
                        (E.return = v),
                        (v = E));
                      break e;
                    }
                  } else if (
                    h.elementType === w ||
                    (typeof w == "object" &&
                      w !== null &&
                      w.$$typeof === Oe &&
                      br(w) === h.type)
                  ) {
                    (l(v, h.sibling),
                      (E = n(h, y.props)),
                      cn(E, y),
                      (E.return = v),
                      (v = E));
                    break e;
                  }
                  l(v, h);
                  break;
                } else t(v, h);
                h = h.sibling;
              }
              y.type === L
                ? ((E = Tl(y.props.children, v.mode, E, y.key)),
                  (E.return = v),
                  (v = E))
                : ((E = $n(y.type, y.key, y.props, null, v.mode, E)),
                  cn(E, y),
                  (E.return = v),
                  (v = E));
            }
            return c(v);
          case H:
            e: {
              for (w = y.key; h !== null; ) {
                if (h.key === w)
                  if (
                    h.tag === 4 &&
                    h.stateNode.containerInfo === y.containerInfo &&
                    h.stateNode.implementation === y.implementation
                  ) {
                    (l(v, h.sibling),
                      (E = n(h, y.children || [])),
                      (E.return = v),
                      (v = E));
                    break e;
                  } else {
                    l(v, h);
                    break;
                  }
                else t(v, h);
                h = h.sibling;
              }
              ((E = _u(y, v.mode, E)), (E.return = v), (v = E));
            }
            return c(v);
          case Oe:
            return ((w = y._init), (y = w(y._payload)), ve(v, h, y, E));
        }
        if (Ue(y)) return $(v, h, y, E);
        if (Ce(y)) {
          if (((w = Ce(y)), typeof w != "function")) throw Error(o(150));
          return ((y = w.call(y)), k(v, h, y, E));
        }
        if (typeof y.then == "function") return ve(v, h, hi(y), E);
        if (y.$$typeof === je) return ve(v, h, ei(v, y), E);
        mi(v, y);
      }
      return (typeof y == "string" && y !== "") ||
        typeof y == "number" ||
        typeof y == "bigint"
        ? ((y = "" + y),
          h !== null && h.tag === 6
            ? (l(v, h.sibling), (E = n(h, y)), (E.return = v), (v = E))
            : (l(v, h), (E = Au(y, v.mode, E)), (E.return = v), (v = E)),
          c(v))
        : l(v, h);
    }
    return function (v, h, y, E) {
      try {
        un = 0;
        var w = ve(v, h, y, E);
        return ((oa = null), w);
      } catch (V) {
        if (V === $a || V === li) throw V;
        var ae = ut(29, V, null, v.mode);
        return ((ae.lanes = E), (ae.return = v), ae);
      }
    };
  }
  var da = Sr(!0),
    jr = Sr(!1),
    xt = z(null),
    Mt = null;
  function al(e) {
    var t = e.alternate;
    (R(Be, Be.current & 1),
      R(xt, e),
      Mt === null &&
        (t === null || ca.current !== null || t.memoizedState !== null) &&
        (Mt = e));
  }
  function Nr(e) {
    if (e.tag === 22) {
      if ((R(Be, Be.current), R(xt, e), Mt === null)) {
        var t = e.alternate;
        t !== null && t.memoizedState !== null && (Mt = e);
      }
    } else nl();
  }
  function nl() {
    (R(Be, Be.current), R(xt, xt.current));
  }
  function Xt(e) {
    (G(xt), Mt === e && (Mt = null), G(Be));
  }
  var Be = z(0);
  function vi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var l = t.memoizedState;
        if (
          l !== null &&
          ((l = l.dehydrated), l === null || l.data === "$?" || Wc(l))
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  function uc(e, t, l, a) {
    ((t = e.memoizedState),
      (l = l(a, t)),
      (l = l == null ? t : _({}, t, l)),
      (e.memoizedState = l),
      e.lanes === 0 && (e.updateQueue.baseState = l));
  }
  var cc = {
    enqueueSetState: function (e, t, l) {
      e = e._reactInternals;
      var a = rt(),
        n = el(a);
      ((n.payload = t),
        l != null && (n.callback = l),
        (t = tl(e, n, a)),
        t !== null && (ot(t, e, a), Fa(t, e, a)));
    },
    enqueueReplaceState: function (e, t, l) {
      e = e._reactInternals;
      var a = rt(),
        n = el(a);
      ((n.tag = 1),
        (n.payload = t),
        l != null && (n.callback = l),
        (t = tl(e, n, a)),
        t !== null && (ot(t, e, a), Fa(t, e, a)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var l = rt(),
        a = el(l);
      ((a.tag = 2),
        t != null && (a.callback = t),
        (t = tl(e, a, l)),
        t !== null && (ot(t, e, l), Fa(t, e, l)));
    },
  };
  function Er(e, t, l, a, n, i, c) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(a, i, c)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Xa(l, a) || !Xa(n, i)
          : !0
    );
  }
  function Tr(e, t, l, a) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(l, a),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(l, a),
      t.state !== e && cc.enqueueReplaceState(t, t.state, null));
  }
  function Rl(e, t) {
    var l = t;
    if ("ref" in t) {
      l = {};
      for (var a in t) a !== "ref" && (l[a] = t[a]);
    }
    if ((e = e.defaultProps)) {
      l === t && (l = _({}, l));
      for (var n in e) l[n] === void 0 && (l[n] = e[n]);
    }
    return l;
  }
  var yi =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          if (
            typeof window == "object" &&
            typeof window.ErrorEvent == "function"
          ) {
            var t = new window.ErrorEvent("error", {
              bubbles: !0,
              cancelable: !0,
              message:
                typeof e == "object" &&
                e !== null &&
                typeof e.message == "string"
                  ? String(e.message)
                  : String(e),
              error: e,
            });
            if (!window.dispatchEvent(t)) return;
          } else if (
            typeof process == "object" &&
            typeof process.emit == "function"
          ) {
            process.emit("uncaughtException", e);
            return;
          }
          console.error(e);
        };
  function Ar(e) {
    yi(e);
  }
  function _r(e) {
    console.error(e);
  }
  function Mr(e) {
    yi(e);
  }
  function gi(e, t) {
    try {
      var l = e.onUncaughtError;
      l(t.value, { componentStack: t.stack });
    } catch (a) {
      setTimeout(function () {
        throw a;
      });
    }
  }
  function zr(e, t, l) {
    try {
      var a = e.onCaughtError;
      a(l.value, {
        componentStack: l.stack,
        errorBoundary: t.tag === 1 ? t.stateNode : null,
      });
    } catch (n) {
      setTimeout(function () {
        throw n;
      });
    }
  }
  function sc(e, t, l) {
    return (
      (l = el(l)),
      (l.tag = 3),
      (l.payload = { element: null }),
      (l.callback = function () {
        gi(e, t);
      }),
      l
    );
  }
  function Dr(e) {
    return ((e = el(e)), (e.tag = 3), e);
  }
  function Or(e, t, l, a) {
    var n = l.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var i = a.value;
      ((e.payload = function () {
        return n(i);
      }),
        (e.callback = function () {
          zr(t, l, a);
        }));
    }
    var c = l.stateNode;
    c !== null &&
      typeof c.componentDidCatch == "function" &&
      (e.callback = function () {
        (zr(t, l, a),
          typeof n != "function" &&
            (rl === null ? (rl = new Set([this])) : rl.add(this)));
        var s = a.stack;
        this.componentDidCatch(a.value, {
          componentStack: s !== null ? s : "",
        });
      });
  }
  function d0(e, t, l, a, n) {
    if (
      ((l.flags |= 32768),
      a !== null && typeof a == "object" && typeof a.then == "function")
    ) {
      if (
        ((t = l.alternate),
        t !== null && ka(t, l, n, !0),
        (l = xt.current),
        l !== null)
      ) {
        switch (l.tag) {
          case 13:
            return (
              Mt === null ? Cc() : l.alternate === null && Ee === 0 && (Ee = 3),
              (l.flags &= -257),
              (l.flags |= 65536),
              (l.lanes = n),
              a === Hu
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null ? (l.updateQueue = new Set([a])) : t.add(a),
                  Rc(e, a, n)),
              !1
            );
          case 22:
            return (
              (l.flags |= 65536),
              a === Hu
                ? (l.flags |= 16384)
                : ((t = l.updateQueue),
                  t === null
                    ? ((t = {
                        transitions: null,
                        markerInstances: null,
                        retryQueue: new Set([a]),
                      }),
                      (l.updateQueue = t))
                    : ((l = t.retryQueue),
                      l === null ? (t.retryQueue = new Set([a])) : l.add(a)),
                  Rc(e, a, n)),
              !1
            );
        }
        throw Error(o(435, l.tag));
      }
      return (Rc(e, a, n), Cc(), !1);
    }
    if (fe)
      return (
        (t = xt.current),
        t !== null
          ? ((t.flags & 65536) === 0 && (t.flags |= 256),
            (t.flags |= 65536),
            (t.lanes = n),
            a !== Du && ((e = Error(o(422), { cause: a })), Ka(vt(e, l))))
          : (a !== Du && ((t = Error(o(423), { cause: a })), Ka(vt(t, l))),
            (e = e.current.alternate),
            (e.flags |= 65536),
            (n &= -n),
            (e.lanes |= n),
            (a = vt(a, l)),
            (n = sc(e.stateNode, a, n)),
            Yu(e, n),
            Ee !== 4 && (Ee = 2)),
        !1
      );
    var i = Error(o(520), { cause: a });
    if (
      ((i = vt(i, l)),
      mn === null ? (mn = [i]) : mn.push(i),
      Ee !== 4 && (Ee = 2),
      t === null)
    )
      return !0;
    ((a = vt(a, l)), (l = t));
    do {
      switch (l.tag) {
        case 3:
          return (
            (l.flags |= 65536),
            (e = n & -n),
            (l.lanes |= e),
            (e = sc(l.stateNode, a, e)),
            Yu(l, e),
            !1
          );
        case 1:
          if (
            ((t = l.type),
            (i = l.stateNode),
            (l.flags & 128) === 0 &&
              (typeof t.getDerivedStateFromError == "function" ||
                (i !== null &&
                  typeof i.componentDidCatch == "function" &&
                  (rl === null || !rl.has(i)))))
          )
            return (
              (l.flags |= 65536),
              (n &= -n),
              (l.lanes |= n),
              (n = Dr(n)),
              Or(n, e, l, a),
              Yu(l, n),
              !1
            );
      }
      l = l.return;
    } while (l !== null);
    return !1;
  }
  var Cr = Error(o(461)),
    qe = !1;
  function Qe(e, t, l, a) {
    t.child = e === null ? jr(t, null, l, a) : da(t, e.child, l, a);
  }
  function Ur(e, t, l, a, n) {
    l = l.render;
    var i = t.ref;
    if ("ref" in a) {
      var c = {};
      for (var s in a) s !== "ref" && (c[s] = a[s]);
    } else c = a;
    return (
      Ol(t),
      (a = Vu(e, t, l, c, i, n)),
      (s = Ku()),
      e !== null && !qe
        ? (ku(e, t, n), Qt(e, t, n))
        : (fe && s && Mu(t), (t.flags |= 1), Qe(e, t, a, n), t.child)
    );
  }
  function Rr(e, t, l, a, n) {
    if (e === null) {
      var i = l.type;
      return typeof i == "function" &&
        !Tu(i) &&
        i.defaultProps === void 0 &&
        l.compare === null
        ? ((t.tag = 15), (t.type = i), Br(e, t, i, a, n))
        : ((e = $n(l.type, null, a, t, t.mode, n)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((i = e.child), !yc(e, n))) {
      var c = i.memoizedProps;
      if (
        ((l = l.compare), (l = l !== null ? l : Xa), l(c, a) && e.ref === t.ref)
      )
        return Qt(e, t, n);
    }
    return (
      (t.flags |= 1),
      (e = Gt(i, a)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Br(e, t, l, a, n) {
    if (e !== null) {
      var i = e.memoizedProps;
      if (Xa(i, a) && e.ref === t.ref)
        if (((qe = !1), (t.pendingProps = a = i), yc(e, n)))
          (e.flags & 131072) !== 0 && (qe = !0);
        else return ((t.lanes = e.lanes), Qt(e, t, n));
    }
    return fc(e, t, l, a, n);
  }
  function Gr(e, t, l) {
    var a = t.pendingProps,
      n = a.children,
      i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden") {
      if ((t.flags & 128) !== 0) {
        if (((a = i !== null ? i.baseLanes | l : l), e !== null)) {
          for (n = t.child = e.child, i = 0; n !== null; )
            ((i = i | n.lanes | n.childLanes), (n = n.sibling));
          t.childLanes = i & ~a;
        } else ((t.childLanes = 0), (t.child = null));
        return Hr(e, t, a, l);
      }
      if ((l & 536870912) !== 0)
        ((t.memoizedState = { baseLanes: 0, cachePool: null }),
          e !== null && ti(t, i !== null ? i.cachePool : null),
          i !== null ? Bf(t, i) : Xu(),
          Nr(t));
      else
        return (
          (t.lanes = t.childLanes = 536870912),
          Hr(e, t, i !== null ? i.baseLanes | l : l, l)
        );
    } else
      i !== null
        ? (ti(t, i.cachePool), Bf(t, i), nl(), (t.memoizedState = null))
        : (e !== null && ti(t, null), Xu(), nl());
    return (Qe(e, t, n, l), t.child);
  }
  function Hr(e, t, l, a) {
    var n = Gu();
    return (
      (n = n === null ? null : { parent: Re._currentValue, pool: n }),
      (t.memoizedState = { baseLanes: l, cachePool: n }),
      e !== null && ti(t, null),
      Xu(),
      Nr(t),
      e !== null && ka(e, t, a, !0),
      null
    );
  }
  function pi(e, t) {
    var l = t.ref;
    if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
    else {
      if (typeof l != "function" && typeof l != "object") throw Error(o(284));
      (e === null || e.ref !== l) && (t.flags |= 4194816);
    }
  }
  function fc(e, t, l, a, n) {
    return (
      Ol(t),
      (l = Vu(e, t, l, a, void 0, n)),
      (a = Ku()),
      e !== null && !qe
        ? (ku(e, t, n), Qt(e, t, n))
        : (fe && a && Mu(t), (t.flags |= 1), Qe(e, t, l, n), t.child)
    );
  }
  function qr(e, t, l, a, n, i) {
    return (
      Ol(t),
      (t.updateQueue = null),
      (l = Hf(t, a, l, n)),
      Gf(e),
      (a = Ku()),
      e !== null && !qe
        ? (ku(e, t, i), Qt(e, t, i))
        : (fe && a && Mu(t), (t.flags |= 1), Qe(e, t, l, i), t.child)
    );
  }
  function wr(e, t, l, a, n) {
    if ((Ol(t), t.stateNode === null)) {
      var i = la,
        c = l.contextType;
      (typeof c == "object" && c !== null && (i = We(c)),
        (i = new l(a, i)),
        (t.memoizedState =
          i.state !== null && i.state !== void 0 ? i.state : null),
        (i.updater = cc),
        (t.stateNode = i),
        (i._reactInternals = t),
        (i = t.stateNode),
        (i.props = a),
        (i.state = t.memoizedState),
        (i.refs = {}),
        qu(t),
        (c = l.contextType),
        (i.context = typeof c == "object" && c !== null ? We(c) : la),
        (i.state = t.memoizedState),
        (c = l.getDerivedStateFromProps),
        typeof c == "function" && (uc(t, l, c, a), (i.state = t.memoizedState)),
        typeof l.getDerivedStateFromProps == "function" ||
          typeof i.getSnapshotBeforeUpdate == "function" ||
          (typeof i.UNSAFE_componentWillMount != "function" &&
            typeof i.componentWillMount != "function") ||
          ((c = i.state),
          typeof i.componentWillMount == "function" && i.componentWillMount(),
          typeof i.UNSAFE_componentWillMount == "function" &&
            i.UNSAFE_componentWillMount(),
          c !== i.state && cc.enqueueReplaceState(i, i.state, null),
          en(t, a, i, n),
          Ia(),
          (i.state = t.memoizedState)),
        typeof i.componentDidMount == "function" && (t.flags |= 4194308),
        (a = !0));
    } else if (e === null) {
      i = t.stateNode;
      var s = t.memoizedProps,
        r = Rl(l, s);
      i.props = r;
      var g = i.context,
        N = l.contextType;
      ((c = la), typeof N == "object" && N !== null && (c = We(N)));
      var M = l.getDerivedStateFromProps;
      ((N =
        typeof M == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function"),
        (s = t.pendingProps !== s),
        N ||
          (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
            typeof i.componentWillReceiveProps != "function") ||
          ((s || g !== c) && Tr(t, i, a, c)),
        (It = !1));
      var p = t.memoizedState;
      ((i.state = p),
        en(t, a, i, n),
        Ia(),
        (g = t.memoizedState),
        s || p !== g || It
          ? (typeof M == "function" && (uc(t, l, M, a), (g = t.memoizedState)),
            (r = It || Er(t, l, r, a, p, g, c))
              ? (N ||
                  (typeof i.UNSAFE_componentWillMount != "function" &&
                    typeof i.componentWillMount != "function") ||
                  (typeof i.componentWillMount == "function" &&
                    i.componentWillMount(),
                  typeof i.UNSAFE_componentWillMount == "function" &&
                    i.UNSAFE_componentWillMount()),
                typeof i.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof i.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = a),
                (t.memoizedState = g)),
            (i.props = a),
            (i.state = g),
            (i.context = c),
            (a = r))
          : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
            (a = !1)));
    } else {
      ((i = t.stateNode),
        wu(e, t),
        (c = t.memoizedProps),
        (N = Rl(l, c)),
        (i.props = N),
        (M = t.pendingProps),
        (p = i.context),
        (g = l.contextType),
        (r = la),
        typeof g == "object" && g !== null && (r = We(g)),
        (s = l.getDerivedStateFromProps),
        (g =
          typeof s == "function" ||
          typeof i.getSnapshotBeforeUpdate == "function") ||
          (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
            typeof i.componentWillReceiveProps != "function") ||
          ((c !== M || p !== r) && Tr(t, i, a, r)),
        (It = !1),
        (p = t.memoizedState),
        (i.state = p),
        en(t, a, i, n),
        Ia());
      var x = t.memoizedState;
      c !== M ||
      p !== x ||
      It ||
      (e !== null && e.dependencies !== null && In(e.dependencies))
        ? (typeof s == "function" && (uc(t, l, s, a), (x = t.memoizedState)),
          (N =
            It ||
            Er(t, l, N, a, p, x, r) ||
            (e !== null && e.dependencies !== null && In(e.dependencies)))
            ? (g ||
                (typeof i.UNSAFE_componentWillUpdate != "function" &&
                  typeof i.componentWillUpdate != "function") ||
                (typeof i.componentWillUpdate == "function" &&
                  i.componentWillUpdate(a, x, r),
                typeof i.UNSAFE_componentWillUpdate == "function" &&
                  i.UNSAFE_componentWillUpdate(a, x, r)),
              typeof i.componentDidUpdate == "function" && (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof i.componentDidUpdate != "function" ||
                (c === e.memoizedProps && p === e.memoizedState) ||
                (t.flags |= 4),
              typeof i.getSnapshotBeforeUpdate != "function" ||
                (c === e.memoizedProps && p === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = a),
              (t.memoizedState = x)),
          (i.props = a),
          (i.state = x),
          (i.context = r),
          (a = N))
        : (typeof i.componentDidUpdate != "function" ||
            (c === e.memoizedProps && p === e.memoizedState) ||
            (t.flags |= 4),
          typeof i.getSnapshotBeforeUpdate != "function" ||
            (c === e.memoizedProps && p === e.memoizedState) ||
            (t.flags |= 1024),
          (a = !1));
    }
    return (
      (i = a),
      pi(e, t),
      (a = (t.flags & 128) !== 0),
      i || a
        ? ((i = t.stateNode),
          (l =
            a && typeof l.getDerivedStateFromError != "function"
              ? null
              : i.render()),
          (t.flags |= 1),
          e !== null && a
            ? ((t.child = da(t, e.child, null, n)),
              (t.child = da(t, null, l, n)))
            : Qe(e, t, l, n),
          (t.memoizedState = i.state),
          (e = t.child))
        : (e = Qt(e, t, n)),
      e
    );
  }
  function Yr(e, t, l, a) {
    return (Va(), (t.flags |= 256), Qe(e, t, l, a), t.child);
  }
  var rc = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null,
  };
  function oc(e) {
    return { baseLanes: e, cachePool: _f() };
  }
  function dc(e, t, l) {
    return ((e = e !== null ? e.childLanes & ~l : 0), t && (e |= bt), e);
  }
  function Lr(e, t, l) {
    var a = t.pendingProps,
      n = !1,
      i = (t.flags & 128) !== 0,
      c;
    if (
      ((c = i) ||
        (c =
          e !== null && e.memoizedState === null ? !1 : (Be.current & 2) !== 0),
      c && ((n = !0), (t.flags &= -129)),
      (c = (t.flags & 32) !== 0),
      (t.flags &= -33),
      e === null)
    ) {
      if (fe) {
        if ((n ? al(t) : nl(), fe)) {
          var s = Ne,
            r;
          if ((r = s)) {
            e: {
              for (r = s, s = _t; r.nodeType !== 8; ) {
                if (!s) {
                  s = null;
                  break e;
                }
                if (((r = Et(r.nextSibling)), r === null)) {
                  s = null;
                  break e;
                }
              }
              s = r;
            }
            s !== null
              ? ((t.memoizedState = {
                  dehydrated: s,
                  treeContext: Al !== null ? { id: Ht, overflow: qt } : null,
                  retryLane: 536870912,
                  hydrationErrors: null,
                }),
                (r = ut(18, null, null, 0)),
                (r.stateNode = s),
                (r.return = t),
                (t.child = r),
                (Pe = t),
                (Ne = null),
                (r = !0))
              : (r = !1);
          }
          r || zl(t);
        }
        if (
          ((s = t.memoizedState),
          s !== null && ((s = s.dehydrated), s !== null))
        )
          return (Wc(s) ? (t.lanes = 32) : (t.lanes = 536870912), null);
        Xt(t);
      }
      return (
        (s = a.children),
        (a = a.fallback),
        n
          ? (nl(),
            (n = t.mode),
            (s = xi({ mode: "hidden", children: s }, n)),
            (a = Tl(a, n, l, null)),
            (s.return = t),
            (a.return = t),
            (s.sibling = a),
            (t.child = s),
            (n = t.child),
            (n.memoizedState = oc(l)),
            (n.childLanes = dc(e, c, l)),
            (t.memoizedState = rc),
            a)
          : (al(t), hc(t, s))
      );
    }
    if (
      ((r = e.memoizedState), r !== null && ((s = r.dehydrated), s !== null))
    ) {
      if (i)
        t.flags & 256
          ? (al(t), (t.flags &= -257), (t = mc(e, t, l)))
          : t.memoizedState !== null
            ? (nl(), (t.child = e.child), (t.flags |= 128), (t = null))
            : (nl(),
              (n = a.fallback),
              (s = t.mode),
              (a = xi({ mode: "visible", children: a.children }, s)),
              (n = Tl(n, s, l, null)),
              (n.flags |= 2),
              (a.return = t),
              (n.return = t),
              (a.sibling = n),
              (t.child = a),
              da(t, e.child, null, l),
              (a = t.child),
              (a.memoizedState = oc(l)),
              (a.childLanes = dc(e, c, l)),
              (t.memoizedState = rc),
              (t = n));
      else if ((al(t), Wc(s))) {
        if (((c = s.nextSibling && s.nextSibling.dataset), c)) var g = c.dgst;
        ((c = g),
          (a = Error(o(419))),
          (a.stack = ""),
          (a.digest = c),
          Ka({ value: a, source: null, stack: null }),
          (t = mc(e, t, l)));
      } else if (
        (qe || ka(e, t, l, !1), (c = (l & e.childLanes) !== 0), qe || c)
      ) {
        if (
          ((c = xe),
          c !== null &&
            ((a = l & -l),
            (a = (a & 42) !== 0 ? 1 : $i(a)),
            (a = (a & (c.suspendedLanes | l)) !== 0 ? 0 : a),
            a !== 0 && a !== r.retryLane))
        )
          throw ((r.retryLane = a), ta(e, a), ot(c, e, a), Cr);
        (s.data === "$?" || Cc(), (t = mc(e, t, l)));
      } else
        s.data === "$?"
          ? ((t.flags |= 192), (t.child = e.child), (t = null))
          : ((e = r.treeContext),
            (Ne = Et(s.nextSibling)),
            (Pe = t),
            (fe = !0),
            (Ml = null),
            (_t = !1),
            e !== null &&
              ((gt[pt++] = Ht),
              (gt[pt++] = qt),
              (gt[pt++] = Al),
              (Ht = e.id),
              (qt = e.overflow),
              (Al = t)),
            (t = hc(t, a.children)),
            (t.flags |= 4096));
      return t;
    }
    return n
      ? (nl(),
        (n = a.fallback),
        (s = t.mode),
        (r = e.child),
        (g = r.sibling),
        (a = Gt(r, { mode: "hidden", children: a.children })),
        (a.subtreeFlags = r.subtreeFlags & 65011712),
        g !== null ? (n = Gt(g, n)) : ((n = Tl(n, s, l, null)), (n.flags |= 2)),
        (n.return = t),
        (a.return = t),
        (a.sibling = n),
        (t.child = a),
        (a = n),
        (n = t.child),
        (s = e.child.memoizedState),
        s === null
          ? (s = oc(l))
          : ((r = s.cachePool),
            r !== null
              ? ((g = Re._currentValue),
                (r = r.parent !== g ? { parent: g, pool: g } : r))
              : (r = _f()),
            (s = { baseLanes: s.baseLanes | l, cachePool: r })),
        (n.memoizedState = s),
        (n.childLanes = dc(e, c, l)),
        (t.memoizedState = rc),
        a)
      : (al(t),
        (l = e.child),
        (e = l.sibling),
        (l = Gt(l, { mode: "visible", children: a.children })),
        (l.return = t),
        (l.sibling = null),
        e !== null &&
          ((c = t.deletions),
          c === null ? ((t.deletions = [e]), (t.flags |= 16)) : c.push(e)),
        (t.child = l),
        (t.memoizedState = null),
        l);
  }
  function hc(e, t) {
    return (
      (t = xi({ mode: "visible", children: t }, e.mode)),
      (t.return = e),
      (e.child = t)
    );
  }
  function xi(e, t) {
    return (
      (e = ut(22, e, null, t)),
      (e.lanes = 0),
      (e.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null,
      }),
      e
    );
  }
  function mc(e, t, l) {
    return (
      da(t, e.child, null, l),
      (e = hc(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function Xr(e, t, l) {
    e.lanes |= t;
    var a = e.alternate;
    (a !== null && (a.lanes |= t), Cu(e.return, t, l));
  }
  function vc(e, t, l, a, n) {
    var i = e.memoizedState;
    i === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: a,
          tail: l,
          tailMode: n,
        })
      : ((i.isBackwards = t),
        (i.rendering = null),
        (i.renderingStartTime = 0),
        (i.last = a),
        (i.tail = l),
        (i.tailMode = n));
  }
  function Qr(e, t, l) {
    var a = t.pendingProps,
      n = a.revealOrder,
      i = a.tail;
    if ((Qe(e, t, a.children, l), (a = Be.current), (a & 2) !== 0))
      ((a = (a & 1) | 2), (t.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Xr(e, l, t);
          else if (e.tag === 19) Xr(e, l, t);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      a &= 1;
    }
    switch ((R(Be, a), n)) {
      case "forwards":
        for (l = t.child, n = null; l !== null; )
          ((e = l.alternate),
            e !== null && vi(e) === null && (n = l),
            (l = l.sibling));
        ((l = n),
          l === null
            ? ((n = t.child), (t.child = null))
            : ((n = l.sibling), (l.sibling = null)),
          vc(t, !1, n, l, i));
        break;
      case "backwards":
        for (l = null, n = t.child, t.child = null; n !== null; ) {
          if (((e = n.alternate), e !== null && vi(e) === null)) {
            t.child = n;
            break;
          }
          ((e = n.sibling), (n.sibling = l), (l = n), (n = e));
        }
        vc(t, !0, l, null, i);
        break;
      case "together":
        vc(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
    return t.child;
  }
  function Qt(e, t, l) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (fl |= t.lanes),
      (l & t.childLanes) === 0)
    )
      if (e !== null) {
        if ((ka(e, t, l, !1), (l & t.childLanes) === 0)) return null;
      } else return null;
    if (e !== null && t.child !== e.child) throw Error(o(153));
    if (t.child !== null) {
      for (
        e = t.child, l = Gt(e, e.pendingProps), t.child = l, l.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (l = l.sibling = Gt(e, e.pendingProps)),
          (l.return = t));
      l.sibling = null;
    }
    return t.child;
  }
  function yc(e, t) {
    return (e.lanes & t) !== 0
      ? !0
      : ((e = e.dependencies), !!(e !== null && In(e)));
  }
  function h0(e, t, l) {
    switch (t.tag) {
      case 3:
        (ge(t, t.stateNode.containerInfo),
          Ft(t, Re, e.memoizedState.cache),
          Va());
        break;
      case 27:
      case 5:
        Ma(t);
        break;
      case 4:
        ge(t, t.stateNode.containerInfo);
        break;
      case 10:
        Ft(t, t.type, t.memoizedProps.value);
        break;
      case 13:
        var a = t.memoizedState;
        if (a !== null)
          return a.dehydrated !== null
            ? (al(t), (t.flags |= 128), null)
            : (l & t.child.childLanes) !== 0
              ? Lr(e, t, l)
              : (al(t), (e = Qt(e, t, l)), e !== null ? e.sibling : null);
        al(t);
        break;
      case 19:
        var n = (e.flags & 128) !== 0;
        if (
          ((a = (l & t.childLanes) !== 0),
          a || (ka(e, t, l, !1), (a = (l & t.childLanes) !== 0)),
          n)
        ) {
          if (a) return Qr(e, t, l);
          t.flags |= 128;
        }
        if (
          ((n = t.memoizedState),
          n !== null &&
            ((n.rendering = null), (n.tail = null), (n.lastEffect = null)),
          R(Be, Be.current),
          a)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), Gr(e, t, l));
      case 24:
        Ft(t, Re, e.memoizedState.cache);
    }
    return Qt(e, t, l);
  }
  function Zr(e, t, l) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps) qe = !0;
      else {
        if (!yc(e, l) && (t.flags & 128) === 0) return ((qe = !1), h0(e, t, l));
        qe = (e.flags & 131072) !== 0;
      }
    else ((qe = !1), fe && (t.flags & 1048576) !== 0 && bf(t, Fn, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 16:
        e: {
          e = t.pendingProps;
          var a = t.elementType,
            n = a._init;
          if (((a = n(a._payload)), (t.type = a), typeof a == "function"))
            Tu(a)
              ? ((e = Rl(a, e)), (t.tag = 1), (t = wr(null, t, a, e, l)))
              : ((t.tag = 0), (t = fc(null, t, a, e, l)));
          else {
            if (a != null) {
              if (((n = a.$$typeof), n === Le)) {
                ((t.tag = 11), (t = Ur(null, t, a, e, l)));
                break e;
              } else if (n === Te) {
                ((t.tag = 14), (t = Rr(null, t, a, e, l)));
                break e;
              }
            }
            throw ((t = ye(a) || a), Error(o(306, t, "")));
          }
        }
        return t;
      case 0:
        return fc(e, t, t.type, t.pendingProps, l);
      case 1:
        return ((a = t.type), (n = Rl(a, t.pendingProps)), wr(e, t, a, n, l));
      case 3:
        e: {
          if ((ge(t, t.stateNode.containerInfo), e === null))
            throw Error(o(387));
          a = t.pendingProps;
          var i = t.memoizedState;
          ((n = i.element), wu(e, t), en(t, a, null, l));
          var c = t.memoizedState;
          if (
            ((a = c.cache),
            Ft(t, Re, a),
            a !== i.cache && Uu(t, [Re], l, !0),
            Ia(),
            (a = c.element),
            i.isDehydrated)
          )
            if (
              ((i = { element: a, isDehydrated: !1, cache: c.cache }),
              (t.updateQueue.baseState = i),
              (t.memoizedState = i),
              t.flags & 256)
            ) {
              t = Yr(e, t, a, l);
              break e;
            } else if (a !== n) {
              ((n = vt(Error(o(424)), t)), Ka(n), (t = Yr(e, t, a, l)));
              break e;
            } else
              for (
                e = t.stateNode.containerInfo,
                  e.nodeType === 9
                    ? (e = e.body)
                    : (e = e.nodeName === "HTML" ? e.ownerDocument.body : e),
                  Ne = Et(e.firstChild),
                  Pe = t,
                  fe = !0,
                  Ml = null,
                  _t = !0,
                  l = jr(t, null, a, l),
                  t.child = l;
                l;
              )
                ((l.flags = (l.flags & -3) | 4096), (l = l.sibling));
          else {
            if ((Va(), a === n)) {
              t = Qt(e, t, l);
              break e;
            }
            Qe(e, t, a, l);
          }
          t = t.child;
        }
        return t;
      case 26:
        return (
          pi(e, t),
          e === null
            ? (l = Wo(t.type, null, t.pendingProps, null))
              ? (t.memoizedState = l)
              : fe ||
                ((l = t.type),
                (e = t.pendingProps),
                (a = Ui(W.current).createElement(l)),
                (a[Je] = t),
                (a[Fe] = e),
                Ve(a, l, e),
                He(a),
                (t.stateNode = a))
            : (t.memoizedState = Wo(
                t.type,
                e.memoizedProps,
                t.pendingProps,
                e.memoizedState,
              )),
          null
        );
      case 27:
        return (
          Ma(t),
          e === null &&
            fe &&
            ((a = t.stateNode = Ko(t.type, t.pendingProps, W.current)),
            (Pe = t),
            (_t = !0),
            (n = Ne),
            hl(t.type) ? (($c = n), (Ne = Et(a.firstChild))) : (Ne = n)),
          Qe(e, t, t.pendingProps.children, l),
          pi(e, t),
          e === null && (t.flags |= 4194304),
          t.child
        );
      case 5:
        return (
          e === null &&
            fe &&
            ((n = a = Ne) &&
              ((a = L0(a, t.type, t.pendingProps, _t)),
              a !== null
                ? ((t.stateNode = a),
                  (Pe = t),
                  (Ne = Et(a.firstChild)),
                  (_t = !1),
                  (n = !0))
                : (n = !1)),
            n || zl(t)),
          Ma(t),
          (n = t.type),
          (i = t.pendingProps),
          (c = e !== null ? e.memoizedProps : null),
          (a = i.children),
          Kc(n, i) ? (a = null) : c !== null && Kc(n, c) && (t.flags |= 32),
          t.memoizedState !== null &&
            ((n = Vu(e, t, i0, null, null, l)), (Nn._currentValue = n)),
          pi(e, t),
          Qe(e, t, a, l),
          t.child
        );
      case 6:
        return (
          e === null &&
            fe &&
            ((e = l = Ne) &&
              ((l = X0(l, t.pendingProps, _t)),
              l !== null
                ? ((t.stateNode = l), (Pe = t), (Ne = null), (e = !0))
                : (e = !1)),
            e || zl(t)),
          null
        );
      case 13:
        return Lr(e, t, l);
      case 4:
        return (
          ge(t, t.stateNode.containerInfo),
          (a = t.pendingProps),
          e === null ? (t.child = da(t, null, a, l)) : Qe(e, t, a, l),
          t.child
        );
      case 11:
        return Ur(e, t, t.type, t.pendingProps, l);
      case 7:
        return (Qe(e, t, t.pendingProps, l), t.child);
      case 8:
        return (Qe(e, t, t.pendingProps.children, l), t.child);
      case 12:
        return (Qe(e, t, t.pendingProps.children, l), t.child);
      case 10:
        return (
          (a = t.pendingProps),
          Ft(t, t.type, a.value),
          Qe(e, t, a.children, l),
          t.child
        );
      case 9:
        return (
          (n = t.type._context),
          (a = t.pendingProps.children),
          Ol(t),
          (n = We(n)),
          (a = a(n)),
          (t.flags |= 1),
          Qe(e, t, a, l),
          t.child
        );
      case 14:
        return Rr(e, t, t.type, t.pendingProps, l);
      case 15:
        return Br(e, t, t.type, t.pendingProps, l);
      case 19:
        return Qr(e, t, l);
      case 31:
        return (
          (a = t.pendingProps),
          (l = t.mode),
          (a = { mode: a.mode, children: a.children }),
          e === null
            ? ((l = xi(a, l)),
              (l.ref = t.ref),
              (t.child = l),
              (l.return = t),
              (t = l))
            : ((l = Gt(e.child, a)),
              (l.ref = t.ref),
              (t.child = l),
              (l.return = t),
              (t = l)),
          t
        );
      case 22:
        return Gr(e, t, l);
      case 24:
        return (
          Ol(t),
          (a = We(Re)),
          e === null
            ? ((n = Gu()),
              n === null &&
                ((n = xe),
                (i = Ru()),
                (n.pooledCache = i),
                i.refCount++,
                i !== null && (n.pooledCacheLanes |= l),
                (n = i)),
              (t.memoizedState = { parent: a, cache: n }),
              qu(t),
              Ft(t, Re, n))
            : ((e.lanes & l) !== 0 && (wu(e, t), en(t, null, null, l), Ia()),
              (n = e.memoizedState),
              (i = t.memoizedState),
              n.parent !== a
                ? ((n = { parent: a, cache: a }),
                  (t.memoizedState = n),
                  t.lanes === 0 &&
                    (t.memoizedState = t.updateQueue.baseState = n),
                  Ft(t, Re, a))
                : ((a = i.cache),
                  Ft(t, Re, a),
                  a !== n.cache && Uu(t, [Re], l, !0))),
          Qe(e, t, t.pendingProps.children, l),
          t.child
        );
      case 29:
        throw t.pendingProps;
    }
    throw Error(o(156, t.tag));
  }
  function Zt(e) {
    e.flags |= 4;
  }
  function Vr(e, t) {
    if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0)
      e.flags &= -16777217;
    else if (((e.flags |= 16777216), !ed(t))) {
      if (
        ((t = xt.current),
        t !== null &&
          ((ue & 4194048) === ue
            ? Mt !== null
            : ((ue & 62914560) !== ue && (ue & 536870912) === 0) || t !== Mt))
      )
        throw ((Pa = Hu), Mf);
      e.flags |= 8192;
    }
  }
  function bi(e, t) {
    (t !== null && (e.flags |= 4),
      e.flags & 16384 &&
        ((t = e.tag !== 22 ? js() : 536870912), (e.lanes |= t), (ya |= t)));
  }
  function sn(e, t) {
    if (!fe)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var l = null; t !== null; )
            (t.alternate !== null && (l = t), (t = t.sibling));
          l === null ? (e.tail = null) : (l.sibling = null);
          break;
        case "collapsed":
          l = e.tail;
          for (var a = null; l !== null; )
            (l.alternate !== null && (a = l), (l = l.sibling));
          a === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (a.sibling = null);
      }
  }
  function Se(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      l = 0,
      a = 0;
    if (t)
      for (var n = e.child; n !== null; )
        ((l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags & 65011712),
          (a |= n.flags & 65011712),
          (n.return = e),
          (n = n.sibling));
    else
      for (n = e.child; n !== null; )
        ((l |= n.lanes | n.childLanes),
          (a |= n.subtreeFlags),
          (a |= n.flags),
          (n.return = e),
          (n = n.sibling));
    return ((e.subtreeFlags |= a), (e.childLanes = l), t);
  }
  function m0(e, t, l) {
    var a = t.pendingProps;
    switch ((zu(t), t.tag)) {
      case 31:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Se(t), null);
      case 1:
        return (Se(t), null);
      case 3:
        return (
          (l = t.stateNode),
          (a = null),
          e !== null && (a = e.memoizedState.cache),
          t.memoizedState.cache !== a && (t.flags |= 2048),
          Yt(Re),
          Tt(),
          l.pendingContext &&
            ((l.context = l.pendingContext), (l.pendingContext = null)),
          (e === null || e.child === null) &&
            (Za(t)
              ? Zt(t)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Nf())),
          Se(t),
          null
        );
      case 26:
        return (
          (l = t.memoizedState),
          e === null
            ? (Zt(t),
              l !== null ? (Se(t), Vr(t, l)) : (Se(t), (t.flags &= -16777217)))
            : l
              ? l !== e.memoizedState
                ? (Zt(t), Se(t), Vr(t, l))
                : (Se(t), (t.flags &= -16777217))
              : (e.memoizedProps !== a && Zt(t), Se(t), (t.flags &= -16777217)),
          null
        );
      case 27:
        (Yl(t), (l = W.current));
        var n = t.type;
        if (e !== null && t.stateNode != null) e.memoizedProps !== a && Zt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(o(166));
            return (Se(t), null);
          }
          ((e = K.current),
            Za(t) ? Sf(t) : ((e = Ko(n, a, l)), (t.stateNode = e), Zt(t)));
        }
        return (Se(t), null);
      case 5:
        if ((Yl(t), (l = t.type), e !== null && t.stateNode != null))
          e.memoizedProps !== a && Zt(t);
        else {
          if (!a) {
            if (t.stateNode === null) throw Error(o(166));
            return (Se(t), null);
          }
          if (((e = K.current), Za(t))) Sf(t);
          else {
            switch (((n = Ui(W.current)), e)) {
              case 1:
                e = n.createElementNS("http://www.w3.org/2000/svg", l);
                break;
              case 2:
                e = n.createElementNS("http://www.w3.org/1998/Math/MathML", l);
                break;
              default:
                switch (l) {
                  case "svg":
                    e = n.createElementNS("http://www.w3.org/2000/svg", l);
                    break;
                  case "math":
                    e = n.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      l,
                    );
                    break;
                  case "script":
                    ((e = n.createElement("div")),
                      (e.innerHTML = "<script><\/script>"),
                      (e = e.removeChild(e.firstChild)));
                    break;
                  case "select":
                    ((e =
                      typeof a.is == "string"
                        ? n.createElement("select", { is: a.is })
                        : n.createElement("select")),
                      a.multiple
                        ? (e.multiple = !0)
                        : a.size && (e.size = a.size));
                    break;
                  default:
                    e =
                      typeof a.is == "string"
                        ? n.createElement(l, { is: a.is })
                        : n.createElement(l);
                }
            }
            ((e[Je] = t), (e[Fe] = a));
            e: for (n = t.child; n !== null; ) {
              if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
              else if (n.tag !== 4 && n.tag !== 27 && n.child !== null) {
                ((n.child.return = n), (n = n.child));
                continue;
              }
              if (n === t) break e;
              for (; n.sibling === null; ) {
                if (n.return === null || n.return === t) break e;
                n = n.return;
              }
              ((n.sibling.return = n.return), (n = n.sibling));
            }
            t.stateNode = e;
            e: switch ((Ve(e, l, a), l)) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                e = !!a.autoFocus;
                break e;
              case "img":
                e = !0;
                break e;
              default:
                e = !1;
            }
            e && Zt(t);
          }
        }
        return (Se(t), (t.flags &= -16777217), null);
      case 6:
        if (e && t.stateNode != null) e.memoizedProps !== a && Zt(t);
        else {
          if (typeof a != "string" && t.stateNode === null) throw Error(o(166));
          if (((e = W.current), Za(t))) {
            if (
              ((e = t.stateNode),
              (l = t.memoizedProps),
              (a = null),
              (n = Pe),
              n !== null)
            )
              switch (n.tag) {
                case 27:
                case 5:
                  a = n.memoizedProps;
              }
            ((e[Je] = t),
              (e = !!(
                e.nodeValue === l ||
                (a !== null && a.suppressHydrationWarning === !0) ||
                wo(e.nodeValue, l)
              )),
              e || zl(t));
          } else
            ((e = Ui(e).createTextNode(a)), (e[Je] = t), (t.stateNode = e));
        }
        return (Se(t), null);
      case 13:
        if (
          ((a = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (((n = Za(t)), a !== null && a.dehydrated !== null)) {
            if (e === null) {
              if (!n) throw Error(o(318));
              if (
                ((n = t.memoizedState),
                (n = n !== null ? n.dehydrated : null),
                !n)
              )
                throw Error(o(317));
              n[Je] = t;
            } else
              (Va(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (Se(t), (n = !1));
          } else
            ((n = Nf()),
              e !== null &&
                e.memoizedState !== null &&
                (e.memoizedState.hydrationErrors = n),
              (n = !0));
          if (!n) return t.flags & 256 ? (Xt(t), t) : (Xt(t), null);
        }
        if ((Xt(t), (t.flags & 128) !== 0)) return ((t.lanes = l), t);
        if (
          ((l = a !== null), (e = e !== null && e.memoizedState !== null), l)
        ) {
          ((a = t.child),
            (n = null),
            a.alternate !== null &&
              a.alternate.memoizedState !== null &&
              a.alternate.memoizedState.cachePool !== null &&
              (n = a.alternate.memoizedState.cachePool.pool));
          var i = null;
          (a.memoizedState !== null &&
            a.memoizedState.cachePool !== null &&
            (i = a.memoizedState.cachePool.pool),
            i !== n && (a.flags |= 2048));
        }
        return (
          l !== e && l && (t.child.flags |= 8192),
          bi(t, t.updateQueue),
          Se(t),
          null
        );
      case 4:
        return (Tt(), e === null && Lc(t.stateNode.containerInfo), Se(t), null);
      case 10:
        return (Yt(t.type), Se(t), null);
      case 19:
        if ((G(Be), (n = t.memoizedState), n === null)) return (Se(t), null);
        if (((a = (t.flags & 128) !== 0), (i = n.rendering), i === null))
          if (a) sn(n, !1);
          else {
            if (Ee !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((i = vi(e)), i !== null)) {
                  for (
                    t.flags |= 128,
                      sn(n, !1),
                      e = i.updateQueue,
                      t.updateQueue = e,
                      bi(t, e),
                      t.subtreeFlags = 0,
                      e = l,
                      l = t.child;
                    l !== null;
                  )
                    (xf(l, e), (l = l.sibling));
                  return (R(Be, (Be.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            n.tail !== null &&
              At() > Ni &&
              ((t.flags |= 128), (a = !0), sn(n, !1), (t.lanes = 4194304));
          }
        else {
          if (!a)
            if (((e = vi(i)), e !== null)) {
              if (
                ((t.flags |= 128),
                (a = !0),
                (e = e.updateQueue),
                (t.updateQueue = e),
                bi(t, e),
                sn(n, !0),
                n.tail === null &&
                  n.tailMode === "hidden" &&
                  !i.alternate &&
                  !fe)
              )
                return (Se(t), null);
            } else
              2 * At() - n.renderingStartTime > Ni &&
                l !== 536870912 &&
                ((t.flags |= 128), (a = !0), sn(n, !1), (t.lanes = 4194304));
          n.isBackwards
            ? ((i.sibling = t.child), (t.child = i))
            : ((e = n.last),
              e !== null ? (e.sibling = i) : (t.child = i),
              (n.last = i));
        }
        return n.tail !== null
          ? ((t = n.tail),
            (n.rendering = t),
            (n.tail = t.sibling),
            (n.renderingStartTime = At()),
            (t.sibling = null),
            (e = Be.current),
            R(Be, a ? (e & 1) | 2 : e & 1),
            t)
          : (Se(t), null);
      case 22:
      case 23:
        return (
          Xt(t),
          Qu(),
          (a = t.memoizedState !== null),
          e !== null
            ? (e.memoizedState !== null) !== a && (t.flags |= 8192)
            : a && (t.flags |= 8192),
          a
            ? (l & 536870912) !== 0 &&
              (t.flags & 128) === 0 &&
              (Se(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Se(t),
          (l = t.updateQueue),
          l !== null && bi(t, l.retryQueue),
          (l = null),
          e !== null &&
            e.memoizedState !== null &&
            e.memoizedState.cachePool !== null &&
            (l = e.memoizedState.cachePool.pool),
          (a = null),
          t.memoizedState !== null &&
            t.memoizedState.cachePool !== null &&
            (a = t.memoizedState.cachePool.pool),
          a !== l && (t.flags |= 2048),
          e !== null && G(Cl),
          null
        );
      case 24:
        return (
          (l = null),
          e !== null && (l = e.memoizedState.cache),
          t.memoizedState.cache !== l && (t.flags |= 2048),
          Yt(Re),
          Se(t),
          null
        );
      case 25:
        return null;
      case 30:
        return null;
    }
    throw Error(o(156, t.tag));
  }
  function v0(e, t) {
    switch ((zu(t), t.tag)) {
      case 1:
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Yt(Re),
          Tt(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 26:
      case 27:
      case 5:
        return (Yl(t), null);
      case 13:
        if (
          (Xt(t), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(o(340));
          Va();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (G(Be), null);
      case 4:
        return (Tt(), null);
      case 10:
        return (Yt(t.type), null);
      case 22:
      case 23:
        return (
          Xt(t),
          Qu(),
          e !== null && G(Cl),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 24:
        return (Yt(Re), null);
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Kr(e, t) {
    switch ((zu(t), t.tag)) {
      case 3:
        (Yt(Re), Tt());
        break;
      case 26:
      case 27:
      case 5:
        Yl(t);
        break;
      case 4:
        Tt();
        break;
      case 13:
        Xt(t);
        break;
      case 19:
        G(Be);
        break;
      case 10:
        Yt(t.type);
        break;
      case 22:
      case 23:
        (Xt(t), Qu(), e !== null && G(Cl));
        break;
      case 24:
        Yt(Re);
    }
  }
  function fn(e, t) {
    try {
      var l = t.updateQueue,
        a = l !== null ? l.lastEffect : null;
      if (a !== null) {
        var n = a.next;
        l = n;
        do {
          if ((l.tag & e) === e) {
            a = void 0;
            var i = l.create,
              c = l.inst;
            ((a = i()), (c.destroy = a));
          }
          l = l.next;
        } while (l !== n);
      }
    } catch (s) {
      pe(t, t.return, s);
    }
  }
  function il(e, t, l) {
    try {
      var a = t.updateQueue,
        n = a !== null ? a.lastEffect : null;
      if (n !== null) {
        var i = n.next;
        a = i;
        do {
          if ((a.tag & e) === e) {
            var c = a.inst,
              s = c.destroy;
            if (s !== void 0) {
              ((c.destroy = void 0), (n = t));
              var r = l,
                g = s;
              try {
                g();
              } catch (N) {
                pe(n, r, N);
              }
            }
          }
          a = a.next;
        } while (a !== i);
      }
    } catch (N) {
      pe(t, t.return, N);
    }
  }
  function kr(e) {
    var t = e.updateQueue;
    if (t !== null) {
      var l = e.stateNode;
      try {
        Rf(t, l);
      } catch (a) {
        pe(e, e.return, a);
      }
    }
  }
  function Jr(e, t, l) {
    ((l.props = Rl(e.type, e.memoizedProps)), (l.state = e.memoizedState));
    try {
      l.componentWillUnmount();
    } catch (a) {
      pe(e, t, a);
    }
  }
  function rn(e, t) {
    try {
      var l = e.ref;
      if (l !== null) {
        switch (e.tag) {
          case 26:
          case 27:
          case 5:
            var a = e.stateNode;
            break;
          case 30:
            a = e.stateNode;
            break;
          default:
            a = e.stateNode;
        }
        typeof l == "function" ? (e.refCleanup = l(a)) : (l.current = a);
      }
    } catch (n) {
      pe(e, t, n);
    }
  }
  function zt(e, t) {
    var l = e.ref,
      a = e.refCleanup;
    if (l !== null)
      if (typeof a == "function")
        try {
          a();
        } catch (n) {
          pe(e, t, n);
        } finally {
          ((e.refCleanup = null),
            (e = e.alternate),
            e != null && (e.refCleanup = null));
        }
      else if (typeof l == "function")
        try {
          l(null);
        } catch (n) {
          pe(e, t, n);
        }
      else l.current = null;
  }
  function Wr(e) {
    var t = e.type,
      l = e.memoizedProps,
      a = e.stateNode;
    try {
      e: switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          l.autoFocus && a.focus();
          break e;
        case "img":
          l.src ? (a.src = l.src) : l.srcSet && (a.srcset = l.srcSet);
      }
    } catch (n) {
      pe(e, e.return, n);
    }
  }
  function gc(e, t, l) {
    try {
      var a = e.stateNode;
      (G0(a, e.type, l, t), (a[Fe] = t));
    } catch (n) {
      pe(e, e.return, n);
    }
  }
  function $r(e) {
    return (
      e.tag === 5 ||
      e.tag === 3 ||
      e.tag === 26 ||
      (e.tag === 27 && hl(e.type)) ||
      e.tag === 4
    );
  }
  function pc(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || $r(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (
          (e.tag === 27 && hl(e.type)) ||
          e.flags & 2 ||
          e.child === null ||
          e.tag === 4
        )
          continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function xc(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      ((e = e.stateNode),
        t
          ? (l.nodeType === 9
              ? l.body
              : l.nodeName === "HTML"
                ? l.ownerDocument.body
                : l
            ).insertBefore(e, t)
          : ((t =
              l.nodeType === 9
                ? l.body
                : l.nodeName === "HTML"
                  ? l.ownerDocument.body
                  : l),
            t.appendChild(e),
            (l = l._reactRootContainer),
            l != null || t.onclick !== null || (t.onclick = Ci)));
    else if (
      a !== 4 &&
      (a === 27 && hl(e.type) && ((l = e.stateNode), (t = null)),
      (e = e.child),
      e !== null)
    )
      for (xc(e, t, l), e = e.sibling; e !== null; )
        (xc(e, t, l), (e = e.sibling));
  }
  function Si(e, t, l) {
    var a = e.tag;
    if (a === 5 || a === 6)
      ((e = e.stateNode), t ? l.insertBefore(e, t) : l.appendChild(e));
    else if (
      a !== 4 &&
      (a === 27 && hl(e.type) && (l = e.stateNode), (e = e.child), e !== null)
    )
      for (Si(e, t, l), e = e.sibling; e !== null; )
        (Si(e, t, l), (e = e.sibling));
  }
  function Pr(e) {
    var t = e.stateNode,
      l = e.memoizedProps;
    try {
      for (var a = e.type, n = t.attributes; n.length; )
        t.removeAttributeNode(n[0]);
      (Ve(t, a, l), (t[Je] = e), (t[Fe] = l));
    } catch (i) {
      pe(e, e.return, i);
    }
  }
  var Vt = !1,
    _e = !1,
    bc = !1,
    Fr = typeof WeakSet == "function" ? WeakSet : Set,
    we = null;
  function y0(e, t) {
    if (((e = e.containerInfo), (Zc = wi), (e = ff(e)), pu(e))) {
      if ("selectionStart" in e)
        var l = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          l = ((l = e.ownerDocument) && l.defaultView) || window;
          var a = l.getSelection && l.getSelection();
          if (a && a.rangeCount !== 0) {
            l = a.anchorNode;
            var n = a.anchorOffset,
              i = a.focusNode;
            a = a.focusOffset;
            try {
              (l.nodeType, i.nodeType);
            } catch {
              l = null;
              break e;
            }
            var c = 0,
              s = -1,
              r = -1,
              g = 0,
              N = 0,
              M = e,
              p = null;
            t: for (;;) {
              for (
                var x;
                M !== l || (n !== 0 && M.nodeType !== 3) || (s = c + n),
                  M !== i || (a !== 0 && M.nodeType !== 3) || (r = c + a),
                  M.nodeType === 3 && (c += M.nodeValue.length),
                  (x = M.firstChild) !== null;
              )
                ((p = M), (M = x));
              for (;;) {
                if (M === e) break t;
                if (
                  (p === l && ++g === n && (s = c),
                  p === i && ++N === a && (r = c),
                  (x = M.nextSibling) !== null)
                )
                  break;
                ((M = p), (p = M.parentNode));
              }
              M = x;
            }
            l = s === -1 || r === -1 ? null : { start: s, end: r };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (
      Vc = { focusedElem: e, selectionRange: l }, wi = !1, we = t;
      we !== null;
    )
      if (
        ((t = we), (e = t.child), (t.subtreeFlags & 1024) !== 0 && e !== null)
      )
        ((e.return = t), (we = e));
      else
        for (; we !== null; ) {
          switch (((t = we), (i = t.alternate), (e = t.flags), t.tag)) {
            case 0:
              break;
            case 11:
            case 15:
              break;
            case 1:
              if ((e & 1024) !== 0 && i !== null) {
                ((e = void 0),
                  (l = t),
                  (n = i.memoizedProps),
                  (i = i.memoizedState),
                  (a = l.stateNode));
                try {
                  var $ = Rl(l.type, n, l.elementType === l.type);
                  ((e = a.getSnapshotBeforeUpdate($, i)),
                    (a.__reactInternalSnapshotBeforeUpdate = e));
                } catch (k) {
                  pe(l, l.return, k);
                }
              }
              break;
            case 3:
              if ((e & 1024) !== 0) {
                if (
                  ((e = t.stateNode.containerInfo), (l = e.nodeType), l === 9)
                )
                  Jc(e);
                else if (l === 1)
                  switch (e.nodeName) {
                    case "HEAD":
                    case "HTML":
                    case "BODY":
                      Jc(e);
                      break;
                    default:
                      e.textContent = "";
                  }
              }
              break;
            case 5:
            case 26:
            case 27:
            case 6:
            case 4:
            case 17:
              break;
            default:
              if ((e & 1024) !== 0) throw Error(o(163));
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (we = e));
            break;
          }
          we = t.return;
        }
  }
  function Ir(e, t, l) {
    var a = l.flags;
    switch (l.tag) {
      case 0:
      case 11:
      case 15:
        (ul(e, l), a & 4 && fn(5, l));
        break;
      case 1:
        if ((ul(e, l), a & 4))
          if (((e = l.stateNode), t === null))
            try {
              e.componentDidMount();
            } catch (c) {
              pe(l, l.return, c);
            }
          else {
            var n = Rl(l.type, t.memoizedProps);
            t = t.memoizedState;
            try {
              e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate);
            } catch (c) {
              pe(l, l.return, c);
            }
          }
        (a & 64 && kr(l), a & 512 && rn(l, l.return));
        break;
      case 3:
        if ((ul(e, l), a & 64 && ((e = l.updateQueue), e !== null))) {
          if (((t = null), l.child !== null))
            switch (l.child.tag) {
              case 27:
              case 5:
                t = l.child.stateNode;
                break;
              case 1:
                t = l.child.stateNode;
            }
          try {
            Rf(e, t);
          } catch (c) {
            pe(l, l.return, c);
          }
        }
        break;
      case 27:
        t === null && a & 4 && Pr(l);
      case 26:
      case 5:
        (ul(e, l), t === null && a & 4 && Wr(l), a & 512 && rn(l, l.return));
        break;
      case 12:
        ul(e, l);
        break;
      case 13:
        (ul(e, l),
          a & 4 && lo(e, l),
          a & 64 &&
            ((e = l.memoizedState),
            e !== null &&
              ((e = e.dehydrated),
              e !== null && ((l = T0.bind(null, l)), Q0(e, l)))));
        break;
      case 22:
        if (((a = l.memoizedState !== null || Vt), !a)) {
          ((t = (t !== null && t.memoizedState !== null) || _e), (n = Vt));
          var i = _e;
          ((Vt = a),
            (_e = t) && !i ? cl(e, l, (l.subtreeFlags & 8772) !== 0) : ul(e, l),
            (Vt = n),
            (_e = i));
        }
        break;
      case 30:
        break;
      default:
        ul(e, l);
    }
  }
  function eo(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), eo(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 && ((t = e.stateNode), t !== null && Ii(t)),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  var be = null,
    tt = !1;
  function Kt(e, t, l) {
    for (l = l.child; l !== null; ) (to(e, t, l), (l = l.sibling));
  }
  function to(e, t, l) {
    if (at && typeof at.onCommitFiberUnmount == "function")
      try {
        at.onCommitFiberUnmount(Da, l);
      } catch {}
    switch (l.tag) {
      case 26:
        (_e || zt(l, t),
          Kt(e, t, l),
          l.memoizedState
            ? l.memoizedState.count--
            : l.stateNode && ((l = l.stateNode), l.parentNode.removeChild(l)));
        break;
      case 27:
        _e || zt(l, t);
        var a = be,
          n = tt;
        (hl(l.type) && ((be = l.stateNode), (tt = !1)),
          Kt(e, t, l),
          xn(l.stateNode),
          (be = a),
          (tt = n));
        break;
      case 5:
        _e || zt(l, t);
      case 6:
        if (
          ((a = be),
          (n = tt),
          (be = null),
          Kt(e, t, l),
          (be = a),
          (tt = n),
          be !== null)
        )
          if (tt)
            try {
              (be.nodeType === 9
                ? be.body
                : be.nodeName === "HTML"
                  ? be.ownerDocument.body
                  : be
              ).removeChild(l.stateNode);
            } catch (i) {
              pe(l, t, i);
            }
          else
            try {
              be.removeChild(l.stateNode);
            } catch (i) {
              pe(l, t, i);
            }
        break;
      case 18:
        be !== null &&
          (tt
            ? ((e = be),
              Zo(
                e.nodeType === 9
                  ? e.body
                  : e.nodeName === "HTML"
                    ? e.ownerDocument.body
                    : e,
                l.stateNode,
              ),
              _n(e))
            : Zo(be, l.stateNode));
        break;
      case 4:
        ((a = be),
          (n = tt),
          (be = l.stateNode.containerInfo),
          (tt = !0),
          Kt(e, t, l),
          (be = a),
          (tt = n));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        (_e || il(2, l, t), _e || il(4, l, t), Kt(e, t, l));
        break;
      case 1:
        (_e ||
          (zt(l, t),
          (a = l.stateNode),
          typeof a.componentWillUnmount == "function" && Jr(l, t, a)),
          Kt(e, t, l));
        break;
      case 21:
        Kt(e, t, l);
        break;
      case 22:
        ((_e = (a = _e) || l.memoizedState !== null), Kt(e, t, l), (_e = a));
        break;
      default:
        Kt(e, t, l);
    }
  }
  function lo(e, t) {
    if (
      t.memoizedState === null &&
      ((e = t.alternate),
      e !== null &&
        ((e = e.memoizedState), e !== null && ((e = e.dehydrated), e !== null)))
    )
      try {
        _n(e);
      } catch (l) {
        pe(t, t.return, l);
      }
  }
  function g0(e) {
    switch (e.tag) {
      case 13:
      case 19:
        var t = e.stateNode;
        return (t === null && (t = e.stateNode = new Fr()), t);
      case 22:
        return (
          (e = e.stateNode),
          (t = e._retryCache),
          t === null && (t = e._retryCache = new Fr()),
          t
        );
      default:
        throw Error(o(435, e.tag));
    }
  }
  function Sc(e, t) {
    var l = g0(e);
    t.forEach(function (a) {
      var n = A0.bind(null, e, a);
      l.has(a) || (l.add(a), a.then(n, n));
    });
  }
  function ct(e, t) {
    var l = t.deletions;
    if (l !== null)
      for (var a = 0; a < l.length; a++) {
        var n = l[a],
          i = e,
          c = t,
          s = c;
        e: for (; s !== null; ) {
          switch (s.tag) {
            case 27:
              if (hl(s.type)) {
                ((be = s.stateNode), (tt = !1));
                break e;
              }
              break;
            case 5:
              ((be = s.stateNode), (tt = !1));
              break e;
            case 3:
            case 4:
              ((be = s.stateNode.containerInfo), (tt = !0));
              break e;
          }
          s = s.return;
        }
        if (be === null) throw Error(o(160));
        (to(i, c, n),
          (be = null),
          (tt = !1),
          (i = n.alternate),
          i !== null && (i.return = null),
          (n.return = null));
      }
    if (t.subtreeFlags & 13878)
      for (t = t.child; t !== null; ) (ao(t, e), (t = t.sibling));
  }
  var Nt = null;
  function ao(e, t) {
    var l = e.alternate,
      a = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        (ct(t, e),
          st(e),
          a & 4 && (il(3, e, e.return), fn(3, e), il(5, e, e.return)));
        break;
      case 1:
        (ct(t, e),
          st(e),
          a & 512 && (_e || l === null || zt(l, l.return)),
          a & 64 &&
            Vt &&
            ((e = e.updateQueue),
            e !== null &&
              ((a = e.callbacks),
              a !== null &&
                ((l = e.shared.hiddenCallbacks),
                (e.shared.hiddenCallbacks = l === null ? a : l.concat(a))))));
        break;
      case 26:
        var n = Nt;
        if (
          (ct(t, e),
          st(e),
          a & 512 && (_e || l === null || zt(l, l.return)),
          a & 4)
        ) {
          var i = l !== null ? l.memoizedState : null;
          if (((a = e.memoizedState), l === null))
            if (a === null)
              if (e.stateNode === null) {
                e: {
                  ((a = e.type),
                    (l = e.memoizedProps),
                    (n = n.ownerDocument || n));
                  t: switch (a) {
                    case "title":
                      ((i = n.getElementsByTagName("title")[0]),
                        (!i ||
                          i[Ua] ||
                          i[Je] ||
                          i.namespaceURI === "http://www.w3.org/2000/svg" ||
                          i.hasAttribute("itemprop")) &&
                          ((i = n.createElement(a)),
                          n.head.insertBefore(
                            i,
                            n.querySelector("head > title"),
                          )),
                        Ve(i, a, l),
                        (i[Je] = e),
                        He(i),
                        (a = i));
                      break e;
                    case "link":
                      var c = Fo("link", "href", n).get(a + (l.href || ""));
                      if (c) {
                        for (var s = 0; s < c.length; s++)
                          if (
                            ((i = c[s]),
                            i.getAttribute("href") ===
                              (l.href == null || l.href === ""
                                ? null
                                : l.href) &&
                              i.getAttribute("rel") ===
                                (l.rel == null ? null : l.rel) &&
                              i.getAttribute("title") ===
                                (l.title == null ? null : l.title) &&
                              i.getAttribute("crossorigin") ===
                                (l.crossOrigin == null ? null : l.crossOrigin))
                          ) {
                            c.splice(s, 1);
                            break t;
                          }
                      }
                      ((i = n.createElement(a)),
                        Ve(i, a, l),
                        n.head.appendChild(i));
                      break;
                    case "meta":
                      if (
                        (c = Fo("meta", "content", n).get(
                          a + (l.content || ""),
                        ))
                      ) {
                        for (s = 0; s < c.length; s++)
                          if (
                            ((i = c[s]),
                            i.getAttribute("content") ===
                              (l.content == null ? null : "" + l.content) &&
                              i.getAttribute("name") ===
                                (l.name == null ? null : l.name) &&
                              i.getAttribute("property") ===
                                (l.property == null ? null : l.property) &&
                              i.getAttribute("http-equiv") ===
                                (l.httpEquiv == null ? null : l.httpEquiv) &&
                              i.getAttribute("charset") ===
                                (l.charSet == null ? null : l.charSet))
                          ) {
                            c.splice(s, 1);
                            break t;
                          }
                      }
                      ((i = n.createElement(a)),
                        Ve(i, a, l),
                        n.head.appendChild(i));
                      break;
                    default:
                      throw Error(o(468, a));
                  }
                  ((i[Je] = e), He(i), (a = i));
                }
                e.stateNode = a;
              } else Io(n, e.type, e.stateNode);
            else e.stateNode = Po(n, a, e.memoizedProps);
          else
            i !== a
              ? (i === null
                  ? l.stateNode !== null &&
                    ((l = l.stateNode), l.parentNode.removeChild(l))
                  : i.count--,
                a === null
                  ? Io(n, e.type, e.stateNode)
                  : Po(n, a, e.memoizedProps))
              : a === null &&
                e.stateNode !== null &&
                gc(e, e.memoizedProps, l.memoizedProps);
        }
        break;
      case 27:
        (ct(t, e),
          st(e),
          a & 512 && (_e || l === null || zt(l, l.return)),
          l !== null && a & 4 && gc(e, e.memoizedProps, l.memoizedProps));
        break;
      case 5:
        if (
          (ct(t, e),
          st(e),
          a & 512 && (_e || l === null || zt(l, l.return)),
          e.flags & 32)
        ) {
          n = e.stateNode;
          try {
            Jl(n, "");
          } catch (x) {
            pe(e, e.return, x);
          }
        }
        (a & 4 &&
          e.stateNode != null &&
          ((n = e.memoizedProps), gc(e, n, l !== null ? l.memoizedProps : n)),
          a & 1024 && (bc = !0));
        break;
      case 6:
        if ((ct(t, e), st(e), a & 4)) {
          if (e.stateNode === null) throw Error(o(162));
          ((a = e.memoizedProps), (l = e.stateNode));
          try {
            l.nodeValue = a;
          } catch (x) {
            pe(e, e.return, x);
          }
        }
        break;
      case 3:
        if (
          ((Gi = null),
          (n = Nt),
          (Nt = Ri(t.containerInfo)),
          ct(t, e),
          (Nt = n),
          st(e),
          a & 4 && l !== null && l.memoizedState.isDehydrated)
        )
          try {
            _n(t.containerInfo);
          } catch (x) {
            pe(e, e.return, x);
          }
        bc && ((bc = !1), no(e));
        break;
      case 4:
        ((a = Nt),
          (Nt = Ri(e.stateNode.containerInfo)),
          ct(t, e),
          st(e),
          (Nt = a));
        break;
      case 12:
        (ct(t, e), st(e));
        break;
      case 13:
        (ct(t, e),
          st(e),
          e.child.flags & 8192 &&
            (e.memoizedState !== null) !=
              (l !== null && l.memoizedState !== null) &&
            (_c = At()),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Sc(e, a))));
        break;
      case 22:
        n = e.memoizedState !== null;
        var r = l !== null && l.memoizedState !== null,
          g = Vt,
          N = _e;
        if (
          ((Vt = g || n),
          (_e = N || r),
          ct(t, e),
          (_e = N),
          (Vt = g),
          st(e),
          a & 8192)
        )
          e: for (
            t = e.stateNode,
              t._visibility = n ? t._visibility & -2 : t._visibility | 1,
              n && (l === null || r || Vt || _e || Bl(e)),
              l = null,
              t = e;
            ;
          ) {
            if (t.tag === 5 || t.tag === 26) {
              if (l === null) {
                r = l = t;
                try {
                  if (((i = r.stateNode), n))
                    ((c = i.style),
                      typeof c.setProperty == "function"
                        ? c.setProperty("display", "none", "important")
                        : (c.display = "none"));
                  else {
                    s = r.stateNode;
                    var M = r.memoizedProps.style,
                      p =
                        M != null && M.hasOwnProperty("display")
                          ? M.display
                          : null;
                    s.style.display =
                      p == null || typeof p == "boolean" ? "" : ("" + p).trim();
                  }
                } catch (x) {
                  pe(r, r.return, x);
                }
              }
            } else if (t.tag === 6) {
              if (l === null) {
                r = t;
                try {
                  r.stateNode.nodeValue = n ? "" : r.memoizedProps;
                } catch (x) {
                  pe(r, r.return, x);
                }
              }
            } else if (
              ((t.tag !== 22 && t.tag !== 23) ||
                t.memoizedState === null ||
                t === e) &&
              t.child !== null
            ) {
              ((t.child.return = t), (t = t.child));
              continue;
            }
            if (t === e) break e;
            for (; t.sibling === null; ) {
              if (t.return === null || t.return === e) break e;
              (l === t && (l = null), (t = t.return));
            }
            (l === t && (l = null),
              (t.sibling.return = t.return),
              (t = t.sibling));
          }
        a & 4 &&
          ((a = e.updateQueue),
          a !== null &&
            ((l = a.retryQueue),
            l !== null && ((a.retryQueue = null), Sc(e, l))));
        break;
      case 19:
        (ct(t, e),
          st(e),
          a & 4 &&
            ((a = e.updateQueue),
            a !== null && ((e.updateQueue = null), Sc(e, a))));
        break;
      case 30:
        break;
      case 21:
        break;
      default:
        (ct(t, e), st(e));
    }
  }
  function st(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        for (var l, a = e.return; a !== null; ) {
          if ($r(a)) {
            l = a;
            break;
          }
          a = a.return;
        }
        if (l == null) throw Error(o(160));
        switch (l.tag) {
          case 27:
            var n = l.stateNode,
              i = pc(e);
            Si(e, i, n);
            break;
          case 5:
            var c = l.stateNode;
            l.flags & 32 && (Jl(c, ""), (l.flags &= -33));
            var s = pc(e);
            Si(e, s, c);
            break;
          case 3:
          case 4:
            var r = l.stateNode.containerInfo,
              g = pc(e);
            xc(e, g, r);
            break;
          default:
            throw Error(o(161));
        }
      } catch (N) {
        pe(e, e.return, N);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function no(e) {
    if (e.subtreeFlags & 1024)
      for (e = e.child; e !== null; ) {
        var t = e;
        (no(t),
          t.tag === 5 && t.flags & 1024 && t.stateNode.reset(),
          (e = e.sibling));
      }
  }
  function ul(e, t) {
    if (t.subtreeFlags & 8772)
      for (t = t.child; t !== null; ) (Ir(e, t.alternate, t), (t = t.sibling));
  }
  function Bl(e) {
    for (e = e.child; e !== null; ) {
      var t = e;
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          (il(4, t, t.return), Bl(t));
          break;
        case 1:
          zt(t, t.return);
          var l = t.stateNode;
          (typeof l.componentWillUnmount == "function" && Jr(t, t.return, l),
            Bl(t));
          break;
        case 27:
          xn(t.stateNode);
        case 26:
        case 5:
          (zt(t, t.return), Bl(t));
          break;
        case 22:
          t.memoizedState === null && Bl(t);
          break;
        case 30:
          Bl(t);
          break;
        default:
          Bl(t);
      }
      e = e.sibling;
    }
  }
  function cl(e, t, l) {
    for (l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null; ) {
      var a = t.alternate,
        n = e,
        i = t,
        c = i.flags;
      switch (i.tag) {
        case 0:
        case 11:
        case 15:
          (cl(n, i, l), fn(4, i));
          break;
        case 1:
          if (
            (cl(n, i, l),
            (a = i),
            (n = a.stateNode),
            typeof n.componentDidMount == "function")
          )
            try {
              n.componentDidMount();
            } catch (g) {
              pe(a, a.return, g);
            }
          if (((a = i), (n = a.updateQueue), n !== null)) {
            var s = a.stateNode;
            try {
              var r = n.shared.hiddenCallbacks;
              if (r !== null)
                for (n.shared.hiddenCallbacks = null, n = 0; n < r.length; n++)
                  Uf(r[n], s);
            } catch (g) {
              pe(a, a.return, g);
            }
          }
          (l && c & 64 && kr(i), rn(i, i.return));
          break;
        case 27:
          Pr(i);
        case 26:
        case 5:
          (cl(n, i, l), l && a === null && c & 4 && Wr(i), rn(i, i.return));
          break;
        case 12:
          cl(n, i, l);
          break;
        case 13:
          (cl(n, i, l), l && c & 4 && lo(n, i));
          break;
        case 22:
          (i.memoizedState === null && cl(n, i, l), rn(i, i.return));
          break;
        case 30:
          break;
        default:
          cl(n, i, l);
      }
      t = t.sibling;
    }
  }
  function jc(e, t) {
    var l = null;
    (e !== null &&
      e.memoizedState !== null &&
      e.memoizedState.cachePool !== null &&
      (l = e.memoizedState.cachePool.pool),
      (e = null),
      t.memoizedState !== null &&
        t.memoizedState.cachePool !== null &&
        (e = t.memoizedState.cachePool.pool),
      e !== l && (e != null && e.refCount++, l != null && Ja(l)));
  }
  function Nc(e, t) {
    ((e = null),
      t.alternate !== null && (e = t.alternate.memoizedState.cache),
      (t = t.memoizedState.cache),
      t !== e && (t.refCount++, e != null && Ja(e)));
  }
  function Dt(e, t, l, a) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) (io(e, t, l, a), (t = t.sibling));
  }
  function io(e, t, l, a) {
    var n = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        (Dt(e, t, l, a), n & 2048 && fn(9, t));
        break;
      case 1:
        Dt(e, t, l, a);
        break;
      case 3:
        (Dt(e, t, l, a),
          n & 2048 &&
            ((e = null),
            t.alternate !== null && (e = t.alternate.memoizedState.cache),
            (t = t.memoizedState.cache),
            t !== e && (t.refCount++, e != null && Ja(e))));
        break;
      case 12:
        if (n & 2048) {
          (Dt(e, t, l, a), (e = t.stateNode));
          try {
            var i = t.memoizedProps,
              c = i.id,
              s = i.onPostCommit;
            typeof s == "function" &&
              s(
                c,
                t.alternate === null ? "mount" : "update",
                e.passiveEffectDuration,
                -0,
              );
          } catch (r) {
            pe(t, t.return, r);
          }
        } else Dt(e, t, l, a);
        break;
      case 13:
        Dt(e, t, l, a);
        break;
      case 23:
        break;
      case 22:
        ((i = t.stateNode),
          (c = t.alternate),
          t.memoizedState !== null
            ? i._visibility & 2
              ? Dt(e, t, l, a)
              : on(e, t)
            : i._visibility & 2
              ? Dt(e, t, l, a)
              : ((i._visibility |= 2),
                ha(e, t, l, a, (t.subtreeFlags & 10256) !== 0)),
          n & 2048 && jc(c, t));
        break;
      case 24:
        (Dt(e, t, l, a), n & 2048 && Nc(t.alternate, t));
        break;
      default:
        Dt(e, t, l, a);
    }
  }
  function ha(e, t, l, a, n) {
    for (n = n && (t.subtreeFlags & 10256) !== 0, t = t.child; t !== null; ) {
      var i = e,
        c = t,
        s = l,
        r = a,
        g = c.flags;
      switch (c.tag) {
        case 0:
        case 11:
        case 15:
          (ha(i, c, s, r, n), fn(8, c));
          break;
        case 23:
          break;
        case 22:
          var N = c.stateNode;
          (c.memoizedState !== null
            ? N._visibility & 2
              ? ha(i, c, s, r, n)
              : on(i, c)
            : ((N._visibility |= 2), ha(i, c, s, r, n)),
            n && g & 2048 && jc(c.alternate, c));
          break;
        case 24:
          (ha(i, c, s, r, n), n && g & 2048 && Nc(c.alternate, c));
          break;
        default:
          ha(i, c, s, r, n);
      }
      t = t.sibling;
    }
  }
  function on(e, t) {
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; ) {
        var l = e,
          a = t,
          n = a.flags;
        switch (a.tag) {
          case 22:
            (on(l, a), n & 2048 && jc(a.alternate, a));
            break;
          case 24:
            (on(l, a), n & 2048 && Nc(a.alternate, a));
            break;
          default:
            on(l, a);
        }
        t = t.sibling;
      }
  }
  var dn = 8192;
  function ma(e) {
    if (e.subtreeFlags & dn)
      for (e = e.child; e !== null; ) (uo(e), (e = e.sibling));
  }
  function uo(e) {
    switch (e.tag) {
      case 26:
        (ma(e),
          e.flags & dn &&
            e.memoizedState !== null &&
            l1(Nt, e.memoizedState, e.memoizedProps));
        break;
      case 5:
        ma(e);
        break;
      case 3:
      case 4:
        var t = Nt;
        ((Nt = Ri(e.stateNode.containerInfo)), ma(e), (Nt = t));
        break;
      case 22:
        e.memoizedState === null &&
          ((t = e.alternate),
          t !== null && t.memoizedState !== null
            ? ((t = dn), (dn = 16777216), ma(e), (dn = t))
            : ma(e));
        break;
      default:
        ma(e);
    }
  }
  function co(e) {
    var t = e.alternate;
    if (t !== null && ((e = t.child), e !== null)) {
      t.child = null;
      do ((t = e.sibling), (e.sibling = null), (e = t));
      while (e !== null);
    }
  }
  function hn(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          ((we = a), fo(a, e));
        }
      co(e);
    }
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) (so(e), (e = e.sibling));
  }
  function so(e) {
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        (hn(e), e.flags & 2048 && il(9, e, e.return));
        break;
      case 3:
        hn(e);
        break;
      case 12:
        hn(e);
        break;
      case 22:
        var t = e.stateNode;
        e.memoizedState !== null &&
        t._visibility & 2 &&
        (e.return === null || e.return.tag !== 13)
          ? ((t._visibility &= -3), ji(e))
          : hn(e);
        break;
      default:
        hn(e);
    }
  }
  function ji(e) {
    var t = e.deletions;
    if ((e.flags & 16) !== 0) {
      if (t !== null)
        for (var l = 0; l < t.length; l++) {
          var a = t[l];
          ((we = a), fo(a, e));
        }
      co(e);
    }
    for (e = e.child; e !== null; ) {
      switch (((t = e), t.tag)) {
        case 0:
        case 11:
        case 15:
          (il(8, t, t.return), ji(t));
          break;
        case 22:
          ((l = t.stateNode),
            l._visibility & 2 && ((l._visibility &= -3), ji(t)));
          break;
        default:
          ji(t);
      }
      e = e.sibling;
    }
  }
  function fo(e, t) {
    for (; we !== null; ) {
      var l = we;
      switch (l.tag) {
        case 0:
        case 11:
        case 15:
          il(8, l, t);
          break;
        case 23:
        case 22:
          if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
            var a = l.memoizedState.cachePool.pool;
            a != null && a.refCount++;
          }
          break;
        case 24:
          Ja(l.memoizedState.cache);
      }
      if (((a = l.child), a !== null)) ((a.return = l), (we = a));
      else
        e: for (l = e; we !== null; ) {
          a = we;
          var n = a.sibling,
            i = a.return;
          if ((eo(a), a === l)) {
            we = null;
            break e;
          }
          if (n !== null) {
            ((n.return = i), (we = n));
            break e;
          }
          we = i;
        }
    }
  }
  var p0 = {
      getCacheForType: function (e) {
        var t = We(Re),
          l = t.data.get(e);
        return (l === void 0 && ((l = e()), t.data.set(e, l)), l);
      },
    },
    x0 = typeof WeakMap == "function" ? WeakMap : Map,
    oe = 0,
    xe = null,
    ne = null,
    ue = 0,
    de = 0,
    ft = null,
    sl = !1,
    va = !1,
    Ec = !1,
    kt = 0,
    Ee = 0,
    fl = 0,
    Gl = 0,
    Tc = 0,
    bt = 0,
    ya = 0,
    mn = null,
    lt = null,
    Ac = !1,
    _c = 0,
    Ni = 1 / 0,
    Ei = null,
    rl = null,
    Ze = 0,
    ol = null,
    ga = null,
    pa = 0,
    Mc = 0,
    zc = null,
    ro = null,
    vn = 0,
    Dc = null;
  function rt() {
    if ((oe & 2) !== 0 && ue !== 0) return ue & -ue;
    if (j.T !== null) {
      var e = ia;
      return e !== 0 ? e : Hc();
    }
    return Ts();
  }
  function oo() {
    bt === 0 && (bt = (ue & 536870912) === 0 || fe ? Ss() : 536870912);
    var e = xt.current;
    return (e !== null && (e.flags |= 32), bt);
  }
  function ot(e, t, l) {
    (((e === xe && (de === 2 || de === 9)) || e.cancelPendingCommit !== null) &&
      (xa(e, 0), dl(e, ue, bt, !1)),
      Ca(e, l),
      ((oe & 2) === 0 || e !== xe) &&
        (e === xe &&
          ((oe & 2) === 0 && (Gl |= l), Ee === 4 && dl(e, ue, bt, !1)),
        Ot(e)));
  }
  function ho(e, t, l) {
    if ((oe & 6) !== 0) throw Error(o(327));
    var a = (!l && (t & 124) === 0 && (t & e.expiredLanes) === 0) || Oa(e, t),
      n = a ? j0(e, t) : Uc(e, t, !0),
      i = a;
    do {
      if (n === 0) {
        va && !a && dl(e, t, 0, !1);
        break;
      } else {
        if (((l = e.current.alternate), i && !b0(l))) {
          ((n = Uc(e, t, !1)), (i = !1));
          continue;
        }
        if (n === 2) {
          if (((i = t), e.errorRecoveryDisabledLanes & i)) var c = 0;
          else
            ((c = e.pendingLanes & -536870913),
              (c = c !== 0 ? c : c & 536870912 ? 536870912 : 0));
          if (c !== 0) {
            t = c;
            e: {
              var s = e;
              n = mn;
              var r = s.current.memoizedState.isDehydrated;
              if ((r && (xa(s, c).flags |= 256), (c = Uc(s, c, !1)), c !== 2)) {
                if (Ec && !r) {
                  ((s.errorRecoveryDisabledLanes |= i), (Gl |= i), (n = 4));
                  break e;
                }
                ((i = lt),
                  (lt = n),
                  i !== null &&
                    (lt === null ? (lt = i) : lt.push.apply(lt, i)));
              }
              n = c;
            }
            if (((i = !1), n !== 2)) continue;
          }
        }
        if (n === 1) {
          (xa(e, 0), dl(e, t, 0, !0));
          break;
        }
        e: {
          switch (((a = e), (i = n), i)) {
            case 0:
            case 1:
              throw Error(o(345));
            case 4:
              if ((t & 4194048) !== t) break;
            case 6:
              dl(a, t, bt, !sl);
              break e;
            case 2:
              lt = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(o(329));
          }
          if ((t & 62914560) === t && ((n = _c + 300 - At()), 10 < n)) {
            if ((dl(a, t, bt, !sl), Bn(a, 0, !0) !== 0)) break e;
            a.timeoutHandle = Xo(
              mo.bind(null, a, l, lt, Ei, Ac, t, bt, Gl, ya, sl, i, 2, -0, 0),
              n,
            );
            break e;
          }
          mo(a, l, lt, Ei, Ac, t, bt, Gl, ya, sl, i, 0, -0, 0);
        }
      }
      break;
    } while (!0);
    Ot(e);
  }
  function mo(e, t, l, a, n, i, c, s, r, g, N, M, p, x) {
    if (
      ((e.timeoutHandle = -1),
      (M = t.subtreeFlags),
      (M & 8192 || (M & 16785408) === 16785408) &&
        ((jn = { stylesheets: null, count: 0, unsuspend: t1 }),
        uo(t),
        (M = a1()),
        M !== null))
    ) {
      ((e.cancelPendingCommit = M(
        So.bind(null, e, t, i, l, a, n, c, s, r, N, 1, p, x),
      )),
        dl(e, i, c, !g));
      return;
    }
    So(e, t, i, l, a, n, c, s, r);
  }
  function b0(e) {
    for (var t = e; ; ) {
      var l = t.tag;
      if (
        (l === 0 || l === 11 || l === 15) &&
        t.flags & 16384 &&
        ((l = t.updateQueue), l !== null && ((l = l.stores), l !== null))
      )
        for (var a = 0; a < l.length; a++) {
          var n = l[a],
            i = n.getSnapshot;
          n = n.value;
          try {
            if (!it(i(), n)) return !1;
          } catch {
            return !1;
          }
        }
      if (((l = t.child), t.subtreeFlags & 16384 && l !== null))
        ((l.return = t), (t = l));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function dl(e, t, l, a) {
    ((t &= ~Tc),
      (t &= ~Gl),
      (e.suspendedLanes |= t),
      (e.pingedLanes &= ~t),
      a && (e.warmLanes |= t),
      (a = e.expirationTimes));
    for (var n = t; 0 < n; ) {
      var i = 31 - nt(n),
        c = 1 << i;
      ((a[i] = -1), (n &= ~c));
    }
    l !== 0 && Ns(e, l, t);
  }
  function Ti() {
    return (oe & 6) === 0 ? (yn(0), !1) : !0;
  }
  function Oc() {
    if (ne !== null) {
      if (de === 0) var e = ne.return;
      else ((e = ne), (wt = Dl = null), Ju(e), (oa = null), (un = 0), (e = ne));
      for (; e !== null; ) (Kr(e.alternate, e), (e = e.return));
      ne = null;
    }
  }
  function xa(e, t) {
    var l = e.timeoutHandle;
    (l !== -1 && ((e.timeoutHandle = -1), q0(l)),
      (l = e.cancelPendingCommit),
      l !== null && ((e.cancelPendingCommit = null), l()),
      Oc(),
      (xe = e),
      (ne = l = Gt(e.current, null)),
      (ue = t),
      (de = 0),
      (ft = null),
      (sl = !1),
      (va = Oa(e, t)),
      (Ec = !1),
      (ya = bt = Tc = Gl = fl = Ee = 0),
      (lt = mn = null),
      (Ac = !1),
      (t & 8) !== 0 && (t |= t & 32));
    var a = e.entangledLanes;
    if (a !== 0)
      for (e = e.entanglements, a &= t; 0 < a; ) {
        var n = 31 - nt(a),
          i = 1 << n;
        ((t |= e[n]), (a &= ~i));
      }
    return ((kt = t), kn(), l);
  }
  function vo(e, t) {
    ((te = null),
      (j.H = di),
      t === $a || t === li
        ? ((t = Of()), (de = 3))
        : t === Mf
          ? ((t = Of()), (de = 4))
          : (de =
              t === Cr
                ? 8
                : t !== null &&
                    typeof t == "object" &&
                    typeof t.then == "function"
                  ? 6
                  : 1),
      (ft = t),
      ne === null && ((Ee = 1), gi(e, vt(t, e.current))));
  }
  function yo() {
    var e = j.H;
    return ((j.H = di), e === null ? di : e);
  }
  function go() {
    var e = j.A;
    return ((j.A = p0), e);
  }
  function Cc() {
    ((Ee = 4),
      sl || ((ue & 4194048) !== ue && xt.current !== null) || (va = !0),
      ((fl & 134217727) === 0 && (Gl & 134217727) === 0) ||
        xe === null ||
        dl(xe, ue, bt, !1));
  }
  function Uc(e, t, l) {
    var a = oe;
    oe |= 2;
    var n = yo(),
      i = go();
    ((xe !== e || ue !== t) && ((Ei = null), xa(e, t)), (t = !1));
    var c = Ee;
    e: do
      try {
        if (de !== 0 && ne !== null) {
          var s = ne,
            r = ft;
          switch (de) {
            case 8:
              (Oc(), (c = 6));
              break e;
            case 3:
            case 2:
            case 9:
            case 6:
              xt.current === null && (t = !0);
              var g = de;
              if (((de = 0), (ft = null), ba(e, s, r, g), l && va)) {
                c = 0;
                break e;
              }
              break;
            default:
              ((g = de), (de = 0), (ft = null), ba(e, s, r, g));
          }
        }
        (S0(), (c = Ee));
        break;
      } catch (N) {
        vo(e, N);
      }
    while (!0);
    return (
      t && e.shellSuspendCounter++,
      (wt = Dl = null),
      (oe = a),
      (j.H = n),
      (j.A = i),
      ne === null && ((xe = null), (ue = 0), kn()),
      c
    );
  }
  function S0() {
    for (; ne !== null; ) po(ne);
  }
  function j0(e, t) {
    var l = oe;
    oe |= 2;
    var a = yo(),
      n = go();
    xe !== e || ue !== t
      ? ((Ei = null), (Ni = At() + 500), xa(e, t))
      : (va = Oa(e, t));
    e: do
      try {
        if (de !== 0 && ne !== null) {
          t = ne;
          var i = ft;
          t: switch (de) {
            case 1:
              ((de = 0), (ft = null), ba(e, t, i, 1));
              break;
            case 2:
            case 9:
              if (zf(i)) {
                ((de = 0), (ft = null), xo(t));
                break;
              }
              ((t = function () {
                ((de !== 2 && de !== 9) || xe !== e || (de = 7), Ot(e));
              }),
                i.then(t, t));
              break e;
            case 3:
              de = 7;
              break e;
            case 4:
              de = 5;
              break e;
            case 7:
              zf(i)
                ? ((de = 0), (ft = null), xo(t))
                : ((de = 0), (ft = null), ba(e, t, i, 7));
              break;
            case 5:
              var c = null;
              switch (ne.tag) {
                case 26:
                  c = ne.memoizedState;
                case 5:
                case 27:
                  var s = ne;
                  if (!c || ed(c)) {
                    ((de = 0), (ft = null));
                    var r = s.sibling;
                    if (r !== null) ne = r;
                    else {
                      var g = s.return;
                      g !== null ? ((ne = g), Ai(g)) : (ne = null);
                    }
                    break t;
                  }
              }
              ((de = 0), (ft = null), ba(e, t, i, 5));
              break;
            case 6:
              ((de = 0), (ft = null), ba(e, t, i, 6));
              break;
            case 8:
              (Oc(), (Ee = 6));
              break e;
            default:
              throw Error(o(462));
          }
        }
        N0();
        break;
      } catch (N) {
        vo(e, N);
      }
    while (!0);
    return (
      (wt = Dl = null),
      (j.H = a),
      (j.A = n),
      (oe = l),
      ne !== null ? 0 : ((xe = null), (ue = 0), kn(), Ee)
    );
  }
  function N0() {
    for (; ne !== null && !On(); ) po(ne);
  }
  function po(e) {
    var t = Zr(e.alternate, e, kt);
    ((e.memoizedProps = e.pendingProps), t === null ? Ai(e) : (ne = t));
  }
  function xo(e) {
    var t = e,
      l = t.alternate;
    switch (t.tag) {
      case 15:
      case 0:
        t = qr(l, t, t.pendingProps, t.type, void 0, ue);
        break;
      case 11:
        t = qr(l, t, t.pendingProps, t.type.render, t.ref, ue);
        break;
      case 5:
        Ju(t);
      default:
        (Kr(l, t), (t = ne = xf(t, kt)), (t = Zr(l, t, kt)));
    }
    ((e.memoizedProps = e.pendingProps), t === null ? Ai(e) : (ne = t));
  }
  function ba(e, t, l, a) {
    ((wt = Dl = null), Ju(t), (oa = null), (un = 0));
    var n = t.return;
    try {
      if (d0(e, n, t, l, ue)) {
        ((Ee = 1), gi(e, vt(l, e.current)), (ne = null));
        return;
      }
    } catch (i) {
      if (n !== null) throw ((ne = n), i);
      ((Ee = 1), gi(e, vt(l, e.current)), (ne = null));
      return;
    }
    t.flags & 32768
      ? (fe || a === 1
          ? (e = !0)
          : va || (ue & 536870912) !== 0
            ? (e = !1)
            : ((sl = e = !0),
              (a === 2 || a === 9 || a === 3 || a === 6) &&
                ((a = xt.current),
                a !== null && a.tag === 13 && (a.flags |= 16384))),
        bo(t, e))
      : Ai(t);
  }
  function Ai(e) {
    var t = e;
    do {
      if ((t.flags & 32768) !== 0) {
        bo(t, sl);
        return;
      }
      e = t.return;
      var l = m0(t.alternate, t, kt);
      if (l !== null) {
        ne = l;
        return;
      }
      if (((t = t.sibling), t !== null)) {
        ne = t;
        return;
      }
      ne = t = e;
    } while (t !== null);
    Ee === 0 && (Ee = 5);
  }
  function bo(e, t) {
    do {
      var l = v0(e.alternate, e);
      if (l !== null) {
        ((l.flags &= 32767), (ne = l));
        return;
      }
      if (
        ((l = e.return),
        l !== null &&
          ((l.flags |= 32768), (l.subtreeFlags = 0), (l.deletions = null)),
        !t && ((e = e.sibling), e !== null))
      ) {
        ne = e;
        return;
      }
      ne = e = l;
    } while (e !== null);
    ((Ee = 6), (ne = null));
  }
  function So(e, t, l, a, n, i, c, s, r) {
    e.cancelPendingCommit = null;
    do _i();
    while (Ze !== 0);
    if ((oe & 6) !== 0) throw Error(o(327));
    if (t !== null) {
      if (t === e.current) throw Error(o(177));
      if (
        ((i = t.lanes | t.childLanes),
        (i |= Nu),
        th(e, l, i, c, s, r),
        e === xe && ((ne = xe = null), (ue = 0)),
        (ga = t),
        (ol = e),
        (pa = l),
        (Mc = i),
        (zc = n),
        (ro = a),
        (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
          ? ((e.callbackNode = null),
            (e.callbackPriority = 0),
            _0(Cn, function () {
              return (Ao(), null);
            }))
          : ((e.callbackNode = null), (e.callbackPriority = 0)),
        (a = (t.flags & 13878) !== 0),
        (t.subtreeFlags & 13878) !== 0 || a)
      ) {
        ((a = j.T), (j.T = null), (n = B.p), (B.p = 2), (c = oe), (oe |= 4));
        try {
          y0(e, t, l);
        } finally {
          ((oe = c), (B.p = n), (j.T = a));
        }
      }
      ((Ze = 1), jo(), No(), Eo());
    }
  }
  function jo() {
    if (Ze === 1) {
      Ze = 0;
      var e = ol,
        t = ga,
        l = (t.flags & 13878) !== 0;
      if ((t.subtreeFlags & 13878) !== 0 || l) {
        ((l = j.T), (j.T = null));
        var a = B.p;
        B.p = 2;
        var n = oe;
        oe |= 4;
        try {
          ao(t, e);
          var i = Vc,
            c = ff(e.containerInfo),
            s = i.focusedElem,
            r = i.selectionRange;
          if (
            c !== s &&
            s &&
            s.ownerDocument &&
            sf(s.ownerDocument.documentElement, s)
          ) {
            if (r !== null && pu(s)) {
              var g = r.start,
                N = r.end;
              if ((N === void 0 && (N = g), "selectionStart" in s))
                ((s.selectionStart = g),
                  (s.selectionEnd = Math.min(N, s.value.length)));
              else {
                var M = s.ownerDocument || document,
                  p = (M && M.defaultView) || window;
                if (p.getSelection) {
                  var x = p.getSelection(),
                    $ = s.textContent.length,
                    k = Math.min(r.start, $),
                    ve = r.end === void 0 ? k : Math.min(r.end, $);
                  !x.extend && k > ve && ((c = ve), (ve = k), (k = c));
                  var v = cf(s, k),
                    h = cf(s, ve);
                  if (
                    v &&
                    h &&
                    (x.rangeCount !== 1 ||
                      x.anchorNode !== v.node ||
                      x.anchorOffset !== v.offset ||
                      x.focusNode !== h.node ||
                      x.focusOffset !== h.offset)
                  ) {
                    var y = M.createRange();
                    (y.setStart(v.node, v.offset),
                      x.removeAllRanges(),
                      k > ve
                        ? (x.addRange(y), x.extend(h.node, h.offset))
                        : (y.setEnd(h.node, h.offset), x.addRange(y)));
                  }
                }
              }
            }
            for (M = [], x = s; (x = x.parentNode); )
              x.nodeType === 1 &&
                M.push({ element: x, left: x.scrollLeft, top: x.scrollTop });
            for (
              typeof s.focus == "function" && s.focus(), s = 0;
              s < M.length;
              s++
            ) {
              var E = M[s];
              ((E.element.scrollLeft = E.left), (E.element.scrollTop = E.top));
            }
          }
          ((wi = !!Zc), (Vc = Zc = null));
        } finally {
          ((oe = n), (B.p = a), (j.T = l));
        }
      }
      ((e.current = t), (Ze = 2));
    }
  }
  function No() {
    if (Ze === 2) {
      Ze = 0;
      var e = ol,
        t = ga,
        l = (t.flags & 8772) !== 0;
      if ((t.subtreeFlags & 8772) !== 0 || l) {
        ((l = j.T), (j.T = null));
        var a = B.p;
        B.p = 2;
        var n = oe;
        oe |= 4;
        try {
          Ir(e, t.alternate, t);
        } finally {
          ((oe = n), (B.p = a), (j.T = l));
        }
      }
      Ze = 3;
    }
  }
  function Eo() {
    if (Ze === 4 || Ze === 3) {
      ((Ze = 0), za());
      var e = ol,
        t = ga,
        l = pa,
        a = ro;
      (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0
        ? (Ze = 5)
        : ((Ze = 0), (ga = ol = null), To(e, e.pendingLanes));
      var n = e.pendingLanes;
      if (
        (n === 0 && (rl = null),
        Pi(l),
        (t = t.stateNode),
        at && typeof at.onCommitFiberRoot == "function")
      )
        try {
          at.onCommitFiberRoot(Da, t, void 0, (t.current.flags & 128) === 128);
        } catch {}
      if (a !== null) {
        ((t = j.T), (n = B.p), (B.p = 2), (j.T = null));
        try {
          for (var i = e.onRecoverableError, c = 0; c < a.length; c++) {
            var s = a[c];
            i(s.value, { componentStack: s.stack });
          }
        } finally {
          ((j.T = t), (B.p = n));
        }
      }
      ((pa & 3) !== 0 && _i(),
        Ot(e),
        (n = e.pendingLanes),
        (l & 4194090) !== 0 && (n & 42) !== 0
          ? e === Dc
            ? vn++
            : ((vn = 0), (Dc = e))
          : (vn = 0),
        yn(0));
    }
  }
  function To(e, t) {
    (e.pooledCacheLanes &= t) === 0 &&
      ((t = e.pooledCache), t != null && ((e.pooledCache = null), Ja(t)));
  }
  function _i(e) {
    return (jo(), No(), Eo(), Ao());
  }
  function Ao() {
    if (Ze !== 5) return !1;
    var e = ol,
      t = Mc;
    Mc = 0;
    var l = Pi(pa),
      a = j.T,
      n = B.p;
    try {
      ((B.p = 32 > l ? 32 : l), (j.T = null), (l = zc), (zc = null));
      var i = ol,
        c = pa;
      if (((Ze = 0), (ga = ol = null), (pa = 0), (oe & 6) !== 0))
        throw Error(o(331));
      var s = oe;
      if (
        ((oe |= 4),
        so(i.current),
        io(i, i.current, c, l),
        (oe = s),
        yn(0, !1),
        at && typeof at.onPostCommitFiberRoot == "function")
      )
        try {
          at.onPostCommitFiberRoot(Da, i);
        } catch {}
      return !0;
    } finally {
      ((B.p = n), (j.T = a), To(e, t));
    }
  }
  function _o(e, t, l) {
    ((t = vt(l, t)),
      (t = sc(e.stateNode, t, 2)),
      (e = tl(e, t, 2)),
      e !== null && (Ca(e, 2), Ot(e)));
  }
  function pe(e, t, l) {
    if (e.tag === 3) _o(e, e, l);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          _o(t, e, l);
          break;
        } else if (t.tag === 1) {
          var a = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof a.componentDidCatch == "function" &&
              (rl === null || !rl.has(a)))
          ) {
            ((e = vt(l, e)),
              (l = Dr(2)),
              (a = tl(t, l, 2)),
              a !== null && (Or(l, a, t, e), Ca(a, 2), Ot(a)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Rc(e, t, l) {
    var a = e.pingCache;
    if (a === null) {
      a = e.pingCache = new x0();
      var n = new Set();
      a.set(t, n);
    } else ((n = a.get(t)), n === void 0 && ((n = new Set()), a.set(t, n)));
    n.has(l) ||
      ((Ec = !0), n.add(l), (e = E0.bind(null, e, t, l)), t.then(e, e));
  }
  function E0(e, t, l) {
    var a = e.pingCache;
    (a !== null && a.delete(t),
      (e.pingedLanes |= e.suspendedLanes & l),
      (e.warmLanes &= ~l),
      xe === e &&
        (ue & l) === l &&
        (Ee === 4 || (Ee === 3 && (ue & 62914560) === ue && 300 > At() - _c)
          ? (oe & 2) === 0 && xa(e, 0)
          : (Tc |= l),
        ya === ue && (ya = 0)),
      Ot(e));
  }
  function Mo(e, t) {
    (t === 0 && (t = js()), (e = ta(e, t)), e !== null && (Ca(e, t), Ot(e)));
  }
  function T0(e) {
    var t = e.memoizedState,
      l = 0;
    (t !== null && (l = t.retryLane), Mo(e, l));
  }
  function A0(e, t) {
    var l = 0;
    switch (e.tag) {
      case 13:
        var a = e.stateNode,
          n = e.memoizedState;
        n !== null && (l = n.retryLane);
        break;
      case 19:
        a = e.stateNode;
        break;
      case 22:
        a = e.stateNode._retryCache;
        break;
      default:
        throw Error(o(314));
    }
    (a !== null && a.delete(t), Mo(e, l));
  }
  function _0(e, t) {
    return ce(e, t);
  }
  var Mi = null,
    Sa = null,
    Bc = !1,
    zi = !1,
    Gc = !1,
    Hl = 0;
  function Ot(e) {
    (e !== Sa &&
      e.next === null &&
      (Sa === null ? (Mi = Sa = e) : (Sa = Sa.next = e)),
      (zi = !0),
      Bc || ((Bc = !0), z0()));
  }
  function yn(e, t) {
    if (!Gc && zi) {
      Gc = !0;
      do
        for (var l = !1, a = Mi; a !== null; ) {
          if (e !== 0) {
            var n = a.pendingLanes;
            if (n === 0) var i = 0;
            else {
              var c = a.suspendedLanes,
                s = a.pingedLanes;
              ((i = (1 << (31 - nt(42 | e) + 1)) - 1),
                (i &= n & ~(c & ~s)),
                (i = i & 201326741 ? (i & 201326741) | 1 : i ? i | 2 : 0));
            }
            i !== 0 && ((l = !0), Co(a, i));
          } else
            ((i = ue),
              (i = Bn(
                a,
                a === xe ? i : 0,
                a.cancelPendingCommit !== null || a.timeoutHandle !== -1,
              )),
              (i & 3) === 0 || Oa(a, i) || ((l = !0), Co(a, i)));
          a = a.next;
        }
      while (l);
      Gc = !1;
    }
  }
  function M0() {
    zo();
  }
  function zo() {
    zi = Bc = !1;
    var e = 0;
    Hl !== 0 && (H0() && (e = Hl), (Hl = 0));
    for (var t = At(), l = null, a = Mi; a !== null; ) {
      var n = a.next,
        i = Do(a, t);
      (i === 0
        ? ((a.next = null),
          l === null ? (Mi = n) : (l.next = n),
          n === null && (Sa = l))
        : ((l = a), (e !== 0 || (i & 3) !== 0) && (zi = !0)),
        (a = n));
    }
    yn(e);
  }
  function Do(e, t) {
    for (
      var l = e.suspendedLanes,
        a = e.pingedLanes,
        n = e.expirationTimes,
        i = e.pendingLanes & -62914561;
      0 < i;
    ) {
      var c = 31 - nt(i),
        s = 1 << c,
        r = n[c];
      (r === -1
        ? ((s & l) === 0 || (s & a) !== 0) && (n[c] = eh(s, t))
        : r <= t && (e.expiredLanes |= s),
        (i &= ~s));
    }
    if (
      ((t = xe),
      (l = ue),
      (l = Bn(
        e,
        e === t ? l : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      (a = e.callbackNode),
      l === 0 ||
        (e === t && (de === 2 || de === 9)) ||
        e.cancelPendingCommit !== null)
    )
      return (
        a !== null && a !== null && Xe(a),
        (e.callbackNode = null),
        (e.callbackPriority = 0)
      );
    if ((l & 3) === 0 || Oa(e, l)) {
      if (((t = l & -l), t === e.callbackPriority)) return t;
      switch ((a !== null && Xe(a), Pi(l))) {
        case 2:
        case 8:
          l = xs;
          break;
        case 32:
          l = Cn;
          break;
        case 268435456:
          l = bs;
          break;
        default:
          l = Cn;
      }
      return (
        (a = Oo.bind(null, e)),
        (l = ce(l, a)),
        (e.callbackPriority = t),
        (e.callbackNode = l),
        t
      );
    }
    return (
      a !== null && a !== null && Xe(a),
      (e.callbackPriority = 2),
      (e.callbackNode = null),
      2
    );
  }
  function Oo(e, t) {
    if (Ze !== 0 && Ze !== 5)
      return ((e.callbackNode = null), (e.callbackPriority = 0), null);
    var l = e.callbackNode;
    if (_i() && e.callbackNode !== l) return null;
    var a = ue;
    return (
      (a = Bn(
        e,
        e === xe ? a : 0,
        e.cancelPendingCommit !== null || e.timeoutHandle !== -1,
      )),
      a === 0
        ? null
        : (ho(e, a, t),
          Do(e, At()),
          e.callbackNode != null && e.callbackNode === l
            ? Oo.bind(null, e)
            : null)
    );
  }
  function Co(e, t) {
    if (_i()) return null;
    ho(e, t, !0);
  }
  function z0() {
    w0(function () {
      (oe & 6) !== 0 ? ce(ps, M0) : zo();
    });
  }
  function Hc() {
    return (Hl === 0 && (Hl = Ss()), Hl);
  }
  function Uo(e) {
    return e == null || typeof e == "symbol" || typeof e == "boolean"
      ? null
      : typeof e == "function"
        ? e
        : Yn("" + e);
  }
  function Ro(e, t) {
    var l = t.ownerDocument.createElement("input");
    return (
      (l.name = t.name),
      (l.value = t.value),
      e.id && l.setAttribute("form", e.id),
      t.parentNode.insertBefore(l, t),
      (e = new FormData(e)),
      l.parentNode.removeChild(l),
      e
    );
  }
  function D0(e, t, l, a, n) {
    if (t === "submit" && l && l.stateNode === n) {
      var i = Uo((n[Fe] || null).action),
        c = a.submitter;
      c &&
        ((t = (t = c[Fe] || null)
          ? Uo(t.formAction)
          : c.getAttribute("formAction")),
        t !== null && ((i = t), (c = null)));
      var s = new Zn("action", "action", null, a, n);
      e.push({
        event: s,
        listeners: [
          {
            instance: null,
            listener: function () {
              if (a.defaultPrevented) {
                if (Hl !== 0) {
                  var r = c ? Ro(n, c) : new FormData(n);
                  ac(
                    l,
                    { pending: !0, data: r, method: n.method, action: i },
                    null,
                    r,
                  );
                }
              } else
                typeof i == "function" &&
                  (s.preventDefault(),
                  (r = c ? Ro(n, c) : new FormData(n)),
                  ac(
                    l,
                    { pending: !0, data: r, method: n.method, action: i },
                    i,
                    r,
                  ));
            },
            currentTarget: n,
          },
        ],
      });
    }
  }
  for (var qc = 0; qc < ju.length; qc++) {
    var wc = ju[qc],
      O0 = wc.toLowerCase(),
      C0 = wc[0].toUpperCase() + wc.slice(1);
    jt(O0, "on" + C0);
  }
  (jt(df, "onAnimationEnd"),
    jt(hf, "onAnimationIteration"),
    jt(mf, "onAnimationStart"),
    jt("dblclick", "onDoubleClick"),
    jt("focusin", "onFocus"),
    jt("focusout", "onBlur"),
    jt(Wh, "onTransitionRun"),
    jt($h, "onTransitionStart"),
    jt(Ph, "onTransitionCancel"),
    jt(vf, "onTransitionEnd"),
    Vl("onMouseEnter", ["mouseout", "mouseover"]),
    Vl("onMouseLeave", ["mouseout", "mouseover"]),
    Vl("onPointerEnter", ["pointerout", "pointerover"]),
    Vl("onPointerLeave", ["pointerout", "pointerover"]),
    Sl(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " ",
      ),
    ),
    Sl(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " ",
      ),
    ),
    Sl("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Sl(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" "),
    ),
    Sl(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" "),
    ),
    Sl(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" "),
    ));
  var gn =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " ",
      ),
    U0 = new Set(
      "beforetoggle cancel close invalid load scroll scrollend toggle"
        .split(" ")
        .concat(gn),
    );
  function Bo(e, t) {
    t = (t & 4) !== 0;
    for (var l = 0; l < e.length; l++) {
      var a = e[l],
        n = a.event;
      a = a.listeners;
      e: {
        var i = void 0;
        if (t)
          for (var c = a.length - 1; 0 <= c; c--) {
            var s = a[c],
              r = s.instance,
              g = s.currentTarget;
            if (((s = s.listener), r !== i && n.isPropagationStopped()))
              break e;
            ((i = s), (n.currentTarget = g));
            try {
              i(n);
            } catch (N) {
              yi(N);
            }
            ((n.currentTarget = null), (i = r));
          }
        else
          for (c = 0; c < a.length; c++) {
            if (
              ((s = a[c]),
              (r = s.instance),
              (g = s.currentTarget),
              (s = s.listener),
              r !== i && n.isPropagationStopped())
            )
              break e;
            ((i = s), (n.currentTarget = g));
            try {
              i(n);
            } catch (N) {
              yi(N);
            }
            ((n.currentTarget = null), (i = r));
          }
      }
    }
  }
  function ie(e, t) {
    var l = t[Fi];
    l === void 0 && (l = t[Fi] = new Set());
    var a = e + "__bubble";
    l.has(a) || (Go(t, e, 2, !1), l.add(a));
  }
  function Yc(e, t, l) {
    var a = 0;
    (t && (a |= 4), Go(l, e, a, t));
  }
  var Di = "_reactListening" + Math.random().toString(36).slice(2);
  function Lc(e) {
    if (!e[Di]) {
      ((e[Di] = !0),
        _s.forEach(function (l) {
          l !== "selectionchange" && (U0.has(l) || Yc(l, !1, e), Yc(l, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Di] || ((t[Di] = !0), Yc("selectionchange", !1, t));
    }
  }
  function Go(e, t, l, a) {
    switch (ud(t)) {
      case 2:
        var n = u1;
        break;
      case 8:
        n = c1;
        break;
      default:
        n = ts;
    }
    ((l = n.bind(null, t, l, e)),
      (n = void 0),
      !fu ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (n = !0),
      a
        ? n !== void 0
          ? e.addEventListener(t, l, { capture: !0, passive: n })
          : e.addEventListener(t, l, !0)
        : n !== void 0
          ? e.addEventListener(t, l, { passive: n })
          : e.addEventListener(t, l, !1));
  }
  function Xc(e, t, l, a, n) {
    var i = a;
    if ((t & 1) === 0 && (t & 2) === 0 && a !== null)
      e: for (;;) {
        if (a === null) return;
        var c = a.tag;
        if (c === 3 || c === 4) {
          var s = a.stateNode.containerInfo;
          if (s === n) break;
          if (c === 4)
            for (c = a.return; c !== null; ) {
              var r = c.tag;
              if ((r === 3 || r === 4) && c.stateNode.containerInfo === n)
                return;
              c = c.return;
            }
          for (; s !== null; ) {
            if (((c = Xl(s)), c === null)) return;
            if (((r = c.tag), r === 5 || r === 6 || r === 26 || r === 27)) {
              a = i = c;
              continue e;
            }
            s = s.parentNode;
          }
        }
        a = a.return;
      }
    Ls(function () {
      var g = i,
        N = cu(l),
        M = [];
      e: {
        var p = yf.get(e);
        if (p !== void 0) {
          var x = Zn,
            $ = e;
          switch (e) {
            case "keypress":
              if (Xn(l) === 0) break e;
            case "keydown":
            case "keyup":
              x = _h;
              break;
            case "focusin":
              (($ = "focus"), (x = hu));
              break;
            case "focusout":
              (($ = "blur"), (x = hu));
              break;
            case "beforeblur":
            case "afterblur":
              x = hu;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              x = Zs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              x = vh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              x = Dh;
              break;
            case df:
            case hf:
            case mf:
              x = ph;
              break;
            case vf:
              x = Ch;
              break;
            case "scroll":
            case "scrollend":
              x = hh;
              break;
            case "wheel":
              x = Rh;
              break;
            case "copy":
            case "cut":
            case "paste":
              x = bh;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              x = Ks;
              break;
            case "toggle":
            case "beforetoggle":
              x = Gh;
          }
          var k = (t & 4) !== 0,
            ve = !k && (e === "scroll" || e === "scrollend"),
            v = k ? (p !== null ? p + "Capture" : null) : p;
          k = [];
          for (var h = g, y; h !== null; ) {
            var E = h;
            if (
              ((y = E.stateNode),
              (E = E.tag),
              (E !== 5 && E !== 26 && E !== 27) ||
                y === null ||
                v === null ||
                ((E = Ba(h, v)), E != null && k.push(pn(h, E, y))),
              ve)
            )
              break;
            h = h.return;
          }
          0 < k.length &&
            ((p = new x(p, $, null, l, N)), M.push({ event: p, listeners: k }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((p = e === "mouseover" || e === "pointerover"),
            (x = e === "mouseout" || e === "pointerout"),
            p &&
              l !== uu &&
              ($ = l.relatedTarget || l.fromElement) &&
              (Xl($) || $[Ll]))
          )
            break e;
          if (
            (x || p) &&
            ((p =
              N.window === N
                ? N
                : (p = N.ownerDocument)
                  ? p.defaultView || p.parentWindow
                  : window),
            x
              ? (($ = l.relatedTarget || l.toElement),
                (x = g),
                ($ = $ ? Xl($) : null),
                $ !== null &&
                  ((ve = D($)),
                  (k = $.tag),
                  $ !== ve || (k !== 5 && k !== 27 && k !== 6)) &&
                  ($ = null))
              : ((x = null), ($ = g)),
            x !== $)
          ) {
            if (
              ((k = Zs),
              (E = "onMouseLeave"),
              (v = "onMouseEnter"),
              (h = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((k = Ks),
                (E = "onPointerLeave"),
                (v = "onPointerEnter"),
                (h = "pointer")),
              (ve = x == null ? p : Ra(x)),
              (y = $ == null ? p : Ra($)),
              (p = new k(E, h + "leave", x, l, N)),
              (p.target = ve),
              (p.relatedTarget = y),
              (E = null),
              Xl(N) === g &&
                ((k = new k(v, h + "enter", $, l, N)),
                (k.target = y),
                (k.relatedTarget = ve),
                (E = k)),
              (ve = E),
              x && $)
            )
              t: {
                for (k = x, v = $, h = 0, y = k; y; y = ja(y)) h++;
                for (y = 0, E = v; E; E = ja(E)) y++;
                for (; 0 < h - y; ) ((k = ja(k)), h--);
                for (; 0 < y - h; ) ((v = ja(v)), y--);
                for (; h--; ) {
                  if (k === v || (v !== null && k === v.alternate)) break t;
                  ((k = ja(k)), (v = ja(v)));
                }
                k = null;
              }
            else k = null;
            (x !== null && Ho(M, p, x, k, !1),
              $ !== null && ve !== null && Ho(M, ve, $, k, !0));
          }
        }
        e: {
          if (
            ((p = g ? Ra(g) : window),
            (x = p.nodeName && p.nodeName.toLowerCase()),
            x === "select" || (x === "input" && p.type === "file"))
          )
            var w = ef;
          else if (Fs(p))
            if (tf) w = Kh;
            else {
              w = Zh;
              var ae = Qh;
            }
          else
            ((x = p.nodeName),
              !x ||
              x.toLowerCase() !== "input" ||
              (p.type !== "checkbox" && p.type !== "radio")
                ? g && iu(g.elementType) && (w = ef)
                : (w = Vh));
          if (w && (w = w(e, g))) {
            Is(M, w, l, N);
            break e;
          }
          (ae && ae(e, p, g),
            e === "focusout" &&
              g &&
              p.type === "number" &&
              g.memoizedProps.value != null &&
              nu(p, "number", p.value));
        }
        switch (((ae = g ? Ra(g) : window), e)) {
          case "focusin":
            (Fs(ae) || ae.contentEditable === "true") &&
              ((Fl = ae), (xu = g), (Qa = null));
            break;
          case "focusout":
            Qa = xu = Fl = null;
            break;
          case "mousedown":
            bu = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((bu = !1), rf(M, l, N));
            break;
          case "selectionchange":
            if (Jh) break;
          case "keydown":
          case "keyup":
            rf(M, l, N);
        }
        var V;
        if (vu)
          e: {
            switch (e) {
              case "compositionstart":
                var J = "onCompositionStart";
                break e;
              case "compositionend":
                J = "onCompositionEnd";
                break e;
              case "compositionupdate":
                J = "onCompositionUpdate";
                break e;
            }
            J = void 0;
          }
        else
          Pl
            ? $s(e, l) && (J = "onCompositionEnd")
            : e === "keydown" &&
              l.keyCode === 229 &&
              (J = "onCompositionStart");
        (J &&
          (ks &&
            l.locale !== "ko" &&
            (Pl || J !== "onCompositionStart"
              ? J === "onCompositionEnd" && Pl && (V = Xs())
              : ((Pt = N),
                (ru = "value" in Pt ? Pt.value : Pt.textContent),
                (Pl = !0))),
          (ae = Oi(g, J)),
          0 < ae.length &&
            ((J = new Vs(J, e, null, l, N)),
            M.push({ event: J, listeners: ae }),
            V ? (J.data = V) : ((V = Ps(l)), V !== null && (J.data = V)))),
          (V = qh ? wh(e, l) : Yh(e, l)) &&
            ((J = Oi(g, "onBeforeInput")),
            0 < J.length &&
              ((ae = new Vs("onBeforeInput", "beforeinput", null, l, N)),
              M.push({ event: ae, listeners: J }),
              (ae.data = V))),
          D0(M, e, g, l, N));
      }
      Bo(M, t);
    });
  }
  function pn(e, t, l) {
    return { instance: e, listener: t, currentTarget: l };
  }
  function Oi(e, t) {
    for (var l = t + "Capture", a = []; e !== null; ) {
      var n = e,
        i = n.stateNode;
      if (
        ((n = n.tag),
        (n !== 5 && n !== 26 && n !== 27) ||
          i === null ||
          ((n = Ba(e, l)),
          n != null && a.unshift(pn(e, n, i)),
          (n = Ba(e, t)),
          n != null && a.push(pn(e, n, i))),
        e.tag === 3)
      )
        return a;
      e = e.return;
    }
    return [];
  }
  function ja(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5 && e.tag !== 27);
    return e || null;
  }
  function Ho(e, t, l, a, n) {
    for (var i = t._reactName, c = []; l !== null && l !== a; ) {
      var s = l,
        r = s.alternate,
        g = s.stateNode;
      if (((s = s.tag), r !== null && r === a)) break;
      ((s !== 5 && s !== 26 && s !== 27) ||
        g === null ||
        ((r = g),
        n
          ? ((g = Ba(l, i)), g != null && c.unshift(pn(l, g, r)))
          : n || ((g = Ba(l, i)), g != null && c.push(pn(l, g, r)))),
        (l = l.return));
    }
    c.length !== 0 && e.push({ event: t, listeners: c });
  }
  var R0 = /\r\n?/g,
    B0 = /\u0000|\uFFFD/g;
  function qo(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        R0,
        `
`,
      )
      .replace(B0, "");
  }
  function wo(e, t) {
    return ((t = qo(t)), qo(e) === t);
  }
  function Ci() {}
  function me(e, t, l, a, n, i) {
    switch (l) {
      case "children":
        typeof a == "string"
          ? t === "body" || (t === "textarea" && a === "") || Jl(e, a)
          : (typeof a == "number" || typeof a == "bigint") &&
            t !== "body" &&
            Jl(e, "" + a);
        break;
      case "className":
        Hn(e, "class", a);
        break;
      case "tabIndex":
        Hn(e, "tabindex", a);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        Hn(e, l, a);
        break;
      case "style":
        ws(e, a, i);
        break;
      case "data":
        if (t !== "object") {
          Hn(e, "data", a);
          break;
        }
      case "src":
      case "href":
        if (a === "" && (t !== "a" || l !== "href")) {
          e.removeAttribute(l);
          break;
        }
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "symbol" ||
          typeof a == "boolean"
        ) {
          e.removeAttribute(l);
          break;
        }
        ((a = Yn("" + a)), e.setAttribute(l, a));
        break;
      case "action":
      case "formAction":
        if (typeof a == "function") {
          e.setAttribute(
            l,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')",
          );
          break;
        } else
          typeof i == "function" &&
            (l === "formAction"
              ? (t !== "input" && me(e, t, "name", n.name, n, null),
                me(e, t, "formEncType", n.formEncType, n, null),
                me(e, t, "formMethod", n.formMethod, n, null),
                me(e, t, "formTarget", n.formTarget, n, null))
              : (me(e, t, "encType", n.encType, n, null),
                me(e, t, "method", n.method, n, null),
                me(e, t, "target", n.target, n, null)));
        if (a == null || typeof a == "symbol" || typeof a == "boolean") {
          e.removeAttribute(l);
          break;
        }
        ((a = Yn("" + a)), e.setAttribute(l, a));
        break;
      case "onClick":
        a != null && (e.onclick = Ci);
        break;
      case "onScroll":
        a != null && ie("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ie("scrollend", e);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(o(61));
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(o(60));
            e.innerHTML = l;
          }
        }
        break;
      case "multiple":
        e.multiple = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "muted":
        e.muted = a && typeof a != "function" && typeof a != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (
          a == null ||
          typeof a == "function" ||
          typeof a == "boolean" ||
          typeof a == "symbol"
        ) {
          e.removeAttribute("xlink:href");
          break;
        }
        ((l = Yn("" + a)),
          e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l));
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        a != null && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(l, "" + a)
          : e.removeAttribute(l);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        a && typeof a != "function" && typeof a != "symbol"
          ? e.setAttribute(l, "")
          : e.removeAttribute(l);
        break;
      case "capture":
      case "download":
        a === !0
          ? e.setAttribute(l, "")
          : a !== !1 &&
              a != null &&
              typeof a != "function" &&
              typeof a != "symbol"
            ? e.setAttribute(l, a)
            : e.removeAttribute(l);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        a != null &&
        typeof a != "function" &&
        typeof a != "symbol" &&
        !isNaN(a) &&
        1 <= a
          ? e.setAttribute(l, a)
          : e.removeAttribute(l);
        break;
      case "rowSpan":
      case "start":
        a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a)
          ? e.removeAttribute(l)
          : e.setAttribute(l, a);
        break;
      case "popover":
        (ie("beforetoggle", e), ie("toggle", e), Gn(e, "popover", a));
        break;
      case "xlinkActuate":
        Rt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
        break;
      case "xlinkArcrole":
        Rt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
        break;
      case "xlinkRole":
        Rt(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
        break;
      case "xlinkShow":
        Rt(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
        break;
      case "xlinkTitle":
        Rt(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
        break;
      case "xlinkType":
        Rt(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
        break;
      case "xmlBase":
        Rt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
        break;
      case "xmlLang":
        Rt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
        break;
      case "xmlSpace":
        Rt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
        break;
      case "is":
        Gn(e, "is", a);
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        (!(2 < l.length) ||
          (l[0] !== "o" && l[0] !== "O") ||
          (l[1] !== "n" && l[1] !== "N")) &&
          ((l = oh.get(l) || l), Gn(e, l, a));
    }
  }
  function Qc(e, t, l, a, n, i) {
    switch (l) {
      case "style":
        ws(e, a, i);
        break;
      case "dangerouslySetInnerHTML":
        if (a != null) {
          if (typeof a != "object" || !("__html" in a)) throw Error(o(61));
          if (((l = a.__html), l != null)) {
            if (n.children != null) throw Error(o(60));
            e.innerHTML = l;
          }
        }
        break;
      case "children":
        typeof a == "string"
          ? Jl(e, a)
          : (typeof a == "number" || typeof a == "bigint") && Jl(e, "" + a);
        break;
      case "onScroll":
        a != null && ie("scroll", e);
        break;
      case "onScrollEnd":
        a != null && ie("scrollend", e);
        break;
      case "onClick":
        a != null && (e.onclick = Ci);
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        break;
      case "innerText":
      case "textContent":
        break;
      default:
        if (!Ms.hasOwnProperty(l))
          e: {
            if (
              l[0] === "o" &&
              l[1] === "n" &&
              ((n = l.endsWith("Capture")),
              (t = l.slice(2, n ? l.length - 7 : void 0)),
              (i = e[Fe] || null),
              (i = i != null ? i[l] : null),
              typeof i == "function" && e.removeEventListener(t, i, n),
              typeof a == "function")
            ) {
              (typeof i != "function" &&
                i !== null &&
                (l in e
                  ? (e[l] = null)
                  : e.hasAttribute(l) && e.removeAttribute(l)),
                e.addEventListener(t, a, n));
              break e;
            }
            l in e
              ? (e[l] = a)
              : a === !0
                ? e.setAttribute(l, "")
                : Gn(e, l, a);
          }
    }
  }
  function Ve(e, t, l) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        (ie("error", e), ie("load", e));
        var a = !1,
          n = !1,
          i;
        for (i in l)
          if (l.hasOwnProperty(i)) {
            var c = l[i];
            if (c != null)
              switch (i) {
                case "src":
                  a = !0;
                  break;
                case "srcSet":
                  n = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(o(137, t));
                default:
                  me(e, t, i, c, l, null);
              }
          }
        (n && me(e, t, "srcSet", l.srcSet, l, null),
          a && me(e, t, "src", l.src, l, null));
        return;
      case "input":
        ie("invalid", e);
        var s = (i = c = n = null),
          r = null,
          g = null;
        for (a in l)
          if (l.hasOwnProperty(a)) {
            var N = l[a];
            if (N != null)
              switch (a) {
                case "name":
                  n = N;
                  break;
                case "type":
                  c = N;
                  break;
                case "checked":
                  r = N;
                  break;
                case "defaultChecked":
                  g = N;
                  break;
                case "value":
                  i = N;
                  break;
                case "defaultValue":
                  s = N;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (N != null) throw Error(o(137, t));
                  break;
                default:
                  me(e, t, a, N, l, null);
              }
          }
        (Bs(e, i, s, r, g, c, n, !1), qn(e));
        return;
      case "select":
        (ie("invalid", e), (a = c = i = null));
        for (n in l)
          if (l.hasOwnProperty(n) && ((s = l[n]), s != null))
            switch (n) {
              case "value":
                i = s;
                break;
              case "defaultValue":
                c = s;
                break;
              case "multiple":
                a = s;
              default:
                me(e, t, n, s, l, null);
            }
        ((t = i),
          (l = c),
          (e.multiple = !!a),
          t != null ? kl(e, !!a, t, !1) : l != null && kl(e, !!a, l, !0));
        return;
      case "textarea":
        (ie("invalid", e), (i = n = a = null));
        for (c in l)
          if (l.hasOwnProperty(c) && ((s = l[c]), s != null))
            switch (c) {
              case "value":
                a = s;
                break;
              case "defaultValue":
                n = s;
                break;
              case "children":
                i = s;
                break;
              case "dangerouslySetInnerHTML":
                if (s != null) throw Error(o(91));
                break;
              default:
                me(e, t, c, s, l, null);
            }
        (Hs(e, a, n, i), qn(e));
        return;
      case "option":
        for (r in l)
          l.hasOwnProperty(r) &&
            ((a = l[r]), a != null) &&
            (r === "selected"
              ? (e.selected =
                  a && typeof a != "function" && typeof a != "symbol")
              : me(e, t, r, a, l, null));
        return;
      case "dialog":
        (ie("beforetoggle", e),
          ie("toggle", e),
          ie("cancel", e),
          ie("close", e));
        break;
      case "iframe":
      case "object":
        ie("load", e);
        break;
      case "video":
      case "audio":
        for (a = 0; a < gn.length; a++) ie(gn[a], e);
        break;
      case "image":
        (ie("error", e), ie("load", e));
        break;
      case "details":
        ie("toggle", e);
        break;
      case "embed":
      case "source":
      case "link":
        (ie("error", e), ie("load", e));
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (g in l)
          if (l.hasOwnProperty(g) && ((a = l[g]), a != null))
            switch (g) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(o(137, t));
              default:
                me(e, t, g, a, l, null);
            }
        return;
      default:
        if (iu(t)) {
          for (N in l)
            l.hasOwnProperty(N) &&
              ((a = l[N]), a !== void 0 && Qc(e, t, N, a, l, void 0));
          return;
        }
    }
    for (s in l)
      l.hasOwnProperty(s) && ((a = l[s]), a != null && me(e, t, s, a, l, null));
  }
  function G0(e, t, l, a) {
    switch (t) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var n = null,
          i = null,
          c = null,
          s = null,
          r = null,
          g = null,
          N = null;
        for (x in l) {
          var M = l[x];
          if (l.hasOwnProperty(x) && M != null)
            switch (x) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                r = M;
              default:
                a.hasOwnProperty(x) || me(e, t, x, null, a, M);
            }
        }
        for (var p in a) {
          var x = a[p];
          if (((M = l[p]), a.hasOwnProperty(p) && (x != null || M != null)))
            switch (p) {
              case "type":
                i = x;
                break;
              case "name":
                n = x;
                break;
              case "checked":
                g = x;
                break;
              case "defaultChecked":
                N = x;
                break;
              case "value":
                c = x;
                break;
              case "defaultValue":
                s = x;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (x != null) throw Error(o(137, t));
                break;
              default:
                x !== M && me(e, t, p, x, a, M);
            }
        }
        au(e, c, s, r, g, N, i, n);
        return;
      case "select":
        x = c = s = p = null;
        for (i in l)
          if (((r = l[i]), l.hasOwnProperty(i) && r != null))
            switch (i) {
              case "value":
                break;
              case "multiple":
                x = r;
              default:
                a.hasOwnProperty(i) || me(e, t, i, null, a, r);
            }
        for (n in a)
          if (
            ((i = a[n]),
            (r = l[n]),
            a.hasOwnProperty(n) && (i != null || r != null))
          )
            switch (n) {
              case "value":
                p = i;
                break;
              case "defaultValue":
                s = i;
                break;
              case "multiple":
                c = i;
              default:
                i !== r && me(e, t, n, i, a, r);
            }
        ((t = s),
          (l = c),
          (a = x),
          p != null
            ? kl(e, !!l, p, !1)
            : !!a != !!l &&
              (t != null ? kl(e, !!l, t, !0) : kl(e, !!l, l ? [] : "", !1)));
        return;
      case "textarea":
        x = p = null;
        for (s in l)
          if (
            ((n = l[s]),
            l.hasOwnProperty(s) && n != null && !a.hasOwnProperty(s))
          )
            switch (s) {
              case "value":
                break;
              case "children":
                break;
              default:
                me(e, t, s, null, a, n);
            }
        for (c in a)
          if (
            ((n = a[c]),
            (i = l[c]),
            a.hasOwnProperty(c) && (n != null || i != null))
          )
            switch (c) {
              case "value":
                p = n;
                break;
              case "defaultValue":
                x = n;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(o(91));
                break;
              default:
                n !== i && me(e, t, c, n, a, i);
            }
        Gs(e, p, x);
        return;
      case "option":
        for (var $ in l)
          ((p = l[$]),
            l.hasOwnProperty($) &&
              p != null &&
              !a.hasOwnProperty($) &&
              ($ === "selected" ? (e.selected = !1) : me(e, t, $, null, a, p)));
        for (r in a)
          ((p = a[r]),
            (x = l[r]),
            a.hasOwnProperty(r) &&
              p !== x &&
              (p != null || x != null) &&
              (r === "selected"
                ? (e.selected =
                    p && typeof p != "function" && typeof p != "symbol")
                : me(e, t, r, p, a, x)));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var k in l)
          ((p = l[k]),
            l.hasOwnProperty(k) &&
              p != null &&
              !a.hasOwnProperty(k) &&
              me(e, t, k, null, a, p));
        for (g in a)
          if (
            ((p = a[g]),
            (x = l[g]),
            a.hasOwnProperty(g) && p !== x && (p != null || x != null))
          )
            switch (g) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (p != null) throw Error(o(137, t));
                break;
              default:
                me(e, t, g, p, a, x);
            }
        return;
      default:
        if (iu(t)) {
          for (var ve in l)
            ((p = l[ve]),
              l.hasOwnProperty(ve) &&
                p !== void 0 &&
                !a.hasOwnProperty(ve) &&
                Qc(e, t, ve, void 0, a, p));
          for (N in a)
            ((p = a[N]),
              (x = l[N]),
              !a.hasOwnProperty(N) ||
                p === x ||
                (p === void 0 && x === void 0) ||
                Qc(e, t, N, p, a, x));
          return;
        }
    }
    for (var v in l)
      ((p = l[v]),
        l.hasOwnProperty(v) &&
          p != null &&
          !a.hasOwnProperty(v) &&
          me(e, t, v, null, a, p));
    for (M in a)
      ((p = a[M]),
        (x = l[M]),
        !a.hasOwnProperty(M) ||
          p === x ||
          (p == null && x == null) ||
          me(e, t, M, p, a, x));
  }
  var Zc = null,
    Vc = null;
  function Ui(e) {
    return e.nodeType === 9 ? e : e.ownerDocument;
  }
  function Yo(e) {
    switch (e) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Lo(e, t) {
    if (e === 0)
      switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return e === 1 && t === "foreignObject" ? 0 : e;
  }
  function Kc(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      typeof t.children == "bigint" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var kc = null;
  function H0() {
    var e = window.event;
    return e && e.type === "popstate"
      ? e === kc
        ? !1
        : ((kc = e), !0)
      : ((kc = null), !1);
  }
  var Xo = typeof setTimeout == "function" ? setTimeout : void 0,
    q0 = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Qo = typeof Promise == "function" ? Promise : void 0,
    w0 =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Qo < "u"
          ? function (e) {
              return Qo.resolve(null).then(e).catch(Y0);
            }
          : Xo;
  function Y0(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function hl(e) {
    return e === "head";
  }
  function Zo(e, t) {
    var l = t,
      a = 0,
      n = 0;
    do {
      var i = l.nextSibling;
      if ((e.removeChild(l), i && i.nodeType === 8))
        if (((l = i.data), l === "/$")) {
          if (0 < a && 8 > a) {
            l = a;
            var c = e.ownerDocument;
            if ((l & 1 && xn(c.documentElement), l & 2 && xn(c.body), l & 4))
              for (l = c.head, xn(l), c = l.firstChild; c; ) {
                var s = c.nextSibling,
                  r = c.nodeName;
                (c[Ua] ||
                  r === "SCRIPT" ||
                  r === "STYLE" ||
                  (r === "LINK" && c.rel.toLowerCase() === "stylesheet") ||
                  l.removeChild(c),
                  (c = s));
              }
          }
          if (n === 0) {
            (e.removeChild(i), _n(t));
            return;
          }
          n--;
        } else
          l === "$" || l === "$?" || l === "$!"
            ? n++
            : (a = l.charCodeAt(0) - 48);
      else a = 0;
      l = i;
    } while (l);
    _n(t);
  }
  function Jc(e) {
    var t = e.firstChild;
    for (t && t.nodeType === 10 && (t = t.nextSibling); t; ) {
      var l = t;
      switch (((t = t.nextSibling), l.nodeName)) {
        case "HTML":
        case "HEAD":
        case "BODY":
          (Jc(l), Ii(l));
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (l.rel.toLowerCase() === "stylesheet") continue;
      }
      e.removeChild(l);
    }
  }
  function L0(e, t, l, a) {
    for (; e.nodeType === 1; ) {
      var n = l;
      if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
        if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
      } else if (a) {
        if (!e[Ua])
          switch (t) {
            case "meta":
              if (!e.hasAttribute("itemprop")) break;
              return e;
            case "link":
              if (
                ((i = e.getAttribute("rel")),
                i === "stylesheet" && e.hasAttribute("data-precedence"))
              )
                break;
              if (
                i !== n.rel ||
                e.getAttribute("href") !==
                  (n.href == null || n.href === "" ? null : n.href) ||
                e.getAttribute("crossorigin") !==
                  (n.crossOrigin == null ? null : n.crossOrigin) ||
                e.getAttribute("title") !== (n.title == null ? null : n.title)
              )
                break;
              return e;
            case "style":
              if (e.hasAttribute("data-precedence")) break;
              return e;
            case "script":
              if (
                ((i = e.getAttribute("src")),
                (i !== (n.src == null ? null : n.src) ||
                  e.getAttribute("type") !== (n.type == null ? null : n.type) ||
                  e.getAttribute("crossorigin") !==
                    (n.crossOrigin == null ? null : n.crossOrigin)) &&
                  i &&
                  e.hasAttribute("async") &&
                  !e.hasAttribute("itemprop"))
              )
                break;
              return e;
            default:
              return e;
          }
      } else if (t === "input" && e.type === "hidden") {
        var i = n.name == null ? null : "" + n.name;
        if (n.type === "hidden" && e.getAttribute("name") === i) return e;
      } else return e;
      if (((e = Et(e.nextSibling)), e === null)) break;
    }
    return null;
  }
  function X0(e, t, l) {
    if (t === "") return null;
    for (; e.nodeType !== 3; )
      if (
        ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") &&
          !l) ||
        ((e = Et(e.nextSibling)), e === null)
      )
        return null;
    return e;
  }
  function Wc(e) {
    return (
      e.data === "$!" ||
      (e.data === "$?" && e.ownerDocument.readyState === "complete")
    );
  }
  function Q0(e, t) {
    var l = e.ownerDocument;
    if (e.data !== "$?" || l.readyState === "complete") t();
    else {
      var a = function () {
        (t(), l.removeEventListener("DOMContentLoaded", a));
      };
      (l.addEventListener("DOMContentLoaded", a), (e._reactRetry = a));
    }
  }
  function Et(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (
          ((t = e.data),
          t === "$" || t === "$!" || t === "$?" || t === "F!" || t === "F")
        )
          break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  var $c = null;
  function Vo(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var l = e.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (t === 0) return e;
          t--;
        } else l === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  function Ko(e, t, l) {
    switch (((t = Ui(l)), e)) {
      case "html":
        if (((e = t.documentElement), !e)) throw Error(o(452));
        return e;
      case "head":
        if (((e = t.head), !e)) throw Error(o(453));
        return e;
      case "body":
        if (((e = t.body), !e)) throw Error(o(454));
        return e;
      default:
        throw Error(o(451));
    }
  }
  function xn(e) {
    for (var t = e.attributes; t.length; ) e.removeAttributeNode(t[0]);
    Ii(e);
  }
  var St = new Map(),
    ko = new Set();
  function Ri(e) {
    return typeof e.getRootNode == "function"
      ? e.getRootNode()
      : e.nodeType === 9
        ? e
        : e.ownerDocument;
  }
  var Jt = B.d;
  B.d = { f: Z0, r: V0, D: K0, C: k0, L: J0, m: W0, X: P0, S: $0, M: F0 };
  function Z0() {
    var e = Jt.f(),
      t = Ti();
    return e || t;
  }
  function V0(e) {
    var t = Ql(e);
    t !== null && t.tag === 5 && t.type === "form" ? dr(t) : Jt.r(e);
  }
  var Na = typeof document > "u" ? null : document;
  function Jo(e, t, l) {
    var a = Na;
    if (a && typeof t == "string" && t) {
      var n = mt(t);
      ((n = 'link[rel="' + e + '"][href="' + n + '"]'),
        typeof l == "string" && (n += '[crossorigin="' + l + '"]'),
        ko.has(n) ||
          (ko.add(n),
          (e = { rel: e, crossOrigin: l, href: t }),
          a.querySelector(n) === null &&
            ((t = a.createElement("link")),
            Ve(t, "link", e),
            He(t),
            a.head.appendChild(t))));
    }
  }
  function K0(e) {
    (Jt.D(e), Jo("dns-prefetch", e, null));
  }
  function k0(e, t) {
    (Jt.C(e, t), Jo("preconnect", e, t));
  }
  function J0(e, t, l) {
    Jt.L(e, t, l);
    var a = Na;
    if (a && e && t) {
      var n = 'link[rel="preload"][as="' + mt(t) + '"]';
      t === "image" && l && l.imageSrcSet
        ? ((n += '[imagesrcset="' + mt(l.imageSrcSet) + '"]'),
          typeof l.imageSizes == "string" &&
            (n += '[imagesizes="' + mt(l.imageSizes) + '"]'))
        : (n += '[href="' + mt(e) + '"]');
      var i = n;
      switch (t) {
        case "style":
          i = Ea(e);
          break;
        case "script":
          i = Ta(e);
      }
      St.has(i) ||
        ((e = _(
          {
            rel: "preload",
            href: t === "image" && l && l.imageSrcSet ? void 0 : e,
            as: t,
          },
          l,
        )),
        St.set(i, e),
        a.querySelector(n) !== null ||
          (t === "style" && a.querySelector(bn(i))) ||
          (t === "script" && a.querySelector(Sn(i))) ||
          ((t = a.createElement("link")),
          Ve(t, "link", e),
          He(t),
          a.head.appendChild(t)));
    }
  }
  function W0(e, t) {
    Jt.m(e, t);
    var l = Na;
    if (l && e) {
      var a = t && typeof t.as == "string" ? t.as : "script",
        n =
          'link[rel="modulepreload"][as="' + mt(a) + '"][href="' + mt(e) + '"]',
        i = n;
      switch (a) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          i = Ta(e);
      }
      if (
        !St.has(i) &&
        ((e = _({ rel: "modulepreload", href: e }, t)),
        St.set(i, e),
        l.querySelector(n) === null)
      ) {
        switch (a) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (l.querySelector(Sn(i))) return;
        }
        ((a = l.createElement("link")),
          Ve(a, "link", e),
          He(a),
          l.head.appendChild(a));
      }
    }
  }
  function $0(e, t, l) {
    Jt.S(e, t, l);
    var a = Na;
    if (a && e) {
      var n = Zl(a).hoistableStyles,
        i = Ea(e);
      t = t || "default";
      var c = n.get(i);
      if (!c) {
        var s = { loading: 0, preload: null };
        if ((c = a.querySelector(bn(i)))) s.loading = 5;
        else {
          ((e = _({ rel: "stylesheet", href: e, "data-precedence": t }, l)),
            (l = St.get(i)) && Pc(e, l));
          var r = (c = a.createElement("link"));
          (He(r),
            Ve(r, "link", e),
            (r._p = new Promise(function (g, N) {
              ((r.onload = g), (r.onerror = N));
            })),
            r.addEventListener("load", function () {
              s.loading |= 1;
            }),
            r.addEventListener("error", function () {
              s.loading |= 2;
            }),
            (s.loading |= 4),
            Bi(c, t, a));
        }
        ((c = { type: "stylesheet", instance: c, count: 1, state: s }),
          n.set(i, c));
      }
    }
  }
  function P0(e, t) {
    Jt.X(e, t);
    var l = Na;
    if (l && e) {
      var a = Zl(l).hoistableScripts,
        n = Ta(e),
        i = a.get(n);
      i ||
        ((i = l.querySelector(Sn(n))),
        i ||
          ((e = _({ src: e, async: !0 }, t)),
          (t = St.get(n)) && Fc(e, t),
          (i = l.createElement("script")),
          He(i),
          Ve(i, "link", e),
          l.head.appendChild(i)),
        (i = { type: "script", instance: i, count: 1, state: null }),
        a.set(n, i));
    }
  }
  function F0(e, t) {
    Jt.M(e, t);
    var l = Na;
    if (l && e) {
      var a = Zl(l).hoistableScripts,
        n = Ta(e),
        i = a.get(n);
      i ||
        ((i = l.querySelector(Sn(n))),
        i ||
          ((e = _({ src: e, async: !0, type: "module" }, t)),
          (t = St.get(n)) && Fc(e, t),
          (i = l.createElement("script")),
          He(i),
          Ve(i, "link", e),
          l.head.appendChild(i)),
        (i = { type: "script", instance: i, count: 1, state: null }),
        a.set(n, i));
    }
  }
  function Wo(e, t, l, a) {
    var n = (n = W.current) ? Ri(n) : null;
    if (!n) throw Error(o(446));
    switch (e) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof l.precedence == "string" && typeof l.href == "string"
          ? ((t = Ea(l.href)),
            (l = Zl(n).hoistableStyles),
            (a = l.get(t)),
            a ||
              ((a = { type: "style", instance: null, count: 0, state: null }),
              l.set(t, a)),
            a)
          : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (
          l.rel === "stylesheet" &&
          typeof l.href == "string" &&
          typeof l.precedence == "string"
        ) {
          e = Ea(l.href);
          var i = Zl(n).hoistableStyles,
            c = i.get(e);
          if (
            (c ||
              ((n = n.ownerDocument || n),
              (c = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: { loading: 0, preload: null },
              }),
              i.set(e, c),
              (i = n.querySelector(bn(e))) &&
                !i._p &&
                ((c.instance = i), (c.state.loading = 5)),
              St.has(e) ||
                ((l = {
                  rel: "preload",
                  as: "style",
                  href: l.href,
                  crossOrigin: l.crossOrigin,
                  integrity: l.integrity,
                  media: l.media,
                  hrefLang: l.hrefLang,
                  referrerPolicy: l.referrerPolicy,
                }),
                St.set(e, l),
                i || I0(n, e, l, c.state))),
            t && a === null)
          )
            throw Error(o(528, ""));
          return c;
        }
        if (t && a !== null) throw Error(o(529, ""));
        return null;
      case "script":
        return (
          (t = l.async),
          (l = l.src),
          typeof l == "string" &&
          t &&
          typeof t != "function" &&
          typeof t != "symbol"
            ? ((t = Ta(l)),
              (l = Zl(n).hoistableScripts),
              (a = l.get(t)),
              a ||
                ((a = {
                  type: "script",
                  instance: null,
                  count: 0,
                  state: null,
                }),
                l.set(t, a)),
              a)
            : { type: "void", instance: null, count: 0, state: null }
        );
      default:
        throw Error(o(444, e));
    }
  }
  function Ea(e) {
    return 'href="' + mt(e) + '"';
  }
  function bn(e) {
    return 'link[rel="stylesheet"][' + e + "]";
  }
  function $o(e) {
    return _({}, e, { "data-precedence": e.precedence, precedence: null });
  }
  function I0(e, t, l, a) {
    e.querySelector('link[rel="preload"][as="style"][' + t + "]")
      ? (a.loading = 1)
      : ((t = e.createElement("link")),
        (a.preload = t),
        t.addEventListener("load", function () {
          return (a.loading |= 1);
        }),
        t.addEventListener("error", function () {
          return (a.loading |= 2);
        }),
        Ve(t, "link", l),
        He(t),
        e.head.appendChild(t));
  }
  function Ta(e) {
    return '[src="' + mt(e) + '"]';
  }
  function Sn(e) {
    return "script[async]" + e;
  }
  function Po(e, t, l) {
    if ((t.count++, t.instance === null))
      switch (t.type) {
        case "style":
          var a = e.querySelector('style[data-href~="' + mt(l.href) + '"]');
          if (a) return ((t.instance = a), He(a), a);
          var n = _({}, l, {
            "data-href": l.href,
            "data-precedence": l.precedence,
            href: null,
            precedence: null,
          });
          return (
            (a = (e.ownerDocument || e).createElement("style")),
            He(a),
            Ve(a, "style", n),
            Bi(a, l.precedence, e),
            (t.instance = a)
          );
        case "stylesheet":
          n = Ea(l.href);
          var i = e.querySelector(bn(n));
          if (i) return ((t.state.loading |= 4), (t.instance = i), He(i), i);
          ((a = $o(l)),
            (n = St.get(n)) && Pc(a, n),
            (i = (e.ownerDocument || e).createElement("link")),
            He(i));
          var c = i;
          return (
            (c._p = new Promise(function (s, r) {
              ((c.onload = s), (c.onerror = r));
            })),
            Ve(i, "link", a),
            (t.state.loading |= 4),
            Bi(i, l.precedence, e),
            (t.instance = i)
          );
        case "script":
          return (
            (i = Ta(l.src)),
            (n = e.querySelector(Sn(i)))
              ? ((t.instance = n), He(n), n)
              : ((a = l),
                (n = St.get(i)) && ((a = _({}, l)), Fc(a, n)),
                (e = e.ownerDocument || e),
                (n = e.createElement("script")),
                He(n),
                Ve(n, "link", a),
                e.head.appendChild(n),
                (t.instance = n))
          );
        case "void":
          return null;
        default:
          throw Error(o(443, t.type));
      }
    else
      t.type === "stylesheet" &&
        (t.state.loading & 4) === 0 &&
        ((a = t.instance), (t.state.loading |= 4), Bi(a, l.precedence, e));
    return t.instance;
  }
  function Bi(e, t, l) {
    for (
      var a = l.querySelectorAll(
          'link[rel="stylesheet"][data-precedence],style[data-precedence]',
        ),
        n = a.length ? a[a.length - 1] : null,
        i = n,
        c = 0;
      c < a.length;
      c++
    ) {
      var s = a[c];
      if (s.dataset.precedence === t) i = s;
      else if (i !== n) break;
    }
    i
      ? i.parentNode.insertBefore(e, i.nextSibling)
      : ((t = l.nodeType === 9 ? l.head : l), t.insertBefore(e, t.firstChild));
  }
  function Pc(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.title == null && (e.title = t.title));
  }
  function Fc(e, t) {
    (e.crossOrigin == null && (e.crossOrigin = t.crossOrigin),
      e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy),
      e.integrity == null && (e.integrity = t.integrity));
  }
  var Gi = null;
  function Fo(e, t, l) {
    if (Gi === null) {
      var a = new Map(),
        n = (Gi = new Map());
      n.set(l, a);
    } else ((n = Gi), (a = n.get(l)), a || ((a = new Map()), n.set(l, a)));
    if (a.has(e)) return a;
    for (
      a.set(e, null), l = l.getElementsByTagName(e), n = 0;
      n < l.length;
      n++
    ) {
      var i = l[n];
      if (
        !(
          i[Ua] ||
          i[Je] ||
          (e === "link" && i.getAttribute("rel") === "stylesheet")
        ) &&
        i.namespaceURI !== "http://www.w3.org/2000/svg"
      ) {
        var c = i.getAttribute(t) || "";
        c = e + c;
        var s = a.get(c);
        s ? s.push(i) : a.set(c, [i]);
      }
    }
    return a;
  }
  function Io(e, t, l) {
    ((e = e.ownerDocument || e),
      e.head.insertBefore(
        l,
        t === "title" ? e.querySelector("head > title") : null,
      ));
  }
  function e1(e, t, l) {
    if (l === 1 || t.itemProp != null) return !1;
    switch (e) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (
          typeof t.precedence != "string" ||
          typeof t.href != "string" ||
          t.href === ""
        )
          break;
        return !0;
      case "link":
        if (
          typeof t.rel != "string" ||
          typeof t.href != "string" ||
          t.href === "" ||
          t.onLoad ||
          t.onError
        )
          break;
        return t.rel === "stylesheet"
          ? ((e = t.disabled), typeof t.precedence == "string" && e == null)
          : !0;
      case "script":
        if (
          t.async &&
          typeof t.async != "function" &&
          typeof t.async != "symbol" &&
          !t.onLoad &&
          !t.onError &&
          t.src &&
          typeof t.src == "string"
        )
          return !0;
    }
    return !1;
  }
  function ed(e) {
    return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
  }
  var jn = null;
  function t1() {}
  function l1(e, t, l) {
    if (jn === null) throw Error(o(475));
    var a = jn;
    if (
      t.type === "stylesheet" &&
      (typeof l.media != "string" || matchMedia(l.media).matches !== !1) &&
      (t.state.loading & 4) === 0
    ) {
      if (t.instance === null) {
        var n = Ea(l.href),
          i = e.querySelector(bn(n));
        if (i) {
          ((e = i._p),
            e !== null &&
              typeof e == "object" &&
              typeof e.then == "function" &&
              (a.count++, (a = Hi.bind(a)), e.then(a, a)),
            (t.state.loading |= 4),
            (t.instance = i),
            He(i));
          return;
        }
        ((i = e.ownerDocument || e),
          (l = $o(l)),
          (n = St.get(n)) && Pc(l, n),
          (i = i.createElement("link")),
          He(i));
        var c = i;
        ((c._p = new Promise(function (s, r) {
          ((c.onload = s), (c.onerror = r));
        })),
          Ve(i, "link", l),
          (t.instance = i));
      }
      (a.stylesheets === null && (a.stylesheets = new Map()),
        a.stylesheets.set(t, e),
        (e = t.state.preload) &&
          (t.state.loading & 3) === 0 &&
          (a.count++,
          (t = Hi.bind(a)),
          e.addEventListener("load", t),
          e.addEventListener("error", t)));
    }
  }
  function a1() {
    if (jn === null) throw Error(o(475));
    var e = jn;
    return (
      e.stylesheets && e.count === 0 && Ic(e, e.stylesheets),
      0 < e.count
        ? function (t) {
            var l = setTimeout(function () {
              if ((e.stylesheets && Ic(e, e.stylesheets), e.unsuspend)) {
                var a = e.unsuspend;
                ((e.unsuspend = null), a());
              }
            }, 6e4);
            return (
              (e.unsuspend = t),
              function () {
                ((e.unsuspend = null), clearTimeout(l));
              }
            );
          }
        : null
    );
  }
  function Hi() {
    if ((this.count--, this.count === 0)) {
      if (this.stylesheets) Ic(this, this.stylesheets);
      else if (this.unsuspend) {
        var e = this.unsuspend;
        ((this.unsuspend = null), e());
      }
    }
  }
  var qi = null;
  function Ic(e, t) {
    ((e.stylesheets = null),
      e.unsuspend !== null &&
        (e.count++,
        (qi = new Map()),
        t.forEach(n1, e),
        (qi = null),
        Hi.call(e)));
  }
  function n1(e, t) {
    if (!(t.state.loading & 4)) {
      var l = qi.get(e);
      if (l) var a = l.get(null);
      else {
        ((l = new Map()), qi.set(e, l));
        for (
          var n = e.querySelectorAll(
              "link[data-precedence],style[data-precedence]",
            ),
            i = 0;
          i < n.length;
          i++
        ) {
          var c = n[i];
          (c.nodeName === "LINK" || c.getAttribute("media") !== "not all") &&
            (l.set(c.dataset.precedence, c), (a = c));
        }
        a && l.set(null, a);
      }
      ((n = t.instance),
        (c = n.getAttribute("data-precedence")),
        (i = l.get(c) || a),
        i === a && l.set(null, n),
        l.set(c, n),
        this.count++,
        (a = Hi.bind(this)),
        n.addEventListener("load", a),
        n.addEventListener("error", a),
        i
          ? i.parentNode.insertBefore(n, i.nextSibling)
          : ((e = e.nodeType === 9 ? e.head : e),
            e.insertBefore(n, e.firstChild)),
        (t.state.loading |= 4));
    }
  }
  var Nn = {
    $$typeof: je,
    Provider: null,
    Consumer: null,
    _currentValue: Q,
    _currentValue2: Q,
    _threadCount: 0,
  };
  function i1(e, t, l, a, n, i, c, s) {
    ((this.tag = 1),
      (this.containerInfo = e),
      (this.pingCache = this.current = this.pendingChildren = null),
      (this.timeoutHandle = -1),
      (this.callbackNode =
        this.next =
        this.pendingContext =
        this.context =
        this.cancelPendingCommit =
          null),
      (this.callbackPriority = 0),
      (this.expirationTimes = Wi(-1)),
      (this.entangledLanes =
        this.shellSuspendCounter =
        this.errorRecoveryDisabledLanes =
        this.expiredLanes =
        this.warmLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Wi(0)),
      (this.hiddenUpdates = Wi(null)),
      (this.identifierPrefix = a),
      (this.onUncaughtError = n),
      (this.onCaughtError = i),
      (this.onRecoverableError = c),
      (this.pooledCache = null),
      (this.pooledCacheLanes = 0),
      (this.formState = s),
      (this.incompleteTransitions = new Map()));
  }
  function td(e, t, l, a, n, i, c, s, r, g, N, M) {
    return (
      (e = new i1(e, t, l, c, s, r, g, M)),
      (t = 1),
      i === !0 && (t |= 24),
      (i = ut(3, null, null, t)),
      (e.current = i),
      (i.stateNode = e),
      (t = Ru()),
      t.refCount++,
      (e.pooledCache = t),
      t.refCount++,
      (i.memoizedState = { element: a, isDehydrated: l, cache: t }),
      qu(i),
      e
    );
  }
  function ld(e) {
    return e ? ((e = la), e) : la;
  }
  function ad(e, t, l, a, n, i) {
    ((n = ld(n)),
      a.context === null ? (a.context = n) : (a.pendingContext = n),
      (a = el(t)),
      (a.payload = { element: l }),
      (i = i === void 0 ? null : i),
      i !== null && (a.callback = i),
      (l = tl(e, a, t)),
      l !== null && (ot(l, e, t), Fa(l, e, t)));
  }
  function nd(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var l = e.retryLane;
      e.retryLane = l !== 0 && l < t ? l : t;
    }
  }
  function es(e, t) {
    (nd(e, t), (e = e.alternate) && nd(e, t));
  }
  function id(e) {
    if (e.tag === 13) {
      var t = ta(e, 67108864);
      (t !== null && ot(t, e, 67108864), es(e, 67108864));
    }
  }
  var wi = !0;
  function u1(e, t, l, a) {
    var n = j.T;
    j.T = null;
    var i = B.p;
    try {
      ((B.p = 2), ts(e, t, l, a));
    } finally {
      ((B.p = i), (j.T = n));
    }
  }
  function c1(e, t, l, a) {
    var n = j.T;
    j.T = null;
    var i = B.p;
    try {
      ((B.p = 8), ts(e, t, l, a));
    } finally {
      ((B.p = i), (j.T = n));
    }
  }
  function ts(e, t, l, a) {
    if (wi) {
      var n = ls(a);
      if (n === null) (Xc(e, t, a, Yi, l), cd(e, a));
      else if (f1(n, e, t, l, a)) a.stopPropagation();
      else if ((cd(e, a), t & 4 && -1 < s1.indexOf(e))) {
        for (; n !== null; ) {
          var i = Ql(n);
          if (i !== null)
            switch (i.tag) {
              case 3:
                if (((i = i.stateNode), i.current.memoizedState.isDehydrated)) {
                  var c = bl(i.pendingLanes);
                  if (c !== 0) {
                    var s = i;
                    for (s.pendingLanes |= 2, s.entangledLanes |= 2; c; ) {
                      var r = 1 << (31 - nt(c));
                      ((s.entanglements[1] |= r), (c &= ~r));
                    }
                    (Ot(i), (oe & 6) === 0 && ((Ni = At() + 500), yn(0)));
                  }
                }
                break;
              case 13:
                ((s = ta(i, 2)), s !== null && ot(s, i, 2), Ti(), es(i, 2));
            }
          if (((i = ls(a)), i === null && Xc(e, t, a, Yi, l), i === n)) break;
          n = i;
        }
        n !== null && a.stopPropagation();
      } else Xc(e, t, a, null, l);
    }
  }
  function ls(e) {
    return ((e = cu(e)), as(e));
  }
  var Yi = null;
  function as(e) {
    if (((Yi = null), (e = Xl(e)), e !== null)) {
      var t = D(e);
      if (t === null) e = null;
      else {
        var l = t.tag;
        if (l === 13) {
          if (((e = U(t)), e !== null)) return e;
          e = null;
        } else if (l === 3) {
          if (t.stateNode.current.memoizedState.isDehydrated)
            return t.tag === 3 ? t.stateNode.containerInfo : null;
          e = null;
        } else t !== e && (e = null);
      }
    }
    return ((Yi = e), null);
  }
  function ud(e) {
    switch (e) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (kd()) {
          case ps:
            return 2;
          case xs:
            return 8;
          case Cn:
          case Jd:
            return 32;
          case bs:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var ns = !1,
    ml = null,
    vl = null,
    yl = null,
    En = new Map(),
    Tn = new Map(),
    gl = [],
    s1 =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
        " ",
      );
  function cd(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        ml = null;
        break;
      case "dragenter":
      case "dragleave":
        vl = null;
        break;
      case "mouseover":
      case "mouseout":
        yl = null;
        break;
      case "pointerover":
      case "pointerout":
        En.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Tn.delete(t.pointerId);
    }
  }
  function An(e, t, l, a, n, i) {
    return e === null || e.nativeEvent !== i
      ? ((e = {
          blockedOn: t,
          domEventName: l,
          eventSystemFlags: a,
          nativeEvent: i,
          targetContainers: [n],
        }),
        t !== null && ((t = Ql(t)), t !== null && id(t)),
        e)
      : ((e.eventSystemFlags |= a),
        (t = e.targetContainers),
        n !== null && t.indexOf(n) === -1 && t.push(n),
        e);
  }
  function f1(e, t, l, a, n) {
    switch (t) {
      case "focusin":
        return ((ml = An(ml, e, t, l, a, n)), !0);
      case "dragenter":
        return ((vl = An(vl, e, t, l, a, n)), !0);
      case "mouseover":
        return ((yl = An(yl, e, t, l, a, n)), !0);
      case "pointerover":
        var i = n.pointerId;
        return (En.set(i, An(En.get(i) || null, e, t, l, a, n)), !0);
      case "gotpointercapture":
        return (
          (i = n.pointerId),
          Tn.set(i, An(Tn.get(i) || null, e, t, l, a, n)),
          !0
        );
    }
    return !1;
  }
  function sd(e) {
    var t = Xl(e.target);
    if (t !== null) {
      var l = D(t);
      if (l !== null) {
        if (((t = l.tag), t === 13)) {
          if (((t = U(l)), t !== null)) {
            ((e.blockedOn = t),
              lh(e.priority, function () {
                if (l.tag === 13) {
                  var a = rt();
                  a = $i(a);
                  var n = ta(l, a);
                  (n !== null && ot(n, l, a), es(l, a));
                }
              }));
            return;
          }
        } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function Li(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var l = ls(e.nativeEvent);
      if (l === null) {
        l = e.nativeEvent;
        var a = new l.constructor(l.type, l);
        ((uu = a), l.target.dispatchEvent(a), (uu = null));
      } else return ((t = Ql(l)), t !== null && id(t), (e.blockedOn = l), !1);
      t.shift();
    }
    return !0;
  }
  function fd(e, t, l) {
    Li(e) && l.delete(t);
  }
  function r1() {
    ((ns = !1),
      ml !== null && Li(ml) && (ml = null),
      vl !== null && Li(vl) && (vl = null),
      yl !== null && Li(yl) && (yl = null),
      En.forEach(fd),
      Tn.forEach(fd));
  }
  function Xi(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      ns ||
        ((ns = !0),
        f.unstable_scheduleCallback(f.unstable_NormalPriority, r1)));
  }
  var Qi = null;
  function rd(e) {
    Qi !== e &&
      ((Qi = e),
      f.unstable_scheduleCallback(f.unstable_NormalPriority, function () {
        Qi === e && (Qi = null);
        for (var t = 0; t < e.length; t += 3) {
          var l = e[t],
            a = e[t + 1],
            n = e[t + 2];
          if (typeof a != "function") {
            if (as(a || l) === null) continue;
            break;
          }
          var i = Ql(l);
          i !== null &&
            (e.splice(t, 3),
            (t -= 3),
            ac(i, { pending: !0, data: n, method: l.method, action: a }, a, n));
        }
      }));
  }
  function _n(e) {
    function t(r) {
      return Xi(r, e);
    }
    (ml !== null && Xi(ml, e),
      vl !== null && Xi(vl, e),
      yl !== null && Xi(yl, e),
      En.forEach(t),
      Tn.forEach(t));
    for (var l = 0; l < gl.length; l++) {
      var a = gl[l];
      a.blockedOn === e && (a.blockedOn = null);
    }
    for (; 0 < gl.length && ((l = gl[0]), l.blockedOn === null); )
      (sd(l), l.blockedOn === null && gl.shift());
    if (((l = (e.ownerDocument || e).$$reactFormReplay), l != null))
      for (a = 0; a < l.length; a += 3) {
        var n = l[a],
          i = l[a + 1],
          c = n[Fe] || null;
        if (typeof i == "function") c || rd(l);
        else if (c) {
          var s = null;
          if (i && i.hasAttribute("formAction")) {
            if (((n = i), (c = i[Fe] || null))) s = c.formAction;
            else if (as(n) !== null) continue;
          } else s = c.action;
          (typeof s == "function" ? (l[a + 1] = s) : (l.splice(a, 3), (a -= 3)),
            rd(l));
        }
      }
  }
  function is(e) {
    this._internalRoot = e;
  }
  ((Zi.prototype.render = is.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(o(409));
      var l = t.current,
        a = rt();
      ad(l, a, e, t, null, null);
    }),
    (Zi.prototype.unmount = is.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (ad(e.current, 2, null, e, null, null), Ti(), (t[Ll] = null));
        }
      }));
  function Zi(e) {
    this._internalRoot = e;
  }
  Zi.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = Ts();
      e = { blockedOn: null, target: e, priority: t };
      for (var l = 0; l < gl.length && t !== 0 && t < gl[l].priority; l++);
      (gl.splice(l, 0, e), l === 0 && sd(e));
    }
  };
  var od = m.version;
  if (od !== "19.1.0") throw Error(o(527, od, "19.1.0"));
  B.findDOMNode = function (e) {
    var t = e._reactInternals;
    if (t === void 0)
      throw typeof e.render == "function"
        ? Error(o(188))
        : ((e = Object.keys(e).join(",")), Error(o(268, e)));
    return (
      (e = A(t)),
      (e = e !== null ? b(e) : null),
      (e = e === null ? null : e.stateNode),
      e
    );
  };
  var o1 = {
    bundleType: 0,
    version: "19.1.0",
    rendererPackageName: "react-dom",
    currentDispatcherRef: j,
    reconcilerVersion: "19.1.0",
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Vi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Vi.isDisabled && Vi.supportsFiber)
      try {
        ((Da = Vi.inject(o1)), (at = Vi));
      } catch {}
  }
  return (
    (zn.createRoot = function (e, t) {
      if (!T(e)) throw Error(o(299));
      var l = !1,
        a = "",
        n = Ar,
        i = _r,
        c = Mr,
        s = null;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (l = !0),
          t.identifierPrefix !== void 0 && (a = t.identifierPrefix),
          t.onUncaughtError !== void 0 && (n = t.onUncaughtError),
          t.onCaughtError !== void 0 && (i = t.onCaughtError),
          t.onRecoverableError !== void 0 && (c = t.onRecoverableError),
          t.unstable_transitionCallbacks !== void 0 &&
            (s = t.unstable_transitionCallbacks)),
        (t = td(e, 1, !1, null, null, l, a, n, i, c, s, null)),
        (e[Ll] = t.current),
        Lc(e),
        new is(t)
      );
    }),
    (zn.hydrateRoot = function (e, t, l) {
      if (!T(e)) throw Error(o(299));
      var a = !1,
        n = "",
        i = Ar,
        c = _r,
        s = Mr,
        r = null,
        g = null;
      return (
        l != null &&
          (l.unstable_strictMode === !0 && (a = !0),
          l.identifierPrefix !== void 0 && (n = l.identifierPrefix),
          l.onUncaughtError !== void 0 && (i = l.onUncaughtError),
          l.onCaughtError !== void 0 && (c = l.onCaughtError),
          l.onRecoverableError !== void 0 && (s = l.onRecoverableError),
          l.unstable_transitionCallbacks !== void 0 &&
            (r = l.unstable_transitionCallbacks),
          l.formState !== void 0 && (g = l.formState)),
        (t = td(e, 1, !0, t, l ?? null, a, n, i, c, s, r, g)),
        (t.context = ld(null)),
        (l = t.current),
        (a = rt()),
        (a = $i(a)),
        (n = el(a)),
        (n.callback = null),
        tl(l, n, a),
        (l = a),
        (t.current.lanes = l),
        Ca(t, l),
        Ot(t),
        (e[Ll] = t.current),
        Lc(e),
        new Zi(t)
      );
    }),
    (zn.version = "19.1.0"),
    zn
  );
}
var Sd;
function N1() {
  if (Sd) return cs.exports;
  Sd = 1;
  function f() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (m) {
        console.error(m);
      }
  }
  return (f(), (cs.exports = j1()), cs.exports);
}
var E1 = N1(),
  q = ki();
const T1 = m1(q),
  A1 = h1({ __proto__: null, default: T1 }, [q]);
function _1(f, m) {
  if (f instanceof RegExp) return { keys: !1, pattern: f };
  var S,
    o,
    T,
    D,
    U = [],
    Z = "",
    A = f.split("/");
  for (A[0] || A.shift(); (T = A.shift()); )
    ((S = T[0]),
      S === "*"
        ? (U.push(S), (Z += T[1] === "?" ? "(?:/(.*))?" : "/(.*)"))
        : S === ":"
          ? ((o = T.indexOf("?", 1)),
            (D = T.indexOf(".", 1)),
            U.push(T.substring(1, ~o ? o : ~D ? D : T.length)),
            (Z += ~o && !~D ? "(?:/([^/]+?))?" : "/([^/]+?)"),
            ~D && (Z += (~o ? "?" : "") + "\\" + T.substring(D)))
          : (Z += "/" + T));
  return {
    keys: U,
    pattern: new RegExp("^" + Z + (m ? "(?=$|/)" : "/?$"), "i"),
  };
}
var ds = { exports: {} },
  hs = {};
var jd;
function M1() {
  if (jd) return hs;
  jd = 1;
  var f = ki();
  function m(O, X) {
    return (O === X && (O !== 0 || 1 / O === 1 / X)) || (O !== O && X !== X);
  }
  var S = typeof Object.is == "function" ? Object.is : m,
    o = f.useState,
    T = f.useEffect,
    D = f.useLayoutEffect,
    U = f.useDebugValue;
  function Z(O, X) {
    var H = X(),
      L = o({ inst: { value: H, getSnapshot: X } }),
      P = L[0].inst,
      F = L[1];
    return (
      D(
        function () {
          ((P.value = H), (P.getSnapshot = X), A(P) && F({ inst: P }));
        },
        [O, H, X],
      ),
      T(
        function () {
          return (
            A(P) && F({ inst: P }),
            O(function () {
              A(P) && F({ inst: P });
            })
          );
        },
        [O],
      ),
      U(H),
      H
    );
  }
  function A(O) {
    var X = O.getSnapshot;
    O = O.value;
    try {
      var H = X();
      return !S(O, H);
    } catch {
      return !0;
    }
  }
  function b(O, X) {
    return X();
  }
  var _ =
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
      ? b
      : Z;
  return (
    (hs.useSyncExternalStore =
      f.useSyncExternalStore !== void 0 ? f.useSyncExternalStore : _),
    hs
  );
}
var Nd;
function z1() {
  return (Nd || ((Nd = 1), (ds.exports = M1())), ds.exports);
}
var D1 = z1();
const O1 = A1.useInsertionEffect,
  C1 =
    typeof window < "u" &&
    typeof window.document < "u" &&
    typeof window.document.createElement < "u",
  U1 = C1 ? q.useLayoutEffect : q.useEffect,
  R1 = O1 || U1,
  Rd = (f) => {
    const m = q.useRef([f, (...S) => m[0](...S)]).current;
    return (
      R1(() => {
        m[0] = f;
      }),
      m[1]
    );
  },
  B1 = "popstate",
  vs = "pushState",
  ys = "replaceState",
  G1 = "hashchange",
  Ed = [B1, vs, ys, G1],
  H1 = (f) => {
    for (const m of Ed) addEventListener(m, f);
    return () => {
      for (const m of Ed) removeEventListener(m, f);
    };
  },
  Bd = (f, m) => D1.useSyncExternalStore(H1, f, m),
  Td = () => location.search,
  q1 = ({ ssrSearch: f } = {}) => Bd(Td, f != null ? () => f : Td),
  Ad = () => location.pathname,
  w1 = ({ ssrPath: f } = {}) => Bd(Ad, f != null ? () => f : Ad),
  Y1 = (f, { replace: m = !1, state: S = null } = {}) =>
    history[m ? ys : vs](S, "", f),
  L1 = (f = {}) => [w1(f), Y1],
  _d = Symbol.for("wouter_v3");
if (typeof history < "u" && typeof window[_d] > "u") {
  for (const f of [vs, ys]) {
    const m = history[f];
    history[f] = function () {
      const S = m.apply(this, arguments),
        o = new Event(f);
      return ((o.arguments = arguments), dispatchEvent(o), S);
    };
  }
  Object.defineProperty(window, _d, { value: !0 });
}
const X1 = (f, m) =>
    m.toLowerCase().indexOf(f.toLowerCase())
      ? "~" + m
      : m.slice(f.length) || "/",
  Gd = (f = "") => (f === "/" ? "" : f),
  Q1 = (f, m) => (f[0] === "~" ? f.slice(1) : Gd(m) + f),
  Z1 = (f = "", m) => X1(Md(Gd(f)), Md(m)),
  Md = (f) => {
    try {
      return decodeURI(f);
    } catch {
      return f;
    }
  },
  Hd = {
    hook: L1,
    searchHook: q1,
    parser: _1,
    base: "",
    ssrPath: void 0,
    ssrSearch: void 0,
    ssrContext: void 0,
    hrefs: (f) => f,
    aroundNav: (f, m, S) => f(m, S),
  },
  qd = q.createContext(Hd),
  Dn = () => q.useContext(qd),
  wd = {},
  Yd = q.createContext(wd),
  Ld = () => q.useContext(Yd),
  Ji = (f) => {
    const [m, S] = f.hook(f);
    return [Z1(f.base, m), Rd((o, T) => f.aroundNav(S, Q1(o, f.base), T))];
  },
  wl = () => Ji(Dn()),
  Xd = (f, m, S, o) => {
    const { pattern: T, keys: D } =
        m instanceof RegExp ? { keys: !1, pattern: m } : f(m || "*", o),
      U = T.exec(S) || [],
      [Z, ...A] = U;
    return Z !== void 0
      ? [
          !0,
          (() => {
            const b =
              D !== !1
                ? Object.fromEntries(D.map((O, X) => [O, A[X]]))
                : U.groups;
            let _ = { ...A };
            return (b && Object.assign(_, b), _);
          })(),
          ...(o ? [Z] : []),
        ]
      : [!1, null];
  },
  V1 = ({ children: f, ...m }) => {
    const S = Dn(),
      o = m.hook ? Hd : S;
    let T = o;
    const [D, U = m.ssrSearch ?? ""] = m.ssrPath?.split("?") ?? [];
    (D && ((m.ssrSearch = U), (m.ssrPath = D)),
      (m.hrefs = m.hrefs ?? m.hook?.hrefs),
      (m.searchHook = m.searchHook ?? m.hook?.searchHook));
    let Z = q.useRef({}),
      A = Z.current,
      b = A;
    for (let _ in o) {
      const O = _ === "base" ? o[_] + (m[_] ?? "") : (m[_] ?? o[_]);
      (A === b && O !== b[_] && (Z.current = b = { ...b }),
        (b[_] = O),
        (O !== o[_] || O !== T[_]) && (T = b));
    }
    return q.createElement(qd.Provider, { value: T, children: f });
  },
  zd = ({ children: f, component: m }, S) =>
    m ? q.createElement(m, { params: S }) : typeof f == "function" ? f(S) : f,
  K1 = (f) => {
    let m = q.useRef(wd);
    const S = m.current;
    return (m.current =
      Object.keys(f).length !== Object.keys(S).length ||
      Object.entries(f).some(([o, T]) => T !== S[o])
        ? f
        : S);
  },
  Aa = ({ path: f, nest: m, match: S, ...o }) => {
    const T = Dn(),
      [D] = Ji(T),
      [U, Z, A] = S ?? Xd(T.parser, f, D, m),
      b = K1({ ...Ld(), ...Z });
    if (!U) return null;
    const _ = A ? q.createElement(V1, { base: A }, zd(o, b)) : zd(o, b);
    return q.createElement(Yd.Provider, { value: b, children: _ });
  };
q.forwardRef((f, m) => {
  const S = Dn(),
    [o, T] = Ji(S),
    {
      to: D = "",
      href: U = D,
      onClick: Z,
      asChild: A,
      children: b,
      className: _,
      replace: O,
      state: X,
      transition: H,
      ...L
    } = f,
    P = Rd((Y) => {
      Y.ctrlKey ||
        Y.metaKey ||
        Y.altKey ||
        Y.shiftKey ||
        Y.button !== 0 ||
        (Z?.(Y), Y.defaultPrevented || (Y.preventDefault(), T(U, f)));
    }),
    F = S.hrefs(U[0] === "~" ? U.slice(1) : S.base + U, S);
  return A && q.isValidElement(b)
    ? q.cloneElement(b, { onClick: P, href: F })
    : q.createElement("a", {
        ...L,
        onClick: P,
        href: F,
        className: _?.call ? _(o === U) : _,
        children: b,
        ref: m,
      });
});
const Qd = (f) =>
    Array.isArray(f)
      ? f.flatMap((m) => Qd(m && m.type === q.Fragment ? m.props.children : m))
      : [f],
  k1 = ({ children: f, location: m }) => {
    const S = Dn(),
      [o] = Ji(S);
    for (const T of Qd(f)) {
      let D = 0;
      if (
        q.isValidElement(T) &&
        (D = Xd(S.parser, T.props.path, m || o, T.props.nest))[0]
      )
        return q.cloneElement(T, { match: D });
    }
    return null;
  },
  J1 = {
    xs: { width: 80, height: 24 },
    sm: { width: 100, height: 30 },
    md: { width: 120, height: 36 },
    lg: { width: 150, height: 46 },
  };
function xl({ size: f = "md", light: m = !1 }) {
  // Define or use existing J1 size mapping
  const sizeMap = {
    sm: { width: 100, height: 30 },
    md: { width: 150, height: 46 },
    lg: { width: 200, height: 60 },
  };
  const { width, height } = (J1?.[f]) || sizeMap[f] || sizeMap.md;
  
  const logoSrc = "https://i.ibb.co/0RFX9gXq/1000223845-removebg-preview.png";

  return u.jsx("img", {
    src: logoSrc,
    width: width,
    height: height,
    alt: "meeesho logo",
    style: { 
      display: "inline-block", 
      verticalAlign: "middle",
      objectFit: "contain"
    }
  });
}
function W1({ cartCount: f, onCartOpen: m }) {
  const [S, o] = q.useState(!1);
  return u.jsx("header", {
    className: "meesho-header",
    children: u.jsxs("div", {
      className: "header-container",
      children: [
        u.jsxs("div", {
          className: "header-topRow",
          children: [
            u.jsxs("div", {
              className: "header-left",
              children: [
                u.jsx("button", {
                  className: "hamburger-btn",
                  onClick: () => o(!S),
                  "aria-label": "Menu",
                  children: u.jsxs("svg", {
                    viewBox: "0 0 24 24",
                    width: "24",
                    height: "24",
                    stroke: "#333",
                    strokeWidth: "2",
                    fill: "none",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                      u.jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12" }),
                      u.jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }),
                      u.jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" }),
                    ],
                  }),
                }),
                u.jsx("a", {
                  href: "#",
                  className: "brand-logo",
                  children: u.jsx(xl, { size: "md" }),
                }),
              ],
            }),
            u.jsxs("div", {
              className: "header-right",
              children: [
                u.jsx("a", {
                  href: "#",
                  className: "header-icon",
                  "aria-label": "Wishlist",
                  children: u.jsx("svg", {
                    viewBox: "0 0 24 24",
                    width: "24",
                    height: "24",
                    children: u.jsx("path", {
                      fill: "#ED3843",
                      d: "M22 9.174c0 3.724-1.87 7.227-9.67 12.38a.58.58 0 0 1-.66 0C3.87 16.401 2 12.898 2 9.174S4.59 3.67 7.26 3.66c3.22-.081 4.61 3.573 4.74 3.774.13-.201 1.52-3.855 4.74-3.774C19.41 3.669 22 5.45 22 9.174Z",
                    }),
                  }),
                }),
                u.jsxs("button", {
                  className: "header-icon cart-wrapper",
                  onClick: m,
                  "aria-label": "Cart",
                  children: [
                    u.jsx("svg", {
                      viewBox: "0 0 24 24",
                      width: "24",
                      height: "24",
                      children: u.jsx("path", {
                        fill: "#9F2089",
                        d: "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z",
                      }),
                    }),
                    u.jsx("span", {
                      className: "badge",
                      id: "cartBadge",
                      children: f,
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        u.jsx("div", {
          className: "header-search",
          children: u.jsxs("div", {
            className: "search-box",
            children: [
              u.jsxs("svg", {
                viewBox: "0 0 24 24",
                width: "20",
                height: "20",
                stroke: "#94a3b8",
                strokeWidth: "2",
                fill: "none",
                children: [
                  u.jsx("circle", { cx: "11", cy: "11", r: "8" }),
                  u.jsx("line", {
                    x1: "21",
                    y1: "21",
                    x2: "16.65",
                    y2: "16.65",
                  }),
                ],
              }),
              u.jsx("input", {
                type: "text",
                placeholder: "Search for Sarees, Kurtis, Cosmetics, etc.",
              }),
            ],
          }),
        }),
      ],
    }),
  });
}
function Zd({ isOpen: f, onClose: m, items: S, onUpdateQty: o }) {
  const [, T] = wl(),
    D = S.reduce((U, Z) => {
      const A = parseFloat(Z.sellPrice.replace(/[₹,]/g, ""));
      return U + A * Z.qty;
    }, 0);
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx("div", {
        className: `cart-overlay ${f ? "active" : ""}`,
        onClick: m,
      }),
      u.jsxs("div", {
        className: `cart-sidebar ${f ? "active" : ""}`,
        children: [
          u.jsxs("div", {
            className: "cart-header",
            children: [
              u.jsxs("h3", {
                children: [
                  "My Cart (",
                  u.jsx("span", { children: S.reduce((U, Z) => U + Z.qty, 0) }),
                  ")",
                ],
              }),
              u.jsx("button", {
                onClick: m,
                "aria-label": "Close cart",
                children: "×",
              }),
            ],
          }),
          u.jsx("div", {
            className: "cart-items",
            children:
              S.length === 0
                ? u.jsx("p", {
                    style: {
                      textAlign: "center",
                      color: "#666",
                      padding: "20px",
                    },
                    children: "Your cart is empty.",
                  })
                : S.map((U) =>
                    u.jsxs(
                      "div",
                      {
                        className: "cart-item",
                        children: [
                          u.jsx("img", { src: U.imgUrl, alt: U.name }),
                          u.jsxs("div", {
                            className: "cart-item-info",
                            children: [
                              u.jsx("p", {
                                className: "cart-item-name",
                                children: U.name,
                              }),
                              u.jsx("p", {
                                className: "cart-item-price",
                                children: U.sellPrice,
                              }),
                              u.jsxs("div", {
                                className: "cart-item-qty",
                                children: [
                                  u.jsx("button", {
                                    className: "qty-btn",
                                    onClick: () => o(U.id, U.qty - 1),
                                    children: "−",
                                  }),
                                  u.jsx("span", {
                                    className: "qty-num",
                                    children: U.qty,
                                  }),
                                  u.jsx("button", {
                                    className: "qty-btn",
                                    onClick: () => o(U.id, U.qty + 1),
                                    children: "+",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      U.id,
                    ),
                  ),
          }),
          u.jsxs("div", {
            className: "cart-footer",
            children: [
              u.jsxs("div", {
                className: "total-row",
                children: [
                  u.jsx("span", { children: "Total Value:" }),
                  u.jsxs("span", { children: ["₹", D.toFixed(2)] }),
                ],
              }),
              u.jsx("button", {
                className: "checkout-btn",
                onClick: () => {
                  (m(), T("/cart"));
                },
                children: "Proceed to Buy",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
const $1 = "Buy 2 Get 1 Free (Add 3 items to cart)";
function Dd() {
  const f = new Date(),
    m = new Date(f);
  m.setHours(23, 59, 59, 999);
  const S = m.getTime() - f.getTime(),
    o = Math.floor(S / 36e5),
    T = Math.floor((S % 36e5) / 6e4),
    D = Math.floor((S % 6e4) / 1e3);
  return `${String(o).padStart(2, "0")}h : ${String(T).padStart(2, "0")}m : ${String(D).padStart(2, "0")}s`;
}
function P1() {
  const [f, m] = q.useState(Dd());
  return (
    q.useEffect(() => {
      const S = setInterval(() => m(Dd()), 1e3);
      return () => clearInterval(S);
    }, []),
    Array(6).fill($1).join("            "),
    u.jsxs("section", {
      className: "home-promo",
      children: [
        u.jsx("img", {
          src: "https://cdn.shopify.com/s/files/1/0981/2262/9416/files/2f53o_1.gif?v=1773923883",
          alt: "Biggest Brand Bash",
          className: "full-width-img",
        }),
        u.jsx("img", {
          src: "/assets/mega-blockbuster-banner.jpg?v=1",
          alt: "Mega Blockbuster Sale",
          className: "full-width-img",
        }),
        u.jsxs("div", {
          style: {
            background: "linear-gradient(90deg,#e53935,#b71c1c)",
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          },
          children: [
            u.jsx("span", { style: { fontSize: "18px" }, children: "⏰" }),
            u.jsx("span", {
              style: {
                color: "#fff",
                fontWeight: 800,
                fontSize: "0.95rem",
                letterSpacing: "0.3px",
                textAlign: "center",
              },
              children: "Offer Valid for Only 24 Hours — Hurry, Limited Stock!",
            }),
            u.jsx("span", { style: { fontSize: "18px" }, children: "🔥" }),
          ],
        }),
        u.jsx("img", {
          src: "https://cdn.shopify.com/s/files/1/0981/2262/9416/files/xwgyl_800_1.webp?v=1773923882",
          alt: "Benefits",
          className: "full-width-img",
        }),
        u.jsx("div", {
          className: "deals-section",
          children: u.jsxs("div", {
            className: "deals-container",
            children: [
              u.jsxs("p", {
                className: "deals-label",
                children: [
                  "Meesho Daily Deals",
                  u.jsx("span", {
                    style: {
                      color: "#e42526",
                      fontSize: "1.2rem",
                      transform: "translateY(-1px)",
                    },
                    children: "⚡",
                  }),
                ],
              }),
              u.jsxs("div", {
                className: "timer-box",
                children: [
                  u.jsx("span", {
                    style: { fontSize: "1rem" },
                    children: "💣",
                  }),
                  u.jsx("span", { className: "timer-text", children: f }),
                ],
              }),
            ],
          }),
        }),
      ],
    })
  );
}
const F1 = () =>
    u.jsx("svg", {
      width: "10",
      height: "10",
      viewBox: "0 0 20 20",
      fill: "#ffffff",
      xmlns: "http://www.w3.org/2000/svg",
      children: u.jsx("path", {
        d: "M19.5399 6.85L13.6199 5.5L10.5099 0.29C10.3999 0.11 10.2099 0 9.99993 0C9.78993 0 9.59993 0.11 9.48993 0.29L6.37993 5.5L0.45993 6.85C0.25993 6.9 0.0899297 7.05 0.0299297 7.25C-0.0300703 7.45 0.00992969 7.67 0.14993 7.83L4.13993 12.4L3.58993 18.44C3.56993 18.65 3.65993 18.85 3.82993 18.98C3.99993 19.1 4.21993 19.13 4.41993 19.05L9.99993 16.64L15.5799 19.03C15.6599 19.06 15.7399 19.08 15.8099 19.08C16.1199 19.09 16.4199 18.82 16.4199 18.48C16.4199 18.42 16.4099 18.36 16.3899 18.31L15.8499 12.38L19.8399 7.81C19.9799 7.65 20.0199 7.43 19.9599 7.23C19.9099 7.04 19.7399 6.89 19.5399 6.85Z",
      }),
    }),
  I1 = () =>
    u.jsxs("svg", {
      width: "55",
      height: "20",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        u.jsx("path", {
          d: "M9.901 5.496a2 2 0 0 1 2-2h41.6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-41.6a2 2 0 0 1-2-2v-9Z",
          fill: "#FFE7FB",
        }),
        u.jsx("path", {
          d: "M24.712 6H19.5v1.03h2.052v5.843h1.12V7.03h2.041V6ZM24.698 8.229v4.644h1.06v-2.17c0-1.09.52-1.532 1.228-1.532a.95.95 0 0 1 .353.06V8.198a.85.85 0 0 0-.363-.068c-.55 0-1.031.314-1.267.844h-.02v-.746h-.991ZM32.226 12.873V8.229h-1.07v2.67c0 .697-.481 1.188-1.09 1.188-.56 0-.884-.383-.884-1.1V8.23h-1.06v2.975c0 1.129.628 1.816 1.63 1.816.658 0 1.188-.314 1.443-.766h.05v.619h.981ZM35.25 13.02c1.1 0 1.846-.59 1.846-1.532 0-1.855-2.543-1.03-2.543-2.052 0-.304.236-.55.698-.55.422 0 .765.246.814.59l.992-.207c-.167-.706-.893-1.188-1.836-1.188-1.03 0-1.728.57-1.728 1.434 0 1.856 2.543 1.03 2.543 2.052 0 .393-.265.658-.756.658-.481 0-.874-.255-.992-.668l-.972.197c.226.795.943 1.266 1.934 1.266Z",
          fill: "#9F2089",
        }),
        u.jsx("path", {
          d: "M16.5 3.239 9.027.059a.746.746 0 0 0-.585 0L.969 3.24a.782.782 0 0 0-.47.721v6.36c0 5.321 3.139 7.611 7.947 9.622a.746.746 0 0 0 .576 0c4.809-2.01 7.948-4.3 7.948-9.622V3.96c0-.316-.186-.6-.47-.721Z",
          fill: "#FFE7FB",
        }),
        u.jsx("path", {
          d: "m15.748 3.894-6.75-2.871a.673.673 0 0 0-.528 0l-6.75 2.87a.706.706 0 0 0-.424.652v5.745c0 4.806 2.835 6.874 7.178 8.69.167.07.353.07.52 0 4.343-1.816 7.178-3.884 7.178-8.69V4.545a.706.706 0 0 0-.424-.651Z",
          fill: "#60014A",
        }),
        u.jsx("path", {
          d: "M10.852 6.455c.804.006 1.482.28 2.04.817.565.54.843 1.185.837 1.946l-.023 3.58c-.003.426-.37.77-.824.77-.45-.003-.814-.35-.81-.777l.022-3.58a1.098 1.098 0 0 0-.367-.85 1.216 1.216 0 0 0-.885-.35 1.247 1.247 0 0 0-.921.372c-.23.227-.344.54-.347.856l-.02 3.528c-.003.432-.376.782-.833.78-.458-.004-.828-.357-.824-.79l.022-3.548c.004-.31-.11-.617-.334-.844a1.254 1.254 0 0 0-.918-.378 1.253 1.253 0 0 0-.892.34c-.24.23-.37.513-.37.845l-.022 3.576c-.004.43-.373.777-.827.774-.455-.003-.818-.353-.815-.783l.023-3.564c.003-.66.25-1.308.714-1.799.6-.632 1.34-.948 2.199-.942.82.006 1.521.285 2.082.853.578-.565 1.272-.835 2.093-.832Z",
          fill: "#FF9D00",
        }),
      ],
    });
function em({ product: f, onAddToCart: m, onView: S }) {
  return u.jsxs("div", {
    className: "product-card",
    onClick: S,
    children: [
      u.jsx("div", {
        className: "product-img",
        children: u.jsx("img", { src: f.imgUrl, alt: f.name, loading: "lazy" }),
      }),
      u.jsxs("div", {
        className: "product-details",
        children: [
          u.jsx("h3", { className: "product-name", children: f.name }),
          u.jsxs("div", {
            className: "product-price",
            children: [
              u.jsx("span", { className: "sell-price", children: f.sellPrice }),
              u.jsx("span", { className: "mrp-price", children: f.mrpPrice }),
              u.jsx("span", {
                className: "off-percentage",
                children: f.offPercent,
              }),
            ],
          }),
          f.freeDelivery &&
            u.jsx("p", {
              className: "free-delivery",
              children: "Free Delivery",
            }),
          u.jsxs("div", {
            className: "ratings-row",
            children: [
              u.jsxs("div", {
                className: "rating-section",
                children: [
                  u.jsxs("div", {
                    className: "rating-chip",
                    children: [
                      u.jsx("span", {
                        className: "rating-num",
                        children: f.rating,
                      }),
                      u.jsx(F1, {}),
                    ],
                  }),
                  u.jsxs("span", {
                    className: "review-count",
                    children: ["(", f.reviewCount, ")"],
                  }),
                ],
              }),
              u.jsx(I1, {}),
            ],
          }),
          u.jsx("button", {
            className: "add-to-cart-btn",
            onClick: (o) => {
              (o.stopPropagation(), m(f));
            },
            children: "Add to Cart",
          }),
        ],
      }),
    ],
  });
}
function tm({ products: f, onAddToCart: m }) {
  const [, S] = wl();
  return u.jsxs("main", {
    children: [
      u.jsx(P1, {}),
      u.jsxs("section", {
        className: "products-section",
        children: [
          u.jsx("h4", {
            className: "section-title",
            children: "Products For You",
          }),
          u.jsx("div", {
            className: "product-list",
            children: f.filter((o) => !o.hidden && String(o.id) !== "900001" && String(o.slug || "").toLowerCase() !== "dx" && !["dx", "payment testing product"].includes(String(o.name || "").trim().toLowerCase())).map((o) =>
              u.jsx(
                em,
                {
                  product: o,
                  onAddToCart: m,
                  onView: () => S(`/product/${o.id}`),
                },
                o.id,
              ),
            ),
          }),
        ],
      }),
    ],
  });
}
const gs = [
  {
    "id": 1,
    "name": "Prestige Iris Plus 750 W Mixer Grinder With 4 Jars (3 Stainless Steel Jars+ 1 Juicer Jar) 4 Super Ef",
    "sellPrice": "₹249.00",
    "mrpPrice": "₹2,998.00",
    "offPercent": "88% off",
    "rating": "4.6",
    "reviewCount": "9309",
    "imgUrl": "https://m.media-amazon.com/images/I/51ZykaL8q6L._SL1200_.jpg",
    "freeDelivery": true
  },
  {
    "id": 2,
    "name": "LG 28 L Convection Microwave Oven (MC2846SL, Silver)",
    "sellPrice": "₹378.00",
    "mrpPrice": "₹4,789.00",
    "offPercent": "92% off",
    "rating": "4.1",
    "reviewCount": "8747",
    "imgUrl": "https://m.media-amazon.com/images/I/71qaGnOxACL._SX679_.jpg",
    "freeDelivery": true
  },
  {
    "id": 3,
    "name": "amazon basics Aluminium Non-Stick Black Cookware Set - 15 Piece",
    "sellPrice": "₹279.00",
    "mrpPrice": "₹2,578.00",
    "offPercent": "89% off",
    "rating": "4.8",
    "reviewCount": "8421",
    "imgUrl": "https://m.media-amazon.com/images/I/71oZ1-QYomL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 4,
    "name": "Panini Press Grill, Yabano Gourmet Sandwich Maker Non-Stick Coated Plates 11\" x 9.8\", Opens 180 Degr",
    "sellPrice": "₹320.00",
    "mrpPrice": "₹3,199.00",
    "offPercent": "90% off",
    "rating": "4.2",
    "reviewCount": "9707",
    "imgUrl": "https://m.media-amazon.com/images/I/919+cmD3MsL._AC_SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 5,
    "name": "Prestige 5 Litres Svachh Nakshatra Plus Induction Base Inner L_id Hard Anodised Pressure Handi |Black",
    "sellPrice": "₹279.00",
    "mrpPrice": "₹4,155.00",
    "offPercent": "93% off",
    "rating": "4.3",
    "reviewCount": "7180",
    "imgUrl": "https://m.media-amazon.com/images/I/713Kl1I0CyL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 6,
    "name": "Cookwell Bullet Mixer Grinder (5 Jar, 3 Blade, Silver)",
    "sellPrice": "₹247.00",
    "mrpPrice": "₹5,999.00",
    "offPercent": "96% off",
    "rating": "4.3",
    "reviewCount": "9863",
    "imgUrl": "https://m.media-amazon.com/images/I/81yobRRV8nL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 7,
    "name": "Elica Vetro Glass Top 4 Burner Auto Ignition Gas Stove (694 CT VETRO SS AI), Black",
    "sellPrice": "₹399.00",
    "mrpPrice": "₹3,599.00",
    "offPercent": "89% off",
    "rating": "4.9",
    "reviewCount": "7869",
    "imgUrl": "https://m.media-amazon.com/images/I/71RX6d+02hL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 8,
    "name": "TOSHIBA Countertop Microwave Oven Air Fryer Combo, Inverter, Convection, Broil, Speedy Combi, Even D",
    "sellPrice": "₹430.00",
    "mrpPrice": "₹4,399.00",
    "offPercent": "90% off",
    "rating": "4.3",
    "reviewCount": "7516",
    "imgUrl": "https://m.media-amazon.com/images/I/81vC9lOQfGL._AC_SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 9,
    "name": "Havells Electric Kettle Aqua Plus 1500 Watts 1.2 liters , Double Layered Cool Touch Outer Body | 304",
    "sellPrice": "₹399.00",
    "mrpPrice": "₹11,588.00",
    "offPercent": "97% off",
    "rating": "4.1",
    "reviewCount": "7897",
    "imgUrl": "https://m.media-amazon.com/images/I/61ZcR8oVtSL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 10,
    "name": "Juicer, 600W Juicer Machine with 3.5 Inch W_ide Chute for Whole Fruits, High Yield Juice Extractor wi",
    "sellPrice": "₹450.00",
    "mrpPrice": "₹6,399.00",
    "offPercent": "93% off",
    "rating": "4.6",
    "reviewCount": "7706",
    "imgUrl": "https://m.media-amazon.com/images/I/81Wr7b2O0gL._AC_SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 11,
    "name": "Teivio 32-Piece Kitchen Plastic Wheat Straw Dinnerware Set, Service for 8, Dinner Plates, Dessert Pl",
    "sellPrice": "₹287.00",
    "mrpPrice": "₹6,520.00",
    "offPercent": "96% off",
    "rating": "4.4",
    "reviewCount": "7591",
    "imgUrl": "https://m.media-amazon.com/images/I/81uNog-p3vL._AC_SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 12,
    "name": "Wonderchef Nutri-blend Juicer, Mixer, Grinder & Chopper|400W 100% Full Copper Motor| Complete Kitche",
    "sellPrice": "₹340.00",
    "mrpPrice": "₹3,544.00",
    "offPercent": "90% off",
    "rating": "4.9",
    "reviewCount": "7209",
    "imgUrl": "https://m.media-amazon.com/images/I/61cAuha5eyL._SL1100_.jpg",
    "freeDelivery": true
  },
  {
    "id": 13,
    "name": "Shiv Shakti Arts® Pure Brass Dinner Set 58 Piece |Square Plate Engraved Designed |Pital Dinner Set |",
    "sellPrice": "₹330.00",
    "mrpPrice": "₹6,599.00",
    "offPercent": "95% off",
    "rating": "4.6",
    "reviewCount": "8308",
    "imgUrl": "https://m.media-amazon.com/images/I/81Z7IfN1LZL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 14,
    "name": "LINKChef 7 in 1 Immersion Blender Scratch Resistant, 2 Titanium Steel Blades 800W Hand Blender, 20 S",
    "sellPrice": "₹298.00",
    "mrpPrice": "₹5,199.00",
    "offPercent": "94% off",
    "rating": "4.5",
    "reviewCount": "7740",
    "imgUrl": "https://m.media-amazon.com/images/I/710IGitkLDL._AC_SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 15,
    "name": "Electric Hand Mixer with Bowls Set, 5-Speeds Handhold Mixers with Egg Whisks Beaters, 6 Stainless St",
    "sellPrice": "₹279.00",
    "mrpPrice": "₹3,499.00",
    "offPercent": "92% off",
    "rating": "4.1",
    "reviewCount": "9441",
    "imgUrl": "https://m.media-amazon.com/images/I/61CbXtp2rdL._SL1350_.jpg",
    "freeDelivery": true
  },
  {
    "id": 16,
    "name": "ACTIVA Gracia 1200 MM (28 Watts) BLDC Motor Fan With LED Light |Remote| 3 Blade Energy Saving Ceilin",
    "sellPrice": "₹279.00",
    "mrpPrice": "₹4,588.00",
    "offPercent": "94% off",
    "rating": "4.5",
    "reviewCount": "9912",
    "imgUrl": "https://m.media-amazon.com/images/I/619RCL-ioZL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 17,
    "name": "IBELL High Speed Tower Fan, 25-foot Air Delivery, 4-way Air Flow, Low Power Consumption and Anti-Rus",
    "sellPrice": "₹279.00",
    "mrpPrice": "₹7,889.00",
    "offPercent": "96% off",
    "rating": "4.2",
    "reviewCount": "9991",
    "imgUrl": "https://m.media-amazon.com/images/I/616QjhZC-lL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 18,
    "name": "HIFRESH Air Cooler for Home, 107CM Tower Cooler w/Smart Remote & LED Touch Screen, 3 Speeds & 4 Mode",
    "sellPrice": "₹369.00",
    "mrpPrice": "₹12,558.00",
    "offPercent": "97% off",
    "rating": "4.2",
    "reviewCount": "9967",
    "imgUrl": "https://m.media-amazon.com/images/I/715hVUAu3GL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 19,
    "name": "boAt Airdopes 141 ANC TWS in Ear Earbuds with 32 Db ANC, 42 Hrs Playback, 50Ms Low Latency Beast Mod",
    "sellPrice": "₹269.00",
    "mrpPrice": "₹2,789.00",
    "offPercent": "90% off",
    "rating": "4.8",
    "reviewCount": "9035",
    "imgUrl": "https://m.media-amazon.com/images/I/61dGwBIwaDL._SY450_.jpg",
    "freeDelivery": true
  },
  {
    "id": 20,
    "name": "Panasonic 1 Ton 5 Star Wi-Fi Inverter Smart Split AC (Copper Condenser, 7 in 1 Convertible with True",
    "sellPrice": "₹449.00",
    "mrpPrice": "₹15,899.00",
    "offPercent": "97% off",
    "rating": "4.7",
    "reviewCount": "8623",
    "imgUrl": "https://m.media-amazon.com/images/I/51G96nyJlOL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 21,
    "name": "V-Guard Gatimaan Pro HSP N High Speed Pedestal Fan | 3 Adjustable Fan Speeds | Rust Resistant ABS Bo",
    "sellPrice": "₹259.00",
    "mrpPrice": "₹3,588.00",
    "offPercent": "93% off",
    "rating": "4.2",
    "reviewCount": "7908",
    "imgUrl": "https://m.media-amazon.com/images/I/51gttFr+5EL._SL1200_.jpg",
    "freeDelivery": true
  },
  {
    "id": 22,
    "name": "Symphony Diet 3D 30i Portable Tower Air Cooler For Home with 3-S_ide Honeycomb Pads i-Pure Technology",
    "sellPrice": "₹305.00",
    "mrpPrice": "₹11,999.00",
    "offPercent": "97% off",
    "rating": "4.1",
    "reviewCount": "9658",
    "imgUrl": "https://m.media-amazon.com/images/I/61tLj6CIW-L._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 23,
    "name": "Noise Newly Launched ColorFit Pro 5 Max 1.96\" AMOLED Display Smart Watch, BT Calling, Post Training",
    "sellPrice": "₹279.00",
    "mrpPrice": "₹3,499.00",
    "offPercent": "92% off",
    "rating": "4.6",
    "reviewCount": "7428",
    "imgUrl": "https://m.media-amazon.com/images/I/618sHIqH+VL._SL1000_.jpg",
    "freeDelivery": true
  },
  {
    "id": 24,
    "name": "LG 108 cm (43 inches) 4K Ultra HD Smart LED TV 43UR7500PSC (Dark Iron Gray)",
    "sellPrice": "₹449.00",
    "mrpPrice": "₹29,980.00",
    "offPercent": "99% off",
    "rating": "4.8",
    "reviewCount": "7363",
    "imgUrl": "https://m.media-amazon.com/images/I/8195aYGDl9L._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 25,
    "name": "Amazon Basics - Non-Stick Cookware Set without Induction Base (Black) 8 Piece",
    "sellPrice": "₹311.00",
    "mrpPrice": "₹4,259.00",
    "offPercent": "93% off",
    "rating": "4.9",
    "reviewCount": "7102",
    "imgUrl": "https://m.media-amazon.com/images/I/81-sJRhEapL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 26,
    "name": "atomberg Renesa 1200mm BLDC Ceiling Fan with Remote Control | BEE 5 star Rated Energy Efficient Ceil",
    "sellPrice": "₹349.00",
    "mrpPrice": "₹3,699.00",
    "offPercent": "91% off",
    "rating": "4.3",
    "reviewCount": "7975",
    "imgUrl": "https://m.media-amazon.com/images/I/61ZSU4OILFL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 27,
    "name": "Bosch TrueMixx Pro Mixer Grinder, 1000W 4 Jars Black",
    "sellPrice": "₹269.00",
    "mrpPrice": "₹6,399.00",
    "offPercent": "96% off",
    "rating": "4.3",
    "reviewCount": "8984",
    "imgUrl": "https://m.media-amazon.com/images/I/81Cir3akReL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 51,
    "name": "PHILIPS Mixer Grinder 3-in-1 750 Watt (Mixer Grinder + Juicer + Food Processor) 4 Jar, (HL7707/01)",
    "sellPrice": "₹289.00",
    "mrpPrice": "₹7,699.00",
    "offPercent": "96% off",
    "rating": "4.4",
    "reviewCount": "8657",
    "imgUrl": "https://m.media-amazon.com/images/I/51mCAmdG4AL._SL1000_.jpg",
    "freeDelivery": true
  },
  {
    "id": 28,
    "name": "Cello Opalware Dazzle Series Blue Swirl Dinner Set, 37 Units | Opal Glass Dinner Set for 6 | Light-W",
    "sellPrice": "₹311.00",
    "mrpPrice": "₹1,898.00",
    "offPercent": "84% off",
    "rating": "4.2",
    "reviewCount": "8032",
    "imgUrl": "https://m.media-amazon.com/images/I/71nazZbMYmL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 29,
    "name": "Faber Hob 3 Burner | Auto-Ignition | Spillage Proof | HOB SUPERIA HT653 BR AI | Concealed Chamber |",
    "sellPrice": "₹389.00",
    "mrpPrice": "₹13,650.00",
    "offPercent": "97% off",
    "rating": "4.2",
    "reviewCount": "9894",
    "imgUrl": "https://m.media-amazon.com/images/I/71R5lP1aZkL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 30,
    "name": "Polycab Silencio Mini 900mm 5-Star Advanced BLDC, Remote Ceiling fan for home | High Air Delivery, 2",
    "sellPrice": "₹248.00",
    "mrpPrice": "₹5,488.00",
    "offPercent": "95% off",
    "rating": "4.2",
    "reviewCount": "7245",
    "imgUrl": "https://m.media-amazon.com/images/I/51nsm-fbAOL._SX425_.jpg",
    "freeDelivery": true
  },
  {
    "id": 31,
    "name": "Havells 1200Mm Stealth Air Bldc Motor Ceiling Fan Most Silent & Premium,5 stars With Rf Remote,100%",
    "sellPrice": "₹279.00",
    "mrpPrice": "₹3,558.00",
    "offPercent": "92% off",
    "rating": "4.7",
    "reviewCount": "9128",
    "imgUrl": "https://m.media-amazon.com/images/I/61UCHV8cIwL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 32,
    "name": "Lifelong Duos 500 Watt 2 Jar Mixer Grinder with 3 Speed Control and 1100 Watt Dry Non-Stick soleplat",
    "sellPrice": "₹311.00",
    "mrpPrice": "₹4,788.00",
    "offPercent": "94% off",
    "rating": "4.4",
    "reviewCount": "9103",
    "imgUrl": "https://m.media-amazon.com/images/I/61whl+GwjiL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 33,
    "name": "IBELL CLASSY P16 SB WHITE Pedestal Fan 5 Leaf with Remote and High Air Flow, 55W, LED Display, High",
    "sellPrice": "₹329.00",
    "mrpPrice": "₹2,276.00",
    "offPercent": "86% off",
    "rating": "4.2",
    "reviewCount": "7309",
    "imgUrl": "https://m.media-amazon.com/images/I/61ydjW0Tb-L._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 34,
    "name": "LONGWAY Creta P2 1200 mm/48 inch Remote Controlled 3 Blade Anti-Dust Decorative 5-Star Rated Ceiling",
    "sellPrice": "₹449.00",
    "mrpPrice": "₹4,789.00",
    "offPercent": "91% off",
    "rating": "4.2",
    "reviewCount": "7651",
    "imgUrl": "https://m.media-amazon.com/images/I/71tB72jwZlL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 35,
    "name": "MILTON Ernesto Inner Stainless Steel Casserole Set of 3 (420 ml, 850 ml, 1.43 litres), Red | Easy to",
    "sellPrice": "₹249.00",
    "mrpPrice": "₹1,788.00",
    "offPercent": "86% off",
    "rating": "4.9",
    "reviewCount": "8070",
    "imgUrl": "https://m.media-amazon.com/images/I/71J1Tkfe1DL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 36,
    "name": "NUUK LĪT Cordless & Rechargeable 7 Inch Table Fan with Night Light & Remote Control | Auto Oscillati",
    "sellPrice": "₹269.00",
    "mrpPrice": "₹2,799.00",
    "offPercent": "90% off",
    "rating": "4.6",
    "reviewCount": "7417",
    "imgUrl": "https://m.media-amazon.com/images/I/6116OpnsTYL._SL1500_.jpg",
    "freeDelivery": true
  },
  {
    "id": 38,
    "name": "SUPER TOY Wireless Speaker with Colorful Light Atmosphere LED Smart Light Lamp with Wireless Charger",
    "sellPrice": "₹199.00",
    "mrpPrice": "₹2,488.00",
    "offPercent": "92% off",
    "rating": "4.5",
    "reviewCount": "8876",
    "imgUrl": "https://m.media-amazon.com/images/I/51a0X1f8FhL._SL1160_.jpg",
    "freeDelivery": true
  },
  {
    "id": 39,
    "name": "Wonderchef Nutri-blend Mixer, Grinder & Blender | Powerful 500W 22000 RPM motor | Stainless steel Bl",
    "sellPrice": "₹199.00",
    "mrpPrice": "₹2,599.00",
    "offPercent": "92% off",
    "rating": "4.8",
    "reviewCount": "9815",
    "imgUrl": "https://m.media-amazon.com/images/I/61626Ya4tJL._SL1100_.jpg",
    "freeDelivery": true
  },
  {
    "id": 40,
    "name": "Orient Electric Durachill 40 L Portable Air Cooler for Home | Densenest Honeycomb Pads |17% more air",
    "sellPrice": "₹279.00",
    "mrpPrice": "₹5,599.00",
    "offPercent": "95% off",
    "rating": "4.5",
    "reviewCount": "9573",
    "imgUrl": "https://m.media-amazon.com/images/I/319sllueFbL._SX300_SY300_QL70_FMwebp_.jpg",
    "freeDelivery": true
  },
  {
    "id": 41,
    "name": "Symphony Ice Cube 27 Personal Air Cooler For Home with Powerful Fan, 3-S_ide Honeycomb Pads, i-Pure T",
    "sellPrice": "₹259.00",
    "mrpPrice": "₹5,599.00",
    "offPercent": "95% off",
    "rating": "4.6",
    "reviewCount": "7139",
    "imgUrl": "https://m.media-amazon.com/images/I/31n92OkncZL._SX300_SY300_QL70_FMwebp_.jpg",
    "freeDelivery": true
  },
  {
    "id": 43,
    "name": "Symphony Siesta 95 XL Air Cooler For Home with Honeycomb Pads, Powerful Fan, and Cool Flow Dispenser",
    "sellPrice": "₹279.00",
    "mrpPrice": "₹5,599.00",
    "offPercent": "95% off",
    "rating": "4.7",
    "reviewCount": "7065",
    "imgUrl": "https://m.media-amazon.com/images/I/31TYCNqAUhL._SX300_SY300_QL70_FMwebp_.jpg",
    "freeDelivery": true
  },
  {
    "id": 52,
    "name": "Hindware Smart Appliances Frostwave 38L Personal Air cooler | Fan Based | 12 Inc. Fan Blade and Ice",
    "sellPrice": "₹256.00",
    "mrpPrice": "₹5,599.00",
    "offPercent": "95% off",
    "rating": "4.9",
    "reviewCount": "9889",
    "imgUrl": "https://m.media-amazon.com/images/I/31nEN7B4nvL._SX300_SY300_QL70_FMwebp_.jpg",
    "freeDelivery": true
  },
  {
    "id": 46,
    "name": "Bajaj TMH36 SKIVE TOWER AIR COOLER, 36 L, WITH ANTI-BACTERIAL TECHNOLOGY, 25 FEET POWERFUL AIR THROW",
    "sellPrice": "₹259.00",
    "mrpPrice": "₹5,599.00",
    "offPercent": "95% off",
    "rating": "4.7",
    "reviewCount": "7472",
    "imgUrl": "https://m.media-amazon.com/images/I/313l2WDbH8L._SX300_SY300_QL70_FMwebp_.jpg",
    "freeDelivery": true
  },
  {
    "id": 47,
    "name": "Havells Celia 55L Air Cooler for home | Ice Chamber | Collapsible Louvers | 4 Leaf Metal Blade | Pow",
    "sellPrice": "₹297.00",
    "mrpPrice": "₹15,999.00",
    "offPercent": "98% off",
    "rating": "4.2",
    "reviewCount": "9828",
    "imgUrl": "https://m.media-amazon.com/images/I/31q4j7mkrEL._SY300_SX300_QL70_FMwebp_.jpg",
    "freeDelivery": true
  },
  {
    "id": 48,
    "name": "Hindware Smart Appliances Cruzo 25L Personal Air Cooler in Summer with exclusive Insect and Dust fre",
    "sellPrice": "₹295.00",
    "mrpPrice": "₹5,599.00",
    "offPercent": "95% off",
    "rating": "4.6",
    "reviewCount": "8695",
    "imgUrl": "https://m.media-amazon.com/images/I/41wuqD6LvaL._SX300_SY300_QL70_FMwebp_.jpg",
    "freeDelivery": true
  },
  {
    "id": 49,
    "name": "Bajaj 36L Personal Air Cooler PMH 36 Torque (Anti-Bacterial Technology, Honeycomb Cooling Pads)",
    "sellPrice": "₹349.00",
    "mrpPrice": "₹9,999.00",
    "offPercent": "97% off",
    "rating": "4.6",
    "reviewCount": "7348",
    "imgUrl": "https://m.media-amazon.com/images/I/3164ZBvk+xL._SY300_SX300_.jpg",
    "freeDelivery": true
  },
  {
    "id": 53,
    "name": "Dx",
    "hidden": true,
    "sellPrice": "₹1.00",
    "mrpPrice": "₹215.00",
    "offPercent": "100% off",
    "rating": "4.7",
    "reviewCount": "9053",
    "imgUrl": "/images/products/dx.webp",
    "freeDelivery": true
  },
  {
    "id": 50,
    "name": "V-Guard Ar_ido R35H-N Room Air Cooler for Home | Mosquito & Dust Filter | 2 Year Warranty | 35 L (Whi",
    "sellPrice": "₹228.00",
    "mrpPrice": "₹9,999.00",
    "offPercent": "98% off",
    "rating": "4.3",
    "reviewCount": "7161",
    "imgUrl": "https://m.media-amazon.com/images/I/314185NtTpL._SX300_SY300_QL70_FMwebp_.jpg",
    "freeDelivery": true
  }
],
  lm = [
    {
      name: "Rahul Sharma",
      rating: 5,
      status: "Very Good",
      date: "05 Jan, 2026",
      verified: !0,
      helpful: 48,
      hasPhoto: !0,
      comment:
        "Really impressed with the quality. It looks exactly like the photo and feels premium. Totally satisfied with this purchase — will definitely order again!",
    },
    {
      name: "Priya G",
      rating: 4,
      status: "Good",
      date: "02 Jan, 2026",
      verified: !0,
      helpful: 31,
      hasPhoto: !0,
      comment:
        "Product is exactly as shown in the pictures. Delivery was quick and packaging was super neat. Highly recommended to everyone!",
    },
    {
      name: "Sneha Kulkarni",
      rating: 5,
      status: "Very Good",
      date: "28 Dec, 2025",
      verified: !0,
      helpful: 27,
      hasPhoto: !1,
      comment:
        "Great value for money. The quality exceeded my expectations and I'm very happy with the overall experience. Must buy!",
    },
    {
      name: "Aneesha Ibrahim",
      rating: 4,
      status: "Good",
      date: "20 Dec, 2025",
      verified: !0,
      helpful: 19,
      hasPhoto: !1,
      comment:
        "Super product, quality is really good. Got delivered before time as well. Very satisfied 😊",
    },
    {
      name: "Divya Shukla",
      rating: 5,
      status: "Very Good",
      date: "18 Dec, 2025",
      verified: !0,
      helpful: 22,
      hasPhoto: !0,
      comment:
        "I liked it very much! Thank you Meesho for such an amazing product at this price. Can't believe this quality 🙌",
    },
    {
      name: "Arjun M",
      rating: 5,
      status: "Very Good",
      date: "15 Dec, 2025",
      verified: !0,
      helpful: 15,
      hasPhoto: !1,
      comment:
        "I was not sure before ordering but it turned out to be really good. Happy with my purchase 😊",
    },
    {
      name: "Pooja B",
      rating: 4,
      status: "Good",
      date: "22 Dec, 2025",
      verified: !0,
      helpful: 11,
      hasPhoto: !1,
      comment:
        "Nice product with good finishing. Worth buying if you're looking for something reliable and affordable.",
    },
    {
      name: "Simran T",
      rating: 5,
      status: "Very Good",
      date: "08 Dec, 2025",
      verified: !1,
      helpful: 9,
      hasPhoto: !1,
      comment:
        "Very happy with my purchase 😊 The product arrived on time and looks exactly as described.",
    },
    {
      name: "Rohini V",
      rating: 5,
      status: "Very Good",
      date: "30 Nov, 2025",
      verified: !0,
      helpful: 18,
      hasPhoto: !0,
      comment:
        "Mindblowing product, just wow! The quality is top notch for this price. I've already recommended it to all my friends.",
    },
    {
      name: "Faisal K",
      rating: 4,
      status: "Good",
      date: "28 Nov, 2025",
      verified: !0,
      helpful: 8,
      hasPhoto: !1,
      comment:
        "Worth it, definitely recommend. Good quality and fast delivery. No complaints at all.",
    },
    {
      name: "Jyoti L",
      rating: 5,
      status: "Very Good",
      date: "25 Nov, 2025",
      verified: !0,
      helpful: 14,
      hasPhoto: !1,
      comment:
        "Must buy, quality is very high. I was surprised to get this quality at such an affordable price on Meesho.",
    },
    {
      name: "Sameer Q",
      rating: 4,
      status: "Good",
      date: "22 Nov, 2025",
      verified: !1,
      helpful: 6,
      hasPhoto: !1,
      comment:
        "Nice product, gifted to my sister. She loved it too. Good value for money overall.",
    },
    {
      name: "Amit S",
      rating: 4,
      status: "Good",
      date: "30 Dec, 2025",
      verified: !0,
      helpful: 7,
      hasPhoto: !1,
      comment:
        "Good value for money product. Quality is decent and it arrived well-packaged.",
    },
    {
      name: "Neha J",
      rating: 4,
      status: "Good",
      date: "12 Dec, 2025",
      verified: !0,
      helpful: 5,
      hasPhoto: !1,
      comment:
        "Thanks Meesho for this 🙏 Product is good and delivery was on time.",
    },
    {
      name: "Abhay D",
      rating: 4,
      status: "Good",
      date: "05 Dec, 2025",
      verified: !0,
      helpful: 10,
      hasPhoto: !1,
      comment:
        "Superb quality and fast delivery. Ordered twice now and both times excellent.",
    },
    {
      name: "Sahadevan",
      rating: 3,
      status: "Ok-Ok",
      date: "27 Dec, 2025",
      verified: !1,
      helpful: 4,
      hasPhoto: !1,
      comment:
        "Nice product but delivery was a bit slow. Quality is ok for the price.",
    },
    {
      name: "Vikram R",
      rating: 3,
      status: "Ok-Ok",
      date: "25 Dec, 2025",
      verified: !0,
      helpful: 3,
      hasPhoto: !1,
      comment:
        "Ok product for the price. Not amazing but not bad either. Serves the purpose.",
    },
    {
      name: "Mani P",
      rating: 3,
      status: "Ok-Ok",
      date: "02 Dec, 2025",
      verified: !1,
      helpful: 2,
      hasPhoto: !1,
      comment: "Ok ok not too great but not bad. Average quality.",
    },
    {
      name: "Meesho User",
      rating: 3,
      status: "Ok-Ok",
      date: "14 Dec, 2025",
      verified: !1,
      helpful: 1,
      hasPhoto: !1,
      comment: "Achha hai thanks meesho 🙏😊💗",
    },
    {
      name: "Karan H",
      rating: 2,
      status: "Bad",
      date: "10 Dec, 2025",
      verified: !0,
      helpful: 2,
      hasPhoto: !1,
      comment:
        "Quality not as expected. The product looks different from pictures. Bit disappointed.",
    },
  ],
  Od = ({ size: f = 10, color: m = "currentColor" }) =>
    u.jsx("svg", {
      viewBox: "0 0 24 24",
      width: f,
      height: f,
      fill: m,
      children: u.jsx("path", {
        d: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
      }),
    }),
  am = (f) => (f >= 4 ? "#059669" : f === 3 ? "#d97706" : "#ef4444"),
  nm = {},
  im = "Explore practical essentials for your home and kitchen.";
function productDescription(product) {
  const name=product.name || 'Home and kitchen essential';
  const text=name.toLowerCase();
  let overview='A practical addition to your home. Choose this product to suit your everyday routine and available space.';
  let uses='Everyday home use and convenient household routines.';
  let care='Follow the manufacturer instructions for installation, operation and care.';
  if (/mixer|grinder|blender|juicer|chopper/.test(text)) {
    overview='Make everyday kitchen preparation simpler. Use the appropriate jar or attachment for the ingredients and task, whether preparing chutneys, blending drinks or grinding ingredients.';
    uses='Kitchen preparation, blending and grinding with the supported attachments.';
    care='Use only the supplied attachments as directed. Unplug before cleaning and keep the motor base dry.';
  } else if (/microwave|oven/.test(text)) {
    overview='Bring convenience to everyday meal preparation. Use the cooking modes and settings supported by this model for your chosen dishes.';
    uses='Meal preparation and reheating using the modes available on this model.';
    care='Use cookware suitable for the selected mode and follow the manufacturer safety and cleaning instructions.';
  } else if (/cookware|pressure|handi|hob|stove|sandwich|panini/.test(text)) {
    overview='A useful addition to your kitchen for preparing everyday meals. Select the cooking method and utensils recommended for this product.';
    uses='Everyday cooking and meal preparation.';
    care='Check heat-source compatibility before use. Allow the product to cool before cleaning and follow the care instructions supplied.';
  } else if (/dinner|casserole/.test(text)) {
    overview='Make everyday serving and dining more convenient. This set is a practical choice for arranging meals at home.';
    uses='Serving meals and organising your dining table.';
    care='Check the supplied care instructions before dishwasher or microwave use. Wash with a gentle cleaner and store carefully.';
  } else if (/kettle/.test(text)) {
    overview='A convenient kitchen companion for heating water as directed by the manufacturer. Keep it within easy reach for your daily routine.';
    uses='Heating water for everyday kitchen needs.';
    care='Follow the fill markings, keep the electrical base dry and unplug before cleaning.';
  }
  return name+'\n\n'+overview+'\n\nIdeal for\n'+uses+'\n\nCare & use\n'+care+'\n\nPlease check the product title and images for the listed model and set contents. Refer to the manufacturer instructions for detailed specifications.';
}
const dxTestProduct = Object.freeze({
  id: 900001, slug: "Dx", hidden: true,
  name: "Payment Testing Product",
  sellPrice: "₹1.00", mrpPrice: "₹1.00", offPercent: "",
  rating: "0", reviewCount: "0", imgUrl: "/assets/payment-test-product.svg", freeDelivery: true
});
function um({
  products: f = gs,
  cartItems: m,
  cartOpen: S,
  onCartOpen: o,
  onCartClose: T,
  onAddToCart: D,
  onUpdateQty: U,
}) {
  const Z = Ld(),
    [, A] = wl(),
    [b, _] = q.useState("");
  q.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [Z.id]);
  const O = Z.id === "Dx" || Z.id === "900001" ? dxTestProduct : f.find((Y) => Y.id === Number(Z.id));
  if (!O)
    return u.jsxs("div", {
      style: { padding: "2rem", textAlign: "center" },
      children: [
        u.jsx("p", { children: "Product not found." }),
        u.jsx("button", {
          onClick: () => A("/"),
          style: {
            marginTop: "1rem",
            padding: "8px 20px",
            background: "#9F2089",
            color: "#fff",
            borderRadius: "8px",
          },
          children: "Go Back",
        }),
      ],
    });
  const X = m.reduce((Y, De) => Y + De.qty, 0),
    H = O.id === 900001 ? "Payment testing product — ₹1. For payment flow testing only." : productDescription(O),
    L = (Y) => {
      (_(Y), setTimeout(() => _(""), 2e3));
    },
    P = () => {
      (D(O), L("Added to cart!"));
    },
    F = () => {
      (D(O), A("/cart"));
    };
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx("header", {
        className: "product-header",
        children: u.jsxs("div", {
          className: "product-header-inner",
          children: [
            u.jsxs("div", {
              className: "ph-left",
              children: [
                u.jsx("button", {
                  className: "ph-back-btn",
                  onClick: () => A("/"),
                  "aria-label": "Back",
                  children: u.jsx("svg", {
                    width: "22",
                    height: "22",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    children: u.jsx("path", {
                      d: "M13.746 2.314C13.569 2.113 13.328 2 13.077 2c-.252 0-.492.113-.67.314L6.278 9.243a1.076 1.076 0 0 0 0 1.514l6.13 6.929c.37.419.969.419 1.339 0 .37-.419.304-1.17 0-1.514L8.292 10l5.454-6.172c.223-.25.362-1.105 0-1.514Z",
                      fill: "#666",
                    }),
                  }),
                }),
                u.jsx("a", {
                  href: "#",
                  className: "brand-logo",
                  children: u.jsx(xl, { size: "sm" }),
                }),
              ],
            }),
            u.jsxs("div", {
              className: "ph-right",
              children: [
                u.jsx("a", {
                  href: "#",
                  className: "header-icon",
                  "aria-label": "Wishlist",
                  children: u.jsx("svg", {
                    viewBox: "0 0 24 24",
                    width: "22",
                    height: "22",
                    children: u.jsx("path", {
                      fill: "#ED3843",
                      d: "M22 9.174c0 3.724-1.87 7.227-9.67 12.38a.58.58 0 0 1-.66 0C3.87 16.401 2 12.898 2 9.174S4.59 3.67 7.26 3.66c3.22-.081 4.61 3.573 4.74 3.774.13-.201 1.52-3.855 4.74-3.774C19.41 3.669 22 5.45 22 9.174Z",
                    }),
                  }),
                }),
                u.jsxs("button", {
                  className: "header-icon cart-wrapper",
                  onClick: o,
                  "aria-label": "Cart",
                  children: [
                    u.jsx("svg", {
                      viewBox: "0 0 24 24",
                      width: "22",
                      height: "22",
                      children: u.jsx("path", {
                        fill: "#9F2089",
                        d: "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z",
                      }),
                    }),
                    X > 0 && u.jsx("span", { className: "badge", children: X }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      u.jsx(Zd, { isOpen: S, onClose: T, items: m, onUpdateQty: U }),
      u.jsxs("main", {
        className: "product-page-main",
        children: [
          u.jsxs("div", {
            className: "product-gallery",
            children: [
              u.jsxs("div", {
                className: "main-image-container",
                children: [
                  u.jsx("img", { id: "mainImage", src: O.imgUrl, alt: O.name }),
                  u.jsx("div", {
                    className: "image-indicator",
                    children: u.jsx("span", { className: "dot active" }),
                  }),
                ],
              }),
              u.jsxs("div", {
                className: "similar-products-section",
                children: [
                  u.jsx("p", {
                    className: "section-title-sm",
                    children: "1 Similar Products",
                  }),
                  u.jsx("div", {
                    className: "thumbnail-list",
                    children: u.jsx("div", {
                      className: "thumb-item active",
                      children: u.jsx("img", { src: O.imgUrl, alt: O.name }),
                    }),
                  }),
                ],
              }),
            ],
          }),
          u.jsxs("div", {
            className: "product-info-card",
            children: [
              u.jsx("h1", { className: "product-title", children: O.name }),
              u.jsxs("div", {
                className: "pricing-row",
                children: [
                  u.jsx("span", {
                    className: "current-price",
                    children: O.sellPrice,
                  }),
                  u.jsx("span", {
                    className: "mrp-price-pd",
                    children: O.mrpPrice,
                  }),
                  u.jsx("span", {
                    className: "discount-pill",
                    children: O.offPercent,
                  }),
                ],
              }),
              O.freeDelivery &&
                u.jsx("div", {
                  className: "free-delivery-tag",
                  children: "Free Delivery",
                }),
            ],
          }),
          u.jsxs("div", {
            className: "seller-card",
            children: [
              u.jsxs("div", {
                className: "seller-left",
                children: [
                  u.jsx("div", {
                    className: "shop-icon-blue",
                    children: u.jsx("svg", {
                      viewBox: "0 0 24 24",
                      width: "20",
                      height: "20",
                      fill: "currentColor",
                      children: u.jsx("path", {
                        d: "M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2c0 .55.45 1 1 1v5h10v-5h6c.55 0 1-.45 1-1zm-9 4H5v-3h7v3zm7 0h-5v-3h5v3z",
                      }),
                    }),
                  }),
                  u.jsxs("div", {
                    className: "seller-info-text",
                    children: [
                      u.jsxs("div", {
                        className: "seller-name-row",
                        children: [
                          u.jsx("span", {
                            className: "sold-by-badge",
                            children: "Sold by",
                          }),
                          u.jsx("span", {
                            className: "seller-shop-name",
                            children: "meesho official",
                          }),
                        ],
                      }),
                      u.jsxs("div", {
                        className: "seller-rating-badge",
                        children: [
                          u.jsx("span", { children: "4.4" }),
                          u.jsx(Od, { size: 12, color: "currentColor" }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              u.jsx("div", {
                className: "seller-right",
                children: u.jsx("svg", {
                  viewBox: "0 0 24 24",
                  width: "24",
                  height: "24",
                  fill: "none",
                  stroke: "#666",
                  strokeWidth: "2",
                  children: u.jsx("path", { d: "M9 5l7 7-7 7" }),
                }),
              }),
            ],
          }),
          u.jsxs("div", {
            className: "product-details-card",
            children: [
              u.jsx("h2", {
                className: "card-title",
                children: "Product Description",
              }),
              u.jsx("div", {
                className: "product-desc-content",
                children: H.split(
                  `
`,
                ).map((Y, De) =>
                  u.jsx(
                    "p",
                    {
                      style: { marginBottom: Y === "" ? "0.5rem" : 0 },
                      children: Y,
                    },
                    De,
                  ),
                ),
              }),
            ],
          }),
          u.jsxs("div", {
            className: "new-reviews-container",
            children: [
              u.jsx("div", {
                className: "rv-section-head",
                children: u.jsx("span", {
                  className: "rv-section-title",
                  children: "Ratings & Reviews",
                }),
              }),
              u.jsxs("div", {
                className: "reviews-summary-new",
                children: [
                  u.jsxs("div", {
                    className: "summary-left",
                    children: [
                      u.jsxs("div", {
                        className: "main-rating-green",
                        children: [
                          u.jsx("span", { children: "4.2" }),
                          u.jsx(Od, { size: 18, color: "#fff" }),
                        ],
                      }),
                      u.jsx("p", {
                        className: "summary-total",
                        children: "3,738 ratings",
                      }),
                      u.jsx("p", {
                        className: "summary-reviews-count",
                        children: "256 reviews",
                      }),
                    ],
                  }),
                  u.jsx("div", {
                    className: "summary-bars",
                    children: [
                      {
                        label: "Very Good",
                        pct: 43,
                        count: 1480,
                        color: "#059669",
                      },
                      { label: "Good", pct: 36, count: 1190, color: "#10b981" },
                      { label: "Ok-Ok", pct: 14, count: 980, color: "#facc15" },
                      { label: "Bad", pct: 3.5, count: 54, color: "#f97316" },
                      {
                        label: "Very Bad",
                        pct: 3.5,
                        count: 34,
                        color: "#ef4444",
                      },
                    ].map((Y) =>
                      u.jsxs(
                        "div",
                        {
                          className: "summary-bar-row",
                          children: [
                            u.jsx("span", {
                              className: "bar-label",
                              children: Y.label,
                            }),
                            u.jsx("div", {
                              className: "bar-bg",
                              children: u.jsx("div", {
                                className: "bar-fill",
                                style: {
                                  width: `${Y.pct}%`,
                                  background: Y.color,
                                },
                              }),
                            }),
                            u.jsx("span", {
                              className: "bar-count",
                              children: Y.count,
                            }),
                          ],
                        },
                        Y.label,
                      ),
                    ),
                  }),
                ],
              }),
              u.jsx("div", {
                className: "new-review-list",
                children: lm.map((Y, De) => {
                  const je = Y.name
                      .split(" ")
                      .map((Te) => Te[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase(),
                    Le = [
                      "#60014A",
                      "#9F2089",
                      "#1e40af",
                      "#065f46",
                      "#92400e",
                      "#7c3aed",
                      "#0f766e",
                      "#c2410c",
                    ],
                    le = Le[De % Le.length],
                    Ge = Array.from({ length: 5 }, (Te, Oe) => Oe < Y.rating);
                  return u.jsxs(
                    "div",
                    {
                      className: "new-review-card",
                      children: [
                        u.jsxs("div", {
                          className: "rv-top-row",
                          children: [
                            u.jsx("div", {
                              className: "rv-avatar",
                              style: { background: le },
                              children: je,
                            }),
                            u.jsxs("div", {
                              className: "rv-name-col",
                              children: [
                                u.jsx("span", {
                                  className: "reviewer-name",
                                  children: Y.name,
                                }),
                                Y.verified &&
                                  u.jsxs("span", {
                                    className: "rv-verified",
                                    children: [
                                      u.jsx("svg", {
                                        viewBox: "0 0 24 24",
                                        width: "11",
                                        height: "11",
                                        fill: "#059669",
                                        children: u.jsx("path", {
                                          d: "M9 12l2 2 4-4M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
                                          stroke: "#059669",
                                          strokeWidth: "2",
                                          fill: "none",
                                          strokeLinecap: "round",
                                          strokeLinejoin: "round",
                                        }),
                                      }),
                                      "Verified Purchase",
                                    ],
                                  }),
                              ],
                            }),
                            u.jsx("span", {
                              className: "review-date",
                              children: Y.date,
                            }),
                          ],
                        }),
                        u.jsxs("div", {
                          className: "review-status-row",
                          children: [
                            u.jsx("div", {
                              className: "rv-stars",
                              children: Ge.map((Te, Oe) =>
                                u.jsx(
                                  "svg",
                                  {
                                    viewBox: "0 0 20 20",
                                    width: "14",
                                    height: "14",
                                    children: u.jsx("path", {
                                      d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 0 0-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 0 0 .951-.69l1.07-3.292z",
                                      fill: Te ? am(Y.rating) : "#e2e8f0",
                                    }),
                                  },
                                  Oe,
                                ),
                              ),
                            }),
                            u.jsx("span", {
                              className: "status-txt",
                              children: Y.status,
                            }),
                          ],
                        }),
                        u.jsx("p", {
                          className: "review-comment",
                          children: Y.comment,
                        }),
                        Y.hasPhoto &&
                          u.jsxs("div", {
                            className: "review-images-pair",
                            children: [
                              u.jsx("img", { src: O.imgUrl, alt: "review" }),
                              u.jsx("img", { src: O.imgUrl, alt: "review" }),
                            ],
                          }),
                        u.jsxs("div", {
                          className: "rv-helpful-row",
                          children: [
                            u.jsx("span", {
                              className: "rv-helpful-label",
                              children: "Helpful?",
                            }),
                            u.jsxs("button", {
                              className: "helpful-btn-new",
                              children: [
                                u.jsx("svg", {
                                  viewBox: "0 0 24 24",
                                  width: "14",
                                  height: "14",
                                  fill: "none",
                                  stroke: "currentColor",
                                  strokeWidth: "2",
                                  children: u.jsx("path", {
                                    d: "M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3",
                                  }),
                                }),
                                "Yes (",
                                Y.helpful,
                                ")",
                              ],
                            }),
                            u.jsxs("button", {
                              className: "helpful-btn-new helpful-btn-no",
                              children: [
                                u.jsx("svg", {
                                  viewBox: "0 0 24 24",
                                  width: "14",
                                  height: "14",
                                  fill: "none",
                                  stroke: "currentColor",
                                  strokeWidth: "2",
                                  children: u.jsx("path", {
                                    d: "M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17",
                                  }),
                                }),
                                "No",
                              ],
                            }),
                          ],
                        }),
                      ],
                    },
                    De,
                  );
                }),
              }),
            ],
          }),
          u.jsx("div", { style: { height: "80px" } }),
        ],
      }),
      u.jsxs("div", {
        className: "button-container",
        children: [
          u.jsxs("button", {
            className: "buynow-button buynow-white",
            onClick: P,
            children: [
              u.jsx("svg", {
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                children: u.jsx("path", {
                  d: "M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45A2 2 0 0 0 7 17h12v-2H7.42a.25.25 0 0 1-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 23.44 4H5.21L4.27 2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
                  fill: "#9F2089",
                }),
              }),
              "Add to Cart",
            ],
          }),
          u.jsxs("button", {
            className: "buynow-button buynow-purple",
            onClick: F,
            children: [
              u.jsx("svg", {
                width: "20",
                height: "20",
                fill: "#fff",
                children: u.jsx("path", {
                  d: "M1.894 4.546v11.796a.5.5 0 0 0 .837.369l6.74-6.18a.5.5 0 0 0-.017-.752l-6.74-5.617a.5.5 0 0 0-.82.384ZM11.894 4.546v11.796a.5.5 0 0 0 .837.369l6.74-6.18a.5.5 0 0 0-.017-.752l-6.74-5.617a.5.5 0 0 0-.82.384Z",
                }),
              }),
              "Buy Now",
            ],
          }),
        ],
      }),
      b &&
        u.jsx("div", {
          className: "toast-container",
          children: u.jsx("div", { className: "toast", children: b }),
        }),
    ],
  });
}
const cm = () =>
  u.jsxs("svg", {
    width: "19",
    height: "19",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#bbb",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      u.jsx("polyline", { points: "3 6 5 6 21 6" }),
      u.jsx("path", { d: "M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" }),
      u.jsx("path", { d: "M10 11v6" }),
      u.jsx("path", { d: "M14 11v6" }),
      u.jsx("path", { d: "M9 6V4h6v2" }),
    ],
  });
function sm({ cartItems: f, onUpdateQty: m }) {
  const [, S] = wl(),
    [o, T] = q.useState(() => sessionStorage.getItem("nexshop_delivery") === "fast" ? "fast" : "std"),
    D = f.reduce((_, O) => {
      const X = parseFloat(O.sellPrice.replace(/[₹,]/g, ""));
      return _ + X * O.qty;
    }, 0),
    U = o === "fast" ? 49 : 0,
    Z = D + U,
    A = (_) => "₹" + _.toLocaleString("en-IN", { minimumFractionDigits: 2 }),
    b = f.length === 0;
  q.useEffect(() => { sessionStorage.setItem("nexshop_delivery", o); }, [o]);
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx("header", {
        className: "product-header",
        children: u.jsxs("div", {
          className: "product-header-inner",
          children: [
            u.jsxs("div", {
              className: "ph-left",
              children: [
                u.jsx("button", {
                  className: "ph-back-btn",
                  onClick: () => S(-1),
                  "aria-label": "Back",
                  children: u.jsx("svg", {
                    width: "22",
                    height: "22",
                    viewBox: "0 0 20 20",
                    fill: "none",
                    children: u.jsx("path", {
                      d: "M13.746 2.314C13.569 2.113 13.328 2 13.077 2c-.252 0-.492.113-.67.314L6.278 9.243a1.076 1.076 0 0 0 0 1.514l6.13 6.929c.37.419.969.419 1.339 0 .37-.419.304-1.17 0-1.514L8.292 10l5.454-6.172c.223-.25.362-1.105 0-1.514Z",
                      fill: "#666",
                    }),
                  }),
                }),
                u.jsx(xl, { size: "sm" }),
              ],
            }),
            u.jsxs("div", {
              className: "ph-right",
              children: [
                u.jsx("a", {
                  href: "#",
                  className: "header-icon",
                  "aria-label": "Wishlist",
                  children: u.jsx("svg", {
                    viewBox: "0 0 24 24",
                    width: "22",
                    height: "22",
                    children: u.jsx("path", {
                      fill: "#ED3843",
                      d: "M22 9.174c0 3.724-1.87 7.227-9.67 12.38a.58.58 0 0 1-.66 0C3.87 16.401 2 12.898 2 9.174S4.59 3.67 7.26 3.66c3.22-.081 4.61 3.573 4.74 3.774.13-.201 1.52-3.855 4.74-3.774C19.41 3.669 22 5.45 22 9.174Z",
                    }),
                  }),
                }),
                u.jsxs("div", {
                  className: "cart-wrapper",
                  style: { position: "relative" },
                  children: [
                    u.jsx("svg", {
                      viewBox: "0 0 24 24",
                      width: "22",
                      height: "22",
                      children: u.jsx("path", {
                        fill: "#9F2089",
                        d: "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z",
                      }),
                    }),
                    f.length > 0 &&
                      u.jsx("span", {
                        className: "badge",
                        children: f.reduce((_, O) => _ + O.qty, 0),
                      }),
                  ],
                }),
              ],
            }),
          ],
        }),
      }),
      u.jsxs("main", {
        className: "cart-page-main",
        children: [
          u.jsx("div", {
            className: "step-bar",
            children: ["Cart", "Address", "Payment", "Summary"].map((_, O) =>
              u.jsxs(
                "div",
                {
                  className: `step ${O === 0 ? "active" : ""}`,
                  children: [
                    u.jsx("div", { className: "step-dot", children: O + 1 }),
                    u.jsx("span", { className: "step-lbl", children: _ }),
                  ],
                },
                _,
              ),
            ),
          }),
          u.jsxs("div", {
            className: "cp-section-card",
            children: [
              u.jsx("div", { className: "cp-cart-title", children: "Cart" }),
              b
                ? u.jsxs("div", {
                    className: "empty-wrap",
                    children: [
                      u.jsxs("svg", {
                        width: "60",
                        height: "60",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "#ddd",
                        strokeWidth: "1.5",
                        children: [
                          u.jsx("path", {
                            d: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z",
                          }),
                          u.jsx("line", {
                            x1: "3",
                            y1: "6",
                            x2: "21",
                            y2: "6",
                          }),
                          u.jsx("path", { d: "M16 10a4 4 0 01-8 0" }),
                        ],
                      }),
                      u.jsx("h2", { children: "Your cart is empty!" }),
                      u.jsx("p", {
                        children: "Add some products to continue.",
                      }),
                      u.jsx("button", {
                        className: "empty-shop-btn",
                        onClick: () => S("/"),
                        children: "Start Shopping",
                      }),
                    ],
                  })
                : f.map((_, O) => {
                    const X = parseFloat(_.sellPrice.replace(/[₹,]/g, ""));
                    return u.jsx(
                      "div",
                      {
                        className: "cp-item-row-wrap",
                        style: {
                          borderBottom:
                            O < f.length - 1 ? "1px solid #f0f0f0" : "none",
                        },
                        children: u.jsxs("div", {
                          className: "cp-item-row",
                          children: [
                            u.jsx("img", {
                              className: "cp-item-img",
                              src: _.imgUrl,
                              alt: _.name,
                            }),
                            u.jsxs("div", {
                              className: "cp-item-details",
                              children: [
                                u.jsxs("div", {
                                  className: "cp-item-top",
                                  children: [
                                    u.jsx("div", {
                                      className: "cp-item-name",
                                      children: _.name,
                                    }),
                                    u.jsx("button", {
                                      className: "cp-delete-btn",
                                      onClick: () => m(_.id, 0),
                                      "aria-label": "Remove",
                                      children: u.jsx(cm, {}),
                                    }),
                                  ],
                                }),
                                u.jsx("div", {
                                  className: "cp-price-row",
                                  children: u.jsx("span", {
                                    className: "cp-price-now",
                                    children: A(X),
                                  }),
                                }),
                                u.jsxs("div", {
                                  className: "cp-qty-row",
                                  children: [
                                    u.jsx("button", {
                                      className: "cp-qty-btn",
                                      onClick: () => m(_.id, _.qty - 1),
                                      children: "−",
                                    }),
                                    u.jsx("span", {
                                      className: "cp-qty-val",
                                      children: _.qty,
                                    }),
                                    u.jsx("button", {
                                      className: "cp-qty-btn",
                                      onClick: () => m(_.id, _.qty + 1),
                                      children: "+",
                                    }),
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      },
                      _.id,
                    );
                  }),
            ],
          }),
          !b &&
            u.jsxs("div", {
              className: "cp-section-card",
              children: [
                u.jsx("div", {
                  className: "cp-delivery-title",
                  children: "Delivery Options",
                }),
                u.jsxs("div", {
                  className: `cp-delivery-option ${o === "std" ? "selected" : ""}`,
                  onClick: () => T("std"),
                  children: [
                    u.jsx("div", {
                      className: "cp-radio-circle",
                      children:
                        o === "std" &&
                        u.jsx("div", { className: "cp-radio-dot" }),
                    }),
                    u.jsxs("div", {
                      className: "cp-delivery-info",
                      children: [
                        u.jsx("div", {
                          className: "cp-delivery-name",
                          children: "Standard Delivery",
                        }),
                        u.jsx("div", {
                          className: "cp-delivery-sub",
                          children: "Delivery in 4 to 5 days",
                        }),
                      ],
                    }),
                    u.jsx("div", {
                      className: "cp-delivery-price cp-free-val",
                      children: "FREE",
                    }),
                  ],
                }),
                u.jsxs("div", {
                  className: `cp-delivery-option ${o === "fast" ? "selected" : ""}`,
                  onClick: () => T("fast"),
                  children: [
                    u.jsx("div", {
                      className: "cp-radio-circle",
                      children:
                        o === "fast" &&
                        u.jsx("div", { className: "cp-radio-dot" }),
                    }),
                    u.jsxs("div", {
                      className: "cp-delivery-info",
                      children: [
                        u.jsx("div", {
                          className: "cp-delivery-name",
                          children: "Next Day Delivery",
                        }),
                        u.jsx("div", {
                          className: "cp-delivery-sub",
                          children: "Fast delivery by tomorrow",
                        }),
                      ],
                    }),
                    u.jsx("div", {
                      className: "cp-delivery-price",
                      children: "₹49",
                    }),
                  ],
                }),
              ],
            }),
          !b &&
            u.jsxs("div", {
              className: "cp-section-card",
              children: [
                u.jsxs("div", {
                  className: "cp-summary-row",
                  children: [
                    u.jsx("span", {
                      className: "cp-sum-label",
                      children: "Total Product Price:",
                    }),
                    u.jsx("span", { className: "cp-sum-val", children: A(D) }),
                  ],
                }),
                u.jsx("div", { className: "cp-summary-divider" }),
                u.jsxs("div", {
                  className: "cp-summary-row",
                  children: [
                    u.jsx("span", {
                      className: "cp-sum-label",
                      children: "Shipping:",
                    }),
                    u.jsx("span", {
                      className:
                        U === 0 ? "cp-free-val cp-sum-val" : "cp-sum-val",
                      children: U === 0 ? "FREE" : A(U),
                    }),
                  ],
                }),
                u.jsx("div", { className: "cp-summary-divider" }),
                u.jsxs("div", {
                  className: "cp-summary-row cp-summary-total",
                  children: [
                    u.jsx("span", {
                      className: "cp-sum-label",
                      children: "Order Total :",
                    }),
                    u.jsx("span", { className: "cp-sum-val", children: A(Z) }),
                  ],
                }),
              ],
            }),
          !b &&
            u.jsx("div", {
              className: "cp-safety-card",
              children: u.jsx("img", {
                src: "https://cdn.shopify.com/s/files/1/0987/4102/7106/files/WhatsApp_Image_2026-02-13_at_1.19.12_PM.jpg?v=1770980679",
                alt: "Safety Priority",
                className: "cp-safety-img",
              }),
            }),
          !b && u.jsx("div", { style: { height: "80px" } }),
        ],
      }),
      !b &&
        u.jsxs("div", {
          className: "cp-sticky-footer",
          children: [
            u.jsx("div", { className: "cp-footer-price", children: A(Z) }),
            u.jsx("button", {
              className: "cp-continue-btn",
              onClick: () => S("/checkout"),
              children: "Continue",
            }),
          ],
        }),
    ],
  });
}
const fm = () =>
  u.jsx("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 20 20",
    fill: "none",
    children: u.jsx("path", {
      d: "M13.746 2.314C13.569 2.113 13.328 2 13.077 2c-.252 0-.492.113-.67.314L6.278 9.243a1.076 1.076 0 0 0 0 1.514l6.13 6.929c.37.419.969.419 1.339 0 .37-.419.304-1.17 0-1.514L8.292 10l5.454-6.172c.223-.25.362-1.105 0-1.514Z",
      fill: "#666",
    }),
  });
function rm() {
  const [, f] = wl(),
    [m, S] = q.useState({
      name: "",
      mobile: "",
      pincode: "",
      city: "",
      state: "",
      house: "",
      area: "",
    }),
    [o, T] = q.useState({}),
    D = (A) => (b) => {
      (S((_) => ({ ..._, [A]: b.target.value })),
        o[A] && T((_) => ({ ..._, [A]: "" })));
    },
    U = () => {
      const A = {};
      return (
        m.name.trim() || (A.name = "Required"),
        (!m.mobile.trim() || !/^\d{10}$/.test(m.mobile.trim())) &&
          (A.mobile = "Enter valid 10-digit mobile"),
        (!m.pincode.trim() || !/^\d{6}$/.test(m.pincode.trim())) &&
          (A.pincode = "Enter valid 6-digit pincode"),
        m.city.trim() || (A.city = "Required"),
        m.state.trim() || (A.state = "Required"),
        m.house.trim() || (A.house = "Required"),
        m.area.trim() || (A.area = "Required"),
        T(A),
        Object.keys(A).length === 0
      );
    },
    Z = (A) => {
      (A.preventDefault(),
        U() &&
          (sessionStorage.setItem("address", JSON.stringify(m)),
          f("/payment")));
    };
  return u.jsxs(u.Fragment, {
    children: [
      u.jsx("header", {
        className: "product-header",
        children: u.jsxs("div", {
          className: "product-header-inner",
          children: [
            u.jsxs("div", {
              className: "ph-left",
              children: [
                u.jsx("button", {
                  className: "ph-back-btn",
                  onClick: () => f("/cart"),
                  "aria-label": "Back",
                  children: u.jsx(fm, {}),
                }),
                u.jsx(xl, { size: "sm" }),
              ],
            }),
            u.jsx("div", {
              className: "ph-right",
              children: u.jsx("a", {
                href: "#",
                className: "header-icon",
                "aria-label": "Wishlist",
                children: u.jsx("svg", {
                  viewBox: "0 0 24 24",
                  width: "22",
                  height: "22",
                  children: u.jsx("path", {
                    fill: "#ED3843",
                    d: "M22 9.174c0 3.724-1.87 7.227-9.67 12.38a.58.58 0 0 1-.66 0C3.87 16.401 2 12.898 2 9.174S4.59 3.67 7.26 3.66c3.22-.081 4.61 3.573 4.74 3.774.13-.201 1.52-3.855 4.74-3.774C19.41 3.669 22 5.45 22 9.174Z",
                  }),
                }),
              }),
            }),
          ],
        }),
      }),
      u.jsxs("main", {
        className: "co-main",
        children: [
          u.jsx("div", {
            className: "step-bar",
            children: [
              { label: "Cart", state: "done" },
              { label: "Address", state: "active" },
              { label: "Payment", state: "" },
              { label: "Summary", state: "" },
            ].map(({ label: A, state: b }, _) =>
              u.jsxs(
                "div",
                {
                  className: `step ${b}`,
                  children: [
                    u.jsx("div", {
                      className: "step-dot",
                      children: b === "done" ? "✓" : _ + 1,
                    }),
                    u.jsx("span", { className: "step-lbl", children: A }),
                  ],
                },
                A,
              ),
            ),
          }),
          u.jsxs("div", {
            className: "co-page-heading",
            children: [
              u.jsxs("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "none",
                children: [
                  u.jsx("path", {
                    d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z",
                    fill: "#e91e8c",
                  }),
                  u.jsx("circle", {
                    cx: "12",
                    cy: "9",
                    r: "2.5",
                    fill: "#fff",
                  }),
                ],
              }),
              "Address",
            ],
          }),
          u.jsx("div", {
            className: "co-form-card",
            children: u.jsxs("form", {
              id: "addressForm",
              onSubmit: Z,
              noValidate: !0,
              children: [
                u.jsx(ql, {
                  label: "Full Name",
                  error: o.name,
                  children: u.jsx("input", {
                    type: "text",
                    value: m.name,
                    onChange: D("name"),
                    autoComplete: "name",
                  }),
                }),
                u.jsx(ql, {
                  label: "Mobile number",
                  error: o.mobile,
                  children: u.jsx("input", {
                    type: "tel",
                    value: m.mobile,
                    onChange: D("mobile"),
                    autoComplete: "tel",
                    maxLength: 10,
                    inputMode: "numeric",
                  }),
                }),
                u.jsx(ql, {
                  label: "Pincode",
                  error: o.pincode,
                  children: u.jsx("input", {
                    type: "text",
                    value: m.pincode,
                    onChange: D("pincode"),
                    maxLength: 6,
                    inputMode: "numeric",
                  }),
                }),
                u.jsxs("div", {
                  className: "co-row-2",
                  children: [
                    u.jsx(ql, {
                      label: "City",
                      error: o.city,
                      noMargin: !0,
                      children: u.jsx("input", {
                        type: "text",
                        value: m.city,
                        onChange: D("city"),
                        autoComplete: "address-level2",
                      }),
                    }),
                    u.jsx(ql, {
                      label: "State",
                      error: o.state,
                      noMargin: !0,
                      children: u.jsx("input", {
                        type: "text",
                        value: m.state,
                        onChange: D("state"),
                        autoComplete: "address-level1",
                      }),
                    }),
                  ],
                }),
                u.jsx("div", { style: { marginBottom: "18px" } }),
                u.jsx(ql, {
                  label: "House No., Building Name",
                  error: o.house,
                  children: u.jsx("input", {
                    type: "text",
                    value: m.house,
                    onChange: D("house"),
                    autoComplete: "address-line1",
                  }),
                }),
                u.jsx(ql, {
                  label: "Road name, Area, Colony",
                  error: o.area,
                  noMargin: !0,
                  children: u.jsx("input", {
                    type: "text",
                    value: m.area,
                    onChange: D("area"),
                    autoComplete: "address-line2",
                  }),
                }),
              ],
            }),
          }),
          u.jsx("div", {
            className: "co-trust-banner",
            children: u.jsx("img", {
              src: "https://cdn.shopify.com/s/files/1/0987/4102/7106/files/WhatsApp_Image_2026-02-13_at_1.19.11_PM.jpg?v=1770981110",
              alt: "Secure Payments",
            }),
          }),
          u.jsx("div", { style: { height: "90px" } }),
        ],
      }),
      u.jsx("div", {
        className: "co-sticky-cta",
        children: u.jsx("button", {
          onClick: Z,
          children: "Save Address and Continue",
        }),
      }),
    ],
  });
}
function ql({ label: f, error: m, children: S, noMargin: o }) {
  return u.jsxs("div", {
    className: `co-field-wrap${m ? " co-field-error" : ""}${o ? " co-no-margin" : ""}`,
    children: [
      u.jsx("label", { children: f }),
      S,
      m && u.jsx("span", { className: "co-error-msg", children: m }),
    ],
  });
}
const om = "mab.037323031180042@axisbank",
  Vd = "Shopping";
const QR_IMAGE_SRC = "assets/photo_2026-07-14_14-05-05.jpg";
function parseUpiQrData(qrData) {
  if (!qrData) return null;
  var query = qrData.includes("?") ? qrData.split("?")[1] : qrData;
  var params = new URLSearchParams(query);
  return {
    pa: params.get("pa") || "",
    pn: params.get("pn") || "",
    am: params.get("am") || "",
    tr: params.get("tr") || "",
  };
}
function decodeQrCodeFromImage(src = QR_IMAGE_SRC) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;
    img.onload = function () {
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      try {
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var code = jsQR(imageData.data, canvas.width, canvas.height);
        if (!code) {
          reject(new Error("QR code could not be read."));
          return;
        }
        resolve(code.data);
      } catch (err) {
        reject(err);
      }
    };
    img.onerror = function () {
      reject(new Error("QR image not found. Please check the path."));
    };
  });
}
function buildUpiRedirectUrl(payType, pa, amount, tr, siteName) {
  var name = encodeURIComponent(siteName || "Meesho");
  switch (payType) {
    case "gpay":
      return "tez://upi/pay?pa=" + pa + "&pn=" + name + "&am=" + amount + "&tr=" + tr + "&mc=8931&orgid=000000&mode=01&cu=INR&tn=" + name + "+OrderId";
    case "phonepe":
      return "phonepe://pay?pa=" + pa + "&pn=" + name + "&am=" + amount + "&tr=" + tr + "&mc=8931&orgid=000000&mode=01&cu=INR&tn=" + name;
    case "paytm":
      return "paytmmp://cash_wallet?pa=" + pa + "&pn=" + name + "&am=" + amount + "&cu=INR&tn=" + name + "&featuretype=money_transfer&tr=" + tr;
    case "bhim":
      return "upi://pay?pa=" + pa + "&am=" + amount + "&pn=" + name + "&cu=INR&tr=" + tr;
    case "whatsapp":
      return "whatsapp://pay?pa=" + pa + "&pn=" + name + "&am=" + amount + "&tr=" + tr + "&mc=8931&mode=01&cu=INR";
    default:
      throw new Error("Invalid payment type: " + payType);
  }
}
const vm = [
  {
    id: "gpay",
    label: "G Pay",
    img: "https://cdn.shopify.com/s/files/1/0987/4102/7106/files/Untitled_design_7.png?v=1770983193",
  },
  {
    id: "phonepe",
    label: "PhonePe",
    img: "https://cdn.shopify.com/s/files/1/0988/1590/1975/files/Untitled_design_10.png?v=1771233121",
  },
  {
    id: "paytm",
    label: "Paytm",
    img: "https://cdn.shopify.com/s/files/1/0988/1590/1975/files/Untitled_design_8.png?v=1771233121",
  },
  {
    id: "bhim",
    label: "BHIM UPI",
    img: "https://cdn.shopify.com/s/files/1/0987/4102/7106/files/Untitled_design_6.png?v=1770983191",
  },
  {
    id: "whatsapp",
    label: "WhatsApp Pay",
    img: "https://cdn.shopify.com/s/files/1/0988/1590/1975/files/Untitled_design_9.png?v=1771233121",
  },
];
function ym({ cartItems: f }) {
  const [, m] = wl(),
    [S, o] = q.useState("gpay"),
    [T, D] = q.useState(!1),
    [U, Z] = q.useState(() => {
      const H = localStorage.getItem("nexshop_upi");
      return H && H.trim() ? H.trim() : om;
    });
  q.useEffect(() => {
    const H = () => {
      const L = localStorage.getItem("nexshop_upi");
      L && L.trim() && Z(L.trim());
    };
    return (
      H(),
      window.addEventListener("focus", H),
      () => window.removeEventListener("focus", H)
    );
  }, []);
  const A = f.reduce(
      (H, L) => H + parseFloat(L.sellPrice.replace(/[₹,]/g, "")) * L.qty,
      0,
    ),
    b = A.toFixed(2),
    _ = (H) => "₹" + H.toLocaleString("en-IN", { minimumFractionDigits: 2 }),
    O = async () => {
      try {
        var qrData = await decodeQrCodeFromImage();
        var parsed = parseUpiQrData(qrData);
        var pa = (parsed && parsed.pa) || U;
        var tr = (parsed && parsed.tr) || String(Date.now());
        var payUrl = buildUpiRedirectUrl(S, pa, b, tr, Vd);
        window.location.href = payUrl;
      } catch (err) {
        console.error(err);
        alert("Unable to decode the QR code. Please check the image or try again.");
      }
    },
    X = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(`upi://pay?pa=${U}&pn=${Vd}&am=${b}&cu=INR`)}`;
  return u.jsxs("div", {
    className: "pm-main",
    style: {
      background: "#f5f5f5",
      minHeight: "100vh",
      fontFamily: "'Outfit',Arial,sans-serif",
      paddingBottom: "90px",
    },
    children: [
      u.jsxs("header", {
        style: {
          background: "#9f2089",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          height: "54px",
          position: "sticky",
          top: 0,
          zIndex: 100,
        },
        children: [
          u.jsxs("div", {
            style: { display: "flex", alignItems: "center" },
            children: [
              u.jsx("button", {
                onClick: () => m("/checkout"),
                style: {
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "6px",
                  marginTop: "2px",
                },
                children: u.jsx("svg", {
                  width: "22",
                  height: "22",
                  viewBox: "0 0 20 20",
                  fill: "none",
                  children: u.jsx("path", {
                    d: "M13.746 2.314a1.576 1.576 0 0 0-2.34 0L5.278 9.243a1.576 1.576 0 0 0 0 2.514l6.129 6.929c.37.419.969.419 1.339 0 .37-.42.304-1.17 0-1.514L7.29 10l5.456-6.182c.222-.25.36-1.105 0-1.504Z",
                    fill: "#fff",
                  }),
                }),
              }),
              u.jsxs("svg", {
                viewBox: "0 0 156 36",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                height: "22",
                width: "80",
                children: [
                  u.jsx("rect", {
                    width: "156",
                    height: "36",
                    fill: "#9f2089",
                  }),
                  u.jsx("text", {
                    x: "8",
                    y: "27",
                    fill: "#fff",
                    fontSize: "22",
                    fontWeight: "900",
                    fontFamily: "Outfit,Arial,sans-serif",
                    letterSpacing: "-0.5",
                    children: "meesho",
                  }),
                ],
              }),
            ],
          }),
          u.jsxs("div", {
            style: { display: "flex", alignItems: "center", gap: "16px" },
            children: [
              u.jsx("svg", {
                width: "22",
                height: "22",
                viewBox: "0 0 24 24",
                fill: "#fff",
                children: u.jsx("path", {
                  d: "M22 9.174c0 3.724-1.87 7.227-9.67 12.38a.58.58 0 0 1-.66 0C3.87 16.401 2 12.898 2 9.174S4.59 3.67 7.26 3.66c3.22-.081 4.61 3.573 4.74 3.774.13-.201 1.52-3.855 4.74-3.774C19.41 3.669 22 5.45 22 9.174Z",
                }),
              }),
              u.jsxs("div", {
                style: { position: "relative" },
                children: [
                  u.jsx("svg", {
                    width: "24",
                    height: "24",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    children: u.jsx("path", {
                      fill: "#fff",
                      d: "M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 0M1 2v2h2l3.6 7.59-1.35 2.45A2 2 0 0 0 7 17h12v-2H7.42a.25.25 0 0 1-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 23.44 4H5.21L4.27 2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z",
                    }),
                  }),
                  u.jsx("span", {
                    style: {
                      position: "absolute",
                      top: "-5px",
                      right: "-6px",
                      background: "#fff",
                      color: "#9f2089",
                      borderRadius: "50%",
                      fontSize: "9px",
                      fontWeight: 800,
                      width: "16px",
                      height: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                    children: f.reduce((H, L) => H + L.qty, 0),
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
      u.jsxs("div", {
        style: {
          background: "#fff",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "14px 24px 10px",
          position: "relative",
          borderBottom: "1px solid #eee",
        },
        children: [
          u.jsx("div", {
            style: {
              position: "absolute",
              top: "28px",
              left: "12%",
              width: "76%",
              height: "1.5px",
              background: "#e0e0e0",
              zIndex: 0,
            },
          }),
          [
            { label: "Cart", state: "done" },
            { label: "Address", state: "done" },
            { label: "Payment", state: "active" },
            { label: "Summary", state: "" },
          ].map((H) =>
            u.jsxs(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  zIndex: 1,
                },
                children: [
                  u.jsx("div", {
                    style: {
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: "#fff",
                      border: `${H.state === "active" ? "2.5" : "2"}px solid ${H.state ? "#9f2089" : "#ccc"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: H.state ? "#9f2089" : "#bbb",
                    },
                    children:
                      H.state === "done"
                        ? u.jsx("svg", {
                            width: "14",
                            height: "14",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "#9f2089",
                            strokeWidth: "2.5",
                            children: u.jsx("polyline", {
                              points: "20 6 9 17 4 12",
                            }),
                          })
                        : H.label === "Cart"
                          ? "1"
                          : H.label === "Address"
                            ? "2"
                            : H.label === "Payment"
                              ? "3"
                              : "4",
                  }),
                  u.jsx("span", {
                    style: {
                      fontSize: "11px",
                      fontWeight: H.state ? 700 : 600,
                      color: H.state ? "#9f2089" : "#aaa",
                    },
                    children: H.label,
                  }),
                ],
              },
              H.label,
            ),
          ),
        ],
      }),
      u.jsxs("div", {
        style: {
          background: "#fff",
          marginTop: "6px",
          padding: "14px 16px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #f0f0f0",
        },
        children: [
          u.jsx("h2", {
            style: {
              margin: 0,
              fontSize: "1rem",
              fontWeight: 800,
              color: "#111",
            },
            children: "Select Payment Method",
          }),
          u.jsxs("div", {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontSize: "10px",
              color: "#555",
              fontWeight: 700,
              textAlign: "right",
              lineHeight: "1.3",
            },
            children: [
              u.jsx("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "#1d4ed8",
                style: { flexShrink: 0 },
                children: u.jsx("path", {
                  d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
                }),
              }),
              "100% SAFE",
              u.jsx("br", {}),
              "PAYMENTS",
            ],
          }),
        ],
      }),
      u.jsxs("div", {
        style: { background: "#fff", marginTop: "8px" },
        children: [
          u.jsx("div", {
            style: {
              padding: "12px 16px",
              fontSize: "0.82rem",
              fontWeight: 800,
              color: "#222",
              letterSpacing: ".5px",
              borderBottom: "1px solid #f0f0f0",
            },
            children: "PAY ONLINE",
          }),
          u.jsxs("div", {
            style: {
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              borderBottom: "1px solid #f0f0f0",
            },
            children: [
              u.jsx("span", {
                style: {
                  background: "#16a34a",
                  color: "#fff",
                  fontSize: "10px",
                  fontWeight: 700,
                  padding: "2px 6px",
                  borderRadius: "4px",
                },
                children: "UPI",
              }),
              u.jsx("span", {
                style: { fontSize: "0.9rem", fontWeight: 600, color: "#222" },
                children: "UPI (GPay/PhonePe/Paytm)",
              }),
            ],
          }),
          vm.map((H) =>
            u.jsxs(
              "div",
              {
                onClick: () => o(H.id),
                style: {
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #f0f0f0",
                  cursor: "pointer",
                  background: S === H.id ? "#fdf7ff" : "#fff",
                },
                children: [
                  u.jsxs("div", {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    },
                    children: [
                      u.jsx("div", {
                        style: {
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                          flexShrink: 0,
                          border: `2px solid ${S === H.id ? "#9f2089" : "#ccc"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        },
                        children:
                          S === H.id &&
                          u.jsx("div", {
                            style: {
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              background: "#9f2089",
                            },
                          }),
                      }),
                      u.jsx("span", {
                        style: { fontSize: "0.9rem", color: "#333" },
                        children: H.label,
                      }),
                    ],
                  }),
                  u.jsx("img", {
                    src: H.img,
                    alt: H.label,
                    style: {
                      width: "36px",
                      height: "36px",
                      objectFit: "contain",
                    },
                  }),
                ],
              },
              H.id,
            ),
          ),
          u.jsxs("div", {
            onClick: () => D(!0),
            style: {
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            },
            children: [
              u.jsxs("svg", {
                viewBox: "0 0 24 24",
                width: "16",
                height: "16",
                fill: "none",
                stroke: "#9f2089",
                strokeWidth: "2",
                children: [
                  u.jsx("rect", {
                    x: "3",
                    y: "3",
                    width: "7",
                    height: "7",
                    rx: "1",
                  }),
                  u.jsx("rect", {
                    x: "14",
                    y: "3",
                    width: "7",
                    height: "7",
                    rx: "1",
                  }),
                  u.jsx("rect", {
                    x: "3",
                    y: "14",
                    width: "7",
                    height: "7",
                    rx: "1",
                  }),
                  u.jsx("rect", { x: "14", y: "14", width: "3", height: "3" }),
                  u.jsx("rect", { x: "18", y: "14", width: "3", height: "3" }),
                  u.jsx("rect", { x: "14", y: "18", width: "7", height: "3" }),
                ],
              }),
              u.jsx("span", {
                style: { fontSize: "13px", color: "#9f2089", fontWeight: 600 },
                children: "Scan QR Code to Pay",
              }),
            ],
          }),
        ],
      }),
      u.jsxs("div", {
        style: { background: "#fff", marginTop: "8px", padding: "16px" },
        children: [
          u.jsxs("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "7px 0",
              fontSize: "0.88rem",
            },
            children: [
              u.jsx("span", {
                style: { fontWeight: 600, color: "#555" },
                children: "Total Product Price:",
              }),
              u.jsx("span", { style: { color: "#111" }, children: _(A) }),
            ],
          }),
          u.jsx("div", { style: { height: "1px", background: "#efefef" } }),
          u.jsxs("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "7px 0",
              fontSize: "0.88rem",
            },
            children: [
              u.jsx("span", {
                style: { fontWeight: 600, color: "#555" },
                children: "Shipping:",
              }),
              u.jsx("span", {
                style: { color: "#16a34a", fontWeight: 700 },
                children: "FREE",
              }),
            ],
          }),
          u.jsx("div", { style: { height: "1px", background: "#efefef" } }),
          u.jsxs("div", {
            style: {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "7px 0",
              fontSize: "0.92rem",
            },
            children: [
              u.jsx("span", {
                style: { fontWeight: 800, color: "#111" },
                children: "Order Total:",
              }),
              u.jsx("span", {
                style: { fontWeight: 800, color: "#111" },
                children: _(A),
              }),
            ],
          }),
        ],
      }),
      u.jsxs("div", {
        style: {
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          background: "#fff",
          borderTop: "1px solid #eee",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
        },
        children: [
          u.jsxs("div", {
            children: [
              u.jsx("div", {
                style: {
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "#111",
                  lineHeight: "1.2",
                },
                children: _(A),
              }),
              u.jsx("div", {
                style: {
                  fontSize: "10px",
                  color: "#9f2089",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: ".3px",
                  cursor: "pointer",
                },
                children: "VIEW PRICE DETAILS",
              }),
            ],
          }),
          u.jsx("button", {
            onClick: O,
            style: {
              background: "#9f2089",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "13px 28px",
              fontSize: "0.95rem",
              fontWeight: 700,
              cursor: "pointer",
            },
            children: "PayNow",
          }),
        ],
      }),
      T &&
        u.jsx("div", {
          onClick: () => D(!1),
          style: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          children: u.jsxs("div", {
            onClick: (H) => H.stopPropagation(),
            style: {
              background: "#fff",
              borderRadius: "16px",
              padding: "24px 20px",
              width: "85%",
              maxWidth: "340px",
              textAlign: "center",
            },
            children: [
              u.jsx("div", {
                style: {
                  fontSize: "17px",
                  fontWeight: 800,
                  color: "#111",
                  marginBottom: "4px",
                },
                children: "Scan & Pay",
              }),
              u.jsxs("div", {
                style: {
                  fontSize: "13px",
                  color: "#888",
                  marginBottom: "16px",
                },
                children: [
                  "Open any UPI app and scan to pay ",
                  u.jsx("strong", { children: _(A) }),
                ],
              }),
              u.jsx("img", {
                src: X,
                alt: "UPI QR",
                style: {
                  width: "200px",
                  height: "200px",
                  borderRadius: "8px",
                  border: "1px solid #eee",
                },
              }),
              u.jsx("div", {
                style: {
                  margin: "10px 0 4px",
                  fontSize: "12px",
                  color: "#888",
                },
                children: "UPI ID",
              }),
              u.jsx("div", {
                style: {
                  background: "#f5f5f5",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  fontSize: "13px",
                  fontWeight: 700,
                  color: "#111",
                  wordBreak: "break-all",
                  marginBottom: "16px",
                },
                children: U,
              }),
              u.jsx("button", {
                onClick: () => D(!1),
                style: {
                  width: "100%",
                  background: "#9f2089",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "12px",
                  fontSize: "15px",
                  fontWeight: 700,
                  cursor: "pointer",
                },
                children: "Close",
              }),
            ],
          }),
        }),
    ],
  });
}
const gm = "admin@nexshop",
  ms = "MAB.037326059540013@AXISBANK";
function Cd(f, m) {
  const S = [];
  let o = "",
    T = !1;
  for (const D of f) {
    if (D === '"') {
      T = !T;
      continue;
    }
    if (D === m && !T) {
      (S.push(o), (o = ""));
      continue;
    }
    o += D;
  }
  return (S.push(o), S);
}
function pm(f) {
  const m = f.trim().split(/\r?\n/).filter(Boolean);
  if (m.length < 2) return [];
  const S = m[0].includes("	") ? "	" : m[0].includes(";") ? ";" : ",",
    o = Cd(m[0], S).map((T) =>
      T.trim()
        .toLowerCase()
        .replace(/[\s_-]/g, ""),
    );
  return m.slice(1).map((T) => {
    const D = Cd(T, S),
      U = {};
    return (
      o.forEach((Z, A) => {
        U[Z] = (D[A] ?? "").trim();
      }),
      U
    );
  });
}
function Ki(f) {
  const m = parseFloat(f.replace(/[^0-9.]/g, ""));
  return isNaN(m)
    ? `₹${f}`
    : `₹${m.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`;
}
function Kd(f) {
  return f.includes("%") ? f : `${f}% off`;
}
function xm(f) {
  return !["false", "0", "no", ""].includes(f.toLowerCase());
}
function bm(f, m) {
  const S = f.name || f.productname || f.title || f.product;
  return S
    ? {
        id: f.id ? parseInt(f.id) : 1e3 + m,
        name: S,
        sellPrice: Ki(f.sellprice || f.price || f.saleprice || f.sell || "199"),
        mrpPrice: Ki(f.mrpprice || f.mrp || f.originalprice || "5999"),
        offPercent: Kd(f.offpercent || f.discount || f.off || "97% off"),
        imgUrl: f.imgurl || f.image || f.imageurl || f.img || f.photo || "",
        rating: f.rating || "4.2",
        reviewCount: f.reviewcount || f.reviews || "500",
        freeDelivery: xm(f.freedelivery || f.delivery || "true"),
      }
    : null;
}
function _a({ title: f, children: m }) {
  return u.jsxs("div", {
    className: "adm-section",
    children: [
      u.jsx("div", { className: "adm-section-title", children: f }),
      u.jsx("div", { className: "adm-section-body", children: m }),
    ],
  });
}
const Ud = () => ({
  name: "",
  sellPrice: "",
  mrpPrice: "",
  offPercent: "",
  imgUrl: "",
  rating: "4.2",
  reviewCount: "500",
  freeDelivery: !0,
});
function Sm({ products: f, onProductsChange: m }) {
  const [, S] = wl(),
    [o, T] = q.useState(() => sessionStorage.getItem("adm_auth") === "1"),
    [D, U] = q.useState(""),
    [Z, A] = q.useState(!1),
    [b, _] = q.useState(""),
    O = (C) => {
      (_(C), setTimeout(() => _(""), 2400));
    },
    [X, H] = q.useState(() => localStorage.getItem("nexshop_upi") || ms),
    [L, P] = q.useState(() => localStorage.getItem("nexshop_upi") || ms),
    [F, Y] = q.useState(!1),
    De = () => {
      const C = L.trim() || ms;
      (localStorage.setItem("nexshop_upi", C),
        P(C),
        H(C),
        Y(!0),
        setTimeout(() => Y(!1), 2500),
        O("✓ UPI Saved: " + C));
    },
    [je, Le] = q.useState(() => localStorage.getItem("nexshop_pixel") || ""),
    le = je
      .split(",")
      .map((C) => C.trim())
      .filter(Boolean),
    [Ge, Te] = q.useState(!1),
    Oe = () => {
      (localStorage.setItem("nexshop_pixel", je.trim()),
        Te(!0),
        setTimeout(() => Te(!1), 1800),
        O("Facebook Pixel saved — reload store to activate"));
    },
    [Ke, Ct] = q.useState(() => localStorage.getItem("nexshop_ga") || ""),
    [dt, Ce] = q.useState(!1),
    Ut = () => {
      (localStorage.setItem("nexshop_ga", Ke.trim()),
        Ce(!0),
        setTimeout(() => Ce(!1), 1800),
        O(
          Ke.trim()
            ? "Google Analytics saved — reload store to activate"
            : "Google Analytics cleared",
        ));
    },
    [ye, Ue] = q.useState(Ud()),
    [j, B] = q.useState(""),
    Q = (C, ce) => Ue((Xe) => ({ ...Xe, [C]: ce })),
    re = () => {
      if (!ye.name.trim()) {
        B("Product name is required.");
        return;
      }
      B("");
      const C = {
          id: Date.now(),
          name: ye.name.trim(),
          sellPrice: Ki(ye.sellPrice || "199"),
          mrpPrice: Ki(ye.mrpPrice || "999"),
          offPercent: Kd(ye.offPercent || "80% off"),
          imgUrl: ye.imgUrl.trim(),
          rating: ye.rating || "4.2",
          reviewCount: ye.reviewCount || "500",
          freeDelivery: ye.freeDelivery,
        },
        ce = [C, ...f];
      (localStorage.setItem("nexshop_products", JSON.stringify(ce)),
        m(ce),
        Ue(Ud()),
        O(`✓ "${C.name}" added!`));
    },
    d = q.useRef(null),
    [z, G] = q.useState(!1),
    [R, K] = q.useState(""),
    [ee, W] = q.useState([]),
    ke = q.useCallback((C) => {
      (K(""), W([]));
      const ce = pm(C);
      if (!ce.length) {
        K("No data rows found. Check your file.");
        return;
      }
      const Xe = ce.map((On, za) => bm(On, za)).filter(Boolean);
      if (!Xe.length) {
        K("No valid products found. Ensure your CSV has a 'name' column.");
        return;
      }
      W(Xe);
    }, []),
    ge = q.useCallback(
      (C) => {
        if (!C.name.match(/\.(csv|tsv|txt)$/i)) {
          K("Upload a .csv, .tsv, or .txt file.");
          return;
        }
        const ce = new FileReader();
        ((ce.onload = (Xe) => ke(Xe.target?.result)),
          ce.readAsText(C, "UTF-8"));
      },
      [ke],
    ),
    Tt = () => {
      const C = [...f.filter((ce) => !ee.find((Xe) => Xe.id === ce.id)), ...ee];
      (localStorage.setItem("nexshop_products", JSON.stringify(C)),
        m(C),
        W([]),
        O(`${ee.length} product(s) imported!`));
    },
    Ma = (C) => {
      const ce = f.filter((Xe) => Xe.id !== C);
      (localStorage.setItem("nexshop_products", JSON.stringify(ce)),
        m(ce),
        O("Product deleted."));
    },
    Yl = () => {
      (localStorage.removeItem("nexshop_products"),
        m(gs),
        O("Products reset to defaults."));
    };
  return o
    ? u.jsxs("div", {
        className: "adm-wrap",
        children: [
          u.jsxs("div", {
            className: "adm-header",
            children: [
              u.jsxs("div", {
                style: { display: "flex", alignItems: "center", gap: "8px" },
                children: [
                  u.jsx(xl, { size: "sm" }),
                  u.jsx("span", {
                    className: "adm-header-label",
                    children: "Admin",
                  }),
                ],
              }),
              u.jsxs("div", {
                style: { display: "flex", gap: "8px" },
                children: [
                  u.jsx("button", {
                    className: "adm-store-btn",
                    onClick: () => S("/"),
                    children: "← Store",
                  }),
                  u.jsx("button", {
                    className: "adm-logout-btn",
                    onClick: () => {
                      (sessionStorage.removeItem("adm_auth"), T(!1));
                    },
                    children: "Logout",
                  }),
                ],
              }),
            ],
          }),
          u.jsxs("div", {
            className: "adm-content",
            children: [
              u.jsxs(_a, {
                title: "💳 Merchant UPI ID",
                children: [
                  u.jsxs("p", {
                    className: "adm-hint",
                    children: [
                      "Customer payments go to this UPI ID. Type the new ID below and press ",
                      u.jsx("strong", { children: "Save UPI" }),
                      ".",
                    ],
                  }),
                  u.jsxs("div", {
                    className: "adm-input-row",
                    children: [
                      u.jsx("input", {
                        className: "adm-input",
                        type: "text",
                        value: L,
                        onChange: (C) => P(C.target.value),
                        onKeyDown: (C) => C.key === "Enter" && De(),
                        placeholder: "yourname@upi",
                      }),
                      u.jsx("button", {
                        className: `adm-save-btn ${F ? "adm-saved" : ""}`,
                        onClick: De,
                        style: { whiteSpace: "nowrap", minWidth: "88px" },
                        children: F ? "✓ Saved!" : "Save UPI",
                      }),
                    ],
                  }),
                  u.jsxs("div", {
                    style: {
                      marginTop: "10px",
                      background: F ? "#f0faf0" : "#fdf7ff",
                      border: `1.5px solid ${F ? "#86efac" : "#d8b4fe"}`,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    },
                    children: [
                      u.jsx("svg", {
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: F ? "#16a34a" : "#9f2089",
                        children: u.jsx("path", {
                          d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
                        }),
                      }),
                      u.jsxs("div", {
                        children: [
                          u.jsx("div", {
                            style: {
                              fontSize: "10px",
                              fontWeight: 700,
                              color: "#888",
                              textTransform: "uppercase",
                              letterSpacing: ".4px",
                            },
                            children: F
                              ? "✓ Active in store"
                              : "Currently active in store",
                          }),
                          u.jsx("div", {
                            style: {
                              fontSize: "13px",
                              fontWeight: 700,
                              color: "#1c1c1c",
                              wordBreak: "break-all",
                            },
                            children: X,
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              u.jsxs(_a, {
                title: "📘 Facebook Pixel IDs",
                children: [
                  u.jsxs("p", {
                    className: "adm-hint",
                    children: [
                      "Enter one or more Meta Pixel IDs (comma-separated). Events: ",
                      u.jsx("strong", {
                        children:
                          "PageView, AddToCart, InitiateCheckout, Purchase",
                      }),
                    ],
                  }),
                  u.jsxs("div", {
                    className: "adm-input-row",
                    children: [
                      u.jsx("input", {
                        className: "adm-input",
                        type: "text",
                        value: je,
                        onChange: (C) => Le(C.target.value),
                        placeholder: "e.g. 982539807479128, 112233445566778",
                      }),
                      u.jsx("button", {
                        className: `adm-save-btn ${Ge ? "adm-saved" : ""}`,
                        onClick: Oe,
                        children: Ge ? "✓ Saved" : "Save",
                      }),
                    ],
                  }),
                  le.length > 0 &&
                    u.jsx("div", {
                      className: "adm-pixel-tags",
                      children: le.map((C, ce) =>
                        u.jsxs(
                          "span",
                          {
                            className: "adm-pixel-tag",
                            children: [
                              u.jsx("span", { className: "adm-pixel-dot" }),
                              C,
                              u.jsx("button", {
                                className: "adm-pixel-remove",
                                onClick: () => {
                                  const Xe = le
                                    .filter((On, za) => za !== ce)
                                    .join(", ");
                                  (Le(Xe),
                                    localStorage.setItem("nexshop_pixel", Xe),
                                    O("Pixel removed."));
                                },
                                children: "×",
                              }),
                            ],
                          },
                          ce,
                        ),
                      ),
                    }),
                ],
              }),
              u.jsxs(_a, {
                title: "📊 Google Analytics (GA4)",
                children: [
                  u.jsxs("p", {
                    className: "adm-hint",
                    children: [
                      "Enter your GA4 Measurement ID (e.g. ",
                      u.jsx("code", {
                        className: "adm-code",
                        children: "G-XXXXXXXXXX",
                      }),
                      "). Reload the store after saving to activate.",
                    ],
                  }),
                  u.jsxs("div", {
                    className: "adm-input-row",
                    children: [
                      u.jsx("input", {
                        className: "adm-input",
                        type: "text",
                        value: Ke,
                        onChange: (C) => Ct(C.target.value),
                        placeholder: "G-XXXXXXXXXX",
                      }),
                      u.jsx("button", {
                        className: `adm-save-btn ${dt ? "adm-saved" : ""}`,
                        onClick: Ut,
                        children: dt ? "✓ Saved" : "Save",
                      }),
                    ],
                  }),
                  Ke.trim() &&
                    u.jsxs("p", {
                      className: "adm-hint",
                      style: { marginTop: "6px" },
                      children: [
                        "Active ID: ",
                        u.jsx("code", {
                          className: "adm-code",
                          children: Ke.trim(),
                        }),
                        u.jsx("button", {
                          onClick: () => {
                            (Ct(""),
                              localStorage.removeItem("nexshop_ga"),
                              O("GA removed."));
                          },
                          style: {
                            marginLeft: "8px",
                            background: "none",
                            border: "none",
                            color: "#ef4444",
                            cursor: "pointer",
                            fontSize: "12px",
                          },
                          children: "Remove",
                        }),
                      ],
                    }),
                ],
              }),
              u.jsxs(_a, {
                title: "➕ Add Single Product",
                children: [
                  u.jsx("p", {
                    className: "adm-hint",
                    children:
                      "Fill in details to add one product manually to your store.",
                  }),
                  u.jsxs("div", {
                    style: {
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    },
                    children: [
                      u.jsxs("div", {
                        className: "adm-form-row",
                        children: [
                          u.jsx("label", {
                            className: "adm-form-label",
                            children: "Product Name *",
                          }),
                          u.jsx("input", {
                            className: "adm-input",
                            type: "text",
                            placeholder: "e.g. Organic Honey 1KG",
                            value: ye.name,
                            onChange: (C) => Q("name", C.target.value),
                          }),
                        ],
                      }),
                      u.jsxs("div", {
                        className: "adm-form-2col",
                        children: [
                          u.jsxs("div", {
                            children: [
                              u.jsx("label", {
                                className: "adm-form-label",
                                children: "Sell Price (₹)",
                              }),
                              u.jsx("input", {
                                className: "adm-input",
                                type: "text",
                                placeholder: "199",
                                value: ye.sellPrice,
                                onChange: (C) => Q("sellPrice", C.target.value),
                              }),
                            ],
                          }),
                          u.jsxs("div", {
                            children: [
                              u.jsx("label", {
                                className: "adm-form-label",
                                children: "MRP Price (₹)",
                              }),
                              u.jsx("input", {
                                className: "adm-input",
                                type: "text",
                                placeholder: "1999",
                                value: ye.mrpPrice,
                                onChange: (C) => Q("mrpPrice", C.target.value),
                              }),
                            ],
                          }),
                        ],
                      }),
                      u.jsxs("div", {
                        className: "adm-form-2col",
                        children: [
                          u.jsxs("div", {
                            children: [
                              u.jsx("label", {
                                className: "adm-form-label",
                                children: "Discount %",
                              }),
                              u.jsx("input", {
                                className: "adm-input",
                                type: "text",
                                placeholder: "90% off",
                                value: ye.offPercent,
                                onChange: (C) =>
                                  Q("offPercent", C.target.value),
                              }),
                            ],
                          }),
                          u.jsxs("div", {
                            children: [
                              u.jsx("label", {
                                className: "adm-form-label",
                                children: "Rating",
                              }),
                              u.jsx("input", {
                                className: "adm-input",
                                type: "text",
                                placeholder: "4.2",
                                value: ye.rating,
                                onChange: (C) => Q("rating", C.target.value),
                              }),
                            ],
                          }),
                        ],
                      }),
                      u.jsxs("div", {
                        className: "adm-form-row",
                        children: [
                          u.jsx("label", {
                            className: "adm-form-label",
                            children: "Image URL",
                          }),
                          u.jsx("input", {
                            className: "adm-input",
                            type: "text",
                            placeholder: "https://example.com/image.jpg",
                            value: ye.imgUrl,
                            onChange: (C) => Q("imgUrl", C.target.value),
                          }),
                        ],
                      }),
                      u.jsxs("div", {
                        className: "adm-form-2col",
                        children: [
                          u.jsxs("div", {
                            children: [
                              u.jsx("label", {
                                className: "adm-form-label",
                                children: "Review Count",
                              }),
                              u.jsx("input", {
                                className: "adm-input",
                                type: "text",
                                placeholder: "500",
                                value: ye.reviewCount,
                                onChange: (C) =>
                                  Q("reviewCount", C.target.value),
                              }),
                            ],
                          }),
                          u.jsxs("div", {
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              marginTop: "22px",
                            },
                            children: [
                              u.jsx("input", {
                                id: "freeDelivery",
                                type: "checkbox",
                                checked: ye.freeDelivery,
                                onChange: (C) =>
                                  Q("freeDelivery", C.target.checked),
                                style: {
                                  width: "16px",
                                  height: "16px",
                                  cursor: "pointer",
                                  accentColor: "#9f2089",
                                },
                              }),
                              u.jsx("label", {
                                htmlFor: "freeDelivery",
                                className: "adm-form-label",
                                style: { margin: 0, cursor: "pointer" },
                                children: "Free Delivery",
                              }),
                            ],
                          }),
                        ],
                      }),
                      j &&
                        u.jsx("p", {
                          style: {
                            color: "#ef4444",
                            fontSize: "0.78rem",
                            margin: 0,
                          },
                          children: j,
                        }),
                      ye.imgUrl.trim() &&
                        u.jsxs("div", {
                          style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                          },
                          children: [
                            u.jsx("img", {
                              src: ye.imgUrl,
                              alt: "preview",
                              style: {
                                width: "56px",
                                height: "56px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                border: "1px solid #eee",
                              },
                              onError: (C) => {
                                C.target.style.display = "none";
                              },
                            }),
                            u.jsx("span", {
                              className: "adm-hint",
                              style: { margin: 0 },
                              children: "Image preview",
                            }),
                          ],
                        }),
                      u.jsx("button", {
                        onClick: re,
                        style: {
                          background: "#9f2089",
                          color: "#fff",
                          border: "none",
                          borderRadius: "8px",
                          padding: "12px 0",
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        },
                        children: "+ Add Product to Store",
                      }),
                    ],
                  }),
                ],
              }),
              u.jsxs(_a, {
                title: "📤 Bulk Upload via CSV",
                children: [
                  u.jsxs("p", {
                    className: "adm-hint",
                    children: [
                      "Required column: ",
                      u.jsx("code", {
                        className: "adm-code",
                        children: "name",
                      }),
                      ".  Optional: ",
                      u.jsx("code", {
                        className: "adm-code",
                        children:
                          "id, sellPrice, mrpPrice, offPercent, imgUrl, rating, reviewCount, freeDelivery",
                      }),
                    ],
                  }),
                  u.jsxs("div", {
                    className: `adm-dropzone ${z ? "adm-dropzone-hover" : ""}`,
                    onDragOver: (C) => {
                      (C.preventDefault(), G(!0));
                    },
                    onDragLeave: () => G(!1),
                    onDrop: (C) => {
                      (C.preventDefault(), G(!1));
                      const ce = C.dataTransfer.files[0];
                      ce && ge(ce);
                    },
                    onClick: () => d.current?.click(),
                    children: [
                      u.jsx("svg", {
                        width: "32",
                        height: "32",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "#bbb",
                        strokeWidth: "1.5",
                        children: u.jsx("path", {
                          d: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12",
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                        }),
                      }),
                      u.jsxs("p", {
                        style: {
                          margin: "8px 0 2px",
                          color: "#555",
                          fontWeight: 600,
                        },
                        children: [
                          "Drop CSV here or ",
                          u.jsx("span", {
                            className: "adm-link",
                            children: "click to browse",
                          }),
                        ],
                      }),
                      u.jsx("p", {
                        style: {
                          margin: 0,
                          fontSize: "0.72rem",
                          color: "#aaa",
                        },
                        children: "Supports .csv · .tsv · .txt",
                      }),
                      u.jsx("input", {
                        ref: d,
                        type: "file",
                        accept: ".csv,.tsv,.txt",
                        style: { display: "none" },
                        onChange: (C) => {
                          const ce = C.target.files?.[0];
                          (ce && ge(ce), (C.target.value = ""));
                        },
                      }),
                    ],
                  }),
                  R && u.jsx("p", { className: "adm-csv-error", children: R }),
                  ee.length > 0 &&
                    u.jsxs("div", {
                      className: "adm-preview-box",
                      children: [
                        u.jsxs("div", {
                          className: "adm-preview-header",
                          children: [
                            u.jsxs("span", {
                              children: [ee.length, " product(s) ready"],
                            }),
                            u.jsx("button", {
                              className: "adm-import-btn",
                              onClick: Tt,
                              children: "Import All",
                            }),
                          ],
                        }),
                        ee.map((C) =>
                          u.jsxs(
                            "div",
                            {
                              className: "adm-product-row",
                              children: [
                                u.jsx("img", {
                                  src:
                                    C.imgUrl ||
                                    "https://placehold.co/48x48/f5f5f5/999?text=?",
                                  alt: "",
                                  className: "adm-thumb",
                                  onError: (ce) => {
                                    ce.target.src =
                                      "https://placehold.co/48x48/f5f5f5/999?text=?";
                                  },
                                }),
                                u.jsxs("div", {
                                  className: "adm-product-info",
                                  children: [
                                    u.jsx("div", {
                                      className: "adm-product-name",
                                      children: C.name,
                                    }),
                                    u.jsxs("div", {
                                      className: "adm-product-meta",
                                      children: [
                                        C.sellPrice,
                                        " · ",
                                        C.mrpPrice,
                                        " · ",
                                        C.offPercent,
                                      ],
                                    }),
                                  ],
                                }),
                              ],
                            },
                            C.id,
                          ),
                        ),
                      ],
                    }),
                  u.jsxs("div", {
                    className: "adm-csv-example-wrap",
                    children: [
                      u.jsx("p", {
                        className: "adm-hint",
                        style: { marginBottom: "6px" },
                        children: "CSV format example:",
                      }),
                      u.jsx("pre", {
                        className: "adm-csv-example",
                        children: `name,sellPrice,mrpPrice,offPercent,imgUrl,rating,reviewCount,freeDelivery
Organic Honey 1KG,199,1999,90% off,https://example.com/honey.jpg,4.5,320,true
Basmati Rice 5KG,299,2499,88% off,https://example.com/rice.jpg,4.3,150,true`,
                      }),
                    ],
                  }),
                ],
              }),
              u.jsxs(_a, {
                title: `🛒 Current Products (${f.length})`,
                children: [
                  u.jsx("div", {
                    style: {
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: "12px",
                    },
                    children: u.jsx("button", {
                      className: "adm-reset-btn",
                      onClick: Yl,
                      children: "↺ Reset to Defaults",
                    }),
                  }),
                  u.jsx("div", {
                    className: "adm-product-list",
                    children: f.map((C) =>
                      u.jsxs(
                        "div",
                        {
                          className: "adm-product-row",
                          children: [
                            u.jsx("img", {
                              src:
                                C.imgUrl ||
                                "https://placehold.co/48x48/f5f5f5/999?text=?",
                              alt: "",
                              className: "adm-thumb",
                              onError: (ce) => {
                                ce.target.src =
                                  "https://placehold.co/48x48/f5f5f5/999?text=?";
                              },
                            }),
                            u.jsxs("div", {
                              className: "adm-product-info",
                              children: [
                                u.jsx("div", {
                                  className: "adm-product-name",
                                  children: C.name,
                                }),
                                u.jsxs("div", {
                                  className: "adm-product-meta",
                                  children: [
                                    C.sellPrice,
                                    " · ",
                                    C.offPercent,
                                    " · ID #",
                                    C.id,
                                  ],
                                }),
                              ],
                            }),
                            u.jsx("button", {
                              className: "adm-del-btn",
                              onClick: () => Ma(C.id),
                              title: "Delete",
                              children: u.jsxs("svg", {
                                width: "15",
                                height: "15",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                stroke: "currentColor",
                                strokeWidth: "2.2",
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                children: [
                                  u.jsx("polyline", { points: "3 6 5 6 21 6" }),
                                  u.jsx("path", {
                                    d: "M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6",
                                  }),
                                  u.jsx("path", {
                                    d: "M10 11v6M14 11v6M9 6V4h6v2",
                                  }),
                                ],
                              }),
                            }),
                          ],
                        },
                        C.id,
                      ),
                    ),
                  }),
                ],
              }),
            ],
          }),
          b && u.jsx("div", { className: "adm-toast", children: b }),
        ],
      })
    : u.jsx("div", {
        className: "adm-login-wrap",
        children: u.jsxs("div", {
          className: "adm-login-card",
          children: [
            u.jsx("div", {
              className: "adm-login-logo",
              children: u.jsx(xl, { size: "lg" }),
            }),
            u.jsx("p", { className: "adm-login-sub", children: "Admin Panel" }),
            u.jsxs("form", {
              onSubmit: (C) => {
                (C.preventDefault(),
                  D === gm
                    ? (sessionStorage.setItem("adm_auth", "1"), T(!0))
                    : (A(!0), setTimeout(() => A(!1), 1400)));
              },
              children: [
                u.jsx("input", {
                  className: `adm-pass-input ${Z ? "adm-pass-err" : ""}`,
                  type: "password",
                  placeholder: "Enter admin password",
                  value: D,
                  onChange: (C) => U(C.target.value),
                  autoFocus: !0,
                }),
                Z &&
                  u.jsx("p", {
                    className: "adm-err-msg",
                    children: "Incorrect password",
                  }),
                u.jsx("button", {
                  type: "submit",
                  className: "adm-login-btn",
                  children: "Login",
                }),
              ],
            }),
            u.jsx("button", {
              className: "adm-back-link",
              onClick: () => S("/"),
              children: "← Back to store",
            }),
          ],
        }),
      });
}
function jm() {
  return u.jsxs("footer", {
    className: "mf-wrap",
    children: [
      u.jsxs("div", {
        className: "mf-brand",
        children: [
          u.jsx(xl, { size: "lg", light: !0 }),
          u.jsx("p", {
            className: "mf-tagline",
            children: "India's #1 Social Commerce Platform",
          }),
          u.jsx("p", {
            className: "mf-tagline-sub",
            children: "Har Ghar Meesho",
          }),
        ],
      }),
      u.jsxs("div", {
        className: "mf-app",
        children: [
          u.jsx("p", {
            className: "mf-section-label",
            children: "Download the App",
          }),
          u.jsxs("div", {
            className: "mf-app-badges",
            children: [
              u.jsxs("a", {
                href: "https://play.google.com/store/apps/details?id=com.meesho.supply",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "mf-badge-btn",
                children: [
                  u.jsx("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    children: u.jsx("path", {
                      d: "M3 20.5v-17c0-.83 1-.83 1.5-.5l15 8.5-15 8.5c-.5.33-1.5.33-1.5-.5z",
                    }),
                  }),
                  "Google Play",
                ],
              }),
              u.jsxs("a", {
                href: "https://apps.apple.com/in/app/meesho-online-shopping-app/id1457958492",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "mf-badge-btn",
                children: [
                  u.jsx("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    children: u.jsx("path", {
                      d: "M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z",
                    }),
                  }),
                  "App Store",
                ],
              }),
            ],
          }),
        ],
      }),
      u.jsx("div", { className: "mf-divider" }),
      u.jsxs("div", {
        className: "mf-links-grid",
        children: [
          u.jsxs("div", {
            className: "mf-col",
            children: [
              u.jsx("p", { className: "mf-col-title", children: "Company" }),
              u.jsx("a", {
                href: "#",
                className: "mf-link",
                children: "About Us",
              }),
              u.jsx("a", {
                href: "#",
                className: "mf-link",
                children: "Careers",
              }),
              u.jsx("a", {
                href: "#",
                className: "mf-link",
                children: "Press",
              }),
              u.jsx("a", {
                href: "#",
                className: "mf-link",
                children: "Meesho Tech Blog",
              }),
              u.jsx("a", {
                href: "#",
                className: "mf-link",
                children: "Become a Supplier",
              }),
            ],
          }),
          u.jsxs("div", {
            className: "mf-col",
            children: [
              u.jsx("p", { className: "mf-col-title", children: "Help" }),
              u.jsx("a", {
                href: "#",
                className: "mf-link",
                children: "Help Center",
              }),
              u.jsx("a", {
                href: "#",
                className: "mf-link",
                children: "How Meesho Works",
              }),
              u.jsx("a", {
                href: "#",
                className: "mf-link",
                children: "Contact Us",
              }),
              u.jsx("a", {
                href: "#",
                className: "mf-link",
                children: "Track Your Order",
              }),
              u.jsx("a", {
                href: "#",
                className: "mf-link",
                children: "Report Infringement",
              }),
            ],
          }),
        ],
      }),
      u.jsx("div", { className: "mf-divider" }),
      u.jsxs("div", {
        className: "mf-policies",
        children: [
          u.jsx("p", {
            className: "mf-col-title",
            style: { marginBottom: "10px" },
            children: "Policies",
          }),
          u.jsxs("div", {
            className: "mf-policy-links",
            children: [
              u.jsx("a", {
                href: "#",
                className: "mf-policy-link",
                children: "Privacy Policy",
              }),
              u.jsx("span", { className: "mf-dot", children: "·" }),
              u.jsx("a", {
                href: "#",
                className: "mf-policy-link",
                children: "Terms & Conditions",
              }),
              u.jsx("span", { className: "mf-dot", children: "·" }),
              u.jsx("a", {
                href: "#",
                className: "mf-policy-link",
                children: "Return Policy",
              }),
              u.jsx("span", { className: "mf-dot", children: "·" }),
              u.jsx("a", {
                href: "#",
                className: "mf-policy-link",
                children: "Cancellation Policy",
              }),
              u.jsx("span", { className: "mf-dot", children: "·" }),
              u.jsx("a", {
                href: "#",
                className: "mf-policy-link",
                children: "Cookie Policy",
              }),
              u.jsx("span", { className: "mf-dot", children: "·" }),
              u.jsx("a", {
                href: "#",
                className: "mf-policy-link",
                children: "Grievance Redressal",
              }),
            ],
          }),
        ],
      }),
      u.jsx("div", { className: "mf-divider" }),
      u.jsxs("div", {
        className: "mf-payments",
        children: [
          u.jsx("p", {
            className: "mf-col-title",
            style: { marginBottom: "10px" },
            children: "100% Secure Payments",
          }),
          u.jsx("div", {
            className: "mf-pay-icons",
            children: [
              "Visa",
              "Mastercard",
              "RuPay",
              "UPI",
              "Net Banking",
              "COD",
              "Wallets",
            ].map((f) =>
              u.jsx("span", { className: "mf-pay-chip", children: f }, f),
            ),
          }),
        ],
      }),
      u.jsx("div", { className: "mf-divider" }),
      u.jsxs("div", {
        className: "mf-social",
        children: [
          u.jsx("p", {
            className: "mf-col-title",
            style: { marginBottom: "10px" },
            children: "Follow Us",
          }),
          u.jsxs("div", {
            className: "mf-social-row",
            children: [
              u.jsxs("a", {
                href: "https://www.facebook.com/meesho",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "mf-social-btn mf-fb",
                children: [
                  u.jsx("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    children: u.jsx("path", {
                      d: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z",
                    }),
                  }),
                  "Facebook",
                ],
              }),
              u.jsxs("a", {
                href: "https://www.instagram.com/meesho_app",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "mf-social-btn mf-ig",
                children: [
                  u.jsxs("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [
                      u.jsx("rect", {
                        x: "2",
                        y: "2",
                        width: "20",
                        height: "20",
                        rx: "5",
                        ry: "5",
                      }),
                      u.jsx("path", {
                        d: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z",
                      }),
                      u.jsx("line", {
                        x1: "17.5",
                        y1: "6.5",
                        x2: "17.51",
                        y2: "6.5",
                      }),
                    ],
                  }),
                  "Instagram",
                ],
              }),
              u.jsxs("a", {
                href: "https://www.youtube.com/@MeeshoApp",
                target: "_blank",
                rel: "noopener noreferrer",
                className: "mf-social-btn mf-yt",
                children: [
                  u.jsx("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "currentColor",
                    children: u.jsx("path", {
                      d: "M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z",
                    }),
                  }),
                  "YouTube",
                ],
              }),
            ],
          }),
        ],
      }),
      u.jsx("div", { className: "mf-divider" }),
      u.jsxs("div", {
        className: "mf-trust",
        children: [
          u.jsxs("div", {
            className: "mf-trust-item",
            children: [
              u.jsx("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#16a34a",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: u.jsx("path", {
                  d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
                }),
              }),
              u.jsx("span", { children: "100% Secure" }),
            ],
          }),
          u.jsxs("div", {
            className: "mf-trust-item",
            children: [
              u.jsxs("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#16a34a",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                  u.jsx("path", {
                    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z",
                  }),
                  u.jsx("circle", { cx: "12", cy: "10", r: "3" }),
                ],
              }),
              u.jsx("span", { children: "Pan-India Delivery" }),
            ],
          }),
          u.jsxs("div", {
            className: "mf-trust-item",
            children: [
              u.jsxs("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#16a34a",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                  u.jsx("polyline", { points: "17 1 21 5 17 9" }),
                  u.jsx("path", { d: "M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4" }),
                  u.jsx("path", { d: "M21 13v2a4 4 0 01-4 4H3" }),
                ],
              }),
              u.jsx("span", { children: "Easy Returns" }),
            ],
          }),
          u.jsxs("div", {
            className: "mf-trust-item",
            children: [
              u.jsxs("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "#16a34a",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                  u.jsx("rect", {
                    x: "1",
                    y: "4",
                    width: "22",
                    height: "16",
                    rx: "2",
                    ry: "2",
                  }),
                  u.jsx("line", { x1: "1", y1: "10", x2: "23", y2: "10" }),
                ],
              }),
              u.jsx("span", { children: "COD Available" }),
            ],
          }),
        ],
      }),
      u.jsxs("div", {
        className: "mf-copyright",
        children: [
          u.jsx(xl, { size: "xs", light: !0 }),
          u.jsxs("p", {
            children: [
              "© ",
              new Date().getFullYear(),
              " Fashnear Technologies Private Limited. All rights reserved.",
            ],
          }),
          u.jsx("p", {
            style: { marginTop: "3px", fontSize: "0.68rem" },
            children: "CIN: U74900KA2015PTC083901 | GSTIN: 29AABCF9078D1ZC",
          }),
        ],
      }),
    ],
  });
}
function normalizeCheckoutCart(items) {
  if (!Array.isArray(items)) return [];
  return items.map(item => {
    const product = item.id === 900001 ? dxTestProduct : gs.find(p => p.name === item.name) || gs.find(p => p.id === Number(item.id));
    return product ? { ...product, qty: Number(item.qty) || 1 } : item;
  });
}
function Nm() {
  try {
    const f = localStorage.getItem("nexshop_products");
    if (f) {
      const m = JSON.parse(f);
      if (Array.isArray(m) && m.length > 0) return m;
    }
  } catch {}
  return gs;
}
function Em(f) { return; // Pixels are managed by store-pixels.js

  if (!f.length || document.getElementById("fb-pixel-script")) return;
  const m = f.map((o) => `fbq('init','${o}');`).join(""),
    S = document.createElement("script");
  ((S.id = "fb-pixel-script"),
    (S.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');${m}fbq('track','PageView');window.__fbqReady=true;`),
    document.head.appendChild(S));
}
function Tm(f) {
  if (!f || document.getElementById("ga-script")) return;
  const m = document.createElement("script");
  ((m.id = "ga-script"),
    (m.async = !0),
    (m.src = `https://www.googletagmanager.com/gtag/js?id=${f}`),
    document.head.appendChild(m));
  const S = document.createElement("script");
  ((S.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${f}');window.__gtagReady=true;`),
    document.head.appendChild(S));
}
function Am() {
  const [f, m] = q.useState(Nm),
    [S, o] = q.useState(!1),
    [T, D] = q.useState(() => {
      try {
        const L = localStorage.getItem("nexshop_cart");
        if (L) return normalizeCheckoutCart(JSON.parse(L));
      } catch {}
      return [];
    }),
    [U, Z] = q.useState([]),
    A = T.reduce((L, P) => L + P.qty, 0);
  (q.useEffect(() => {
    localStorage.setItem("nexshop_cart", JSON.stringify(T));
  }, [T]),
    q.useEffect(() => {
      const P = (localStorage.getItem("nexshop_pixel") || "")
        .split(",")
        .map((Y) => Y.trim())
        .filter(Boolean);
      P.length && Em(P);
      const F = localStorage.getItem("nexshop_ga") || "";
      F.trim() && Tm(F.trim());
    }, []));
  const b = q.useCallback((L, P) => {
      typeof window < "u" && void 0; // Only store-pixels.js may emit Meta events.
    }, []),
    _ = q.useCallback((L) => {
      const P = Date.now();
      (Z((F) => [...F, { id: P, msg: L }]),
        setTimeout(() => Z((F) => F.filter((Y) => Y.id !== P)), 2e3));
    }, []),
    O = q.useCallback(
      (L) => {
        (D((P) =>
          P.find((Y) => Y.id === L.id)
            ? P.map((Y) => (Y.id === L.id ? { ...Y, qty: Y.qty + 1 } : Y))
            : [...P, { ...L, qty: 1 }],
        ),
          _("Added to cart!"),
          b("AddToCart", {
            content_name: L.name,
            value: parseFloat(L.sellPrice.replace(/[₹,]/g, "")),
            currency: "INR",
          }));
      },
      [_, b],
    ),
    X = q.useCallback((L, P) => {
      P <= 0
        ? D((F) => F.filter((Y) => Y.id !== L))
        : D((F) => F.map((Y) => (Y.id === L ? { ...Y, qty: P } : Y)));
    }, []),
    H = q.useCallback((L) => m(L), []);
  return (
    q.useEffect(
      () => (
        (document.body.style.overflow = S ? "hidden" : ""),
        () => {
          document.body.style.overflow = "";
        }
      ),
      [S],
    ),
    u.jsxs(k1, {
      children: [
        u.jsx(Aa, {
          path: "/admin",
          children: u.jsx(Sm, { products: f, onProductsChange: H }),
        }),
        u.jsx(Aa, {
          path: "/product/:id",
          children: u.jsx(um, {
            products: f,
            cartItems: T,
            cartOpen: S,
            onCartOpen: () => o(!0),
            onCartClose: () => o(!1),
            onAddToCart: O,
            onUpdateQty: X,
          }),
        }),
        u.jsx(Aa, {
          path: "/cart",
          children: u.jsx(sm, { cartItems: T, onUpdateQty: X }),
        }),
        u.jsx(Aa, { path: "/checkout", children: u.jsx(rm, {}) }),
        u.jsx(Aa, {
          path: "/payment",
          children: u.jsx(ym, { cartItems: T, onClearCart: () => D([]) }),
        }),
        u.jsx(Aa, {
          path: "/",
          children: u.jsxs(u.Fragment, {
            children: [
              u.jsx(W1, { cartCount: A, onCartOpen: () => o(!0) }),
              u.jsx(Zd, {
                isOpen: S,
                onClose: () => o(!1),
                items: T,
                onUpdateQty: X,
              }),
              u.jsx(tm, { products: f, onAddToCart: O }),
              u.jsx(jm, {}),
              u.jsx("div", {
                className: "toast-container",
                children: U.map((L) =>
                  u.jsx("div", { className: "toast", children: L.msg }, L.id),
                ),
              }),
            ],
          }),
        }),
      ],
    })
  );
}
E1.createRoot(document.getElementById("root")).render(u.jsx(Am, {}));
