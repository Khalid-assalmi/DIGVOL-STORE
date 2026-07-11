let info = JSON.parse(localStorage.getItem("info")) || [];
let nameInput = document.getElementById("nameInput");
let emailInput = document.getElementById("emailInput");
let phoneInput = document.getElementById("phoneInput");
let addressInput = document.getElementById("addressInput");
let saveButton = document.getElementById("saveBtn");
let deleteButton = document.getElementById("deleteBtn");
let nextButton = document.getElementById("nextAfterEnterData");
let alertBox = document.createElement("div");
alertBox.classList.add("alertBox");
function showAlert(message) {
    alertBox.innerHTML = `
        <h3>${message}</h3>
        <div class="sureBtns">
            <button onclick="alertBox.remove()">حسناً</button>
        </div>
    `;
    document.body.appendChild(alertBox);
}
if (saveButton) {
    saveButton.addEventListener("click", () => {
        info = [];
        let name = nameInput.value.trim();
        let email = emailInput.value.trim();
        let phone = phoneInput.value.trim();
        let address = addressInput.value.trim();
        let userInfo = {
            name: name,
            email: email,
            phone: phone,
            address: address
        };
        if (name === "" || email === "" || phone === "") {
            showAlert("الرجاء تعبئة جميع الحقول المطلوبة!");
        } else {
            showAlert("تم حفظ جميع البيانات بنجاح!");
            info.push(userInfo);
            localStorage.setItem("info", JSON.stringify(info));
        }
    });
    deleteButton.addEventListener("click", () => {
        if (info.length > 0) {
            alert("تم حذف البيانات السابقة بنجاح!");
            info = [];
            localStorage.removeItem("info");
            location.reload();
        }
    });
    loadInfo();
} else if (nextButton) {
    nextButton.addEventListener("click", () => {
        let name = nameInput.value.trim();
        let email = emailInput.value.trim();
        let phone = phoneInput.value.trim();
        let address = addressInput.value.trim();
        let userInfo = {
            name: name,
            email: email,
            phone: phone,
            address: address
        };
        if (name === "" || email === "" || phone === "") {
            showAlert("الرجاء تعبئة جميع الحقول للاستئناف!")
        } else {
            info.push(userInfo);
            localStorage.setItem("info", JSON.stringify(info));
            window.location.href = "payment.html";
        }
    });
}
function loadInfo() {
    if (info.length > 0) {
        let userInfo = info[0];
        nameInput.value = userInfo.name;
        emailInput.value = userInfo.email;
        phoneInput.value = userInfo.phone;
        addressInput.value = userInfo.address;
    }
}
if (info.length > 0 && document.querySelector(".userName")) {
    let userInfo = info[0];
    document.querySelector(".userName").textContent = userInfo.name;
    document.querySelector("#firstLaterContainer").textContent = userInfo.name[0];
    //change the firstLaterContainer background
    let colors = ["#8f00b3", "rgb(2, 136, 2)", "rgb(209, 149, 19)"]
    let index = Math.floor(Math.random() * colors.length);
    document.querySelector("#firstLaterContainer").style.background = colors[index];
} else if (info.length == 0 && document.querySelector(".userName")) {
    document.querySelector(".userInfo").style.border = "none";
    document.querySelector(".userInfo").textContent = "تسجيل الدخول";
}