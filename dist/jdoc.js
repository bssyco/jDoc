/*!
    * Bssyco jDoc 1.1.0 (https://bssyco.github.io/jdoc/)
    * Copyright 2026 Parviz Taghavi
    * Licensed under MIT (https://github.com/bssyco/jdoc/LICENSE)
    */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jDoc = {}));
})(this, (function (exports) { 'use strict';

  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _defineProperties(e, r) {
    for (var t = 0; t < r.length; t++) {
      var o = r[t];
      o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
  }
  function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), Object.defineProperty(e, "prototype", {
      writable: false
    }), e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (String )(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }
  function _typeof(o) {
    "@babel/helpers - typeof";

    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
      return typeof o;
    } : function (o) {
      return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
  }

  var version = "@VERSION",
    _jDoc$1 = function jDoc(selector, context) {
      return new _jDoc$1.fn.init(selector, context);
    };
  _jDoc$1.fn = _jDoc$1.prototype = {
    jdoc: version,
    constructor: _jDoc$1
  };
  _jDoc$1.extend = _jDoc$1.fn.extend = function () {
    var options,
      name,
      src,
      copy,
      copyIsArray,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;

      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (_typeof(target) !== "object" && typeof target !== "function") {
      target = {};
    }

    // Extend jDoc itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          copy = options[name];

          // Prevent Object.prototype pollution
          // Prevent never-ending loop
          if (name === "__proto__" || target === copy) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (_jDoc$1.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            src = target[name];

            // Ensure proper type for the source value
            if (copyIsArray && !Array.isArray(src)) {
              clone = [];
            } else if (!copyIsArray && !_jDoc$1.isPlainObject(src)) {
              clone = {};
            } else {
              clone = src;
            }
            copyIsArray = false;

            // Never move original objects, clone them
            target[name] = _jDoc$1.extend(deep, clone, copy);

            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  };
  _jDoc$1.extend({
    error: function error(msg) {
      throw new Error(msg);
    }
  });

  function getDefaultExportFromCjs (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  var stringTemplate;
  var hasRequiredStringTemplate;

  function requireStringTemplate () {
  	if (hasRequiredStringTemplate) return stringTemplate;
  	hasRequiredStringTemplate = 1;
  	var nargs = /\{([0-9a-zA-Z_]+)\}/g;

  	stringTemplate = template;

  	function template(string) {
  	    var args;

  	    if (arguments.length === 2 && typeof arguments[1] === "object") {
  	        args = arguments[1];
  	    } else {
  	        args = new Array(arguments.length - 1);
  	        for (var i = 1; i < arguments.length; ++i) {
  	            args[i - 1] = arguments[i];
  	        }
  	    }

  	    if (!args || !args.hasOwnProperty) {
  	        args = {};
  	    }

  	    return string.replace(nargs, function replaceArg(match, i, index) {
  	        var result;

  	        if (string[index - 1] === "{" &&
  	            string[index + match.length] === "}") {
  	            return i
  	        } else {
  	            result = args.hasOwnProperty(i) ? args[i] : null;
  	            if (result === null || result === undefined) {
  	                return ""
  	            }

  	            return result
  	        }
  	    })
  	}
  	return stringTemplate;
  }

  var stringTemplateExports = requireStringTemplate();
  var format = /*@__PURE__*/getDefaultExportFromCjs(stringTemplateExports);

  function isObviousHtml(input) {
    return input[0] === "<" && input[input.length - 1] === ">" && input.length >= 3;
  }

  var rootjDoc,
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
    init = _jDoc$1.fn.init = function (selector, context) {
      var match, elem;

      // HANDLE: jDoc(""), jDoc(null), jDoc(undefined), jDoc(false)
      if (!selector) {
        return this;
      }

      // HANDLE: jDoc(DOMElement)
      if (selector.nodeType) {
        this[0] = selector;
        this.length = 1;
        return this;

        // HANDLE: jDoc(function)
        // Shortcut for document ready
      } else if (typeof selector === "function") {
        return rootjDoc.ready !== undefined ? rootjDoc.ready(selector) :
        // Execute immediately if ready is not present
        selector(_jDoc$1);
      } else {
        // Handle obvious HTML strings
        match = selector + "";
        if (isObviousHtml(match)) {
          // Assume that strings that start and end with <> are HTML and skip
          // the regex check. This also handles browser-supported HTML wrappers
          // like TrustedHTML.
          match = [null, selector, null];

          // Handle HTML strings or selectors
        } else if (typeof selector === "string") {
          match = rquickExpr.exec(selector);
        } else {
          return jQuery.makeArray(selector, this);
        }

        // Match html or make sure no context is specified for #id
        // Note: match[1] may be a string or a TrustedHTML wrapper
        if (match && (match[1] || !context)) {
          // HANDLE: jDoc(html) -> jDoc(array)
          if (match[1]) {
            context = context instanceof _jDoc$1 ? context[0] : context;

            // Option to run scripts is true for back-compat
            // Intentionally let the error be thrown if parseHTML is not present
            jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

            // HANDLE: jDoc(html, props)
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                // Properties of context are called as methods if possible
                if (typeof this[match] === "function") {
                  this[match](context[match]);

                  // ...and otherwise set as attributes
                } else {
                  this.attr(match, context[match]);
                }
              }
            }
            return this;

            // HANDLE: jDoc(#id)
          } else {
            elem = document.getElementById(match[2]);
            if (elem) {
              // Inject the element directly into the jDoc object
              this[0] = elem;
              this.length = 1;
            }
            return this;
          }

          // HANDLE: jDoc(expr) & jDoc(expr, jDoc(...))
        } else if (!context || context.jdoc) {
          var elements = jQuery(context || rootjDoc).find(selector);
          if (elements.length > 0) {
            elements = elements.toArray();
            this.length = 0;
            for (var i in elements) {
              this[i] = elements[i];
              this.length++;
            }
          }
          return this;

          // 	// HANDLE: jDoc(expr, context)
          // 	// (which is just equivalent to: jDoc(context).find(expr)
        } else {
          var elements = jQuery(this.constructor(context)).find(selector);
          if (elements.length > 0) {
            elements = elements.toArray();
            this.length = 0;
            for (var i in elements) {
              this[i] = elements[i];
              this.length++;
            }
          }
          return this;
        }
      }
    };
  init.prototype = _jDoc$1.fn;
  rootjDoc = _jDoc$1(document);

  /* eslint-disable linebreak-style */
  /* eslint-disable space-before-function-paren */
  /* eslint-disable quotes */
  /* eslint-disable no-undef */
  /* eslint-disable computed-property-spacing */
  /* eslint-disable space-in-parens */

  _jDoc$1.extend({
    path: {
      combine: function combine() {
        var result = "";
        for (var _len = arguments.length, paths = new Array(_len), _key = 0; _key < _len; _key++) {
          paths[_key] = arguments[_key];
        }
        for (var i = 0; i < paths.length; i++) {
          var subPaths = paths[i].split("/");
          for (var j = 0; j < subPaths.length; j++) {
            if (result.length > 0 && !result.endsWith("/")) {
              result += "/";
            }
            result += subPaths[j];
          }
        }
        return result;
      }
    }
  });

  /* eslint-disable linebreak-style */
  /* eslint-disable space-before-function-paren */
  /* eslint-disable quotes */
  /* eslint-disable no-undef */
  /* eslint-disable computed-property-spacing */
  /* eslint-disable space-in-parens */

  _jDoc$1.extend({
    location: {
      path: function path() {
        return window.location.pathname;
      },
      query: function query(parameter) {
        var parameters = window.location.search.replace("?", "").split("&");
        for (var i = 0; i < parameters.length; i++) {
          var name = parameters[i].split("=")[0];
          if (name === parameter) {
            return parameters[i].split("=")[1];
          }
        }
        return null;
      },
      getPagePath: function getPagePath(url, pageName) {
        url = url.replace(pageName, "");
        var source = "";
        var paths = url.split("/");
        for (var i in paths) {
          if (source.length > 0) {
            source += "/";
          }
          source += paths[i];
        }
        return source;
      },
      getPageName: function getPageName(url, pageType) {
        var paths = url.split("/");
        if (paths[paths.length - 1].endsWith(pageType)) {
          return paths[paths.length - 1];
        } else {
          return "index" + pageType;
        }
      },
      getMetaFileName: function getMetaFileName(sourceName, pageType) {
        return sourceName.replace(pageType, ".meta.json");
      },
      getMetaFileFullPath: function getMetaFileFullPath(url, pageType) {
        var pageName = this.getPageName(url, pageType);
        var pagePath = this.getPagePath(url, pageName);
        var metaName = this.getMetaFileName(pageName, pageType);
        return _jDoc$1.path.combine(pagePath, metaName);
      }
    },
    view: function view() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var url = path === "" ? _jDoc$1.location.path() : path;
      _jDoc$1.render(url);
    },
    render: function render() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var pageType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ".html";
      return _jDoc$1.fetchJSON(this, window.location.origin + "/" + _jDoc$1.location.getMetaFileFullPath(url, pageType)).then(function (responseText) {
        if (responseText === "" || responseText.include === null || responseText.include.length === 0) {
          return;
        }
        for (var i = 0; i < responseText.include.length; i++) {
          var row = responseText.include[i];
          var pageName = _jDoc$1.location.getPageName(url, pageType);
          var path = _jDoc$1.location.getPagePath(url, pageName);
          if (row.type === "loop") {
            var jsonUrl = window.location.origin + "/" + _jDoc$1.path.combine(path, row.value);
            var templateUrl = window.location.origin + "/" + _jDoc$1.path.combine(path, row.template);
            _jDoc$1.fetchJSON({
              row: row,
              templateUrl: templateUrl,
              path: url
            }, jsonUrl).done(function (data) {
              if (data === "") {
                return;
              }
              _jDoc$1.fetchHtml({
                row: this.row,
                data: data,
                path: this.path
              }, this.templateUrl).done(function (template) {
                var html = _jDoc$1.loop(template, data);
                $(this.row.selector).html(html);
                _jDoc$1(this.row.selector).build();
              });
            });
          } else if (row.type === "map") {
            _jDoc$1.fetchJSON({
              row: row,
              path: url
            }, window.location.origin + "/" + _jDoc$1.path.combine(path, row.value)).done(function (data) {
              if (data === "") {
                return;
              }
              var html = $(this.row.selector).html();
              html = html.replace("<script> $(document).ready(function() { jDoc.render('" + this.path + "'); }); </script>", "");
              var formatted = format(html, data);
              $(this.row.selector).html(formatted);
              _jDoc$1(this.row.selector).build();
            });
          }
        }
        for (var i = 0; i < responseText.include.length; i++) {
          var _row = responseText.include[i];
          if (responseText.include[i].type === "url") {
            var _pageName = _jDoc$1.location.getPageName(url, pageType);
            var _path = _jDoc$1.location.getPagePath(url, _pageName);
            _jDoc$1(_row.selector).load("/" + _jDoc$1.path.combine(_path, _row.value));
            _jDoc$1(_row.selector).build();
          } else if (_row.type === "content") {
            $(_row.selector).html(_row.value);
            _jDoc$1(_row.selector).build();
          } else if (_row.type === "parameter") {
            var _pageName2 = _jDoc$1.location.getPageName(url, pageType);
            var _path2 = _jDoc$1.location.getPagePath(url, _pageName2);
            _jDoc$1(_row.selector).load("/" + _jDoc$1.path.combine(_path2, _jDoc$1.location.query(_row.value)));
            _jDoc$1(_row.selector).build();
          }
        }
      });
    },
    loop: function loop(template, data) {
      var children = [];
      for (var i = 0; i < data.length; i++) {
        children.push(_jDoc$1.replace(template, data[i]));
      }
      return children.join('\n');
    },
    replace: function replace(template, data) {
      var model = {};
      Object.getOwnPropertyNames(data).forEach(function (name) {
        var value = data[name];
        if (Array.isArray(value)) {
          model[name] = _jDoc$1.loop(template, value);
        } else {
          model[name] = value;
        }
      });
      return format(template, model);
    },
    fetchJSON: function fetchJSON(context, url, params, type) {
      return jQuery.ajax({
        url: url,
        type: type || "GET",
        dataType: "json",
        data: params,
        "throws": false,
        contentType: "application/json; charset=UTF-8",
        context: context
      });
    },
    fetchHtml: function fetchHtml(context, url, params, type) {
      return jQuery.ajax({
        url: url,
        type: type || "GET",
        dataType: "html",
        data: params,
        "throws": false,
        context: context
      });
    }
  });

  _jDoc$1.fn.load = function (url, params, callback) {
    var selector,
      type,
      response,
      self = this,
      off = url.indexOf(" ");
    if (off > -1) {
      selector = stripAndCollapse(url.slice(off));
      url = url.slice(0, off);
    }

    // If it's a function
    if (typeof params === "function") {
      // We assume that it's the callback
      callback = params;
      params = undefined;

      // Otherwise, build a param string
    } else if (params && _typeof(params) === "object") {
      type = "POST";
    }

    // If we have elements to modify, make the request
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        // If "type" variable is undefined, then "GET" method will be used.
        // Make value of this field explicit since
        // user can override it through ajaxSetup method
        type: type || "GET",
        dataType: "html",
        data: params,
        context: {
          self: self,
          response: response,
          url: url,
          selector: selector
        }
      }).done(function (responseText) {
        // Save response for use in complete callback
        this.response = arguments;
        responseText += "<script> $(document).ready(function() { jDoc.render('" + this.url + "'); }); </script>";
        $(this.self).html(this.selector ?
        // If a selector was specified, locate the right elements in a dummy div
        // Exclude scripts to avoid IE 'Permission Denied' errors
        jQuery("<div>").append(jQuery.parseHTML(responseText)).find(this.selector) :
        // Otherwise use the full result
        responseText);

        // If the request succeeds, this function gets "data", "status", "jqXHR"
        // but they are ignored because response was set above.
        // If it fails, this function gets "jqXHR", "status", "error"
      }).fail(function () {
        console.log('Page is not loaded succesfully.');
      }).always(callback && function (jqXHR, status) {
        $(this.self).each(function () {
          callback.apply(this, this.response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }
    return this;
  };

  var Map = /*#__PURE__*/function () {
    function Map(context) {
      _classCallCheck(this, Map);
      this._context = context;
    }
    return _createClass(Map, [{
      key: "url",
      value: function url(context) {
        jQuery(this._context).find('[data-page-url]').each(function (index, el) {
          if (el.nodeType) {
            var $el = $(el);
            var page = $el.data('page-url');
            $el.on('click', {
              page: page
            }, function (event) {
              window.location = '?page=' + event.data.page;
            });
          }
        });
      }
    }]);
  }();

  /* eslint-disable linebreak-style */
  /* eslint-disable array-bracket-spacing */
  /* eslint-disable max-len */
  /* eslint-disable no-undef */
  /* eslint-disable space-in-parens */
  /* eslint-disable semi */
  /* eslint-disable-next-line max-len */

  _jDoc$1.fn.build = function () {
    var map = new Map(this);
    map.url();
    return this;
  };

  if (typeof define === "function" && define.amd) {
    define("jdoc", [], function () {
      return _jDoc$1;
    });
  }

  var _jDoc = window.jDoc;
  _jDoc$1.noConflict = function (deep) {
    if (deep && window.jDoc === _jDoc$1) {
      window.jDoc = _jDoc;
    }
    return _jDoc$1;
  };
  if (typeof noGlobal === "undefined") {
    window.jDoc = _jDoc$1;
  }

  exports.jDoc = _jDoc$1;

}));
//# sourceMappingURL=jDoc.js.map
