(function(window) {
"use strict";
var document = window.document;
var location = window.location;
var navigator = window.navigator;

//Shortcut to Util.DOM.Element
var element = Util.DOM.Element;



function onPageLoad() {
	element(document.body).child(Util.isDeveloperMode() ? wrapper : makeUnderConstructionSection());
}

window.addEventListener("load", onPageLoad, false);
})(window);
