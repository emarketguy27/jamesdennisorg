const ctaHeading = document.querySelector(".cta-section-index h2");
const ctaSubHeading = document.querySelector(".cta-section-index h3");
const ctaText = document.querySelector(".cta-section-index p");
const ctaH4 = document.querySelector(".cta-section-index h4");
const ctaBtns = gsap.utils.toArray(".cta-section-index button");

let ctaTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".cta-wrapper-index",
        start: "top 60%",
        toggleActions: "play none none reset",
    },
});
ctaTl.from(ctaHeading, {
    yPercent: 100,
    opacity: 0,
    duration: .8,
})
ctaTl.from(ctaSubHeading, {
    yPercent: 100,
    opacity: 0,
    duration: .8, 
}, "<")
ctaTl.from(ctaText, {
    yPercent: 100,
    opacity: 0,
    duration: .8,
}, "<")
ctaTl.from(ctaH4, {
    yPercent: 100,
    opacity: 0,
    duration: .8,
    delay: 1,
}, "<")
ctaTl.from(".buttons", {
    scale: 0,
    // opacity: 0,
    duration: .8,
    stagger: 0.3,
}, "<")
ctaTl.from(".cube-container", {
    scale: 0,
    duration: .8,
}, "<")