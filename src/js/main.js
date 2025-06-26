import {gsap} from "gsap/dist/gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {SplitText} from "gsap/dist/SplitText";
import imagesLoaded from "imagesloaded"
import Lottie from "lottie-web";
import Scrollbar from "smooth-scrollbar"
import {setLayout ,setSmoothsScrollbar} from "./settings.js";

const container = document.querySelector('#container');
const options = {
    damping: 0.1,
    alwaysShowTracks: true,
}
const scrollbar = Scrollbar.init(container, {
    ...options
});



gsap.registerPlugin(ScrollTrigger, SplitText);

const tl = gsap.timeline();
const mm = gsap.matchMedia();
const noScroll = document.querySelector('#no-scroll')

function navigation() {
    let navList = gsap.utils.toArray('.navi-list > li')
    let nav = document.querySelector('.sticky-header')

    gsap.utils.toArray('.section').forEach((section,index)=>{
        ScrollTrigger.create({
            trigger:section,
            start:()=> `top ${nav.offsetHeight}px`,
            end:()=> `bottom ${nav.offsetHeight}px`,
            toggleActions : 'restart none none reverse'
        })
    })





    navList.forEach((item, index) => {
        const tl = gsap.timeline({paused: true})
            .to(item.querySelector('span'), {color: '#bbdde0'}, 0)
            .to(item.querySelector('div'), {scaleX: 1, duration: 0.3}, 0)

        item.addEventListener('mouseover', () => tl.play())
        item.addEventListener('mouseleave', () => tl.reverse())

        item.addEventListener('click',() =>{
            let scrollTop = ScrollTrigger.getAll()[index].start + + nav.offsetHeight
            scrollbar.scrollTo(0,scrollTop,600)
        })
    })
}

function showLoader() {
    // 3. image Loader 100% 진행 완료 시 Lottie Paused & text 제거 ✅
    // 4. 스플레쉬 이미지 재생 ✅
    const items = document.querySelectorAll('.splash-screen .item')
    const splashItems = gsap.utils.toArray(items)

    gsap.set(splashItems, {yPercent: 0})

    tl
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
}

function headerAnimation() {
    // HeroAnimation 종료 NoScroll 제거 ✅
    const header = document.querySelector('.sticky-header')
    tl
        .to(header, {
        y: 0, duration: 0.3, ease: "power3.inOut", onComplete: () => {
            gsap.to(noScroll, {display: 'none'})
        }
    })

    return tl



}

function starAnimation() {
    const star = document.querySelector('.img-star')
    gsap.set(star, {opacity: 0})

    tl
        .to(star, {opacity: 1})
        .to(star, {
            y: -20,
            ease: "power3.inOut",
            repeat: -1,
            yoyo: true,
        }, '+=0.1')

    return tl

}

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
}

function HeroAnimation() {
    const MasterAnimation = gsap.timeline()
    MasterAnimation
        .add(showLoader)
        .add(textAnimation)
        .add(starAnimation, '<')
        .add(headerAnimation, '<')
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
        .on('always', HeroAnimation)
}

function scrollImg(){
    const timeline = gsap.timeline()
        .to('.img-star',{
            rotation:360,
            scale:100,
        })
        .to('.section02',{
            backgroundColor:"#fff"
        })
        .to('.img-star',{
            autoAlpha:0
        })

    ScrollTrigger.create({
        trigger:'.home',
        start:'top top',
        end:'+=2000',
        scrub:true,
        markers:true,
        animation:timeline
    })
}

const markers = () => {
    if (document.querySelector('.gsap-marker-scroller-start')) {
        const markers = gsap.utils.toArray('[class *= "gsap-marker"]');
        scrollbar.addListener(({ offset }) => {
            gsap.set(markers, { marginTop: -offset.y });
        });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    setSmoothsScrollbar();
    setLayout();
    init();
    navigation();
    scrollImg();

    markers();

})










