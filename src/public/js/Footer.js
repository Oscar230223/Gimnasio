document.addEventListener("DOMContentLoaded", function() {
    const dynamicFooter = document.getElementById("dynamic-footer");
    /*const message = `✆ <a href="contacto.html">Contáctanos</a> - 656 782 5559\n📍 Blvd. Independencia #2810. H Col. Praderas del Bravo 32695 Ciudad Juárez Chihuahua México\n© Contenido exclusivo de la Universidad Fronteriza de Ciudad Juárez`*/
    const message = `✆ <a href="contacto" style="color: white">Contáctanos - 656 782 5559</a>
         <a href="/maps" style="color: white">📍 Blvd. Independencia 1510, 32599 Juárez, Chih.</a>
        © Contenido exclusivo y propiedad de EmergencyApp 
    `;
    dynamicFooter.innerHTML = message;
});
