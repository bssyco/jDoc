/* eslint-disable linebreak-style */
/* eslint-disable array-bracket-spacing */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable space-in-parens */
/* eslint-disable semi */
/* eslint-disable-next-line max-len */

import { jDoc } from "./core.js";
import Map from "./map.js";

jDoc.fn.build = function () {

	var map = new Map(this);
	map.url();
	
	return this;
};

export { jDoc };
