function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function restart() {
  const options = {
    root: document.querySelector(".container"),
    rootMargin: "100%",
    threshold: [0, 1]
  };

  function isVisible(ele) {
    return (
      ele.clientWidth !== 0 &&
      ele.clientHeight !== 0 &&
      ele.style.opacity !== 0 &&
      ele.style.visibility !== "hidden"
    );
  }

  const callback = function(entries, observer) {
    entries.forEach(function(entry) {
      if (entry.intersectionRatio != 1) {
        let direction;
        if (entry.boundingClientRect.left > 0) direction = "left";
        else direction = "right";
        console.log("paro " + direction);
        observer.unobserve(entry.target);
        //console.log(document.querySelectorAll(".container-page")[1])
        if (direction == "left") {

          container.removeChild(container.children[2]);
          let el = document.createElement("div");
          el.classList.add("container-page");
          el.style.backgroundColor = getRandomColor();
          let actual = container.children[0];
          setTimeout(function() {
            container.insertBefore(el, actual);

            container.classList.remove("smooth");
            actual.scrollIntoView({
              behavior: "instant"
            });

            container.classList.add("smooth");
            observer.observe(actual);
          }, 100);
          
        } else {
            container.removeChild(container.children[0]);
          let el = document.createElement("div");
          el.classList.add("container-page");
          el.style.backgroundColor = getRandomColor();
          let actual = container.children[1];
          setTimeout(function() {
            container.appendChild(el);

           
            observer.observe(actual);
          }, 100);
        }
      }
    });
  };

  const observer = new IntersectionObserver(callback, options);

  const container = document.getElementById("container");
  const selected = document.getElementById("selected");

  observer.observe(document.querySelectorAll(".container-page")[1]);
}
window.addEventListener("DOMContentLoaded", function(e) {
  selected.scrollIntoView({
    behavior: "instant"
  });
  container.classList.add("smooth");
});
restart();
