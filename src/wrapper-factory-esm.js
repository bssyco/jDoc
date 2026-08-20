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
// Expose a factory as `jDocFactory`. Aimed at environments without
// a real `window` where an emulated window needs to be constructed. Example:
//
//     import { jDocFactory } from "jdoc/factory";
//     const jDoc = jDocFactory( window );
//

function jDocFactoryWrapper( window, noGlobal ) {

if ( !window.document ) {
	throw new Error( "jDoc requires a window with a document" );
}

// @CODE

return jDoc;

}

export function jDocFactory( window ) {
	return jDocFactoryWrapper( window, true );
}
