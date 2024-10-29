document.addEventListener("DOMContentLoaded", function() {
    //const carouselContainer = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let slideIndex = 0;

    function showSlide(index) {
        if (index < 0) {
            slideIndex = slides.length - 1;
        } else if (index >= slides.length) {
            slideIndex = 0;
        }

        //carouselContainer.style.transform = `translateX(-${slideIndex * 100}%)`;

        //ocultar diapositivas anteriores
        slides.forEach(slide => {
            slide.style.display = 'none';
        });

        //mostrar actual img
        slides[slideIndex].style.display = 'block';
    }

    function prevSlide() {
        showSlide(slideIndex -= 1);
    }

    function nextSlide() {
        showSlide(slideIndex += 1);
    }

    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);
});
