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

<<<<<<< HEAD
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
			}).id("navlink-" + linkMeta["name"])).classList(Boolean(linkMeta["hidden"]) ? "hidden" : "");
		})
	);
}).load().as("json");

var cp = getGET()["p"];
=======
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
			}).child("GitHub")),
			element.li().child(element.a().attributes({
				"href": "//linkedin.com/groups?gid=7413339",
				"target": "_blank"
			}).child("LinkedIn"))
		]),
		element.div().classList("hint")
			.child("A ")
			.child(element.pre().child("?dev=yes"))
			.child(" may help.")
	]);
}
>>>>>>> f43966d1c2cd3b54e26ffcb5709cdf1cc957e0b0

ajax("pages/" + (((!!cp) && (typeof cp === "string") && (cp.length > 0)) ? getGET()["p"] : (cp = homePage)) + ".html").success(function(html) {
	element(document.getElementById("navlink-" + cp)).classList("current-page");
	element(document.getElementById("page-content")).child(html);
	eval(Array.prototype.slice.call(document.getElementById("page-content").getElementsByTagName("script")).map(function(a){return a.innerHTML}).join(";"));
}).load();

function onPageLoad() {
	element(document.body).child(wrapper);
}

window.addEventListener("load", onPageLoad, false);
})(window);
