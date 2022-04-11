const form = document.querySelector('form');
const formResponse = document.getElementById('form-submission-response');
const formURL = 'https://0l38s5jdgl.execute-api.us-east-1.amazonaws.com/AmplifyCrossOrigin/contactForm';
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
            formResponse.style.backgroundColor = '#70bb70';
            formResponse.style.opacity = 1;
            form.reset();
        } else { // Error
            formResponse.style.opacity = 1;
            formResponse.style.backgroundColor = '#d32f2f';
        }

        // 2 second wait to reset styles
        setTimeout(() => {
            formResponse.style.opacity = 0;
            console.log('hello');
        }, 3000);
    }

}