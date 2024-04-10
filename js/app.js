/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const nav = document.getElementById('navbar__list');
const topButton = document.getElementById('topButton');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Hide fixed navigation bar while not scrolling
function hideNav(timeDelay) {
    let timer;
    // while on the top not hide the nav
    window.addEventListener('scroll', function () {
        nav.style.display = 'block';
        clearTimeout(timer);
        timer = setTimeout(function () {
            nav.style.display = 'none';
        }, timeDelay || 5000);
    }
    );
}

// Scroll to top button only visible when scrolling down
function showButton() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topButton.style.display = "flex";
    } else {
        topButton.style.display = "none";
    }
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function createNav() {
    for (let section of sections) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = section.getAttribute('data-nav');
        a.classList.add('menu__link');
        a.href = `#${section.id}`;
        li.appendChild(a);
        nav.appendChild(li);
    }
}

// Add class 'active' to section when near top of viewport
function setActiveSection() {
    for (let section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= 150) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    }
}

// THe active section should be highlighted when viewing the section
function setHighlightNavbar() {
    const items = nav.getElementsByTagName('li');
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });
    
    for (let item of items) {
        item.querySelector('a').classList.remove('highlight');
        if (item.querySelector('a').getAttribute('href') === `#` + current) {
            item.querySelector('a').classList.add('highlight');
        }
    }

}

// Scroll to anchor ID using scrollTO event
function scrollToSection() {
    nav.addEventListener('click', function (e) {
        e.preventDefault();
        const section = document.querySelector(e.target.getAttribute('href'));
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    });
}

// Scroll to top button
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu
createNav();

// Scroll to section on link click
scrollToSection();

// Set sections as active
document.addEventListener('scroll', setActiveSection);

// Set nav links as active
document.addEventListener('scroll', setHighlightNavbar);

// Visible top button while scrolling down
window.onscroll = function () { showButton() };

// Scroll to top button
topButton.addEventListener('click', scrollToTop);

// Hide fixed navigation bar while not scrolling
hideNav();
