
# jDoc

jDoc is a simple and fast framework for building html pages in client browser.
	
## Table of contents

- [Quick start](#quick-start)
- [Example](#example)
- [Featuress](#features)
- [Installation](#installation)
- [Samples](#sample)
- [More Information](#more-information)
- [Versioning](#versioning)
- [Creators](#creators)
- [Copyright and license](#copyright-and-license)

## Quick start

jDoc need html file for main structure of page and a meta file to call resources, map links and urls and build page on client browser.

Meta file is a json file, similar page name, with extention of '.meta.json'.

You don't need any reference for meta file on your html page. when you call a page, for example 'index.html', meta file with name of
'index.meta.json' is also loaded with page and then jDoc render and build your page on browser.

For use jDoc, first you need to reference jquery library.

```html

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/4.0.0/jquery.min.js"></script>
<script src="/dist/jdoc.js"></script>
```

Reference jdoc.js and then call jDoc.view() method.

```js
$(document).ready(function() {
	jDoc.view();
});
```

## Example

For example, you have a html file with name of "index.html" on your server and
you want load "nav.index" page inside a div element.

First, you put a code like this on your "index.html":

```html
<div id="nav"></div>
```

Create new json file with name of "index.meta.json" in same folder of "index.html":

``` json
{
	"id": "",
	"include": [
		{
			"id": "nav",
			"type": "url",
			"value": "nav.html"
		}
	]
}
```

Create new html file with name of "nav.html".

Now you can call index.html on client.

See [Codes](https://github.com/bssyco/jdoc/example/simple)

## Featuress

- **Event Manager** - jDoc manages events by creating links between events and elements.
- **Data Manager** - In jDoc, data is seprated from page. Data is managed in json format by jDoc.

## Installation

```bash
npm install @bssyco/jdoc
```

## Versioning

See [the Releases section of our GitHub project](https://github.com/bssyco/jdoc/releases)

## Creators

**PS bssyco**

Parviz Taghavi <parviz.taghavi@bssyco.com>

- <https://github.com/bssyco>
- <https://jdoc.bssyco.com>

## Samples

For more Samples sees: <a href="https://github.com/bssyco/jdoc/example">Example</a>

## More Information

for more information: <a href="https://bssyco.com/en/projects/jdoc">jDoc project page</a>

## Copyright and license

Code and documentation copyright 2026 the [Bssyco Authors](https://github.com/bssyco/jdoc/contributors.md).
Code released under the [MIT License](https://github.com/bssyco/jdoc/LICENSE).

