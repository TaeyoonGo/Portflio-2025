import {gsap} from "gsap/dist/gsap";
import {ScrollSmoother} from "gsap/dist/ScrollSmoother";
import {ScrollTrigger} from "gsap/dist/ScrollTrigger";
import {SplitText} from "gsap/dist/SplitText";
import {ScrollToPlugin} from "gsap/dist/ScrollToPlugin"
import imagesLoaded from "imagesloaded"
import Lottie from "lottie-web";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin);

const tl = gsap.timeline();
const mm = gsap.matchMedia();

let smoother = ScrollSmoother.create({
    smooth: 2,
    effects: true,
    normalizeScroll: true
});


const IntroProgress = () => {
    const items = document.querySelectorAll('.splash-screen .item')
    const itemsArr = gsap.utils.toArray(items)
    gsap.set(itemsArr, {yPercent: 0})
    const animation = gsap.timeline()
    animation
        .to('.progress-box', {autoAlpha: 0, duration: 0.3})
        .to(itemsArr, {
            yPercent: 100,
            duration: 1,
            stagger: {
                ease: 'power3.inOut',
                each: 0.2,
                from: 'center'
            },
        }, '+=0.5')
        .to('.splash-loader-box', {visibility: 'hidden'})
    return animation
}
const IntroText = () => {
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
    animation.textEffect('.section1 h3:first-child')
    animation.textEffect('.section1 h3:last-child', "<")

    return animation
}
const HeaderAni = () => {
    const header = document.querySelector('.sticky-header')
    gsap.set(header, {y: -90})
    const animation = gsap.timeline()
    animation.to(header, {y: 0, ease: "power3.inOut"})
    return animation
}
const ImgStarAni = () => {
    const star = document.querySelector('.img-star')
    gsap.set(star, {opacity: 0})
    const animation = gsap.timeline()

    animation
        .to(star, {opacity: 1})
        .to(star, {
            y: -20,
            ease: "power3.inOut",
            repeat:-1,
            yoyo:true,
        }, "+=0.2")
    return animation
}

const IntroMasterTimeline = () => {
    const MasterAnimation = gsap.timeline()
    MasterAnimation
        .add(IntroProgress())
        .add(IntroText(), "+=0.3")
        .add(ImgStarAni(), '+=1')
        .add(HeaderAni(), '<')
        .add(() => {
            smoother.paused(false)
        })
}

const navigation = () => {
    let navArr = gsap.utils.toArray('.navi-list > li')
    let header = document.querySelector('.sticky-header')


    navArr.forEach((item, index) => {
        const tl = gsap.timeline({paused: true})
            // .to(item.querySelector('span'), {color: '#bbdde0'}, 0)
            .to(item.querySelector('div'), {scaleX: 1, duration: 0.3}, 0)


        item.addEventListener('mouseover', () => tl.play())
        item.addEventListener('mouseleave', () => tl.reverse())
        item.addEventListener('click', () => {

        })
    })


}

const Loading = () => {
    const lottie = Lottie.loadAnimation({
        container: document.querySelector('#lottie'),
        loop: true,
        autoplay: true,
        path: '/lottie/loading.json'
    });
    const imgAll = gsap.utils.toArray('img')
    const updateProgress = (instance) => {
        let numberPercent = instance.progressedCount / imgAll.length
        const loaderText = document.querySelector('.loader-text')
        loaderText.textContent = `${Math.round(numberPercent * 100)}%`
        if ((numberPercent) === 1) {
            lottie.pause()
        }
    }
    imagesLoaded(imgAll)
        .on('progress', updateProgress)
        .on('always', IntroMasterTimeline)
}

const mousePoint = () => {
    const cursor = document.querySelector('#cursor');
    const body = document.querySelector('body')
    const visibleArr = gsap.utils.toArray('.visible-cursor-show');

    let xTo = gsap.quickTo(cursor, "x", {duration: 0.4, ease: 'power3'})
    let yTo = gsap.quickTo(cursor, "y", {duration: 0.4, ease: 'power3'})

    body.addEventListener('mousemove', ({clientX: x, clientY: y}) => {
        xTo(x - (cursor.offsetWidth * 0.5))
        yTo(y - (cursor.offsetHeight * 0.5))
    })

    visibleArr.forEach((show, index) => {
        show.addEventListener('mouseenter', () => {
            cursor.style.mixBlendMode = 'normal';
            gsap.to(cursor.querySelector('span'), {autoAlpha: 1})
        })
        show.addEventListener('mouseleave', () => {
            cursor.style.mixBlendMode = 'difference';
            gsap.to(cursor.querySelector('span'), {autoAlpha: 0})
        })
    })


}

const circleAni = () => {

}


function init() {
    Loading();

    mousePoint();
    navigation();

    homeAni();
    abilityAni();
    workAni();
    contactAni();
}


const homeAni = () => {
    const timeline = gsap.timeline()
        .to('.section1 .word-inner',{filter:"blur(10px)",scale:0.4})
        .to('.img-star', {
            rotation: 360,
            scale: 100,
        },0)
        .from('.text-layout-center .title',{y:50,duration:0.8, opacity:0})
        .from('.text-layout-center .desc',{y:50,duration:0.8, opacity:0})
        .from('.text-layout-center a',{y:50,duration:0.8, opacity:0})


    ScrollTrigger.create({
        trigger: '.section1',
        start: 'top top',
        bottom:'+=2000',
        pin: true,
        markers:true,
        pinSpacing: true,
        scrub: 0.5,
        animation: timeline,

    })
}

const abilityAni = () => {
    // 1. 부모 요소를 pin 고정 후 레이아웃 움직이지 못하게
    // 2. 자식 요소에 애니메이션 추가
    // 3. 부모요소 스크롤 시 자식요소 애니메이션 동작하게 작업
    const wordLayout = document.querySelector('.section3 .word-inner')
    const {words} = new SplitText(wordLayout, {type: 'words'})


    const animation = gsap.fromTo(words,
        {
            x: 0,
        },
        {
            x() {
                return -(wordLayout.scrollWidth - innerWidth)
            },
        },
    )

    ScrollTrigger.create({
        trigger: '.section3',
        start: 'top top',
        end: '+=3000',
        pin: true,
        animation,
        scrub: true,
        onUpdate: ({progress, getVelocity}) => {
            let widthToProgress = progress.toFixed(2) * 100
            let scrollToVelocity = getVelocity()

            gsap.to('.section3', {
                background: widthToProgress >= 40 ? '#000' : '#fff',
                color: widthToProgress >= 40 ? '#fff' : '#000'
            })

            gsap.fromTo(words,
                {
                    skewX: `${scrollToVelocity / 100}deg`,
                    duration:1,
                }, {
                    skewX: 0,
                    duration:1,
                })
        },
    })
}

const workAni = () => {
    const imagesArr = gsap.utils.toArray('.img-container .img')
    const listArr = gsap.utils.toArray('.work-text-box li')
    let count = 11;

    gsap.defaults({
        overwrite:'auto'
    })

    gsap.set(imagesArr, {
        zIndex: gsap.utils.distribute({
            base: 0,
            amount: count,
            from: 'end',
        }),
    })



    listArr.forEach((list,index)=>{
        list.addEventListener('mouseover',()=>{
            const exceptMe = `.img-container .img:not(:nth-child(${index + 1}))`
            const me = `.img-container .img:nth-child(${index + 1})`
            const imageAnimation = gsap.timeline()
                .to(exceptMe,{height:0,filter:'brightness(0.4)',onComplete:()=>{
                        gsap.set(me, {zIndex: ++count})
                    }})
                .set(me,{height:'100%'},0)
                .to(me,{filter:'brightness(1)'},0.5)



            const navAnimation = gsap.timeline({
                defaults:{
                    duration:0.2
                }
            })
                .to(listArr,{opacity:0.2})
                .to(listArr,{opacity:1},0)


        })

        list.addEventListener('mouseleave',()=>{

        })
    })









}
const contactAni = () => {
    const footer = document.querySelector('.footer')
    gsap.set(footer, {yPercent: 100})

    // const timeline = gsap.timeline()
    let animation = gsap.to(footer, {yPercent: 0, duration: 0.3, ease: 'power3.inOut'})

    ScrollTrigger.create({
        ease: 'none',
        trigger: '.section5',
        start: '40% center',
        end: 'center center',
        animation: animation,
        toggleActions: "play play reverse reverse"

    })
}


document.addEventListener('DOMContentLoaded', () => {
    document.scrollingElement.scrollTo(0, 0);
    smoother.paused(true);
    init();
})

document.addEventListener('resize', () => {
    init();
})











