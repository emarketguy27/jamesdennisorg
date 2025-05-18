/* VIEW TRANSITIONS API CUSTOMIZATION */
// pages = [
//     '',
//     'form.html',
// ]

// ----------Custom view transition----------
// window.addEventListener('pagereveal', async (event) => {
//     if (!event.viewTransition) return;

//     const oldUrl = navigation.activation.from.url;
//     const targetUrl = navigation.activation.entry.url;
//     console.log(oldUrl);
//     console.log(targetUrl);
//     const oldPath = new URL(oldUrl).pathname.split('/').pop();
//     const targetPath = new URL(targetUrl).pathname.split('/').pop();

//     const oldIndex = pages.indexOf(oldPath);
//     const newIndex = pages.indexOf(targetPath);

//     const direction = oldIndex < newIndex ? 'forward' : 'backward';

//     document.documentElement.dataset.direction = direction;

//     await event.viewTransition.finished;
// })

// -------------------------------------------------
// -------------Lenis Smooth Scroll-----------------
// -------------------------------------------------
const lenis = new Lenis();

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

//---------------------------------------------------------------------
//--------------------DOM Content Loaded Scripts-----------------------
// --------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    //--------------------Page Navigation Transitions------------------
    const navLinks = document.querySelectorAll("a");
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            if (
                e.target.hostname === window.location.hostname &&
                e.target.getAttribute("href").indexOf("#") === -1 &&
                e.target !== "_blank"
            )   {
                e.preventDefault();
                let destination = e.target.getAttribute("href");
                document.getElementById("header").classList.add("hidden");
                gsap.fromTo(".bar", {height: 0,}, {height: "105vh", stagger: { amount: 0.2, from: "center"},

                    onComplete: () => {
                        window.location = destination;
                    }
                });
            }
            
        });
    });

    // --------------------------------------------------------------------
    // ----------Hide/Show navbar & ScrolltoTop on scroll up/down----------
    // --------------------------------------------------------------------
    var prevScrollpos = window.pageYOffset;
    const scrollHeight = document.documentElement.scrollHeight;

    window.onscroll = function() {
        var currentScrollPos = window.pageYOffset;
        scrollPercent = ((currentScrollPos / scrollHeight) * 100).toFixed();

        if (prevScrollpos < currentScrollPos && scrollPercent > 10) {
            // document.getElementById("header").style.top = "-80px";
            document.getElementById("header").classList.add("hidden");
        } else {
            // document.getElementById("header").style.top = "0px";
            document.getElementById("header").classList.remove("hidden");
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
    };
    
    // ----------------------------------------------------------
    // ----------------Main Sub-Menu Modal-----------------------
    // ----------------------------------------------------------
    function modalVisible() {
        var element = document.getElementById("menu-modal");
        element.classList.toggle("visible");
    }

    // ------------------Custom Cursor---------------------------

    var mouseCursor = document.getElementById('circle');
    function moveMouseCursor(e) {
        gsap.to(mouseCursor, .6, {
            css: {
                x: e.clientX,
                y: e.clientY
            }
        });
    };
    window.addEventListener("mousemove", moveMouseCursor);
    var hoverLinks = Array.from(document.querySelectorAll("a"));
    var cards = Array.from(document.querySelectorAll(".thumbnail.item"));
    var hireBtns = Array.from(document.querySelectorAll(".hire-btn"));

    const cursorImage = document.querySelector(".cursor-logo");
    const cursorHoverImage = document.querySelector(".cursor-hover");
    const cardOpenImage = document.querySelector(".card-open");
    const buttonImage = document.querySelector(".hire-icon");

    hoverLinks.forEach(hoverLink => {
        hoverLink.addEventListener('mousemove', function () {
            cursorImage.style.opacity = "0";
            cursorHoverImage.style.opacity = "1";
        })
        hoverLink.addEventListener('mouseleave', function () {
            cursorImage.style.opacity = ".6";
            cursorHoverImage.style.opacity = "0";
        })
    });
    cards.forEach(card => {
        card.addEventListener('mousemove', function () {
            cursorImage.style.opacity = "0";
            cardOpenImage.style.opacity = "1";
            cardOpenImage.style.scale = "1.8";
        })
        card.addEventListener('mouseleave', function () {
            cursorImage.style.opacity = ".6";
            cardOpenImage.style.opacity = "0";
            cardOpenImage.style.scale = "0";
        })
    });
    hireBtns.forEach(hireBtn => {
        hireBtn.addEventListener('mousemove', function () {
            cursorImage.style.opacity = "0";
            buttonImage.style.opacity = "1";
            buttonImage.style.scale = "1.8";
        })
        hireBtn.addEventListener('mouseleave', function () {
            cursorImage.style.opacity = ".6";
            buttonImage.style.opacity = "0";
            buttonImage.style.scale = "0";
        })
    });

})





// ----------------------------------------------------------
// -------------Theme Preference Light/Dark------------------
// ----------------------------------------------------------
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