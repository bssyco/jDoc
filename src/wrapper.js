/* eslint-disable linebreak-style */
/*!
 * jDoc JavaScript Library v@VERSION
 * https://github.com/bssyco/
 *
 * Copyright Bssyco.com
 * Released under the MIT license
 * https://github.com/bssyco/license/
 *
 * Date: @DATE
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

// @CODE

return jDoc;

} );
