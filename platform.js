const sendPostRequest = async (url, data) => {
	return await fetch(url, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	});
}

const platformSel = document.querySelector('#platform');


document.addEventListener('DOMContentLoaded', async () => {
    const jsonAw = await sendPostRequest('http://localhost:3000/getAllPlatforms', {});
    let obj = await jsonAw.json();
    debugger;
    obj.platforms.forEach(platform => {
        platformSel.insertAdjacentHTML('afterbegin', `<option value="${platform.id}">${platform.chipset}</option>`);
    });
});
