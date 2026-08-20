import { jDoc } from "../core.js";

var	_jDoc = window.jDoc;

jDoc.noConflict = function( deep ) {

	if ( deep && window.jDoc === jDoc ) {
		window.jDoc = _jDoc;
	}

	return jDoc;
};

if ( typeof noGlobal === "undefined" ) {
	window.jDoc = jDoc;
}
