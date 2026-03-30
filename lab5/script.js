const userNameInput = document.getElementById("userName");
const showBtn = document.getElementById("showBtn");
const clearBtn = document.getElementById("clearBtn");
const result = document.getElementById("result");

function showGreeting() {
    const userName = userNameInput.value.trim();

    if (userName === "") {
        result.textContent = "Будь ласка, введіть своє ім’я.";
        result.style.color = "red";
        return;
    }

    result.innerHTML = `
        Привіт, ${userName}!<br>
        Довжина вашого імені: ${userName.length} символів.
    `;
    result.style.color = "green";
}

function clearData() {
    userNameInput.value = "";
    result.textContent = "Тут з’явиться результат";
    result.style.color = "#222";
}   

showBtn.addEventListener("click", showGreeting);
clearBtn.addEventListener("click", clearData);

userNameInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        showGreeting();
    }
});