(function(window) {
"use strict";
var document = window.document;
var location = window.location;
var navigator = window.navigator;

//Shortcut to Util.DOM.Element
var element = Util.DOM.Element;

function makeUnderConstructionSection() {
	return element.section().id("underconstruction").child([
		element.h1().child("CAUTION: <nobr>Under Construction</nobr>"),
		element.div().child("UMass Dartmouth Society for Software Developers"),
		element.ul().child([
			element.li().child(element.a().attributes({
				"href": "//facebook.com/groups/566724943376702",
				"target": "_blank"
			}).child("Facebook")),
			element.li().child(element.a().attributes({
				"href": "//github.com/UMassDSSD",
				"target": "_blank"
			}).child("GitHub"))
		]),
		element.div().classList("hint")
			.child("A ")
			.child(element.pre().child("?dev=yes"))
			.child(" may help.")
	]);
}

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
