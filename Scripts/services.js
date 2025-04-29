gsap.registerPlugin(ScrollTrigger);

const rightItems = gsap.utils.toArray(".item-right:not(:first-child)");

gsap.set(rightItems, {
  yPercent: 100,
  opacity: 0,
});

const scrollOut = gsap.to(rightItems, {
  yPercent: 0,
  opacity: 1,
  duration: .5,
  stagger: 1,
});

ScrollTrigger.create({
  trigger: ".service-list",
  start: "top top",
  end: "bottom bottom",
  pin: ".right-container",
  animation: scrollOut,
  scrub: 2,
  markers: false,
});