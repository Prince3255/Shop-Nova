let mm = gsap.matchMedia();

function loadAnimation() {
    var all1 = gsap.timeline()
all1.from('#root',{
    opacity: 0,
    duration: 0.3,
    delay: 0.2
})
all1.from('#root',{
    transform: "scaleX(0.7) scaleY(0) translateY(90%)",
    duration: 2,
    ease: "expo.out"
})
}




loadAnimation()


const next = document.querySelector('.next')
const prev = document.querySelector('.prev')
const item = document.querySelectorAll('.item')
const list = document.querySelector('.list')
const carousel = document.querySelector('.carousel')

next.onclick = function() {
    showSlider('next')
}

prev.onclick = function() {
    showSlider('prev')
}

function showSlider(type) {
    let sliderShow = document.querySelectorAll('.carousel .list .item')
    if (type === 'next') {
        list.appendChild(sliderShow[0])
        carousel.classList.add('next')
    }
    else {
        list.prepend(sliderShow[sliderShow.length - 1])
        carousel.classList.add('prev')
    }
}