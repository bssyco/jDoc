import { jDoc } from "../core.js"
import { isObviousHtml } from "./isObviousHtml.js"

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
