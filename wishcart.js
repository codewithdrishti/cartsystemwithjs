let wishlist_array = [];
let cartlist_array = [];
//ITEM  DETAILS.................
let product_qty = 1;
let products = [
					{product_name :'Attitude is everything',  product_price : 10,  product_id : 1,  product_pic :'book1.png',product_qty:1},
					{product_name :'Subtle art of not giving a F*',  product_price : 5,  product_id : 2,  product_pic :'book2.jpg',product_qty:1},
					{product_name :'Think and grow Rich',  product_price : 7,  product_id : 3,  product_pic :'book3.jpg',product_qty:1},
					{product_name :'How to talk to anyone',  product_price : 4,  product_id : 4,  product_pic :'book4.png',product_qty:1},
					{product_name :'Men are from Mars and wo..',  product_price : 5,  product_id : 5,  product_pic :'book5.jpg',product_qty:1},
					{product_name :'How to win friends.',  product_price : 6,  product_id : 6,  product_pic :'book6.png',product_qty:1},
					{product_name :'The power of +ve thinking',  product_price : 7,  product_id : 7,  product_pic :'book7.jpg',product_qty:1},
					{product_name :'Wish i could tell you',  product_price : 8,  product_id : 8,  product_pic :'book8.jpg',product_qty:1},
]
console.log(products);
let div = "";
products.forEach((item, index) => {
	div += `<div class="col-3">`;
	div += `<div><img src= "${item.product_pic}"height="350px" width="250px"></div>`;
	div += `<div><h5>${item.product_name}</h5></div>`;
	div += `<div>$${item.product_price}</div>`;
	div += `<div><span class="material-icons fav" data-id="${item.product_id}">favorite</span></div>`;
	div += `<div><input type="Number" min=1 max=5 class="quantity" id="product_qty_${item.product_id}" value="1"></div>`;
	div += `<div><button class="btn btn-outline-danger cartbtn" data-id="${item.product_id}" data-id="${item.product_qty}">Add to Cart</button></div>`;
	div += `</div>`;
		
	});
	document.getElementById("print").innerHTML = div;
	
	//............ON CLICKING HOME BTN..........................
	document.querySelector("#goback").addEventListener('click', function() {
			document.querySelector("#print").style.display = "block";
			document.querySelector("#hidden").style.display = "none";
			document.querySelector("#hide").style.display = "none";
			
	});
	
	
	
//ADDING ITEMS TO WISHLIST...............
 
const wishlist = (wish) => {
	//console.log(wish);
		const product_id = parseInt(wish.getAttribute("data-id"));
		const products_id = wishlist_array.indexOf(product_id);
		if (products_id > -1 ) {
			wishlist_array.splice(products_id, 1);
			wish.style.color = "green";
		}
		else {
			wishlist_array.push(product_id);
			wish.style.color = "red";
		}
		//console.log(product_id); 
		document.querySelector("#wish_items").innerHTML = wishlist_array.length;
		
		console.log(wishlist_array);
	}
	
	const fav = document.querySelectorAll(".fav");
	fav.forEach((item) => {
		item.addEventListener('click', (event) => wishlist(event.target));
	});

//...................ONCLICK WISHLIST SPAN.......................

	const favorite = document.querySelector(".favorite");
	favorite.addEventListener('click', function() {
		
			document.querySelector("#print").style.display = "none";
			document.querySelector("#hidden").style.display = "none";
			document.querySelector("#hide").style.display = "block";
			//console.log('woo', wishlist_array);
			wishload();
			
	//............removing items from wishlist.............................
		const remove = document.querySelectorAll(".remove");
		remove.forEach(item => {
		item.addEventListener('click', function() {
			//console.log('remove dil');
		this.closest('tr').remove();
			});
		});
	});
	
//...............WISHLOAD FUNCTION...........

	const wishload = () => {
	const wishlistarray = products.filter( product => {
		console.log('wishh',wishlist_array.indexOf(product.product_id));
	return wishlist_array.indexOf(product.product_id) > -1;
	
	});
	//console.log('wisharray',wishlistarray);
		let dil="";
	wishlistarray.forEach((item, index) => {
		//console.log(wishlistarray);
			dil += `<tr>`
			dil += `<td><img src="${item.product_pic}"height="200px" width="150px"></td>`
			dil += `<td>${item.product_name}</td>`
			dil += `<td>$${item.product_price}</td>`
			dil += `<td><button class="btn btn-outline-danger remove">remove</button>
					<button class="btn btn-outline-danger material-icons add-to-cart" data-id="${item.product_id}">add_shopping_cart</button></td>`
			dil += `</tr>`
		});
		//console.log(wishlistarray);
		//console.log(dil);
		document.getElementById("wish_body").innerHTML = dil;
		document.querySelector("#wish_items").innerHTML = wishlist_array.length;
		addcartlistener();
}
	
//.............MOVING ITEMS TO CART FROM WISHLIST.............
	
	const moveToCart = (dataid) => {
		let product_qty = 1;
		const product_id = parseInt(dataid.getAttribute('data-id'));
		console.log('ids',product_id);
		
		const wishindex = wishlist_array.indexOf(product_id);
		//console.log('products',products);
		//console.log('wishlist_array',wishlist_array);
		//console.log('wishindex', wishindex);
			wishlist_array.splice(wishindex, 1);
			//console.log('afterspliceWisharray',wishlist_array);
			cartlist_array.push({product_id,product_qty});
			console.log('cartlist_array',cartlist_array);
			wishload();
			
		document.querySelector("#cart_items").innerHTML = cartlist_array.length;
		
	}
	
	const addcartlistener = () => {
		const addtocart = document.querySelectorAll('.add-to-cart');
		addtocart.forEach((items) => {
			items.addEventListener('click',(event) => moveToCart(event.target));
		});
	}

		
	
//...........ADDING ITEMS TO CART..........................
//console.log(product_qty);
const cartlist = (cart) => {
	//console.log(cart);
		const product_id = parseInt(cart.getAttribute("data-id"));
		let product_qty = parseInt(document.getElementById(`product_qty_${product_id}`).value);
		//const products_id = cartlist_array.indexOf(product_id);
		//console.log('product search',products_id);
		let item_new = true;
		if (cartlist_array.length > 0 ) {
			
			cartlist_array.forEach((item, index) => {
				if (item.product_id == product_id)
				{
					//cartlist_array[0].product_qty += 1;
					cartlist_array[index].product_qty += product_qty;
					item_new = false;
				}
				
				
			});
		}
		else
		{
			item_new = true ;
		}
		
		if(item_new === true)
		{
			cartlist_array.push({product_id,product_qty});
		}
		//console.log(cartlist_array.product_qty);
		console.log(products);
		//console.log(product_id); 
		document.querySelector("#cart_items").innerHTML = cartlist_array.length;
		
		console.log('cart', cartlist_array);
		
	}
	
	const cartbtn = document.querySelectorAll(".cartbtn");
	cartbtn.forEach((item) => {
		item.addEventListener('click', (event) => cartlist(event.target));
	 //alert ('item hasbeen already added to wishlist click ok to continue');
	});
	
//..............ONCLICK CART ICONS..............................

	const cartitems = document.querySelector("#cartitems");
	cartitems.addEventListener('click', function() {
			document.querySelector("#print").style.display = "none";
			document.querySelector("#hidden").style.display = "block";
			document.querySelector("#hide").style.display = "none";
			//console.log('woo', cartlist_array);
			cartload();
	
		
	//.....................adding items to heart.....................

		
		//....................removing cart items............................
		document.querySelectorAll('.remove_cart').forEach( item => {
					item.addEventListener('click', function()  {
						this.closest('tr').remove();
				});
			});
	});
	
	const addFavListner = () => {
		const addtofav = document.querySelectorAll('.add-to-fav');
		addtofav.forEach( (favbutton) => {
				favbutton.addEventListener('click', (event) => moveToFav(event.target));
		});
	}
	
		const moveToFav = (data) => { 
		console.log('this function get_id');
//	console.log(data);
			const id = parseInt(data.getAttribute('data-id'));
			console.log(id);
			const cartindex = cartlist_array.findIndex(products => {
					return products.product_id === id;
				
			});
					
					cartlist_array.splice(cartindex, 1);
					console.log('aftersplice', cartlist_array);
					wishlist_array.push(id);
					cartload();
					
					document.querySelector("#wish_items").innerHTML = wishlist_array.length;
					
	}

 const cartload = () => {
	 console.log('cartload');
	 let shoppingcart = "";
	let totalcost = 0;
	products.forEach((item, index) => {
		//console.log(cartlistarray);
			cartlist_array.forEach(product => {
				if(item.product_id == product.product_id)
				{
					console.log(product);
					shoppingcart += `<tr>`;
					shoppingcart += `<td><img src="${item.product_pic}" height="200px" width="150px"></td>`;
					shoppingcart += `<td>${item.product_name}</td>`;
					shoppingcart += `<td>${product.product_qty}</td>`;
					shoppingcart += `<td>$${item.product_price}</td>`;
					shoppingcart += `<td>$${product.product_qty *item.product_price}</td>`;
					shoppingcart += `<td><button class="btn btn-outline-danger remove_cart">remove</button>
									<button class="btn btn-outline-danger material-icons add-to-fav" data-id="${product.product_id}">favorite</button></td>`;
					shoppingcart += `</tr>`;
					totalcost += item.product_qty * item.product_price;
					
					//console.log('id',product.product_id);
				}
		});
		});	
		//console.log(cartlistarray.product_qty);
		//console.log(shoppingcart);
		shoppingcart += `<tr><td><b>FINAL AMOUNT</b></td><td>--</td><td colspan=4>$${totalcost}only</td></tr>`
		document.getElementById("cart_body").innerHTML = shoppingcart;
		
		document.querySelector("#cart_items").innerHTML = cartlist_array.length;
		addFavListner();
 }