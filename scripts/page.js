(function(window) {
"use strict";
var document = window.document;
var location = window.location;
var navigator = window.navigator;

//Shortcut to Util.DOM.Element
var element = Util.DOM.Element;


var wrapper = element.div().id("wrapper").child(
	element.pre()
		.child("Yes! You could be the developer! Feel free to push something to the ")
		.child(element.a().attributes({
			"href": "//github.com/UMassDSSD/umassdssd.github.io",
			"target": "_blank"
		}).child("repo"))
		.child(" :-)")
);

function onPageLoad() {
	element(document.body).child(Util.isDeveloperMode() ? wrapper : makeUnderConstructionSection());
}

window.addEventListener("load", onPageLoad, false);
})(window);
