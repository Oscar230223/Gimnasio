document.addEventListener("DOMContentLoaded", function() {
    const dynamicFooter = document.getElementById("dynamic-footer");
    /*const message = `✆ <a href="contacto.html">Contáctanos</a> - 656 782 5559\n📍 Blvd. Independencia #2810. H Col. Praderas del Bravo 32695 Ciudad Juárez Chihuahua México\n© Contenido exclusivo de la Universidad Fronteriza de Ciudad Juárez`*/
    const message = `✆ <a href="contacto" style="color: white">Contáctanos - 656 782 5559</a>
    <a href="faqs" style="color: white">❓ Preguntas frecuentes y respuestas detalladas</a>
        📍 Blvd. Independencia #2810. H Col. Praderas del Bravo 32695 Ciudad Juárez Chihuahua México
        © Contenido exclusivo de la Universidad Fronteriza de Ciudad Juárez - <a href="MapaDelSitio" style="color: white">Mapa de sitio</a>
    `;
    dynamicFooter.innerHTML = message;
});
