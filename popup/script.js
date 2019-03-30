let port = browser.runtime.connect();

// MASSIVE HACK. 
// TODO: I'm an idiot and I don't know why background.js sends multiple messages
// on subsequent page loads. So they are discarded.

let messagesReceived = 0;

let div = document.querySelector("div");
let list;
let a;

port.onMessage.addListener(function(m) {
	if (++messagesReceived == 1) {
		for (let i = 0; i < m.length; i++) {
			list = document.createElement("span");
			list.innerText = m[i].name;
			list.classList = "head";
			div.appendChild(list);

			for (let j = 0; j < m[i].images.length; j++) {
				a = document.createElement("a");
				a.href = m[i].images[j]
				a.innerText = "image " + j;
				a.classList = "link";
				div.appendChild(a);
			}
		}
	}
});