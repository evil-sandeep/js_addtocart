// Dummy JSON product data
const products = [
    { id: 1, name: 'Laptop', price:  80000, img: 'assests/laptop.avif' },
    { id: 2, name: 'Bag', price: 3000, img: 'assests/bag.jpg' },
    { id: 3, name: 'Mobile', price: 20000, img: "assests/mobile.jpg" },
    { id: 4, name: 'Shirt', price: 900, img: 'assests/shirt.avif' },
    { id: 5, name: 'Book', price: 1000, img: 'assests/book.png' }
];


const cart = [];

// display products - home page
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item'; 

        // Create a container for the image
        const imageContainer = document.createElement('div');
        imageContainer.className = 'image-container';
        imageContainer.innerHTML = `<img src="${product.img}" alt="${product.name}" width="100">`;
        productItem.appendChild(imageContainer);

        // Create a container for the product details
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'details-container';
        detailsContainer.innerHTML = `
            <p>${product.name} -  ₹${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productItem.appendChild(detailsContainer);

        productList.appendChild(productItem);
    });
}


// add items - cart
function addToCart(productId) {
    const productToAdd = products.find(product => product.id === productId);
    cart.push(productToAdd);
    updateCartDisplay();
}

//  update - cart 
function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';

    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('li');
        cartItem.innerHTML = `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" width="120">
                <div class="item-details">
                    <p>${item.name} -  ₹${item.price}</p>
                    <div class="quantity-controls">
                        <button onclick="decrementQuantity(${item.id})">-</button>
                        <span class="item-quantity">${getCartItemQuantity(item.id)}</span>
                        <button onclick="incrementQuantity(${item.id})">+</button>
                    </div>
                </div>
            </div>
        `;
        cartList.appendChild(cartItem);

        totalPrice += item.price * getCartItemQuantity(item.id);
    });

    //  total price
    const totalPriceElement = document.getElementById('total-price');
    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Show the cart page and hide the home page
    document.getElementById('home-page').style.display = 'none';
    document.getElementById('cart-page').style.display = 'block';
}

// get the quantity of a specific cart item
function getCartItemQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    return cartItem ? cartItem.quantity || 1 : 1;
}

// increment the quantity 
function incrementQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = (cartItem.quantity || 1) + 1;
        updateCartDisplay();
    }
}

// decrement the quantity 
function decrementQuantity(productId) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        updateCartDisplay();
    }
}

function clearCart() {
    cart.length = 0; 
    updateCartDisplay(); 
}



// Event listeners for navbar links
document.getElementById('home-link').addEventListener('click', () => {
    document.getElementById('home-page').style.display = 'block';
    document.getElementById('cart-page').style.display = 'none';
    displayProducts(); 
});

document.getElementById('about-link').addEventListener('click', () => {
    
});

document.getElementById('contact-link').addEventListener('click', () => {
    
});

document.getElementById('cart-link').addEventListener('click', () => {
    updateCartDisplay();
});


displayProducts();
