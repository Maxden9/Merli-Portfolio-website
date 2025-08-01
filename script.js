document.addEventListener("DOMContentLoaded", () => {
    const introDiv = document.querySelector(".intro");
    const hideIntro = () => introDiv.classList.add("hidden");
    document.addEventListener("mousemove", hideIntro, { once: true });
    document.addEventListener("scroll", hideIntro, { once: true });
    document.addEventListener("click", hideIntro, { once: true });

    const goUp = document.getElementById("goUp");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            goUp.style.display = "flex";
        } else {
            goUp.style.display = "none";
        }
    });
    goUp.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const showMoreBtn = document.getElementById('show-more-btn');
    const showLessBtn = document.getElementById('show-less-btn');
    const initialVisible = 4;
    let visibleItems = initialVisible;

    const openLightbox = (src) => {
        lightboxImg.src = src;
        lightbox.classList.add('active');
    };

    const closeLightbox = () => lightbox.classList.remove('active');

    const updateGalleryVisibility = () => {
        galleryItems.forEach((item, index) => {
            item.style.display = index < visibleItems ? 'block' : 'none';
        });

        showMoreBtn.classList.toggle('hidden', visibleItems >= galleryItems.length);
        showLessBtn.classList.toggle('hidden', visibleItems <= initialVisible);
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', () => openLightbox(item.dataset.src));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    showMoreBtn.addEventListener('click', () => {
        visibleItems = Math.min(visibleItems + 4, galleryItems.length);
        updateGalleryVisibility();
    });

    showLessBtn.addEventListener('click', () => {
        visibleItems = Math.max(visibleItems - 4, initialVisible);
        updateGalleryVisibility();
    });

    updateGalleryVisibility();
});

const sparkles = 100;
let x = 0, y = 0, isDragging = false;
const tiny = [], star = [], starv = [], starx = [], stary = [], tinyx = [], tinyy = [], tinyv = [];
const colours = ['#8b0000', '#b22222', '#dc143c', '#ff0000', '#8b4513', '#a52a2a'];

window.onload = () => {
    for (let i = 0; i < sparkles; i++) {
        const tinyDiv = createDiv(10, 10);
        tinyDiv.style.visibility = "hidden";
        tinyDiv.style.zIndex = "999";
        document.body.appendChild(tiny[i] = tinyDiv);
        tinyv[i] = 0;

        const starSize = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
        const starDiv = createStar(starSize, starSize);
        starDiv.style.visibility = "hidden";
        starDiv.style.zIndex = "999";
        document.body.appendChild(star[i] = starDiv);
        starv[i] = 0;
    }
    sparkle();
};

document.onmousedown = (e) => {
    isDragging = true;
    updateMouse(e);
};
document.onmouseup = () => isDragging = false;
document.onmousemove = (e) => {
    if (isDragging) updateMouse(e);
};

const updateMouse = (e) => {
    x = e.pageX;
    y = e.pageY;
};

const sparkle = () => {
    if (isDragging) {
        for (let c = 0; c < sparkles; c++) {
            if (!starv[c]) {
                star[c].style.left = (starx[c] = x) + "px";
                star[c].style.top = (stary[c] = y) + "px";
                star[c].style.backgroundColor = newColour();
                star[c].style.visibility = "visible";
                starv[c] = 50;
                break;
            }
        }
    }

    for (let c = 0; c < sparkles; c++) {
        if (starv[c]) updateStar(c);
        if (tinyv[c]) updateTiny(c);
    }
    requestAnimationFrame(sparkle);
};

const updateStar = (i) => {
    if (--starv[i] === 25) star[i].style.borderRadius = "50%";
    if (starv[i]) {
        stary[i] += 1 + Math.random() * 2;
        starx[i] += (i % 5 - 2) / 5;
        star[i].style.transform = `rotate(${starv[i] * 3}deg)`;
        if (stary[i] < document.body.scrollHeight) {
            star[i].style.top = stary[i] + "px";
            star[i].style.left = starx[i] + "px";
        } else {
            star[i].style.visibility = "hidden";
            starv[i] = 0;
        }
    } else {
        tinyv[i] = 50;
        tiny[i].style.top = (tinyy[i] = stary[i]) + "px";
        tiny[i].style.left = (tinyx[i] = starx[i]) + "px";
        tiny[i].style.width = "3px";
        tiny[i].style.height = "3px";
        tiny[i].style.backgroundColor = star[i].style.backgroundColor;
        star[i].style.visibility = "hidden";
        tiny[i].style.visibility = "visible";
    }
};

const updateTiny = (i) => {
    if (--tinyv[i] === 25) {
        tiny[i].style.width = "1px";
        tiny[i].style.height = "1px";
    }
    if (tinyv[i]) {
        tinyy[i] += 1 + Math.random() * 2;
        tinyx[i] += (i % 5 - 2) / 5;
        if (tinyy[i] < window.innerHeight) {
            tiny[i].style.top = tinyy[i] + "px";
            tiny[i].style.left = tinyx[i] + "px";
        } else {
            tiny[i].style.visibility = "hidden";
            tinyv[i] = 0;
        }
    } else {
        tiny[i].style.visibility = "hidden";
    }
};

const createDiv = (height, width) => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.height = `${height}px`;
    div.style.width = `${width}px`;
    div.style.overflow = "hidden";
    div.style.borderRadius = "50%";
    return div;
};

const createStar = (height, width) => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.height = `${height}px`;
    div.style.width = `${width}px`;
    div.style.overflow = "hidden";
    div.style.borderRadius = "50%";
    return div;
};

const newColour = () => colours[Math.floor(Math.random() * colours.length)];