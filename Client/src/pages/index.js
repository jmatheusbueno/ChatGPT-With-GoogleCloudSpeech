function loadData() {
    this.createListenerKeyUpEnter();
}

function createListenerKeyUpEnter() {
    const inputElement = document.getElementById('input-text');
    inputElement.addEventListener('keyup', function(e) {
        if (e.key === 'Enter' && this.value !== '') {
            postGPT(this.value);
            createMessageElement(this.value, true);
            inputElement.value = '';
        }
    });
}

function createMessageElement(message, isUserMessage) {
    let containerElement = document.getElementById('message-area');

    divMessage = elementFactory('div');
    divMessage.classList.add('message');
    if (isUserMessage) 
        divMessage.classList.add('user-message');
    else 
        divMessage.classList.add('gpt-message');

        
    divMessage.innerHTML = `<span>${message}</span>`;
        
    divMessage.style.height = setMessageElementHeight(message);
    containerElement.appendChild(divMessage);
}

function elementFactory(element) {
    return document.createElement(element)
}

function setMessageElementHeight (message) {
    let width = Math.round(window.innerWidth * 0.01);
    let t = Math.ceil(message.length / (12*width)) * 5
    return t + 'vh';
}

function getApi() {
    fetch('http://localhost:5000/')
        .then(data => {
            return data.json();
        })
        .then(res => {
            console.log(res);
        });
}

function postGPT(userMessage) {
    const objMessage = {
        message: userMessage,
    }
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(objMessage),
    };

    fetch('http://localhost:5000/gpt/create-completion', options)
        .then(response => response.json())
        .then(json => { 
            console.log('json', json)
            createMessageElement(json.data, false);
        })
        .catch(e => console.log('e', e));
}