import { jDoc } from "./core.js";
import { pathQueryUrl } from "./var/url/query/path.js";

import "./core/init.js";

//jDoc.fn.extend({
//	content: function (options) {
//		var elem = this;

//		var path = jDoc.location.queryPath();

//		if (path == null) {
//			$(elem).html('<div>Content is not finded.</div>');
//		} else {
//			$(elem).load(path.endsWith('.html') ? path.replace('.html' + '_content.html') : path + '/index_content.html');
//		}
//	},
//});


jDoc.extend( {

	location: {

		queryPath: function() {
			let parameters = window.location.search.replace( "?", "" ).split( "&" );
			for ( var i = 0; i < parameters.length; i++ ) {
				let name = parameters[ i ].split( "=" )[ 0 ];
				if ( name === pathQueryUrl ) {
					return parameters[ i ].split( "=" )[ 1 ];
				}
			}
			return null;
		}

	},


	render: function( url = "" ) {

		let source = "";

		if ( url === "/" ) {
			source = "/index.meta.json";
		} else if ( url === "./" ) {
			source = "./index.meta.json";
		} else if ( url === "../" ) {
			source = "../index.meta.json";
		} else if ( url === "" || url.split( ".html" )[ 0 ] === "" ) {
			source = "index.meta.json";
		} else {
			source = url.split( ".html" )[ 0 ] + ".meta" + ".json";
		}

		$.getJSON( source )
			.done( function( responseText ) {

				for ( var i = 0; i < responseText.include.length; i++ ) {
					let row = responseText.include[ i ];

					if ( responseText.include[ i ].type === "url" ) {
						jDoc( "#" + row.id ).load( row.value );
					} else if ( row.type === "content" ) {
						$( "#" + row.id ).html( row.value );
					}
				}
			} );
	}

} );

export { jDoc };
