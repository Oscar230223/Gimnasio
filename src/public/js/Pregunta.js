document.getElementById("recoveryForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const userAnswer = document.getElementById("securityAnswer").value.trim();
    const selectedQuestion = document.getElementById("securityQuestion").value;

    // Respuestas correctas predefinidas
    const correctAnswers = {
        mascota: "Scooby",
        madre: "Josefa",
        ciudad: "Juarez",
        escuela: "Ortiz Rubio",
        color: "Azul"
    };

    if (userAnswer === correctAnswers[selectedQuestion]) {
        // Redirigir a la página de cambio de contraseña
        window.location.href = "registro";
    } else {
        // Mostrar mensaje de error
        document.getElementById("errorMessage").style.display = "block";
    }
});
