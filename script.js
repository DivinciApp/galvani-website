  // Function to check if the element is in the viewport
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
  
  // Function to run on scroll
  function runOnScroll() {
    const elements = document.querySelectorAll('.emoji-people');
    elements.forEach((el) => {
      if (isInViewport(el) && !el.classList.contains('animate')) {
        el.classList.add('animate');
      }
    });
  }

async function emojiTransitions(emojiElement, displayTime){
    const femaleEmojis = ["👩🏻‍⚕️", "👩🏼‍⚕️", "👩🏽‍⚕️", "👩🏾‍⚕️", "👩🏿‍⚕️"];
    const maleEmojis = ["👨🏻‍⚕️", "👨🏼‍⚕️", "👨🏽‍⚕️", "👨🏾‍⚕️", "👨🏿‍⚕️"];
    const originalEmojis = [...femaleEmojis, ...maleEmojis];
    var activeEmojis = [];

    while(true){
      if(activeEmojis.length === 0){
        activeEmojis = [...originalEmojis];
      }
      
      const fadeOutPromise = watchForEvent(emojiElement, "animationend");
      emojiElement.classList.add("emoji-fade-out-class");
      await fadeOutPromise;
      emojiElement.classList.remove("emoji-fade-out-class");
      emojiElement.style.opacity = 0;

      const nextEmojiIndex = Math.floor(Math.random() * activeEmojis.length);
      const nextEmoji = activeEmojis.splice(nextEmojiIndex, 1)[0];
      emojiElement.textContent = nextEmoji;

      const fadeIntPromise = watchForEvent(emojiElement, "animationend");
      emojiElement.classList.add("emoji-fade-in-class");
      await fadeIntPromise;
      emojiElement.classList.remove("emoji-fade-in-class");
      emojiElement.style.opacity = 1;

      await delay(displayTime);
    }
}

function delay(time){
  return new Promise((res)=>{
    setTimeout(res, time);
  });
}

function watchForEvent(eventTarget, event){
var l;
return new Promise((res)=>{
  eventTarget.addEventListener(event, l = (e)=>{
    eventTarget.removeEventListener(event, l);
    res(e);
  });
});
}

  emojiTransitions(
    document.querySelector('#doctorEmoji'), 
    // 1000, // Time for fade transition
    2000  // Time to display each emoji
  );

  
  // Listen for scroll events
  window.addEventListener('scroll', runOnScroll);