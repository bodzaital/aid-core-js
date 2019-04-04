let port = browser.runtime.connect();

// MASSIVE HACK. 
// TODO: I'm an idiot and I don't know why background.js sends multiple messages
// on subsequent page loads. So they are discarded.

let messagesReceived = 0;

let holder;
let title;
let link;

let div = document.querySelector("div#root");
let list;
let a;

function SortyBoi(a, b) {
	let c = a.name.toLowerCase();
	let d = b.name.toLowerCase();
	return (c < d) ? -1 : (c > d) ? 1 : 0;
}

port.onMessage.addListener(function(m) {
	if (++messagesReceived == 1) {
		if (m == undefined) {
			holder = document.createElement("div");
			holder.classList.add("error");
			
			let error = document.createElement("h1");
			error.innerText = "No data found.";
			holder.appendChild(error);
			
			let description = document.createElement("p");
			description.innerHTML = "Wait until the page loads further or reload the page.<br>Data detection occurs at navigation.";
			holder.appendChild(description);
			
			div.appendChild(holder);
		} else {
			m.sort((a, b) => {
				return SortyBoi(a, b);
			});
			for (let i = 0; i < m.length; i++) {
				if (m[i].asin == m.currentAsin) {
				}
				holder = document.createElement("div");
				holder.classList = "product-type";
				holder.dataset.name = m[i].name;
				title = document.createElement("h1");
				title.innerText = m[i].name;
				holder.appendChild(title);
	
				for (let j = 0; j < m[i].images.length; j++) {
					link = document.createElement("a");
					link.classList = "product-link";
					link.href = m[i].images[j];
					link.innerText = `image ${j}`;
					holder.appendChild(link);
				}
	
				div.appendChild(holder);
			}
		}
	}
});

document.querySelector(".searchbar").addEventListener("keyup", (e) => {
	let str = document.querySelector(".searchbar").value;
	let products = document.querySelectorAll(".product-type");
	for (let i = 0; i < products.length; i++) {
		let f = products[i];
		if (f.dataset.name.toLowerCase().includes(str.toLowerCase())) {
			f.classList.remove("hidden");
		} else {
			f.classList.add("hidden");
		}
	}
});