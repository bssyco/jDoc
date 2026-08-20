import { jDoc } from "../core.js";

if ( typeof define === "function" && define.amd ) {
	define( "jdoc", [], function() {
		return jDoc;
	} );
}
