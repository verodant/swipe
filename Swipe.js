function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export class Swipe {

    _isSwipe(entry) {
        return entry.intersectionRatio != 1
    }

    _swipeAction(entry) {
        const direction = (entry.boundingClientRect.left > 0) ? 'left' : 'right';
        this.observer.unobserve(entry.target);
        const pageToRemove = direction == 'left' ? 2 : 0;
        
        console.log(pageToRemove);
        this.container.removeChild(this.container.children[pageToRemove]);


        let el = document.createElement("div");
        let img  = new Image();
        img.src = 'https://picsum.photos/200/300/?random&m='+Math.random()
        img.style.height = '100%'
        img.style.width = '100%'
        el.appendChild(img)
        el.classList.add("container-page");
        el.style.backgroundColor = getRandomColor();
        let actual;
        setTimeout(_ => {
            if (direction == 'left') {
                actual = this.container.children[direction == 'left' ? 0 : 1];
                this.container.insertBefore(el, actual);
                this.container.classList.remove("smooth");
                actual.scrollIntoView({
                    behavior: "instant"
                });
                this.container.classList.add("smooth");
            } else{
                actual = this.container.children[direction == 'left' ? 0 : 1];
                this.container.appendChild(el);
            } 

            this.observer.observe(actual);
        }, 100);
        
    }

    _entryAction(el, entry, observer) {
        if (this._isSwipe(entry)) this._swipeAction(entry, observer);
    }

    constructor(swipeContainer) {
        this.container = swipeContainer;
        const options = {
            root: swipeContainer,
            rootMargin: "100%",
            threshold: [0, 1]
        };
        const callback = entries => entries.forEach(this._entryAction.bind(this, ...arguments))
        this.observer = new IntersectionObserver(callback, options);
        this.observer.observe(swipeContainer.children[1]);
    }
}