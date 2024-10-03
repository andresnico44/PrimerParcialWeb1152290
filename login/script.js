document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            alert("Login exitoso. ¡Bienvenido!");
            errorMessage.style.display = "none";
            // Aquí puedes guardar el token o redirigir al usuario
        } else {
            errorMessage.style.display = "block";
            errorMessage.textContent = "Username o password incorrectos.";
        }
    })
    .catch(error => {
        errorMessage.style.display = "block";
        errorMessage.textContent = "Error en la solicitud. Inténtalo de nuevo.";
        console.error('Error:', error);
    });
});

document.getElementById('registerButton').addEventListener('click', function() {
    alert("Función de registro no implementada.");
});
