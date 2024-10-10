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


document.addEventListener("DOMContentLoaded", function() {
    // Verifica si el usuario ya está autenticado (simulación con localStorage)
    if (localStorage.getItem("username")) {
        showWelcomeMessage(localStorage.getItem("username"));
    }

    // Simula el proceso de registro
    function registerUser(email, username) {
        // Aquí iría la lógica para enviar el correo de autenticación
        alert("Se ha enviado un correo de verificación a " + email);

        // Simula que el usuario ha verificado el correo y se registra
        localStorage.setItem("username", username);
        showWelcomeMessage(username);
    }

    // Simula el proceso de inicio de sesión
    function loginUser(username) {
        // Guarda el nombre del usuario en localStorage (simulación)
        localStorage.setItem("username", username);
        showWelcomeMessage(username);
    }

    // Muestra el mensaje de bienvenida y oculta los botones de registro/inicio de sesión
    function showWelcomeMessage(username) {
        document.querySelector('.auth-buttons').style.display = 'none';
        document.getElementById('welcome-message').style.display = 'block';
        document.getElementById('username').textContent = username;
    }

    // Maneja el menú desplegable del usuario
    document.getElementById("user-dropdown").addEventListener("click", function() {
        var menu = document.getElementById("user-menu");
        menu.style.display = (menu.style.display === "none") ? "block" : "none";
    });

    // Cierra la sesión
    document.getElementById("logout").addEventListener("click", function() {
        localStorage.removeItem("username");
        location.reload(); // Recarga la página para volver a mostrar los botones de registro/inicio de sesión
    });
});


$(document).ready(function(){
    $('.carousel-container').slick({
      slidesToShow: 7,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
          }
        }
      ]
    });
  });