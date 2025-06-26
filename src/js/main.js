import {gsap} from "gsap/dist/gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {SplitText} from "gsap/dist/SplitText";
import {renderLayout, setSmoothScroll} from "./setting.js";
import Lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger, SplitText);

Lottie.loadAnimation({
    container: document.querySelector('#lottie'), // the dom element that will contain the animation
    loop: true,
    autoplay: true,
    path: '/lottie/loading.json' // the path to the animation json
});


const tl = gsap.timeline();
const mm = gsap.matchMedia();


function MasterHeroAnimation() {

}






function loaderAnimation() {







    const splash = gsap.utils.toArray('.splash-screen .item');
    gsap.set(splash, {yPercent: 100})

    tl.from(splash, {
        yPercent: 0,
        duration: 1,
        stagger: {
            each: 0.2,
            ease: 'power3.inOut',
            from:'center'

        },
        onComplete:()=>{
            gsap.set('.splash-loader-box', {display:'none'})
        }
    })
}

// loaderAnimation()


function textAnimation() {
    gsap.registerEffect({
        name: 'textEffect',
        extendTimeline: true,
        defaults: {
            y: -50,
        },
        effect: (target, config) => {
            const {chars} = new SplitText(target, {type: 'chars'})
            tl.from(chars, {y: config.y, opacity: 0, stagger: 0.05})
            return tl;
        }
    })
    const animation = gsap.timeline()

    animation.textEffect('.word-inner > h3:first-child')
    animation.textEffect('.word-inner > h3:last-child', "<")

    return animation
}

function headerAnimation() {
    const header = document.querySelector('.sticky-header')
    tl.to(header, {y: 0})
    return tl
}

function starAnimation() {
    tl.to('.img-star', {
        y: -20,
        repeat: -1,
        yoyo: true,
    })

    return tl

}


// splashAnimation()
// textAnimation()
// headerAnimation()
// starAnimation()


MasterHeroAnimation()


function naviAnimation() {
    let navList = gsap.utils.toArray('.navi-list > li')
    navList.forEach((item) => {
        const tl = gsap.timeline({paused: true})
            .to(item, {
                y: 30
            })


        item.addEventListener('mouseover', () => tl.play())
        item.addEventListener('mouseleave', () => tl.reverse())
    })
}


document.addEventListener('DOMContentLoaded', () => {
    renderLayout();
    setSmoothScroll();
})







