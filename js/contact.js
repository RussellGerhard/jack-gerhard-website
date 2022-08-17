const form = document.querySelector("form");
const formResponse = document.getElementById("form-submission-response");
const formURL =
  "https://0l38s5jdgl.execute-api.us-east-1.amazonaws.com/AmplifyCrossOrigin/JackMailNode16Update";
const submitButton = document.getElementById("contact-button");

form.onsubmit = (e) => {
  // Prevent page reload
  e.preventDefault();

  // Capture form data
  let data = {};

  // Create an array of inputs and use each one to populate data dict with kv pairs
  Array.from(form)
    .slice(0, 3)
    .map((input) => (data[input.name] = input.value));
  // Log what we're sending
  console.log("Sending: ", JSON.stringify(data));

  // Create AJAX req
  var xhr = new XMLHttpRequest();
  // Using HTTP post to our AWS API Gateway endpoint, asynchronous = true
  xhr.open(form.method, formURL, true);
  // Tell API we'll only accept JSON, even though we won't be using any data passed in the reponse
  xhr.setRequestHeader("Accept", "application/json; charset=utf-8");
  xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");
  // Send the form data!
  xhr.send(JSON.stringify(data));

  xhr.onloadend = (e) => {
    // Successful form submission
    if (e.target.status == 200) {
      form.reset();
      formResponse.style.zIndex = "2";
      formResponse.innerText = "Message sent!";
      formResponse.style.backgroundColor = "#70bb70";
      formResponse.style.opacity = 1;
    } else {
      // Error
      formResponse.style.zIndex = "2";
      formResponse.innerText = "Sorry, please resend!";
      formResponse.style.opacity = 1;
      formResponse.style.backgroundColor = "#d32f2f";
    }

    // 2s delay to allow user time to read message
    setTimeout(() => {
      formResponse.style.opacity = 0;
    }, 3000);
    // 2.5s delay to give 500ms opacity transition time to end
    setTimeout(() => {
      formResponse.style.zIndex = "-1";
    }, 3500);
  };
};
