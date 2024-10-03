// Función para cargar las categorías
fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(categories => {
        const categoriesContainer = document.getElementById('categories');
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.onclick = () => loadProducts(category);
            categoriesContainer.appendChild(button);
        });
    });

// Función para cargar productos de la categoría seleccionada
function loadProducts(category) {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
        .then(res => res.json())
        .then(products => {
            const productsContainer = document.getElementById('products');
            productsContainer.innerHTML = ''; // Limpiar productos anteriores

            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p class="price">$${product.price}</p>
                    <button class="add-to-cart" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-image="${product.image}">Agregar al carrito</button>
                `;
                productsContainer.appendChild(productCard);
            });

            // Añadir evento a todos los botones después de que se carguen los productos
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const id = this.getAttribute('data-id');
                    const title = this.getAttribute('data-title');
                    const price = parseFloat(this.getAttribute('data-price'));
                    const image = this.getAttribute('data-image');
                    addToCart(id, title, price, image);
                });
            });
        });
}

// Función para agregar productos al carrito
function addToCart(id, title, price, image) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find(item => item.id === id);
    if (existingProduct) {
        // Si ya existe, aumentar la cantidad
        existingProduct.quantity += 1;
    } else {
        // Si no existe, agregarlo al carrito con cantidad 1
        cart.push({ id, title, price, image, quantity: 1 });
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Producto agregado al carrito!');
}
