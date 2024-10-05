let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
let autoSlideInterval;

function moveSlide(direction) {
    // Mover al siguiente slide
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    const slideWidth = slides[0].clientWidth;
    document.querySelector('.slides').style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    
    
}

// Cambio automático cada 9 segundos
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        moveSlide(1);
    }, 9000);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Iniciar el carrusel automático al cargar la página
startAutoSlide();



let productIndex = 0;
const productSlides = document.querySelector('.product-slides');
const productSlideCount = document.querySelectorAll('.product-slide').length;
const productsPerPage = 4;
const maxProductIndex = Math.ceil(productSlideCount / productsPerPage) - 1;

function moveProductSlide(n) {
    productIndex += n;

    if (productIndex < 0) {
        productIndex = maxProductIndex;
    } else if (productIndex > maxProductIndex) {
        productIndex = 0;
    }

    const transformValue = `translateX(${-productIndex * 100}%)`;
    productSlides.style.transform = transformValue;
}
