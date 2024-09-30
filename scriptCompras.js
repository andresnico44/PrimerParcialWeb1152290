document.addEventListener('DOMContentLoaded', function() {
    const categoriesContainer = document.getElementById('categories');
    const productsSection = document.getElementById('productsSection');
    const logoutIcon = document.getElementById('logoutIcon');

    // Cargar las categorías desde la API
    fetch('https://fakestoreapi.com/products/categories')
        .then(res => res.json())
        .then(categories => {
            categories.forEach(category => {
                const categoryButton = document.createElement('button');
                categoryButton.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                categoryButton.addEventListener('click', () => loadProducts(category));
                categoriesContainer.appendChild(categoryButton);
            });
        })
        .catch(error => console.error('Error:', error));

    // Función para cargar los productos de una categoría
    function loadProducts(category) {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(res => res.json())
            .then(products => {
                productsSection.innerHTML = ''; // Limpiar la sección de productos
                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');

                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.title}">
                        <h3>${product.title}</h3>
                        <p class="price">$${product.price.toFixed(2)}</p>
                        <button>Add</button>
                    `;

                    productsSection.appendChild(productCard);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    // Redirigir al login al hacer clic en el icono de logout
    logoutIcon.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
});
