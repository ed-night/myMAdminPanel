const add = document.querySelector('.addbtn');
const popup = document.querySelector('.popup');
const exit = document.querySelector('.exit');
const edit = document.querySelector('.edit')

add.addEventListener('click', (e) => {
    popup.classList.toggle('popup2');
})

edit.addEventListener('click', (e) => {
    popup.classList.toggle('popup2');
})


exit.addEventListener('click', (e) => {
    popup.classList.toggle('popup2');
})