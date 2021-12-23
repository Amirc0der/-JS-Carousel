var numberofItems = 5;    /// This is the number of products you want to be shown, half of it would be shown on mobile.
var Position = 0;

const tops = document.querySelector(".tops")
const LeftButton = tops.querySelector(".tops-left");
const RightButton = tops.querySelector(".tops-right");
const container = tops.querySelector(".tops-container");
const items = tops.querySelectorAll(".tops-item");
const newStyle = document.createElement("style"); 

var itemsShown = 0;
var maxScroll = 0;
var itemsWidth = 0;
var topsWidth = 0;

function resize () {
	 if (window.matchMedia("(max-width: 1000px)").matches) {
	 	itemsShown = Math.round((numberofItems)/3)
	 } else if(window.matchMedia("(max-width: 1200px)").matches) {
	 	itemsShown = Math.round((numberofItems)/2)
	 }
	 else {
	 	itemsShown = numberofItems;
	 }
	topsWidth = tops.offsetWidth;
	itemsWidth = (topsWidth-((itemsShown+1)*24))/itemsShown;
	maxScroll = (items.length - itemsShown ) * (itemsWidth+24) - 10;
	container.style.width = items.length * (itemsWidth+24) + 30 + "px";
	newStyle.innerHTML = ".tops-item {width: "+ itemsWidth +"px }";
	tops.appendChild(newStyle);
	Position = 0;
	container.style.marginLeft = Position + "px";
	LeftButton.style.opacity= 0.3;
	RightButton.style.opacity= 1;
}
resize();

function MoveLeft () {
  if(Position<-10) {
    RightButton.style.opacity= 1;
    LeftButton.style.opacity= 1;
    Position += itemsWidth+24;
    container.style.marginLeft = Position + "px";
    if (Position >= -10) {
      LeftButton.style.opacity= 0.3;
    }
  }
}

function MoveRight () {
  if(Position > -maxScroll) {
    RightButton.style.opacity= 1;
    LeftButton.style.opacity= 1;
    Position -= itemsWidth+24;
    container.style.marginLeft = Position + "px";
    if (Position <= -maxScroll) {
      RightButton.style.opacity= 0.3;
    }
  } 
}

LeftButton.addEventListener("click",MoveLeft);
RightButton.addEventListener("click",MoveRight);

window.addEventListener("resize", resize)
