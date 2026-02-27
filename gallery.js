document.addEventListener('DOMContentLoaded', function () {

    let currentIndex = 0;
    let slideInterval;

    const images = document.querySelectorAll("#carouselTrack img");
    const track = document.getElementById("carouselTrack");
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("modalImage");

    if (!track || images.length === 0) return;

    /* ===== Carousel Navigation ===== */

    window.nextSlide = function () {
        currentIndex++;
        if (currentIndex >= images.length) currentIndex = 0;
        updateCarousel();
    };

    window.prevSlide = function () {
        currentIndex--;
        if (currentIndex < 0) currentIndex = images.length - 1;
        updateCarousel();
    };

    function updateCarousel() {
        const offset = -currentIndex * track.parentElement.offsetWidth;
        track.style.transform = `translateX(${offset}px)`;
    }

    /* ===== Modal Slideshow ===== */

    window.openModal = function (index) {
        currentIndex = index;
        modal.style.display = "flex";
        showImage();
        startSlideshow();
    };

    window.closeModal = function () {
        modal.style.display = "none";
        stopSlideshow();
    };

    function showImage() {
        if (images[currentIndex]) {
            modalImg.src = images[currentIndex].src;
        }
    }

    function startSlideshow() {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage();
        }, 5000);
    }

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    /* Responsive Fix */
    window.addEventListener("resize", updateCarousel);

});

/* ============================= */
/* ===== POSTERS CAROUSEL ===== */
/* ============================= */

document.addEventListener('DOMContentLoaded', function () {

    let posterIndex = 0;
    let posterInterval;

    const posterImages = document.querySelectorAll("#posterTrack img");
    const posterTrack = document.getElementById("posterTrack");
    const posterModal = document.getElementById("posterModal");
    const posterModalImg = document.getElementById("posterModalImage");

    if (!posterTrack || posterImages.length === 0) return;

    /* ===== Carousel Navigation ===== */

    window.nextPoster = function () {
        posterIndex++;
        if (posterIndex >= posterImages.length) posterIndex = 0;
        updatePosterCarousel();
    };

    window.prevPoster = function () {
        posterIndex--;
        if (posterIndex < 0) posterIndex = posterImages.length - 1;
        updatePosterCarousel();
    };

    function updatePosterCarousel() {
        const offset = -posterIndex * posterTrack.parentElement.offsetWidth;
        posterTrack.style.transform = `translateX(${offset}px)`;
    }

    /* ===== Modal Slideshow ===== */

    window.openPosterModal = function (index) {
        posterIndex = index;
        posterModal.style.display = "flex";
        showPosterImage();
        startPosterSlideshow();
    };

    window.closePosterModal = function () {
        posterModal.style.display = "none";
        stopPosterSlideshow();
    };

    function showPosterImage() {
        if (posterImages[posterIndex]) {
            posterModalImg.src = posterImages[posterIndex].src;
        }
    }

    function startPosterSlideshow() {
        posterInterval = setInterval(() => {
            posterIndex = (posterIndex + 1) % posterImages.length;
            showPosterImage();
        }, 5000);
    }

    function stopPosterSlideshow() {
        clearInterval(posterInterval);
    }

    /* Optional: Responsive Fix */
    window.addEventListener("resize", updatePosterCarousel);

});
/* ===== VIDEO CAROUSEL ===== */

document.addEventListener('DOMContentLoaded', function () {

    let videoIndex = 0;

    const videoTrack = document.getElementById("videoTrack");
    const videoSlides = document.querySelectorAll(".video-slide");

    if (!videoTrack || videoSlides.length === 0) return;

    window.nextVideo = function () {
        videoIndex++;
        if (videoIndex >= videoSlides.length) videoIndex = 0;
        updateVideoCarousel();
    };

    window.prevVideo = function () {
        videoIndex--;
        if (videoIndex < 0) videoIndex = videoSlides.length - 1;
        updateVideoCarousel();
    };

    function updateVideoCarousel() {
        const offset = -videoIndex * videoTrack.parentElement.offsetWidth;
        videoTrack.style.transform = `translateX(${offset}px)`;
    }

    window.addEventListener("resize", updateVideoCarousel);

});
document.addEventListener("DOMContentLoaded", function () {

    const tabButtons = document.querySelectorAll(".tab-btn");
    const sections = {
        infographics: document.getElementById("infographics-section"),
        posters: document.getElementById("posters-section"),
        videos: document.getElementById("videos-section")
    };

    tabButtons.forEach(button => {
        button.addEventListener("click", function () {

            // Remove active class from all
            tabButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            const category = this.getAttribute("data-category");

            if (category === "all") {
                Object.values(sections).forEach(section => {
                    if (section) section.style.display = "block";
                });
            } else {
                Object.keys(sections).forEach(key => {
                    if (sections[key]) {
                        sections[key].style.display =
                            key === category ? "block" : "none";
                    }
                });
            }

            // Scroll smoothly to section
            window.scrollTo({
                top: document.querySelector(".filter-tabs").offsetTop - 80,
                behavior: "smooth"
            });

        });
    });

});


