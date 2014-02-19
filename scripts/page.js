(function(window) {
var document = window.document;
var location = window.location;
var navigator = window.navigator;

function makeUnderConstructionSection() {
	var undercon = document.createElement("section");
	undercon.id = "underconstruction";
	undercon.appendChild((function(h1) {
		h1.innerHTML += "CAUTION: <nobr>Under Construction</nobr>";
		return h1;
	})(document.createElement("h1")));
	undercon.appendChild((function(div) {
		div.innerHTML += "UMass Dartmouth Society for Software Developers";
		return div;
	})(document.createElement("div")));
	undercon.appendChild((function(ul) {
		ul.innerHTML += "<li><a href='//facebook.com/groups/566724943376702' target='_blank'>Facebook</a></li>";
		ul.innerHTML += "<li><a href='//github.com/UMassDSSD' target='_blank'>GitHub</a></li>";
		return ul;
	})(document.createElement("ul")));
	undercon.appendChild((function(div) {
		div.classList.add("hint");
		div.innerHTML += "A <pre>?dev=yes</pre> may help.";
		return div;
	})(document.createElement("div")));
	return undercon;
}

var wrapper = document.createElement("div");
wrapper.id = "wrapper";

wrapper.innerHTML += "<pre>Yes! You could be the developer! Feel free to push something to the <a href='//github.com/UMassDSSD/umassdssd.github.io' target='_target'>repo</a> :-)</pre>";

function onPageLoad() {
	document.body.appendChild(Util.isDeveloperMode() ? wrapper : makeUnderConstructionSection());
}

window.addEventListener("load", onPageLoad, false);
})(window);