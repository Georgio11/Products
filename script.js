let productsGrid = document.getElementById('products-grid');
let productsArray = [];
let xhr = new XMLHttpRequest();
let url = 'https://my-json-server.typicode.com/Georgio11/Products';

xhr.open('GET', url + '/products');
xhr.responseType = 'json';
xhr.onload = function() {
	let productsArray = xhr.response;
	productsGrid.innerHTML = null;
	productsArray.forEach(p => {
		productsArray.push(p);
		let pElem = document.createElement('div');
		pElem.classList.add('product');
		pElem.innerHTML = `
			<h2 class='product-name'>${p.name}</h2>
			<img class='product-photo' src='${p.photo_url}' alt='${p.name}'>
			<p class='product-price'><b>Price: </b>${p.price}</p>
			<p class='product-description'><b>Description: </b>${p.description}</p>
			<a href="profile.html?id=${p.author_id}">Seller profile</a>
			<button onclick="addProductToCart(${p.id})">Buy</button>
		`;
		productsGrid.append(pElem);
	});
}
xhr.send();

let cartProd = document.getElementById('cart-products');

let cart = [];

function addProductToCart(id) {
	let product = productsArray.find(function(p) {
		return p.id == id;
	})
	cart.push(product);
	drawCartProducts();
}

function drawCartProducts() {
	if (cart.length == 0) return cartProd.innerHTML = 'Cart is empty';
	cartProd.innerHTML = null;
	let sum = 0;
	cart.forEach(function(p) {
		cartProd.innerHTML += `
			<p><img src="${p.photo_url}">${p.name} |${p.price}</p>
			<hr>
		`;
		sum += p.price;
	});
	cartProd.innerHTML += `
		<p>Total price: ${sum}</p>
		<button onclick="buyAll()">Buy all</button>
	`
}

function buyAll() {
	cart = [];
	cartProd.innerHTML = 'Money was withdrawn from your credit card'
}

function openCart() {
	cartProd.classList.toggle('hide');
}