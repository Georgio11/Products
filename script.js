let productsGrid = document.getElementById('products-grid');
let productsArray = [];
let xhr = new XMLHttpRequest();
let url = 'https://fr1800-b3f0.restdb.io/rest/product';

xhr.open('GET', url);
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("x-apikey", "6414a0aebc22d22cf7b26015");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.responseType = 'json';
xhr.onload = function() {
	productsArray = xhr.response;
	productsGrid.innerHTML = null;
	productsArray.forEach(p => {
		let pElem = document.createElement('div');
		pElem.classList.add('product');
		pElem.innerHTML = `
			<h2 class='product-name'>${p.name}</h2>
			<img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
			<p class='product-price'><b>Price: </b>${p.price}UAH</p>
			<p class='product-description'><b>Description: </b>${p.description}</p>
			<a href="profile.html?id=${p.author_id}">Seller profile</a>
			<button onclick="addProductToCart('${p._id}')">Buy</button>
		`;
		productsGrid.append(pElem);
	});
}
xhr.send();

let cartProd = document.getElementById('cart-products');

let cart = [];

if (localStorage.getItem("cart")) {
	cart = JSON.parse(localStorage.getItem("cart"));
	drawCartProducts();
}

function addProductToCart(id) {
	let product = productsArray.find(function(p) {
		return p._id == id;
	})
	cart.push(product);
	localStorage.setItem("cart", JSON.stringify(cart));
	drawCartProducts();
	let btn = document.getElementById("cart-button");
	btn.classList.add("active");
	setTimeout(function() {
		btn.classList.remove("active");
	}, 500)
}

function drawCartProducts() {
	if (cart.length == 0) return cartProd.innerHTML = 'Cart is empty';
	cartProd.innerHTML = null;
	let sum = 0;
	cart.forEach(function(p) {
		cartProd.innerHTML += `
			<p><img src="${p.photo_url}">${p.name} |${p.price}UAH</p>
			<hr><br>
		`;
		sum += p.price;
	});
	cartProd.innerHTML += `
		<p>Total price: ${sum}UAH</p>
		<button onclick="buyAll()">Buy all</button>
	`
}

function buyAll() {
	cart = [];
	localStorage.setItem("cart", "[]");
	cartProd.innerHTML = 'Money was withdrawn from your credit card';
}

function openCart() {
	cartProd.classList.toggle('hide');
}