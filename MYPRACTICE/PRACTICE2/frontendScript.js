function getData() {
    fetch('/api/data')
        .then(response => response.json())
        .then(data => {
            document.getElementById('output').innerText = data.message;
        })
        .catch(err => console.log(err));
}


document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let message = document.getElementById("message");

    // Dummy credentials
    let correctUsername = "admin";
    let correctPassword = "12345";

    if (username === correctUsername && password === correctPassword) {
        message.style.color = "green";
        message.textContent = "Login Successful!";
    } else {
        message.style.color = "red";
        message.textContent = "Invalid Username or Password!";
    }
});

