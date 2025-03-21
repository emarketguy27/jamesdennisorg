/* VIEW TRANSITIONS API CUSTOMIZATION */
pages = [
    '',
    'form.html',
]

// ----------Custom view transition----------
window.addEventListener('pagereveal', async (event) => {
    if (!event.viewTransition) return;

    const oldUrl = navigation.activation.from.url;
    const targetUrl = navigation.activation.entry.url;
    console.log(oldUrl);
    console.log(targetUrl);
    const oldPath = new URL(oldUrl).pathname.split('/').pop();
    const targetPath = new URL(targetUrl).pathname.split('/').pop();

    const oldIndex = pages.indexOf(oldPath);
    const newIndex = pages.indexOf(targetPath);

    const direction = oldIndex < newIndex ? 'forward' : 'backward';

    document.documentElement.dataset.direction = direction;

    await event.viewTransition.finished;
})

// ----------Theme Setting - Dark Mode----------

let darkmode = localStorage.getItem('darkmode');
const darkmodeToggle = document.querySelector('#theme-checkbox');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'enabled');
}
const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', 'null');
}

if (darkmode === 'enabled') {
    enableDarkMode();
    darkmodeToggle.checked = true;
}

darkmodeToggle.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');
    if (darkmode !== 'enabled') {
        enableDarkMode();
        console.log(darkmode)
    } else {
        disableDarkMode();
        console.log(darkmode)
    }
    
})

// ----------Hide navbar on scroll down----------

var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
        if (prevScrollpos > currentScrollPos && currentScrollPos < 600) {
            document.getElementById("header").style.top = "0";
            document.getElementById("toTop").style.bottom = "-80px";
        } else {
            document.getElementById("header").style.top = "-80px";
            document.getElementById("toTop").style.bottom = "100px";
        }
        
        prevScrollpos = currentScrollPos;
    }

// ----------Lenis Smooth Scroll----------
/* Initialize Lenis with custom option */
// Initialize Lenis
const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);



// ----------Menu Modal----------
function modalVisible() {
    var element = document.getElementById("menu-modal");
    element.classList.toggle("visible");
    }
