import React, { useEffect } from 'react'
import gsap from 'gsap'

const SplashScreen = ({ onanimationend }) => {

  useEffect(() => {

    const widthThreshold = 880;

    // Get the current window width
    const currentWidth = window.innerWidth;

    // If the width is greater than the threshold, do not play the animation
    if (currentWidth <= widthThreshold) {
      // onanimationend(); // Call the end function directly if width exceeds threshold
      // return;
    }

    const h1 = document.querySelector('.splashScreen h1');
    const h12 = h1.textContent;

    const h1split = h12.split("");
    let clutter = "";
    h1split.forEach(function(elem) {
      clutter += `<span class="span1">${elem}</span>`;
    });

    h1.innerHTML = clutter;

    var al = gsap.timeline()
    al.fromTo('.splashScreen', {
      scale: 1,
      ease: "power2.inOut",
      delay: 0.8,
      opacity: 1,
    }, {
      scale: 0.2,
      delay: 0.7,
      duration: 1.5,
      opacity: 0.8
    })
    al.from('.splashScreen h1 span', {
      y: 90,
      duration: 1,
      stagger: 0.2,
      opacity: 0.1,
      delay: 0
    });

    const timer = setTimeout(() => {
      onanimationend();
    }, 5000);

    return () => clearTimeout(timer)
  }, [onanimationend]);

  return (
    <div className='splashScreen'>
      <h1>
        ShopNova
      </h1>
    </div>
  )
}

export default SplashScreen;