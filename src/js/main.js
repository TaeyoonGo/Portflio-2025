import {gsap} from "gsap/dist/gsap";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {SplitText} from "gsap/dist/SplitText";
import imagesLoaded from "imagesloaded"
import {renderLayout} from "./setting.js";
import {setSmoothScroll,setMixedScroll,markers} from "./scroll.js";
import Lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger, SplitText);

const tl = gsap.timeline();
const mm = gsap.matchMedia();
const noScroll = document.querySelector('#no-scroll')

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
    tl.to(header, {y: 0,duration:0.3,ease:"power3.inOut",onComplete: () => {
            gsap.to(noScroll,{display:'none'})
        }})
    return tl
}
function starAnimation() {
    const star = document.querySelector('.img-star')
    gsap.set(star,{opacity:0})

    tl
        .to(star,{opacity:1})
        .to(star, {
            y: -20,
            ease:"power3.inOut",
            repeat: -1,
            yoyo: true,
        },'+=0.1')

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

function scrollAni(){
    const timeline = gsap.timeline()
    timeline.to('.img-star',{rotation:360,scale:30})
        .to('.about',{backgroundColor:'#Fff'})

    ScrollTrigger.create({
        trigger:'.home',
        start:'top top',
        end:innerHeight,
        animation:tl,
        pin:false,
        markers:false,
        scrub:true,
    })
}






document.addEventListener('DOMContentLoaded', () => {
    renderLayout();
    setSmoothScroll();
    setMixedScroll();
    init();
    scrollAni();






    // markers();
})







