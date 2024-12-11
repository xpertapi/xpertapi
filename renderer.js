document.getElementById('sendRequest').addEventListener('click', async () => {
    const method = document.getElementById('method').value;
    const url = document.getElementById('url').value;
    const headersInput = document.getElementById('headers').value;
    const bodyInput = document.getElementById('body').value;

    let headers = {};
    let body = null;

    if (headersInput) {
        try {
            headers = JSON.parse(headersInput);
        } catch (e) {
            alert('Invalid JSON format for headers.');
            return;
        }
    }

    if (bodyInput) {
        try {
            body = JSON.parse(bodyInput);
        } catch (e) {
            alert('Invalid JSON format for body.');
            return;
        }
    }

    const responseOutput = document.getElementById('response-output');
    responseOutput.textContent = 'Loading...';

    try {
        const response = await window.api.makeRequest({ method, url, headers, body });
        responseOutput.textContent = JSON.stringify(response, null, 2);
    } catch (error) {
        responseOutput.textContent = `Error: ${error.message}`;
    }
});

document.querySelectorAll('.tab-button').forEach((tab) => {
    tab.addEventListener('click', () => {
        document.querySelector('.tab-button.active').classList.remove('active');
        tab.classList.add('active');

        document.querySelectorAll('.tab-content').forEach((content) => {
            content.style.display = 'none';
        });

        document.querySelector(`.tab-content.${tab.dataset.tab}`).style.display = 'block';
    });
});
