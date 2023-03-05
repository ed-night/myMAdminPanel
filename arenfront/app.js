const burger = document.querySelector('.burger-menu');
const burgerMenu = document.querySelector('.down');
const burgerCont = document.querySelector('.burger-cont');
const app = document.querySelector('.app')
let k = 0;

burger.addEventListener('click',(event) =>{
  console.log(event);
  console.log(event.target);
  burgerCont.classList.toggle('hidden');
  // app.classList.toggle('burger-is-opened');
    // if(k===0){
    //     burgerMenu.style.display = 'block';
    //     k++
    // }  else{
    //     burgerMenu.style.display = 'none';
    //     k--;
    // }    
})


const div1 = document.querySelector('.right-arrow');
console.log(div1);
const div3 = document.querySelector('.left-arrow');
const div2 = document.querySelector('.carousel');
console.log(div2);
let x = 0;

div1.addEventListener('click', (event) => { 
  if (x > -2400) {
    x-=1200     
  } else{
    x = 0
  }
  div2.style.transform = `translateX(${x}px)`;
});
div3.addEventListener('click', (event) => {
  if (x < 0) {
    x+=1200    
  } else{
    x = -2400
  }
  div2.style.transform = `translateX(${x}px)` 
});

