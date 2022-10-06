// Dropdown Navbar
const navButton = document.querySelector('.nav-icon');

const dropdown = () => {
    let navbar = document.querySelector('.navbar');
    let items = document.getElementsByClassName('nav-item');

    if (!navbar.classList.contains('nav-responsive')) {
        navbar.classList.add('nav-responsive');
        navButton.innerHTML = "<i class='fa fa-times'></i>";
        for (const elem of items) {
            let content = elem.innerHTML;
            elem.innerHTML = content;
        }
    } else {
        navbar.classList.remove('nav-responsive');
        navButton.innerHTML = "<i class='fa fa-bars'></i>";
        for (const elem of items) {
            let content = elem.innerHTML;
            elem.innerHTML = content;
        }
    }
}

navButton.addEventListener('click', dropdown);

// Modal
const openModal = (objectID) => {
    document.getElementById(objectID).style.display = 'block';
}

const closeModal = (objectID) => {
    document.getElementById(objectID).style.display = 'none';
}

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// Slideshow
let slideIndex = 0;
let auto = document.getElementsByClassName('carousel-auto');
if (auto.length > 0) {
    autoSlides();
} else if (document.getElementsByClassName('slides').length > 0) {
    showSlides(slideIndex);
}

const moveSlides = (n) => {
    showSlides(slideIndex += n);
}

const currentSlide = (n) => {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName('slides');
    let rects = document.getElementsByClassName('rect-marker');
    
    if (n > slides.length) {
        slideIndex = 1; 
    }
    if (n < 1) { 
        slideIndex = slides.length; 
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (let i = 0; i < rects.length; i++) {
        rects[i].className = rects[i].className.replace(' active', '')
    }
    slides[slideIndex-1].style.display = 'block';
    rects[slideIndex-1].className += ' active';
};

function autoSlides() {
    let slides = document.getElementsByClassName('slides');
    let rects = document.getElementsByClassName('rect-marker');
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    for (let i = 0; i < rects.length; i++) {
        rects[i].className = rects[i].className.replace(' active', '')
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex-1].style.display = 'block';
    rects[slideIndex-1].className += ' active';
    setTimeout(autoSlides, auto[0].dataset.time);
};

// JSON Message
const msgHolder = document.querySelector('.msg-holder');
let Data;
let counter = 0;
let state = 'fadeIn';
let msg;

const loop = () => {
    counter++;
    switch (state) {
        case 'fadeIn':
            msgHolder.style.opacity = 1;
            state = 'showMsg';
            break;
        case 'showMsg':
            if (counter >= 5) {
                state = 'fadeOut';
            }
            break;
        case 'fadeOut':
            msgHolder.style.opacity = 0;
            state = 'newMsg';
            break;
        case 'newMsg':
            if (counter >= 8) {
                msg++;
                if (msg > Data.length-1) {
                    msg = 0;
                }
                msgHolder.innerHTML = `${Data[msg]}`;
                counter = 0;
                state = 'fadeIn';
            }
            break;
    }
};

let fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    Data = data;
    msg = Math.floor(Math.random() * Data.length);
    msgHolder.innerHTML = `${Data[msg]}`;
    setInterval(loop, 1000);
};

if (msgHolder) {
    fetchData('data.json');
}

// Accordion
const acc = document.getElementsByClassName('accordion');

for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener('click', function() {
        if(this.classList.contains('acc-only-one')) {
            if (this.classList.contains('active')) {
                let panel = this.nextElementSibling;
                panel.style.maxHeight = null;
            } else {
                for(let x = 0; x < acc.length; x++) {
                    if (acc[x].classList.contains('acc-only-one')) {
                        acc[x].classList.remove('active');
                        let panel = acc[x].nextElementSibling;
                        panel.style.maxHeight = null;
                    }
                }
                this.classList.add('active');
                let panel = this.nextElementSibling;
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        } else {
            this.classList.toggle('active');
            let panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + 'px';
            }
        }
    });
}

// Hide/show toggle
const toggleHidden = (objectID) => {
    const theDiv = document.getElementById(objectID);
    if (theDiv.style.display === 'none') {
        theDiv.style.display = 'block';
    } else {
        theDiv.style.display = 'none';
    }
}