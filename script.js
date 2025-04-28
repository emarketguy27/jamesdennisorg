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

// ----------Hide/Show navbar & ScrolltoTop on scroll up/down----------

var prevScrollpos = window.pageYOffset;
const scrollHeight = document.documentElement.scrollHeight;
// console.log("Height =: " + scrollHeight);
// console.log("Height =: " + (scrollHeight - 90));


window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    scrollPercent = ((currentScrollPos / scrollHeight) * 100).toFixed();

        if (prevScrollpos < currentScrollPos && scrollPercent > 10) {
            document.getElementById("header").style.top = "-80px";
        } else {
            document.getElementById("header").style.top = "0px";
        };

        if (scrollPercent > 10 && scrollPercent >= 88) {
            document.getElementById("toTop").style.bottom = "80px";
        } else {
            if (scrollPercent > 10 && scrollPercent < 88) {
                document.getElementById("toTop").style.bottom = "0px";
            } else {
                document.getElementById("toTop").style.bottom = "-80px";                
            }
        }
        
        prevScrollpos = currentScrollPos;
        // console.log(window.pageYOffset);  
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


// ----------Theme Preference Light/Dark----------
// function getUserPreference() {
//     return localStorage.getItem('theme') || 'system';
//   }
//   function saveUserPreference(userPreference) {
//     localStorage.setItem('theme', userPreference);
//   }

//   function getAppliedMode(userPreference) {
//     if (userPreference === 'light') {
//       return 'light';
//     }
//     if (userPreference === 'dark') {
//       return 'dark';
//     }
//     // system
//     if (matchMedia('(prefers-color-scheme: light)').matches) {
//       return 'light';
//     }
//     return 'dark';
//   }

//   function setAppliedMode(mode) {
//     document.documentElement.dataset.appliedMode = mode;
//   }
  
//   function rotatePreferences(userPreference) {
//     if (userPreference === 'system') {
//       return 'light'
//     }
//     if (userPreference === 'light') {
//       return 'dark';
//     }
//     if (userPreference === 'dark') {
//       return 'system';
//     }
//     // for invalid values, just in case
//     return 'system';
//   }
  
//   const themeDisplay = document.getElementById('mode');
//   const themeToggler = document.getElementById('theme-toggle');
  
//   let userPreference = getUserPreference();
//   setAppliedMode(getAppliedMode(userPreference));
//   themeDisplay.innerText = userPreference;