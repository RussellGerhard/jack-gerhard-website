const form = document.querySelector("form"),
  formResponse = document.getElementById("form-submission-response"),
  formURL =
    "https://0l38s5jdgl.execute-api.us-east-1.amazonaws.com/AmplifyCrossOrigin/JackMailNode16Update";
submitButton = document.getElementById("contact-button");
form.onsubmit = (e) => {
  e.preventDefault();
  let o = {};
  Array.from(form)
    .slice(0, 3)
    .map((e) => (o[e.name] = e.value)),
    console.log("Sending: ", JSON.stringify(o));
  var s = new XMLHttpRequest();
  s.open(form.method, formURL, !0),
    s.setRequestHeader("Accept", "application/json; charset=utf-8"),
    s.setRequestHeader("Content-Type", "application/json; charset=utf-8"),
    s.send(JSON.stringify(o)),
    (s.onloadend = (e) => {
      200 == e.target.status
        ? (form.reset(),
          (formResponse.style.zIndex = "2"),
          (formResponse.innerText = "Message sent!"),
          (formResponse.style.backgroundColor = "#70bb70"),
          (formResponse.style.opacity = 1))
        : ((formResponse.style.zIndex = "2"),
          (formResponse.innerText = "Sorry, please resend!"),
          (formResponse.style.opacity = 1),
          (formResponse.style.backgroundColor = "#d32f2f")),
        setTimeout(() => {
          formResponse.style.opacity = 0;
        }, 3e3),
        setTimeout(() => {
          formResponse.style.zIndex = "-1";
        }, 3500);
    });
};
