const tops = document.querySelector(".tops")
const LeftButton = tops.querySelector(".tops-left");
const RightButton = tops.querySelector(".tops-right");
const container = tops.querySelector(".tops-container");
const topsScroll = tops.querySelector(".tops-h-container");
const items = tops.querySelectorAll(".tops-item");
const newStyle = document.createElement("style");

var numberofItems = 5; /// This is the number of products you want to be shown, half of it would be shown on mobile.
var itemsShown = 0;
var maxScroll = 0;
var itemsWidth = 0;
var topsBar = 0;

function resize() {
	if (window.matchMedia("(max-width: 900px)").matches) {
		itemsShown = Math.round((numberofItems) / 3)
	} else if (window.matchMedia("(max-width: 1200px)").matches) {
		itemsShown = Math.round((numberofItems) / 1.5);
	} else {
		itemsShown = numberofItems;
	}
	itemsWidth = (tops.offsetWidth - ((itemsShown + 1) * 24)) / itemsShown;
	maxScroll = (items.length - itemsShown) * (itemsWidth + 24) - 10;
	container.style.width = items.length * (itemsWidth + 24) + 25 + "px";
	newStyle.innerHTML = ".tops-item {width: " + itemsWidth + "px }";
	tops.appendChild(newStyle);
	if (window.matchMedia("(max-width: 900px)").matches) {
		topsScroll.scrollTo((itemsWidth + 24) / 2, 0);
	} else {
		topsScroll.scrollTo(0, 0);
		topsBar = 0;
	}

}
resize();
function scrollLeft() {
	if ( topsBar > 25) {
		topsBar -= (itemsWidth + 24);
		topsScroll.scrollLeft = topsBar;
	}
}
function scrollRight() {
	if ( topsBar < maxScroll - 25) {
		topsBar += (itemsWidth + 24);
		topsScroll.scrollLeft = topsBar;
	}
}
function scrollUpdate() {
	if (topsScroll.scrollLeft >= maxScroll - 25) {
		RightButton.style.opacity = 0.3;
	} else {
		RightButton.style.opacity = 1.0;
	}
	if (topsScroll.scrollLeft <= 25) {
		LeftButton.style.opacity = 0.3;
	} else {
		LeftButton.style.opacity = 1.0;
	}
}

topsScroll.addEventListener("scroll", scrollUpdate)
LeftButton.addEventListener("click", scrollLeft);
RightButton.addEventListener("click", scrollRight);

window.addEventListener("resize", resize)