export class Swipe {
  _isSwipe(entry) {
    return entry.intersectionRatio != 1;
  }

  _swipeAction(entry) {
    this.observer.unobserve(entry.target);
    const DIRECTION = entry.boundingClientRect.left > 0 ? "left" : "right";
    const pageToRemove = DIRECTION == "left" ? 2 : 0; /*TODO estos valores los calcularemos con cuantos swipes queremos precargar*/
    this.container.removeChild(this.container.children[pageToRemove]);
    const actual = this.container.children[DIRECTION == "left" ? 0 : 1];

    
      console.log(DIRECTION)
      if (DIRECTION == "left") {
        this.container.insertBefore(this._createElement(), actual);

      } else {
        this.container.insertBefore(this._createElement(), actual.nextSibling);
      }
      actual.scrollIntoView({
        behavior: "instant"
      });
      this.observer.observe(actual);
    
  }

  _createElement() {
    const el = document.createElement("div");
    el.classList.add("container-page");
    const img = new Image;
    img.src = "img/" + Math.round(Math.random() * 5 + parseInt(1)) + ".jpeg";
    img.style.height = "100%";
    img.style.width = "100%";
    el.appendChild(img);
    return el;
  }

  _entryAction(el, entry) {
    if (this._isSwipe(entry)) this._swipeAction(entry);
  }

  constructor(swipeContainer) {
    this.container = swipeContainer;
    const actual = this.container.children[0];
    this.container.insertBefore(this._createElement(), actual);
    this.container.appendChild(this._createElement());

    console.log(actual);

    const options = {
      root: swipeContainer,
      rootMargin: "99.99%",
      threshold: [0, 1]
    };

    const callback = entries => entries.forEach(this._entryAction.bind(this, ...arguments));
    this.observer = new IntersectionObserver(callback, options);
    this.observer.observe(actual);
  }
}
