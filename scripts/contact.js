const form = document.querySelector('form');
const formURL = 'https://0l38s5jdgl.execute-api.us-east-1.amazonaws.com/';
const submitButton = document.getElementById('contact-button');

form.onsubmit = (e) => {
    // Prevent page reload
    e.preventDefault();

    // Capture form data
    let data = {};

    // Create an array of inputs and use each one to populate data dict with kv pairs
    Array.from(form).slice(0, 3).map(input => (data[input.name] = input.value));
    // Log what we're sending
    console.log('Sending: ', JSON.stringify(data));

    // Create AJAX req
    var xhr = new XMLHttpRequest();
    // Using HTTP post to our AWS API Gateway endpoint, asynchronous = true
    xhr.open(form.method, formURL, true);
    // Tell API we'll only accept JSON, even though we won't be using any data passed in the reponse 
    xhr.setRequestHeader('Accept', 'application/json; charset=utf-8');   
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');   
    // Send the form data!
    xhr.send(JSON.stringify(data));

    xhr.onloadend = (e) => {
        // Successful form submission
        if (e.target.status == 200) {
            form.reset();
            submitButton.style.backgroundColor = '#90ee90';
            submitButton.style.color = '#198754';
            submitButton.innerText = 'Message Sent!'
        } else { // Error 
            submitButton.style.backgroundColor = '#ffcccb';
            submitButton.innerText = 'Message Failed. Please Try Again!'
        }

        // 2 second wait to reset styles
        setTimeout(() => {
            submitButton.style.backgroundColor = '#ccc';
            submitButton.style.color = 'rgb(130, 10, 20);';
            submitButton.innerText = 'Send';
        }, 2000);
    }

}