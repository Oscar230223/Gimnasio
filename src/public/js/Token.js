// Tokens predeterminados
const validTokens = ['123456', '234567', '345678', '456789', '567890'];

function validateToken() {
    const token = document.getElementById('token').value;
    const tokenMessageElement = document.getElementById('tokenMessage');

    // Verificar si el token ingresado es uno de los tokens válidos
    if (validTokens.includes(token) && token.length === 6 && !isNaN(token)) {
        tokenMessageElement.textContent = 'Acceso concedido.';
        // Redirigir a otra página si el token es válido
        window.location.href = 'registro'; // Cambia 'pagina-destino.html' por la URL a la que quieres redirigir
    } else {
        tokenMessageElement.textContent = 'Token inválido. Debe ingresar uno de los tokens predeterminados de 6 dígitos.';
    }
}
