function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function throttled(delay, fn) {
  let lastCall = 0;
  return function (...args) {
    const now = (new Date).getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  }
}


export class Swipe {
  _isSwipe(entry) {
    return entry.intersectionRatio != 1;
  }

  _throttledAction(){

  }

  _swipeAction(entry) {
    this.observer.unobserve(entry.target);

    const DIRECTION = entry.boundingClientRect.left > 0 ? "left" : "right";
    const pageToRemove = DIRECTION == "left" ? 2 : 0; /*TODO estos valores los calcularemos con cuantos swipes queremos precargar*/ 

    this.container.removeChild(this.container.children[pageToRemove]);

    let el = document.createElement("div");
    el.classList.add("container-page");

    let img = new Image();
    img.src = "https://picsum.photos/411/731/?random&m=" + Math.random();
    img.style.height = "100%";
    img.style.width = "100%";
    
    el.appendChild(img);
    
    const actual = this.container.children[DIRECTION == "left" ? 0 : 1];
    
    setTimeout(_ => {
      console.log(DIRECTION)
      if (DIRECTION == "left") {
        this.container.insertBefore(el, actual);
        actual.scrollIntoView({
          behavior: "instant"
        });   
      } else {
        this.container.insertBefore(el, actual.nenextSibling);
      }
      this.observer.observe(actual);
    }, 50);
  }
  
  _entryAction(el, entry) {
    if (this._isSwipe(entry)) this._swipeAction(entry);
  }

  constructor(swipeContainer) {
    this.container = swipeContainer;
    this._actionBlocked = false;

    const options = {
      root: swipeContainer,
      rootMargin: "100%",
      threshold: [0, 1]
    };
    
    const callback = entries => entries.forEach(this._entryAction.bind(this, ...arguments));
    this.observer = new IntersectionObserver(callback, options);
    this.observer.observe(swipeContainer.children[1]);
  }
}
