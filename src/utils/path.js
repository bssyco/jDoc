/* eslint-disable linebreak-style */
/* eslint-disable space-before-function-paren */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable computed-property-spacing */
/* eslint-disable space-in-parens */

import { jDoc } from "../core.js";

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

export { jDoc };
