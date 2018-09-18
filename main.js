const options = {
    root: document.querySelector('.container'),
    rootMargin: '1px',
    threshold: [0.1, 0.9]
};

const callback = function (entries, observer) {
    entries.forEach(function (entry) {
        console.log(entry);
    });
};

const observer = new IntersectionObserver(callback, options);

const container = document.getElementById('container');
const selected = document.getElementById('selected');

observer.observe(document.querySelectorAll('.container-page')[1]);

window.addEventListener('DOMContentLoaded', function (e) {
    selected.scrollIntoView({
        behavior: "instant"
    })
    container.classList.add('smooth');
})