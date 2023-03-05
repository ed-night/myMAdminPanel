const add = document.querySelector('.addbtn');
const popup = document.querySelector('.popup');
const exit = document.querySelector('.exit')

add.addEventListener('click', (e) => {
    popup.classList.toggle('popup2');
})

exit.addEventListener('click', (e) => {
    popup.classList.toggle('popup2');
})