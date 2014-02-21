(function(window) {
"use strict";

var homePage = "home";

var document = window.document;
var location = window.location;
var navigator = window.navigator;

//Shortcut to Util.DOM.Element
var element = Util.DOM.Element;
var ajax = Util.AJAX.Get;



function onPageLoad() {
	element(document.body).child(wrapper);
}

window.addEventListener("load", onPageLoad, false);
})(window);
