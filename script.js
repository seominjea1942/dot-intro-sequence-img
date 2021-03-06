const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");
const anim_background = document.querySelector('.anim-background')
const notf = document.querySelector('.notification')
const notf_left = document.querySelector('.notification.fixed-left')
const notf_right = document.querySelector('.notification.fixed-right')
let lastScrollTop = 0;
let sv=0
const scrollDirection =()=>{
  // scroll direction detection
  var st = document.documentElement.scrollTop;
  
  if (st > lastScrollTop){
      lastScrollTop = st <= 0 ? 0 : st;
      return 'down'
  } else {
      lastScrollTop = st <= 0 ? 0 : st;
      return 'up'
  }  
}
//notf showup
window.addEventListener('scroll', () => { 
  const dScroll = document.documentElement.scrollTop
  let leftOpacity = parseFloat(notf_left.style.opacity)
  let rightOpacity = parseFloat(notf_right.style.opacity)

  //Notification location based on screen size
  if(window.innerWidth>768){
    notf_left.style.left = (50-(window.innerWidth/35)) +'%'
    notf_right.style.right = (55-(window.innerWidth/35) ) +'%'
  }else if (window.innerWidth>=768){
    notf_left.style.left = 1 +'%'
    notf_right.style.right = 1 +'%'
  } else if (window.innerWidth<400){
    notf_left.style.width = '300px'
    notf_right.style.width = '300px'
    notf_right.style.top = '75vh'
    notf_left.style.left = 1 +'%'
    notf_right.style.right = 1 +'%'
  } 

  console.log(window.innerWidth)
  if(scrollDirection()==="down"){
    if(dScroll>100){
      notf_left.style.opacity = (leftOpacity <1)?leftOpacity += 0.05:leftOpacity=1
    }
    if(dScroll>800){
      
      notf_right.style.opacity = (rightOpacity <1)?rightOpacity += 0.05:rightOpacity=1
    }
  } else{
    if(dScroll<800){
      notf_left.style.opacity = (leftOpacity >0)?leftOpacity -= 0.05:leftOpacity=0

        notf_right.style.opacity = (rightOpacity >0)?rightOpacity -= 0.05:rightOpacity=0
    }
  }
  console.log(notf_left.style.opacity)
})

const frameCount = 202;
const currentFrame = index => (
  `seqImg/darae-intro-animation${index.toString().padStart(4, '0')}.jpg`
)

const preloadImages = () => {
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image()
img.src = currentFrame(1);
canvas.width=1158;
canvas.height=1200;

img.onload=function(){
  context.drawImage(img, canvas.width / 2 - img.width / 2 -100,
    canvas.height / 2 - img.height / 2);
}

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, canvas.width / 2 - img.width / 2 - 100,
    canvas.height / 2 - img.height / 2);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  // const maxScrollTop = html.scrollHeight - window.innerHeight;
  const maxScrollTop = parseInt(getComputedStyle(anim_background).height.slice(0,-2))

  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1))
});

preloadImages()