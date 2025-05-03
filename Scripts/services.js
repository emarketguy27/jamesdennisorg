gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Flip);

///IMAGE FLIP / EXPAND TO DETAILS OVERLAY BOX//////////////////////////
const items = gsap.utils.toArray(".item"),
      details = document.querySelector('.detail'),
      detailContent = document.querySelector('.content'),
      detailImage = document.querySelector('.detail img'),
      detailTitle = document.querySelector('.detail .title'),
      detailSecondary = document.querySelector('.detail .secondary'),
      detailDescription = document.querySelector(".detail .description");

let activeItem; // keeps track of which item is open (details)

gsap.set(detailContent, { yPercent: -100 }); // close the details "drawer" (content) initially

function showDetails(item) {
	if (activeItem) { // click handling if user clicks outside expanded details popup
		return hideDetails();
	}
	let onLoad = () => {

		// position the details on top of the item (scaled down)
		Flip.fit(details, item, {scale: true, fitChild: detailImage});

		// record the state
		const state = Flip.getState(details);

		// set the final state
		gsap.set(details, {clearProps: true}); // Remove all original position/style props before scaling
        // Set new state and styling
		gsap.set(details, {
			xPercent: -50, 
			top: "51%", 
			yPercent: -50, 
			visibility: "visible", 
			overflow: "hidden",
			
		});
		gsap.to(details, {
			boxShadow: "var(--shadow-top)",
		}, "<+=0.25");
        
        // Flip.from() returns a timeline, so add a tween to reveal the detail content. That way, if the flip gets interrupted and forced to completion & killed, this does too.
		Flip.from(state, {
			duration: 0.5,
			ease: "power2.inOut",
			scale: true,
			onComplete: () => gsap.set(details, {overflowY: "auto"}) // to permit scrolling if necessary
		})
			
			.to(detailContent, {yPercent: 0}, 0.2);

		detailImage.removeEventListener("load", onLoad);
		document.addEventListener('click', hideDetails);
	};

	// Change image and text
	const data = item.dataset;
	detailImage.addEventListener("load", onLoad);
	detailImage.src = item.querySelector('img').src;
	detailTitle.innerText = data.title;
	detailSecondary.innerText = data.secondary;
	detailDescription.innerText = data.text;

	// stagger-fade the items out from the one that was selected in a staggered way (and kill the tween of the selected item)
	gsap.to(items, {opacity: 0.3, stagger: { amount: 0.7, from: items.indexOf(item), grid: "auto"}}).kill(item);
	gsap.to(".images-grid", {backgroundColor: "transparent", duration: 1, delay: 0.3}); // fade out the background
	activeItem = item;
}

function hideDetails() {
	document.removeEventListener('click', hideDetails);
	gsap.set(details, {overflow: "hidden"});

	// record the current state of details
	const state = Flip.getState(details);

	// scale details down so that its detailImage fits exactly on top of activeItem
	Flip.fit(details, activeItem, {scale: true, fitChild: detailImage});

	// animate the other elements, like all fade all items back up to full opacity, slide the detailContent away, and tween the background color to white.
	const tl = gsap.timeline();
	tl.set(details, {overflow: "hidden", boxShadow: "unset"})
    .to(detailContent, {yPercent: -100})
	  .to(items, {opacity: 1, stagger: {amount: 0.7, from: items.indexOf(activeItem), grid: "auto"}})
	  .to(".images-grid", {backgroundColor: "transparent"}, "<");

	// animate from the original state to the current one.
	Flip.from(state, {
		scale: true,
		duration: 0.5,
		delay: 0.2, // 0.2 seconds because we want the details to slide up first, then flip.
		onInterrupt: () => tl.kill()
	})
	  .set(details, {zIndex: -1, visibility: "hidden"});

	activeItem = null;
}

// Add click listeners
gsap.utils.toArray('.item').forEach(item => item.addEventListener('click', () => showDetails(item)));

// 	WEB DEVELOPMENT SECTION //
gsap.utils.toArray(".section-title").forEach((title, i) => {
	gsap.set(title, {
		yPercent: 50,
		opacity: 0,
	})
	gsap.to(title, {
		scrollTrigger: {
			trigger: title,
			start: "top 90%",
			end: "top 60%",
			toggleActions: "play none reverse reset",
			ease: "power4.inOut",
			scrub: 2,
		},
		opacity: 1,
		yPercent: 0,
		duration: .5,
	});
});
gsap.to(".core-title", {
	scrollTrigger: {
		trigger: ".core-title",
		start: "top 80%",
		end: "top 20%",
		scrub: 1,
	},
	opacity: 1,
})

// Core Services Pinned Sections

gsap.set(".item-right", { zIndex: (i, target, targets) => targets.length - i });

var images = gsap.utils.toArray(".item-right:not(:last-child)");
// const snapAmount = 0.3;
images.forEach((image, i) => {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".service-list",
      start: () => "top -" + window.innerHeight * (i + 0.5),
      end: () => "+=" + window.innerHeight,
      scrub: true,
      // snap: { snapTo: snapAmount, duration: 0.8 },
      toggleActions: "play none reverse none",
      invalidateOnRefresh: true,
	  markers: false,
    }
  });
  tl.to(image, { scale: 0, opacity: 0,});
});

gsap.set(".item-left", { zIndex: (i, target, targets) => targets.length - i });

var texts = gsap.utils.toArray(".item-left");
var textItems = gsap.utils.toArray(".service-info");

texts.forEach((text, i) => {
  let titleLine = text.querySelector(".fill-line");

  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".service-list",
      start: () => "top -" + window.innerHeight * i,
      end: () => "+=" + window.innerHeight,
      toggleClass: { targets: titleLine, className: "growOut" },
      scrub: true,
    //   snap: { snapTo: snapAmount * 1.6, duration: 0.8 },
      toggleActions: "play none reverse reset",
      invalidateOnRefresh: true
    }
  });

  tl.to(text, {
    duration: 0.33,
    opacity: 1,
    y: "0%"
  });

  tl.to(text, { duration: 0.33, opacity: 0, y: "-40%" }, 0.66);
});

ScrollTrigger.create({
  trigger: ".service-list",
  scrub: true,
  pin: true,
  start: () => "top top",
  end: () => "+=" + (images.length + 1) * window.innerHeight,
  // markers: true,
  invalidateOnRefresh: true
});



// let mm = gsap.matchMedia();
// mm.add("(min-width: 800px)", () => {
	// const rightItems = gsap.utils.toArray(".item-right:not(:first-child)");

	// gsap.set(rightItems, {
	// yPercent: 100,
	// opacity: 0,
	// });

	// const scrollOut = gsap.to(rightItems, {
	// yPercent: 0,
	// opacity: 1,
	// // duration: 1.5,
	// // stagger: 1,
	// });
	// ScrollTrigger.create({
	// trigger: ".service-list",
	// start: "top top",
	// end: "bottom bottom",
	// pin: ".right-container",
	// animation: scrollOut,
	// scrub: true,
	// //   snap: 1 / 4,
	// markers: true,
	// });
// })

