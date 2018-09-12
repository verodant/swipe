const options = {
    root: document.querySelector('.container'),
    rootMargin: '1px',
    threshold: [0.1,0.9]
};

const callback = function (entries, observer) {
    console.group("CB");

    entries.forEach(function (entry) {

        console.log(observer);
        console.log(entry);
        
    });

    console.groupEnd("CB");
};

const observer = new IntersectionObserver(callback, options);

observer.observe(document.querySelectorAll('.container-page')[1]);