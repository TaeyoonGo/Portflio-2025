import {gsap} from "gsap/dist/gsap";
import {ScrollSmoother} from "gsap/dist/ScrollSmoother";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {SplitText} from "gsap/dist/SplitText";
import {ScrollToPlugin} from "gsap/dist/ScrollToPlugin"
import imagesLoaded from "imagesloaded"
import Lottie from "lottie-web";
import {setLayout} from "./settings.js";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother , SplitText,ScrollToPlugin);


const tl = gsap.timeline();
const mm = gsap.matchMedia();
const noScroll = document.querySelector('#no-scroll')
let smoother = ScrollSmoother.create({
    smooth: 2,
    effects: true,
    normalizeScroll: true
});







const IntroProgress = () => {
    // 3. image Loader 100% 진행 완료 시 Lottie Paused & text 제거 ✅
    // 4. 스플레쉬 이미지 재생 ✅
    const items = document.querySelectorAll('.splash-screen .item')
    const splashItems = gsap.utils.toArray(items)
    gsap.set(splashItems, {yPercent: 0})
    const IntroProgress = gsap.timeline()
    IntroProgress
        .to('.progress-box', {display: 'none'})
        .to(noScroll, {
            backgroundColor: 'transparent'
        })
        .to(splashItems, {
            yPercent: 100,
            duration: 1,
            stagger: {
                ease: 'power3.inOut',
                each: 0.2,
                from: 'center'
            },
        }, '<')

    return IntroProgress
}
const IntroText =  ()=> {
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

    animation.textEffect('.section01 h3:first-child')
    animation.textEffect('.section01 h3:last-child', "<")
}
const HeaderAni = () => {
    const header = document.querySelector('.sticky-header')
    tl.to(header, {
            y: 0,  ease: "power3.inOut",
        })
}
const ImgStarAni = () => {
    const star = document.querySelector('.img-star')
    gsap.set(star, {opacity: 0})
    tl
        .to(star, {opacity: 1})
        .to(star, {
            y: -20,
            ease: "power3.inOut",
            repeat: -1,
            yoyo: true,
        })
}
const IntroMasterTimeline = () =>  {
    const MasterAnimation = gsap.timeline()

    MasterAnimation
        .add(IntroProgress)
        .add(IntroText)
        .add(ImgStarAni , '<')
        .add(HeaderAni,'<')
        .to('body',{height:0})
}
function init() {
    // 1. 화면 초기 세팅 및 Gsap AutoAlpha 셋팅 ✅
    // 2. Text & Lottie 0% ~ 100% Progress 진행 ✅
    // 3. 다음 애니메이션으로 동작하기 위한 체크 진행 ✅
    const lottie = Lottie.loadAnimation({
        container: document.querySelector('#lottie'),
        loop: true,
        autoplay: true,
        path: '/lottie/loading.json'
    });
    const img = gsap.utils.toArray('img')
    tl
        .to('.splash-loader-box', {autoAlpha: 1})
    const updateProgress = (instance) => {
        let numberPercent = instance.progressedCount / img.length
        const loaderText = document.querySelector('.loader-text')
        loaderText.textContent = `${Math.round(numberPercent * 100)}%`
        if ((numberPercent) === 1) {
            lottie.pause()
        }
    }

    imagesLoaded(img).on('progress', updateProgress)
        .on('always', IntroMasterTimeline)
}



function scrollImg(){
    const nav = document.querySelector('.sticky-header')

    // const timeline = gsap.timeline()
    //     .to('.img-star',{
    //         rotation:360,
    //         scale:50,
    //     })
    // ScrollTrigger.create({
    //     trigger:'.section01',
    //     start:'top top',
    //     end:innerHeight + nav.offsetHeight,
    //     scrub:true,
    //     pin:true,
    //     pinSpacing:true,
    //     animation:timeline,
    // })
}


function horizontalTextScrolling(){
    const {words} = new SplitText('.section03 h3', {type: 'words'})

    // ScrollTrigger.create({
    //     trigger:'.section03 > h3',
    //     start:'top center',
    //     end:'bottom center',
    //     animation: gsap.to(words,{x:-innerWidth}),
    //     pin:true,
    //     pinSpacing:false,
    //     markers:true,
    //     scrub:true,
    // })

}

horizontalTextScrolling()
const navigation = () => {
    let navList = gsap.utils.toArray('.navi-list > li')
    let nav = document.querySelector('.sticky-header')

    gsap.utils.toArray('.section').forEach((section,index)=>{
        // ScrollTrigger.create({
        //     trigger:section,
        //     start:()=> `top ${nav.offsetHeight}px`,
        //     end:()=> `bottom ${nav.offsetHeight}px`,
        //     toggleActions : 'restart none none reverse'
        // })
    })

    navList.forEach((item, index) => {
        const tl = gsap.timeline({paused: true})
            .to(item.querySelector('span'), {color: '#bbdde0'}, 0)
            .to(item.querySelector('div'), {scaleX: 1, duration: 0.3}, 0)

        item.addEventListener('mouseover', () => tl.play())
        item.addEventListener('mouseleave', () => tl.reverse())

    })
}


document.addEventListener('DOMContentLoaded', () => {
    setLayout();
    init();
    // navigation();
    // scrollImg();
})











