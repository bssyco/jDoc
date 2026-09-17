/* eslint-disable linebreak-style */
/* eslint-disable space-before-function-paren */
/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable computed-property-spacing */
/* eslint-disable space-in-parens */

import { jDoc } from "./core.js";
import format from "string-template";

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

		var url = path === "" ? jDoc.location.path() : path;
		jDoc.render(url);
	},


	render: function (url = "", pageType = ".html") {

		return jDoc.fetchJSON(this, window.location.origin + "/" + jDoc.location.getMetaFileFullPath(url, pageType))
			.then(function (responseText) {

				if (responseText === "" || responseText.include === null || responseText.include.length === 0) {
					return;
				}

				for (var i = 0; i < responseText.include.length; i++) {

					let row = responseText.include[i];

					let pageName = jDoc.location.getPageName(url, pageType);
					let path = jDoc.location.getPagePath(url, pageName);

					if (row.type === "loop") {

						var jsonUrl = window.location.origin + "/" + jDoc.path.combine(path, row.value);
						var templateUrl = window.location.origin + "/" + jDoc.path.combine(path, row.template);

						jDoc.fetchJSON({ row: row, templateUrl: templateUrl, path: url }, jsonUrl)
							.done(function (data) {

								if (data === "") {
									return;
								}

								jDoc.fetchHtml({ row: this.row, data: data, path: this.path }, this.templateUrl)
									.done(function (template) {
										var html = jDoc.loop(template, data);

										$(this.row.selector).html(html);
										jDoc(this.row.selector).build();
									});
							});
					}
					else if (row.type === "map") {
						jDoc.fetchJSON({ row: row, path: url }, window.location.origin + "/" + jDoc.path.combine(path, row.value))
							.done(function (data) {

								if (data === "") {
									return;
								}
								var html = $(this.row.selector).html();
								html = html.replace("<script> $(document).ready(function() { jDoc.render('" + this.path + "'); }); </script>", "");
								var formatted = format(html, data)
								$(this.row.selector).html(formatted);
								jDoc(this.row.selector).build();
							});
					}
				}

				for (var i = 0; i < responseText.include.length; i++) {
					let row = responseText.include[i];

					if (responseText.include[i].type === "url") {

						let pageName = jDoc.location.getPageName(url, pageType);
						let path = jDoc.location.getPagePath(url, pageName);

						jDoc(row.selector).load("/" + jDoc.path.combine(path, row.value));
						jDoc(row.selector).build();

					} else if (row.type === "content") {
						$(row.selector).html(row.value);
						jDoc(row.selector).build();
					} else if (row.type === "parameter") {

						let pageName = jDoc.location.getPageName(url, pageType);
						let path = jDoc.location.getPagePath(url, pageName);

						jDoc(row.selector).load("/" + jDoc.path.combine(path, jDoc.location.query(row.value)));
						jDoc(row.selector).build();
					}
				}

			});
	},

	loop: function (template, data) {

		var children = [];
		for (var i = 0; i < data.length; i++) {
			children.push(jDoc.replace(template, data[i]));
		}
		return children.join('\n');
	},

	replace: function (template, data) {

		var model = {};

		Object.getOwnPropertyNames(data).forEach(name => {
			var value = data[name];
			if (Array.isArray(value)) {
				model[name] = jDoc.loop(template, value);
			} else {
				model[name] = value;
			}
		});

		return format(template, model);
	},

	fetchJSON: function (context, url, params, type) {
		return jQuery.ajax({
			url: url,
			type: type || "GET",
			dataType: "json",
			data: params,
			throws: false,
			contentType: "application/json; charset=UTF-8",
			context: context,
		});
	},

	fetchHtml: function (context, url, params, type) {
		return jQuery.ajax({
			url: url,
			type: type || "GET",
			dataType: "html",
			data: params,
			throws: false,
			context: context,
		});
	},

});

export { jDoc };
