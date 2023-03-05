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
});

const crTable = document.querySelector('.create-table');
const getFormData = (form) => {
	let ob = {};
	let data = new FormData(form);
	for (let [key, value] of data.entries()) {
		ob[key] = value;
	}
	return ob;
}

const parseJsonResponse = async (response) => {
    return await (await response).json();
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

// const formPlatform = document.querySelector('.platform');
// let obj1 = {};
// formPlatform.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     obj1 = getFormData(formPlatform);
//     console.log(parseJsonResponse(sendPostRequest('http://localhost:3000/addPlatform', obj1)));
// });
crTable.addEventListener('click', async () => {
    let obj = await sendPostRequest('http://localhost:3000/createOSTable', {});
    let res = await obj.json();
    console.log(res);
    obj = await sendPostRequest('http://localhost:3000/createPlatformsTable', {});
    res = await obj.json();
    console.log(res);
    obj = await sendPostRequest('http://localhost:3000/createSmartphonesTable', {});
    res = await obj.json();
    console.log(res);
    obj = await sendPostRequest('http://localhost:3000/createColorsTable', {});
    res = await obj.json();
    console.log(res);
});