document.addEventListener('DOMContentLoaded', function() {  
    /* ----------------------------  
       GENERAR FLORES INTERACTIVAS  
    ----------------------------- */  
    const flowerGarden = document.getElementById('flower-garden');  
    const numberOfFlowers = 12;  
  
    for (let i = 0; i < numberOfFlowers; i++) {  
      const flower = document.createElement('div');  
      flower.className = 'flower';  
      
      // Centro de la flor  
      const center = document.createElement('div');  
      center.className = 'flower-center';  
      flower.appendChild(center);  
      
      // Pétalos  
      const petalCount = 12;  
      for (let j = 0; j < petalCount; j++) {  
        const petal = document.createElement('div');  
        petal.className = 'petal';  
        const angle = (j / petalCount) * 360;  
        petal.style.transform = `rotate(${angle}deg) translateY(-15px)`;  
        flower.appendChild(petal);  
      }  
      
      // Partículas al hacer clic en cada flor  
      flower.addEventListener('click', function() {  
        createParticles(this);  
      });  
      
      flowerGarden.appendChild(flower);  
    }  
  
    // Efecto de partículas doradas al hacer clic sobre una flor  
    function createParticles(element) {  
      const rect = element.getBoundingClientRect();  
      const centerX = rect.left + rect.width / 2;  
      const centerY = rect.top + rect.height / 2;  
      
      for (let i = 0; i < 20; i++) {  
        const particle = document.createElement('div');  
        particle.className = 'particle';  
        
        const size = Math.random() * 8 + 3;  
        particle.style.width = `${size}px`;  
        particle.style.height = `${size}px`;  
        
        const destinationX = centerX + (Math.random() - 0.5) * 200;  
        const destinationY = centerY + (Math.random() - 0.5) * 200;  
        
        particle.style.left = `${centerX}px`;  
        particle.style.top = `${centerY}px`;  
        
        document.body.appendChild(particle);  
        
        const animation = particle.animate([  
          {   
            transform: 'translate(0, 0)',   
            opacity: 1   
          },  
          {   
            transform: `translate(${destinationX - centerX}px, ${destinationY - centerY}px)`,   
            opacity: 0   
          }  
        ], {  
          duration: 1000 + Math.random() * 1000,  
          easing: 'cubic-bezier(0, .9, .57, 1)',  
          delay: Math.random() * 200  
        });  
        
        animation.onfinish = function() {  
          particle.remove();  
        };  
      }  
    }  
  
    /* ------------------------------------------------  
       EFECTO DE PÉTALOS DE GIRASOL CAYENDO CONTINUOS  
    -------------------------------------------------- */  
    const flowerPetalsContainer = document.getElementById('flower-petals');  
  
    function startPetals() {  
      // Crea un pétalo cada 500 milisegundos  
      setInterval(() => {  
        createPetal();  
      }, 500);  
    }  
  
    function createPetal() {  
      const petal = document.createElement('div');  
      petal.className = 'petal-falling';  
      
      // Posición inicial aleatoria en X  
      const randomLeft = Math.random() * window.innerWidth;  
      petal.style.left = randomLeft + 'px';  
      
      // Dimensión aleatoria del pétalo  
      const randomSize = Math.random() * 10 + 10; // Tamaño entre 10 y 20 px  
      petal.style.width = randomSize + 'px';  
      petal.style.height = randomSize + 'px';  
      
      // Duración aleatoria de la animación  
      const randomDuration = Math.random() * 5 + 5; // Entre 5s y 10s  
      petal.style.animationDuration = randomDuration + 's';  
      
      flowerPetalsContainer.appendChild(petal);  
      
      // Elimina el pétalo al finalizar su animación  
      setTimeout(() => {  
        petal.remove();  
      }, randomDuration * 1000);  
    }  
  
    // Inicia la lluvia de pétalos  
    startPetals();  
    
    /* ----------------------------  
       CONTROL DE GALERÍA DE IMÁGENES  
    ----------------------------- */  
    const galleryButton = document.getElementById('gallery-button');  
    const gallery = document.getElementById('gallery');  
    galleryButton.addEventListener('click', () => {  
      // Mostrar u ocultar la galería  
      if (gallery.style.display === 'flex') {  
        gallery.style.display = 'none';  
      } else {  
        gallery.style.display = 'flex';  
      }  
    });  
  
    // Modal para ver imágenes en grande  
    const imageModal = document.getElementById('image-modal');  
    const modalImage = document.getElementById('modal-image');  
    const closeModal = document.getElementById('close-modal');  
    const galleryImages = document.querySelectorAll('.gallery-image');  
  
    galleryImages.forEach(img => {  
      img.addEventListener('click', () => {  
        imageModal.style.display = 'flex';  
        modalImage.src = img.src;  
      });  
    });  
  
    closeModal.addEventListener('click', () => {  
      imageModal.style.display = 'none';  
    });  
  
    /* ----------------------------  
       MOSTRAR MENSAJE ESPECIAL  
    ----------------------------- */  
    const messageToggle = document.getElementById('message-toggle');  
    const specialMessage = document.getElementById('special-message');  
  
    messageToggle.addEventListener('click', () => {  
      if (specialMessage.style.display === 'block') {  
        specialMessage.style.display = 'none';  
      } else {  
        specialMessage.style.display = 'block';  
      }  
    });  
  });

  // Selecciona todos los contenedores de videos  
const videoCards = document.querySelectorAll('.video-card');  

// Elementos del modal  
const videoModal = document.getElementById('video-modal');  
const modalVideo = document.getElementById('modal-video');  
const modalVideoDescription = document.getElementById('modal-video-description');  
const closeVideoModal = document.getElementById('close-video-modal');  

// Abre el modal al hacer clic en un video  
videoCards.forEach(card => {  
  card.addEventListener('click', () => {  
    const video = card.querySelector('.gallery-video');  
    const videoSrc = video.getAttribute('src');  
    const descriptionText = card.querySelector('.video-description').innerText;  
    
    // Muestra el modal  
    videoModal.style.display = 'flex';  
    
    // Configura el video para reproducirse en grande  
    modalVideo.setAttribute('src', videoSrc);  
    modalVideoDescription.textContent = descriptionText;  
  });  
});  

// Cierra el modal al hacer clic en la "X"  
closeVideoModal.addEventListener('click', () => {  
  videoModal.style.display = 'none';  
  
  // Detiene y limpia el video (para que no siga reproduciéndose en segundo plano)  
  modalVideo.pause();  
  modalVideo.removeAttribute('src');  
});

function mostrarVideo(thumbnailId, videoId) {  
  // Oculta el contenedor con la miniatura y la descripción  
  document.getElementById(thumbnailId).style.display = 'none';  
  
  // Muestra el contenedor con el iframe de YouTube  
  document.getElementById(videoId).style.display = 'block';  
}