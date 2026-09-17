/* eslint-disable linebreak-style */
/* eslint-disable array-bracket-spacing */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable space-in-parens */
/* eslint-disable semi */
/* eslint-disable-next-line max-len */

import { jDoc } from "./core.js";

class Map {

	constructor(context) {
		this._context = context;
	}

	url(context) {
		jQuery(this._context).find('[data-page-url]').each((index, el) => {

			if (el.nodeType) {
				var $el = $(el);
				var page = $el.data('page-url');

				$el.on('click', { page: page }, function (event) {
					window.location = '?page=' + event.data.page;
				});
			}
		});
	}

}

export default Map;
