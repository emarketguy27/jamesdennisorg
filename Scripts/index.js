const ctaHeading = document.querySelector(".cta-section-index h2");
const ctaSubHeading = document.querySelector(".cta-section-index h3");
const ctaText = document.querySelector(".cta-section-index p");
const ctaH4 = document.querySelector(".cta-section-index h4");
const ctaBtns = gsap.utils.toArray(".cta-section-index button");

let ctaTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".cta-wrapper-index",
        start: "top 60%",
        toggleActions: "play none none none",
    },
});
ctaTl.from(ctaHeading, {
    yPercent: 100,
    opacity: 0,
    duration: .8,
})
.from(ctaSubHeading, {
    yPercent: 100,
    opacity: 0,
    duration: .8, 
}, "<")
.from(ctaText, {
    yPercent: 100,
    opacity: 0,
    duration: .8,
}, "<")
.from(ctaH4, {
    yPercent: 100,
    opacity: 0,
    duration: .8,
    delay: 1,
}, "<")
.from(".buttons", {
    scale: 0,
    // opacity: 0,
    duration: .8,
    stagger: 0.3,
}, "<")
.from(".cube-container", {
    scale: 0,
    duration: .8,
}, "<")