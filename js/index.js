$(document).ready(function () {
   $('.slider').slick({
      dots: true,
      infinite: false
   });
});
const placeLeft = document.querySelector('.content-structure__left')
const placeRight = document.querySelector('.content-structure__right')
const checkResize = () => {
   const items = document.querySelectorAll('.list-structure__item')
   if (window.innerWidth > 992 && placeLeft && placeRight) {
      for (let index = 0; index < (items.length / 2); index++) {
         placeLeft.append(items[index])
      }
      for (let index = (items.length / 2); index < items.length; index++) {
         placeRight.append(items[index])
      }
   }
   if (window.innerWidth <= 992 && placeRight) {
      items.forEach(item => {
         placeRight.append(item)
      });
   }
}
checkResize()
window.addEventListener('resize', checkResize)
document.querySelectorAll('button[data-goto]').forEach(button => {
   const block = document.querySelector(`.${button.dataset.goto}`)
   if (block)
      button.addEventListener('click', () => {
         block.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
         });
      })
})
document.querySelectorAll('div[data-tip]').forEach(div => {
   const input = div.querySelector('input')
   input.addEventListener('focus', () => {
      div.classList.add('focus')
   })
   input.addEventListener('blur', () => {
      div.classList.remove('focus')
   })
})
const formatted = (time) => {
   let hours = Math.floor(time / 60 / 60);
   let minutes = Math.floor(time / 60) - (hours * 60);
   let seconds = Math.floor(time % 60);
   let formatted = '00:00'
   formatted = [
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0')
   ].join(':');
   return formatted
}
const timePlace = document.querySelector('.form__time')
const timerFunc = () => {
   const time = (timePlace ? timePlace.querySelector('span') : undefined)
   if (time) {
      let seconds = Number(time.innerHTML.split(':')[0] * 60) + Number(time.innerHTML.split(':')[1])
      seconds -= 1
      time.innerHTML = formatted(seconds)
   }
   if (time.innerHTML === '00:00' && timePlace) {
      clearInterval(timer)
      timePlace.innerHTML = 'Акция закончилась'
   }
}
const timer = setInterval(timerFunc, 1000);