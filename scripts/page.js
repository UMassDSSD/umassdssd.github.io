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
        }),
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
            }).id("navlink-" + linkMeta["name"])).classList(Boolean(linkMeta["hidden"]) ? "hidden" : "");
        })
    );
}).load().as("json");

var cp = getGET()["p"];

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