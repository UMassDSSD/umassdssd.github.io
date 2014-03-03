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
    element.header().id("page-header").classList("cf").child([
        element.a().id("logo").child("UMDSSD").attributes({
            "href": "."
        }).eventListener("click", function(ev) {
            ev.preventDefault();
            switchPage(homePage);
        }, false),
        element.nav().id("navbar").child(element.ul())
    ]),
    element.section().id("page-content").classList("cf"),
    element.footer().id("footer").child("UMassD SSD &copy; 2014" + (((new Date()).getFullYear() > 2014) ? ("-" + (new Date()).getFullYear()) : ""))
]);

ajax("metadata/navlinks.json").success(function(links) {
    element(document.getElementById("navbar").firstChild).child(
        links.map(function(linkMeta) {
            return element.li().child(element.a().classList("serif").child(linkMeta["title"]).attributes({
                "href": ".?p=" + linkMeta["name"]
            }).id("navlink-" + linkMeta["name"])).classList(Boolean(linkMeta["hidden"]) ? "hidden" : "")
            .eventListener("click", function(ev) {
            	ev.preventDefault();
            	switchPage(linkMeta["name"]);
            	$(ev.target).addClass("current-page");
            }, false);
        })
    );
}).load().as("json");

var cp = getGET()["p"] || homePage;

function switchPage(page) {
	$("#page-content").load("pages/" + page + ".html");
	$("#navbar ul li a").each(function(i, link) {
		$(this).removeClass("current-page");
	});
}

function onPageLoad() {
    element(document.body).child(wrapper);
    switchPage(cp);
}

window.addEventListener("load", onPageLoad, false);
})(window);