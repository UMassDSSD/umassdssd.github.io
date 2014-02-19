(function(window) {
"strict mode";
var document = window.document;
var location = window.location;
var navigator = window.navigator;

var util = {};

function GET() {
	var loc = location.toString();
	var args = {};
	if(loc.indexOf("?") !== -1) {
		var query = loc.replace(/^.*?\?/, '').split('&');
		for(var i = 0, length = query.length; i < length; i++) {
			var aux = decodeURIComponent(query[i]).split('=');
			args[aux[0]] = aux[1];
		}
	}
	return args;
}

function isDev() {
	return GET()["dev"] === "yes";
}

util["isDeveloperMode"] = isDev;

window["Util"] = util;
})(window);