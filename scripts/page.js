var $buoop = {};
(function(window) {
"use strict";

var homePage = "home";

var document = window.document;
var location = window.location;
var navigator = window.navigator;
var history = window.history;

function getGET() {
    var loc = location.toString(), args = {};
    if(loc.indexOf("?") !== -1) {
        for(var query = loc.replace(/^.*?\?/, '').split('&'), i = 0, length = query.length; i < length; i++) {
            var aux = decodeURIComponent(query[i]).split('=');
            args[aux[0]] = aux[1];
        }
    }
    return args;
}

var wrapper = $("<div>").attr("id", "wrapper").append([
    $("<header>").attr("id", "page-header").addClass("cf").append([
        $("<a>").attr({"id": "logo", "href": "."}).text("UMDSSD").click(function(ev) {
            ev.preventDefault();
            switchPage(homePage);
        }),
        $("<nav>").attr("id", "navbar").append($("<ul>").attr("id", "navbar-list"))
    ]),
    $("<section>").attr("id", "page-content").addClass("cf"),
    $("<footer>").attr("id", "footer").text("UMassD SSD © 2014" + (((new Date()).getFullYear() > 2014) ? ("-" + (new Date()).getFullYear()) : ""))
]);

$.getJSON("metadata/navlinks.json", function(links) {
    $("#navbar-list").append(links.map(function(meta) {
        return $("<li>").addClass(Boolean(meta["hidden"]) ? "hidden" : "").click(function(ev) {
            ev.preventDefault();
            switchPage(meta["name"]);
        }).append($("<a>").addClass("serif").attr({
            "id": "navlink-" + meta["name"],
            "href": ".?p=" + meta["name"],
            "title": meta["description"] || meta["title"]
        }).text(meta["title"]))
    }))
});

var cp = getGET()["p"] || homePage;

function loadPage(page) {
    $("#page-content").load("pages/" + page + ".html");
}

function switchPage(page) {
    var expectedId = "navlink-" + page;
    history.pushState({"page": page}, "", page === homePage ? "." : ("?p=" + page));
    loadPage(page);
	$("#navbar ul li a").each(function(i, link) {
        $(link).toggleClass("current-page", $(link).attr("id") === expectedId);
	});
}

function onPopState(ev) {
    loadPage(getGET()["p"] || homePage);
}

function loadBrowserUpdateCheck() {
    try {if ($buoop.ol) $buoop.ol();}catch (e) {}
    var e = document.createElement("script");
    e.setAttribute("type", "text/javascript");
    e.setAttribute("src", "//browser-update.org/update.js");
    document.body.appendChild(e);
}

function onPageLoad($) {
    $(document.body).append(wrapper);
    if(getGET().hasOwnProperty("only")) {
        $("#page-header").addClass("hidden");
    }
    switchPage(cp);
    loadBrowserUpdateCheck();
}

$(window).bind("popstate", onPopState);
$(onPageLoad);
})(window);