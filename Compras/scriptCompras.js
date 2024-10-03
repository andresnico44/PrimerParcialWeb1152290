document.addEventListener("DOMContentLoaded", () => {
    const categoriesContainer = document.getElementById('categories');
    const productsContainer = document.getElementById('products');
    
    // Función para obtener y mostrar las categorías
    const fetchCategories = () => {
        fetch('https://fakestoreapi.com/products/categories')
            .then(res => res.json())
            .then(categories => {
                categoriesContainer.innerHTML = ''; // Limpiar categorías anteriores
                categories.forEach(category => {
                    // Crear un botón por cada categoría
                    const categoryButton = document.createElement('button');
                    categoryButton.textContent = category;
                    categoryButton.addEventListener('click', () => {
                        fetchProductsByCategory(category);
                    });
                    categoriesContainer.appendChild(categoryButton);
                });
            })
            .catch(error => {
                console.error('Error al obtener las categorías:', error);
            });
    };

    // Función para obtener y mostrar productos de una categoría específica
    const fetchProductsByCategory = (category) => {
        fetch(`https://fakestoreapi.com/products/category/${category}`)
            .then(res => res.json())
            .then(products => {
                productsContainer.innerHTML = ''; // Limpiar productos anteriores
                products.forEach(product => {
                    // Crear una tarjeta de producto
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    
                    // Imagen del producto
                    const productImg = document.createElement('img');
                    productImg.src = product.image;
                    productImg.alt = product.title;
                    
                    // Nombre del producto
                    const productTitle = document.createElement('h3');
                    productTitle.textContent = product.title;
                    
                    // Precio del producto
                    const productPrice = document.createElement('p');
                    productPrice.classList.add('price');
                    productPrice.textContent = `$${product.price}`;
                    
                    // Botón de agregar al carrito
                    const addButton = document.createElement('button');
                    addButton.textContent = 'Añadir al carrito';
                    addButton.addEventListener('click', () => {
                        addToCart(product);
                    });
                    
                    // Añadir elementos a la tarjeta
                    productCard.appendChild(productImg);
                    productCard.appendChild(productTitle);
                    productCard.appendChild(productPrice);
                    productCard.appendChild(addButton);
                    
                    // Añadir la tarjeta al contenedor de productos
                    productsContainer.appendChild(productCard);
                });
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    };

    // Función para agregar un producto al carrito (funcionalidad básica)
    const addToCart = (product) => {
        alert(`Producto añadido: ${product.title}`);
        // Aquí puedes agregar lógica para manejar el carrito (localStorage, API, etc.)
    };

    // Cargar las categorías al iniciar la página
    fetchCategories();
});
