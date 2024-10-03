document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const checkoutButton = document.getElementById('checkoutButton');
    const customerNameElement = document.getElementById('customerName');
    const customerEmailElement = document.getElementById('customerEmail');
    const customerPhoneElement = document.getElementById('customerPhone');
    const customerAddressElement = document.getElementById('customerAddress');

    // Función para cargar la información del cliente desde la API
    const loadCustomerInfo = () => {
        fetch('https://fakestoreapi.com/users/1')  // Aquí 1 es el ID del usuario, cambiar si es necesario
            .then(res => res.json())
            .then(json => {
                customerNameElement.textContent = `${json.name.firstname} ${json.name.lastname}`;
                customerEmailElement.textContent = json.email;
                customerPhoneElement.textContent = json.phone;
                customerAddressElement.textContent = `${json.address.street}, ${json.address.city}, ${json.address.zip}`;
            })
            .catch(err => console.error('Error al cargar la información del cliente:', err));
    };

    // Función para cargar los productos del carrito desde localStorage
    const loadCartItemsFromLocalStorage = () => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        let totalPrice = 0;

        // Limpiar el contenedor de elementos del carrito
        cartItemsContainer.innerHTML = '';

        // Mostrar cada producto en el carrito
        cartItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <h3>${item.title}</h3>
                <p>Cantidad: <span class="item-quantity">${item.quantity}</span></p>
                <p>Precio: $${item.price.toFixed(2)}</p>
                <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-button" data-id="${item.id}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
            totalPrice += item.price * item.quantity; // Calcular total

            // Agregar evento para eliminar el producto del carrito
            itemDiv.querySelector('.remove-button').addEventListener('click', () => {
                removeItemFromCart(item.id);
            });
        });

        // Actualizar el total
        totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
    };

    // Función para eliminar productos del carrito
    const removeItemFromCart = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItemsFromLocalStorage();
    };

    // Función para cargar productos desde la API del carrito del usuario específico
    const loadCartFromAPI = () => {
        fetch('https://fakestoreapi.com/carts/user/1')  // Cambia el número 1 por el ID del usuario actual
            .then(res => res.json())
            .then(cart => {
                if (cart && cart.products) {
                    cart.products.forEach(product => {
                        // Aquí se puede agregar código para filtrar productos, si es necesario
                        fetch(`https://fakestoreapi.com/products/${product.productId}`)
                            .then(res => res.json())
                            .then(productDetails => {
                                const itemDiv = document.createElement('div');
                                itemDiv.classList.add('cart-item');
                                itemDiv.innerHTML = `
                                    <img src="${productDetails.image}" alt="${productDetails.title}">
                                    <h3>${productDetails.title}</h3>
                                    <p>Cantidad: <span class="item-quantity">${product.quantity}</span></p>
                                    <p>Precio: $${productDetails.price.toFixed(2)}</p>
                                    <p>Total: $${(productDetails.price * product.quantity).toFixed(2)}</p>
                                    <button class="remove-button" data-id="${productDetails.id}">Eliminar</button>
                                `;
                                cartItemsContainer.appendChild(itemDiv);
                            });
                    });
                }
            })
            .catch(err => console.error('Error al cargar los carritos:', err));
    };

    // Evento para el botón de "Realizar Pedido"
    checkoutButton.addEventListener('click', () => {
        alert('Pedido realizado');
        // Aquí puedes agregar cualquier otra lógica adicional para procesar el pedido
        // como enviar los datos a una API, limpiar el carrito, etc.
    });

    // Cargar los productos al iniciar la página
    loadCustomerInfo(); // Cargar información del cliente
    loadCartFromAPI(); // Cargar productos desde la API para el usuario
    loadCartItemsFromLocalStorage(); // Cargar productos desde localStorage
});
