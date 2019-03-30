function DoIt() {
	let s = document.querySelectorAll("script");
	let a = Array.prototype.filter.call(s, (s) => {
		return RegExp('data["alwaysIncludeVideo"]').test(s.textContent);
	});

	let j = -1;

	for (let i = 0; i < a.length; i++) {
		if (a[i].innerHTML.startsWith("\nP.when('A', 'jQuery', 'ImageBlockATF', 'cf')")) {
			j = i;
			break;
		}
	}

	const START_DETECT = "var obj = jQuery.parseJSON('";
	const END_DETECT = 'data["alwaysIncludeVideo"]';
	
	let source = a[j].textContent;
	
	let start = source.indexOf(START_DETECT) + START_DETECT.length;
	let end = source.indexOf(END_DETECT, start);
	let substring = source.substring(start, end - 4);
	
	let json_str = substring.replace(/\'/g, "\"", "g");
	
	let json = JSON.parse(json_str);

	let foundThings = [];
	let q = 0;
	let u = 0;

	for (var key in json.colorImages) {
		foundThings[q] = [];
		foundThings[q].name = key;
		foundThings[q].images = [];
		u = 0;
		const e = json.colorImages[key];
		for (let i = 0; i < e.length; i++) {
			foundThings[q].images[u] = e[i].hiRes;
			u++;
		}
		q++;
	}

	SendMessage(foundThings);

	function SendMessage(e) {
		let message = browser.runtime.sendMessage(e);
		message.then();
	}
}

// If you know how to detect an ajax change in a more elegant way, be my fucking guest.

var oldURL = "";
var currentURL = window.location.href;
function checkURLchange(currentURL){
    if(currentURL != oldURL){
		DoIt();
        oldURL = currentURL;
    }

	oldURL = window.location.href;
	setTimeout(() => {
        checkURLchange(window.location.href);
	}, 1000);
}

checkURLchange();