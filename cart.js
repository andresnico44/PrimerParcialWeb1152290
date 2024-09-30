document.addEventListener("DOMContentLoaded", () => {
    // Cargar productos del carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cartContainer');

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
        cart.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('cart-product');
            productCard.innerHTML = `
                <h3>${product.title}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <p>Cantidad: 1</p> <!-- Esto puede ajustarse según la lógica -->
            `;
            cartContainer.appendChild(productCard);
        });
    }
});
