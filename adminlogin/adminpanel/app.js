const add = document.querySelector('.addbtn');
const popup = document.querySelector('.popup');
const exit = document.querySelector('.exit');
const edit = document.querySelector('.edit');

const arr = [add, exit, edit];
arr.forEach(operation => {
    operation.addEventListener('click', (e) => {
        popup.classList.toggle('popup2');
    });
});

const getFormData = (form) => {
	let ob = {};
	let data = new FormData(form);
	for (let [key, value] of data.entries()) {
		ob[key] = value;
	}
	return ob;
}

const sendPostRequest = async (url, data) => {
	return await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

const sendGetRequest = async (url) => {
    return await fetch(url);
}

const hzor = document.querySelector('.hzor');
hzor.addEventListener('click', async () => {
    let obj = await sendPostRequest('http://localhost:3000/initializeDatabase', {});
    let res = await obj.json();
    console.log(res);
});