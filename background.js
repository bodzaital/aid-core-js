let a;
function ReceiveMessage(message, sender, sendResponse) {
	a = message;
}

function BAConnect(p) {
	p.postMessage(a);
}
browser.runtime.onConnect.addListener(BAConnect);
browser.runtime.onMessage.addListener(ReceiveMessage);