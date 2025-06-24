import { gsap } from "gsap/dist/gsap";

import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
import { SplitText } from "gsap/dist/SplitText";

gsap.registerPlugin(ScrollTrigger,ScrollSmoother,ScrollToPlugin,SplitText);

function HeroAnimation() {
    gsap.set('.splash-screen-wrapper > li', {yPercent: 100})
    gsap.set('.sticky-header', {y: -90})

    const tl = gsap.timeline()
        .from('.splash-screen-wrapper > li', {
            yPercent: 0,
            duration: 2,
            stagger: {
                each: 0.2,
                ease: 'power3.inOut',
                from: 'random'
            }
        })
        .to('.sticky-header', {
            y: 0,
        })
        .to('.ico-star', {}, '<')
}
function MainTextAnimation(){}
function rotationAnimation(){

}




function HeroAnimation(){

}



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




function init(){
    HeroAnimation()
    MainTextAnimation()
    naviAnimation()

}


document.addEventListener('DOMContentLoaded', () => {

})








