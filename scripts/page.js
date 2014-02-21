(function(window) {
"use strict";

var homePage = "home";

var document = window.document;
var location = window.location;
var navigator = window.navigator;

//Shortcut to Util.DOM.Element
var element = Util.DOM.Element;
var ajax = Util.AJAX.Get;
var getGET =  Util.URL.getGET;

var wrapper = element.div().id("wrapper").child([
	element.header().id("page-header").child([
		element.a().id("logo").child("UMDSSD").attributes({
			"href": ".?p=" + homePage
		}),
		element.nav().id("navbar").child(element.ul())
	]),
	element.section().id("page-content")
]);

ajax("metadata/navlinks.json").success(function(links) {
	element(document.getElementById("navbar").firstChild).child(
		links.map(function(linkMeta) {
			return element.li().child(element.a().child(linkMeta["title"]).attributes({
				"href": ".?p=" + linkMeta["name"]
			}).id("navlink-" + linkMeta["name"]));
		})
	);
}).load().as("json");

function onPageLoad() {
	element(document.body).child(wrapper);
}

window.addEventListener("load", onPageLoad, false);
})(window);
