/* eslint-disable linebreak-style */
/*!
 * jDoc JavaScript Library v1.0.1+a95b7c4.dirty
 * https://github.com/bssyco/
 *
 * Copyright Bssyco.com
 * Released under the MIT license
 * https://github.com/bssyco/license/
 *
 * Date: 2026-08-20T11:09Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jDoc.
		module.exports = factory( global, true );
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

"use strict";

if ( !window.document ) {
	throw new Error( "jDoc requires a window with a document" );
}


var version = "1.0.1+a95b7c4.dirty",

	jDoc = function( selector, context ) {
		return new jDoc.fn.init( selector, context );
	};

jDoc.fn = jDoc.prototype = {

	jdoc: version,

	constructor: jDoc
};

jDoc.extend = jDoc.fn.extend = function() {

	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && typeof target !== "function" ) {
		target = {};
	}

	// Extend jDoc itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				copy = options[ name ];

				// Prevent Object.prototype pollution
				// Prevent never-ending loop
				if ( name === "__proto__" || target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jDoc.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {
					src = target[ name ];

					// Ensure proper type for the source value
					if ( copyIsArray && !Array.isArray( src ) ) {
						clone = [];
					} else if ( !copyIsArray && !jDoc.isPlainObject( src ) ) {
						clone = {};
					} else {
						clone = src;
					}
					copyIsArray = false;

					// Never move original objects, clone them
					target[ name ] = jDoc.extend( deep, clone, copy );

					// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jDoc.extend( {

	error: function( msg ) {
		throw new Error( msg );
	}
} );

function isObviousHtml( input ) {
	return input[ 0 ] === "<" &&
		input[ input.length - 1 ] === ">" &&
		input.length >= 3;
}

var rootjDoc,

	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jDoc.fn.init = function (selector, context) {
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
			return rootjDoc.ready !== undefined ?
				rootjDoc.ready(selector) :

				// Execute immediately if ready is not present
				selector(jDoc);

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
					context = context instanceof jDoc ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge(this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					));

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
				return (context || rootjDoc).find(selector);

				// HANDLE: jDoc(expr, context)
				// (which is just equivalent to: jDoc(context).find(expr)
			} else {
				return this.constructor(context).find(selector);
			}
		}

	};

init.prototype = jDoc.fn;

/* eslint-disable linebreak-style */
/* eslint-disable space-before-function-paren */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable computed-property-spacing */
/* eslint-disable space-in-parens */


jDoc.extend({

	path: {

		combine: function (...paths) {

			let result = "";
			for (let i = 0; i < paths.length; i++) {

				let subPaths = paths[i].split("/");
				for (let j = 0; j < subPaths.length; j++) {

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


jDoc.extend({

	location: {

		path: function () {
			return window.location.pathname;
		},

		query: function (parameter) {
			let parameters = window.location.search.replace("?", "").split("&");
			for (var i = 0; i < parameters.length; i++) {
				let name = parameters[i].split("=")[0];
				if (name === parameter) {
					return parameters[i].split("=")[1];
				}
			}
			return null;
		},

		getPagePath: function (url, pageName) {

			url = url.replace(pageName, "");

			let source = "";
			let paths = url.split("/");
			for (let i in paths) {

				if (source.length > 0) {
					source += "/";
				}

				source += paths[i];
			}

			return source;
		},

		getPageName: function (url, pageType) {
			let paths = url.split("/");
			if (paths[paths.length - 1].endsWith(pageType)) {
				return paths[paths.length - 1];
			} else {
				return "index" + pageType;
			}
		},

		getMetaFileName: function (sourceName, pageType) {
			return sourceName.replace(pageType, ".meta.json");
		},

		getMetaFileFullPath: function (url, pageType) {

			let pageName = this.getPageName(url, pageType);
			let pagePath = this.getPagePath(url, pageName);
			let metaName = this.getMetaFileName(pageName, pageType);

			return jDoc.path.combine(pagePath, metaName);
		}
	},


	view: function (path = "") {

		this.render(path === "" ? jDoc.location.path() : path);
	},


	render: function (url = "", pageType = ".html") {

		$.getJSON(window.location.origin + "/" + jDoc.location.getMetaFileFullPath(url, pageType))
			.done(function (responseText) {

				for (var i = 0; i < responseText.include.length; i++) {
					let row = responseText.include[i];

					if (responseText.include[i].type === "url") {

						let pageName = jDoc.location.getPageName(url, pageType);
						let path = jDoc.location.getPagePath(url, pageName);
						
						jDoc("#" + row.id).load("/" + jDoc.path.combine(path, row.value));

					} else if (row.type === "content") {
						$("#" + row.id).html(row.value);
					} else if (row.type === "parameter") {

						let pageName = jDoc.location.getPageName(url, pageType);
						let path = jDoc.location.getPagePath(url, pageName);

						jDoc("#" + row.id).load("/" + jDoc.path.combine(path, jDoc.location.query(row.value)));
					}
				}
			});
	}

});

/* eslint-disable linebreak-style */
/* eslint-disable array-bracket-spacing */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable space-in-parens */
/* eslint-disable semi */
/* eslint-disable-next-line max-len */


jDoc.fn.load = function(url, params, callback) {

	var selector, type, response,
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
	} else if (params && typeof params === "object") {
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
			data: params
		}).done(function(responseText) {

			// Save response for use in complete callback
			response = arguments;

			responseText += "<script> $(document).ready(function() { jDoc.render('" + url + "'); }); </script>";

			$(self).html(selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

				// Otherwise use the full result
				responseText);

			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
		}).always(callback && function(jqXHR, status) {
			$(self).each(function() {
				callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
			});
		});
	}

	return this;
};

if ( typeof define === "function" && define.amd ) {
	define( "jdoc", [], function() {
		return jDoc;
	} );
}

var _jDoc = window.jDoc;

jDoc.noConflict = function( deep ) {

	if ( deep && window.jDoc === jDoc ) {
		window.jDoc = _jDoc;
	}

	return jDoc;
};

if ( typeof noGlobal === "undefined" ) {
	window.jDoc = jDoc;
}



return jDoc;

} );
