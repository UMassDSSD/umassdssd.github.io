(function(window) {
"use strict";
var document = window.document;
var location = window.location;
var navigator = window.navigator;

var util = {};

function isAJAXGet(ajaxGet) {
	return ajaxGet instanceof AJAXGet;
}

function isArray(array) {
    return array instanceof Array;
}

function isDOMElement(domElement) {
    return domElement instanceof DOMElement;
}

function isDOMTokenList(domTokenList) {
    return domTokenList instanceof DOMTokenList;
}

function isEmpty(thing) {
    return thing.length === 0;
}

function isNotEmpty(thing) {
    return thing.length > 0;
}

function isFunction(theFunction) {
    return typeof theFunction === "function";
}

function isHTMLElement(htmlElement) {
    return htmlElement instanceof HTMLElement;
}

function isNodeList(nodeList) {
    return nodeList instanceof NodeList;
}

function isObject(theObject) {
    return theObject instanceof Object;
}

function isString(string) {
    return typeof string === "string";
}

function replaceWhiteSpaceWith(string, replaceWith) {
    return String(string).replace(/\s/g, String(replaceWith));
}

function removeWhiteSpace(string) {
    return replaceWhiteSpaceWith(string, "");
}

function removeEmptyArrayItem(array) {
    return array.filter(function(item) {
        return isNotEmpty(item);
    });
}

function makeElement(tagName) {
	return document.createElement(((!!tagName) && isString(tagName) && isNotEmpty(tagName)) ? tagName : "div");
}

function JSONParse(jsonString) {
	if(isString(jsonString)) {
		if(isEmpty(jsonString)) {
			jsonString = "{}";
		}
		if(isFunction(JSON.parse)) {
			return JSON.parse(jsonString);
		} else {
			return (function(text) {
				var j, cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
				if (text += "", cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(a) {
					return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
				})), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")");
				throw new SyntaxError("JSON.parse");
			})(jsonString);
		}
	}
}

var url = {};

function GET() {
	var loc = location.toString();
	var args = {};
	if(loc.indexOf("?") !== -1) {
		var query = loc.replace(/^.*?\?/, '').split('&');
		for(var i = 0, length = query.length; i < length; i++) {
			var aux = decodeURIComponent(query[i]).split('=');
			args[aux[0]] = aux[1];
		}
	}
	return args;
}
url["getGET"] = GET;

util["URL"] = url;

var dom = {};

/**
 * DOM Element
 * @constructor
 */
function DOMElement(tag) {
	if(!isDOMElement(this)) {
		return new DOMElement(tag);
	}

	var element;

	if(isDOMElement(tag)) {
		element = tag.element;
	} else if (isHTMLElement(tag)) {
		element = tag;
	} else {
		element = makeElement(isString(tag) ? tag : "");
	}

	this["element"] = element;
}

DOMElement.prototype["element"] = DOMElement.prototype.element = null;

DOMElement.prototype["id"] = function(id) {
	if(isString(id)) {
		this.element.id = id;
	}
	return this;
};

DOMElement.prototype["classList"] = function(classList) {
	if(isString(classList)) {
		classList = classList.split(" ");
	}
	if(isArray(classList) || isDOMTokenList(classList)) {
		for(var i = 0, length = classList.length; i < length; i++) {
			if(!/^\s*$/.test(classList[i])) {
				this.element.classList.add(removeWhiteSpace(classList[i]));
			}
		}
	}
	return this;
}

DOMElement.prototype["toggleClass"] = function(className) {
	if(isString(className)) {
		className = removeEmptyArrayItem(className.split(" "));
		for(var i = 0, length = className.length; i < length; i++) {
			if(this.element.className.search(className[i]) === -1) {
				this.element.classList.add(className[i]);
			} else {
				this.element.classList.remove(className[i]);
			}
		}
	}
	return this;
}

DOMElement.prototype["attributes"] = function(attributes) {
	if(isString(attributes)) {
		attributes = JSONParse(attributes);
	}
	if(isObject(attributes)) {
		for(var key in attributes) {
			this.element.setAttribute(key, attributes[key]);
		}
	}
	return this;
}

DOMElement.prototype["eventListener"] = function(type, listener, useCapture) {
	this.element.addEventListener(type, listener, useCapture);
	return this;
}

DOMElement.prototype["child"] = function(child) {
	if(isDOMElement(child) || isHTMLElement(child)) {
		if(isDOMElement(child)) {
			child = child.element;
		}
		this.element.appendChild(child);
	} else if(isNotEmpty(child)) {
		if(isString(child)) {
			this.element.innerHTML += child;
		} else if (isArray(child) || isNodeList(child)) {
			for(var i = 0, length = child.length; i < length; i++) {
				if(child[i]) {
					if(isString(child[i])) {
						this.element.innerHTML += child[i];
					} else if(isDOMElement(child[i]) || isHTMLElement(child[i])) {
						if(isDOMElement(child[i])) {
							child[i] = child[i].element;
						}
						this.element.appendChild(child[i]);
					}
				}
			}
		}
	}
	return this;
}

DOMElement["a"]=function(){return new DOMElement("a");}
DOMElement["abbr"]=function(){return new DOMElement("abbr");}
DOMElement["address"]=function(){return new DOMElement("address");}
DOMElement["area"]=function(){return new DOMElement("area");}
DOMElement["article"]=function(){return new DOMElement("article");}
DOMElement["aside"]=function(){return new DOMElement("aside");}
DOMElement["audio"]=function(){return new DOMElement("audio");}
DOMElement["b"]=function(){return new DOMElement("b");}
DOMElement["base"]=function(){return new DOMElement("base");}
DOMElement["bdi"]=function(){return new DOMElement("bdi");}
DOMElement["bdo"]=function(){return new DOMElement("bdo");}
DOMElement["blockquote"]=function(){return new DOMElement("blockquote");}
DOMElement["body"]=function(){return new DOMElement("body");}
DOMElement["br"]=function(){return new DOMElement("br");}
DOMElement["button"]=function(){return new DOMElement("button");}
DOMElement["canvas"]=function(){return new DOMElement("canvas");}
DOMElement["caption"]=function(){return new DOMElement("caption");}
DOMElement["cite"]=function(){return new DOMElement("cite");}
DOMElement["code"]=function(){return new DOMElement("code");}
DOMElement["col"]=function(){return new DOMElement("col");}
DOMElement["colgroup"]=function(){return new DOMElement("colgroup");}
DOMElement["command"]=function(){return new DOMElement("command");}
DOMElement["datalist"]=function(){return new DOMElement("datalist");}
DOMElement["dd"]=function(){return new DOMElement("dd");}
DOMElement["del"]=function(){return new DOMElement("del");}
DOMElement["details"]=function(){return new DOMElement("details");}
DOMElement["dfn"]=function(){return new DOMElement("dfn");}
DOMElement["div"]=function(){return new DOMElement("div");}
DOMElement["dl"]=function(){return new DOMElement("dl");}
DOMElement["dt"]=function(){return new DOMElement("dt");}
DOMElement["em"]=function(){return new DOMElement("em");}
DOMElement["embed"]=function(){return new DOMElement("embed");}
DOMElement["fieldset"]=function(){return new DOMElement("fieldset");}
DOMElement["figcaption"]=function(){return new DOMElement("figcaption");}
DOMElement["figure"]=function(){return new DOMElement("figure");}
DOMElement["footer"]=function(){return new DOMElement("footer");}
DOMElement["form"]=function(){return new DOMElement("form");}
DOMElement["h1"]=function(){return new DOMElement("h1");}
DOMElement["h2"]=function(){return new DOMElement("h2");}
DOMElement["h3"]=function(){return new DOMElement("h3");}
DOMElement["h4"]=function(){return new DOMElement("h4");}
DOMElement["h5"]=function(){return new DOMElement("h5");}
DOMElement["h6"]=function(){return new DOMElement("h6");}
DOMElement["head"]=function(){return new DOMElement("head");}
DOMElement["header"]=function(){return new DOMElement("header");}
DOMElement["hgroup"]=function(){return new DOMElement("hgroup");}
DOMElement["hr"]=function(){return new DOMElement("hr");}
DOMElement["html"]=function(){return new DOMElement("html");}
DOMElement["i"]=function(){return new DOMElement("i");}
DOMElement["iframe"]=function(){return new DOMElement("iframe");}
DOMElement["img"]=function(){return new DOMElement("img");}
DOMElement["input"]=function(){return new DOMElement("input");}
DOMElement["ins"]=function(){return new DOMElement("ins");}
DOMElement["kbd"]=function(){return new DOMElement("kbd");}
DOMElement["keygen"]=function(){return new DOMElement("keygen");}
DOMElement["label"]=function(){return new DOMElement("label");}
DOMElement["legend"]=function(){return new DOMElement("legend");}
DOMElement["li"]=function(){return new DOMElement("li");}
DOMElement["link"]=function(){return new DOMElement("link");}
DOMElement["map"]=function(){return new DOMElement("map");}
DOMElement["mark"]=function(){return new DOMElement("mark");}
DOMElement["math"]=function(){return new DOMElement("math");}
DOMElement["menu"]=function(){return new DOMElement("menu");}
DOMElement["meta"]=function(){return new DOMElement("meta");}
DOMElement["meter"]=function(){return new DOMElement("meter");}
DOMElement["nav"]=function(){return new DOMElement("nav");}
DOMElement["noscript"]=function(){return new DOMElement("noscript");}
DOMElement["object"]=function(){return new DOMElement("object");}
DOMElement["ol"]=function(){return new DOMElement("ol");}
DOMElement["optgroup"]=function(){return new DOMElement("optgroup");}
DOMElement["option"]=function(){return new DOMElement("option");}
DOMElement["output"]=function(){return new DOMElement("output");}
DOMElement["p"]=function(){return new DOMElement("p");}
DOMElement["param"]=function(){return new DOMElement("param");}
DOMElement["pre"]=function(){return new DOMElement("pre");}
DOMElement["progress"]=function(){return new DOMElement("progress");}
DOMElement["q"]=function(){return new DOMElement("q");}
DOMElement["rp"]=function(){return new DOMElement("rp");}
DOMElement["rt"]=function(){return new DOMElement("rt");}
DOMElement["ruby"]=function(){return new DOMElement("ruby");}
DOMElement["s"]=function(){return new DOMElement("s");}
DOMElement["samp"]=function(){return new DOMElement("samp");}
DOMElement["script"]=function(){return new DOMElement("script");}
DOMElement["section"]=function(){return new DOMElement("section");}
DOMElement["select"]=function(){return new DOMElement("select");}
DOMElement["small"]=function(){return new DOMElement("small");}
DOMElement["source"]=function(){return new DOMElement("source");}
DOMElement["span"]=function(){return new DOMElement("span");}
DOMElement["strong"]=function(){return new DOMElement("strong");}
DOMElement["style"]=function(){return new DOMElement("style");}
DOMElement["sub"]=function(){return new DOMElement("sub");}
DOMElement["summary"]=function(){return new DOMElement("summary");}
DOMElement["sup"]=function(){return new DOMElement("sup");}
DOMElement["svg"]=function(){return new DOMElement("svg");}
DOMElement["table"]=function(){return new DOMElement("table");}
DOMElement["tbody"]=function(){return new DOMElement("tbody");}
DOMElement["td"]=function(){return new DOMElement("td");}
DOMElement["textarea"]=function(){return new DOMElement("textarea");}
DOMElement["tfoot"]=function(){return new DOMElement("tfoot");}
DOMElement["th"]=function(){return new DOMElement("th");}
DOMElement["thead"]=function(){return new DOMElement("thead");}
DOMElement["time"]=function(){return new DOMElement("time");}
DOMElement["title"]=function(){return new DOMElement("title");}
DOMElement["tr"]=function(){return new DOMElement("tr");}
DOMElement["track"]=function(){return new DOMElement("track");}
DOMElement["u"]=function(){return new DOMElement("u");}
DOMElement["ul"]=function(){return new DOMElement("ul");}
DOMElement["var"]=function(){return new DOMElement("var");}
DOMElement["video"]=function(){return new DOMElement("video");}
DOMElement["wbr"]=function(){return new DOMElement("wbr");}

dom["Element"] = DOMElement;

util["DOM"] = dom;

var ajax = {};

/**
 * @constructor
 */
function AJAXGet(path) {
	if(!isAJAXGet(this)) {
		return new AJAXGet(path);
	}

	if(!isString(path)) {
		path = "";
	}

	var xhr = new XMLHttpRequest();
	var self = this;

	var loaded = false;

	var successCallback;
	var failCallback;
	var async = true;

	var types = [{
        "name": "raw",
        "parse": function(txt) {
            return txt;
        }
    }];
    var typeID = 0;

    types.push({
        "name": "json",
        "parse": function(txt) {
            return JSONParse(txt);
        }
    });

	this["path"] = function(thePath) {
		path = isString(thePath) ? thePath : "";
		return self;
	}

	this["success"] = function(callback) {
		if(isFunction(callback)) {
			successCallback = callback
		} else {
			throw new Error("The argument isn't a function.");
		}
		return self;
	}

	this["fail"] = function(callback) {
		if(isFunction(callback)) {
			failCallback = callback;
		} else {
			throw new Error("The arugment isn't a function");
		}
		return self;
	}

	this["async"] = function(asyncFlag) {
		async = Boolean(asyncFlag);
		return self;
	}

	this["load"] = function() {
		loaded = false;
		if(!path || (isString(path) && isEmpty(path))) {
			throw new Error('Variable "path" is not initiated yet.');
		}

		xhr.open("GET", path, true);
		xhr.send();

		var actions = {};

		actions["as"] = function(dataType) {
            var id = types.map(function(i){return i.name;}).indexOf(dataType);
            var valid = id != -1;
            typeID = valid ? id : 0;
            return valid;
        }

        return actions;
	}

	this["isLoaded"] = function() {
		return loaded;
	}

	xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            loaded = true;
            if(xhr.status === 200) {
                if(successCallback) {
                    successCallback(types[typeID]["parse"](xhr.responseText));
                } else {
                    if(failCallback) {
                        failCallback(xhr);
                    }
                }
            }
        }
    }
}

ajax["Get"] = AJAXGet;

util["AJAX"] = ajax;

window["Util"] = util;
})(window);
