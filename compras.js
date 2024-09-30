// compras.js

document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('products');
    const categoryContainer = document.getElementById('categories');

    // Función para mostrar el mensaje de éxito
    const showMessage = (message) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerText = message;
        document.body.appendChild(messageElement);

        // Ocultar el mensaje después de 3 segundos
        setTimeout(() => {
            messageElement.remove();
        }, 3000);
    };

    // Función para cargar categorías
    const loadCategories = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products/categories');
            const categories = await response.json();
            categories.forEach(category => {
                const categoryButton = document.createElement('button');
                categoryButton.innerText = category;
                categoryButton.onclick = () => filterProductsByCategory(category);
                categoryContainer.appendChild(categoryButton);
            });
        } catch (error) {
            console.error('Error loading categories:', error);
        }
    };

    // Función para cargar productos
    const loadProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const products = await response.json();
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <div class="price">$${product.price}</div>
                    <button class="add-to-cart" data-id="${product.id}">Add</button>
                `;
                productContainer.appendChild(productCard);
            });

            // Agregar evento a los botones "Add"
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    // Aquí puedes agregar la lógica para agregar al carrito
                    showMessage('El producto se agregó al carrito de compras');
                });
            });
        } catch (error) {
            console.error('Error loading products:', error);
        }
    };

    // Función para filtrar productos por categoría
    const filterProductsByCategory = async (category) => {
        productContainer.innerHTML = ''; // Limpiar productos actuales
        try {
            const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
            const products = await response.json();
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <div class="price">$${product.price}</div>
                    <button class="add-to-cart" data-id="${product.id}">Add</button>
                `;
                productContainer.appendChild(productCard);
            });

            // Agregar evento a los botones "Add"
            const addToCartButtons = document.querySelectorAll('.add-to-cart');
            addToCartButtons.forEach(button => {
                button.addEventListener('click', () => {
                    showMessage('El producto se agregó al carrito de compras');
                });
            });
        } catch (error) {
            console.error('Error loading products by category:', error);
        }
    };

    // Cargar categorías y productos al cargar la página
    loadCategories();
    loadProducts();
});
