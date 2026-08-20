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
// For ECMAScript module environments where a proper `window`
// is present, execute the factory and get jQuery.
function jDocFactory( window, noGlobal ) {

if ( typeof window === "undefined" || !window.document ) {
	throw new Error( "jDoc requires a window with a document" );
}

// @CODE

return jDoc;

}

var jDoc = jDocFactory( window, true );

export { jDoc };

export default jDoc;
