(function(window) {
"use strict";

var homePage = "home";

var document = window.document;
var location = window.location;
var navigator = window.navigator;

//Shortcut to Util.DOM.Element
var element = Util.DOM.Element;
var getGET =  Util.URL.getGET;

var wrapper = element.div().id("wrapper").child([
    element.header().id("page-header").classList("cf").child([
        element.a().id("logo").child("UMDSSD").attributes({
            "href": "."
        }).eventListener("click", function(ev) {
            ev.preventDefault();
            switchPage(homePage);
        }, false),
        element.nav().id("navbar").child(element.ul().id("navbar-list"))
    ]),
    element.section().id("page-content").classList("cf"),
    element.footer().id("footer").child("UMassD SSD &copy; 2014" + (((new Date()).getFullYear() > 2014) ? ("-" + (new Date()).getFullYear()) : ""))
]);

$.getJSON("metadata/navlinks.json", function(links) {
    element(document.getElementById("navbar-list")).child(
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
});

var cp = getGET()["p"] || homePage;

function switchPage(page) {
	$("#page-content").load("pages/" + page + ".html");
	$("#navbar ul li a").each(function(i, link) {
		$(this).removeClass("current-page");
	});
}

function onPageLoad() {
    $(document.body).append(wrapper.element);
    switchPage(cp);
}

$(onPageLoad);
})(window);

(function(d){var a=d.document,b=[];$(a).keydown(function(c){b.push(c.keyCode);0<=b.toString().indexOf("38,38,40,40,37,39,37,39,66,65")&&($(a).unbind("keydown",c.callee),$("<audio>").attr({src:"http://nyan.cat/music/original.mp3",autoplay:"autoplay",loop:"loop"}).appendTo("body"),$("body div#wrapper *").after($("<img>").addClass({}).attr("src","http://www.nyan.cat/cats/original.gif")))})})(window);