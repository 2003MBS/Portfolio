// Slideshow functionality
document.addEventListener('DOMContentLoaded', function() {
    const slideshowWrapper = document.querySelector('.slideshow-wrapper');
    const slides = document.querySelectorAll('.slideshow-image');
    const prevButton = document.querySelector('.slideshow-nav.prev');
    const nextButton = document.querySelector('.slideshow-nav.next');
    const modal = document.querySelector('.modal');
    const modalImage = document.querySelector('.modal-image');
    const closeModal = document.querySelector('.close-modal');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Function to update slideshow position
    function updateSlideshow() {
        slideshowWrapper.style.transform = `translateX(-${currentSlide * 33.33}%)`;
    }

    // Navigation button click handlers
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlideshow();
    });

    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlideshow();
    });

    // Image click handlers for modal view
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            modalImage.src = slide.src;
            modal.style.display = 'block';
        });
    });

    // Close modal when clicking the close button or outside the image
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        } else {
            if (e.key === 'ArrowLeft') {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateSlideshow();
            } else if (e.key === 'ArrowRight') {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlideshow();
            }
        }
    });
}); 