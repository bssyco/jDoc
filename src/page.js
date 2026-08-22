/* eslint-disable linebreak-style */
/* eslint-disable space-before-function-paren */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable computed-property-spacing */
/* eslint-disable space-in-parens */

import { jDoc } from "./core.js";

import "./core/init.js";
import "./utils/path.js";

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

export { jDoc };
