var apikey = document.getElementById('apikey');
var customerName = document.getElementById('name');
var email = document.getElementById('email');
var msg = document.getElementById('msg');
var subject = document.getElementById('subject');
var submit = document.getElementById('submit');
var formBox = document.getElementById('form-box');
var confirmField = document.getElementById('confirmField');
var failureMessage = document.getElementById('failureMessage');

submit.addEventListener('click', function (e) {
    e.preventDefault();

    if (customerName.value === '') {
        return failureMessage.innerHTML = "Bitte tragen Sie Ihren Namen ein.";
    }
    if (email.value === '') {
        return failureMessage.innerHTML = "Bitte tragen Sie Ihre E-Mail-Adresse ein.";
    }
    if (msg.value === '') {
        return failureMessage.innerHTML = "Bitte geben Sie eine Nachricht ein.";
    }
    if (subject.value === '') {
        subject.value = "Neue Kontaktanfrage von Ihrer Internetseite.";
    }


    if (confirmField.checked) {
        var xhr = new XMLHttpRequest();
        var url = "https://YOURSERVERURL";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");

        var data = JSON.stringify({
            "apiKey": apikey.value,
            "name": customerName.value,
            "email": email.value,
            "subject": subject.value,
            "msg": msg.value,
        });
        xhr.send(data);

        formBox.innerHTML = "Nachricht wurde gesendet.";


    }



})