let fontSetting = Number(localStorage.getItem("fontSetting")) || 50;

let fontInp = document.querySelector("#fontSizeInp");
let textBox = document.querySelector(".textBox");
let inpValue = document.querySelector("#inpValue");

function updateFontSizeSettingsUI(value) {
    inpValue.textContent = value;
    fontInp.value = value;
}

function fontSettings(inp) {
    if (inp <= 10) {
        document.documentElement.style.setProperty("--largest-font-size", "23px");
        document.documentElement.style.setProperty("--larger-font-size", "17px");
        document.documentElement.style.setProperty("--large-font-size", "15px");
        document.documentElement.style.setProperty("--middle-font-size", "13px");
        document.documentElement.style.setProperty("--small-font-size", "11px");
        document.documentElement.style.setProperty("--smaller-font-size", "7px");
        document.documentElement.style.setProperty("--smallest-font-size", "5px");
    } else if (inp <= 20) {
        document.documentElement.style.setProperty("--largest-font-size", "25px");
        document.documentElement.style.setProperty("--larger-font-size", "20px");
        document.documentElement.style.setProperty("--large-font-size", "18px");
        document.documentElement.style.setProperty("--middle-font-size", "15px");
        document.documentElement.style.setProperty("--small-font-size", "14px");
        document.documentElement.style.setProperty("--smaller-font-size", "9px");
        document.documentElement.style.setProperty("--smallest-font-size", "7px");
    } else if (inp <= 40) {
        document.documentElement.style.setProperty("--largest-font-size", "27px");
        document.documentElement.style.setProperty("--larger-font-size", "22px");
        document.documentElement.style.setProperty("--large-font-size", "20px");
        document.documentElement.style.setProperty("--middle-font-size", "16px");
        document.documentElement.style.setProperty("--small-font-size", "15px");
        document.documentElement.style.setProperty("--smaller-font-size", "10px");
        document.documentElement.style.setProperty("--smallest-font-size", "8px");
    } else if (inp < 50) {
        document.documentElement.style.setProperty("--largest-font-size", "29px");
        document.documentElement.style.setProperty("--larger-font-size", "23px");
        document.documentElement.style.setProperty("--large-font-size", "21px");
        document.documentElement.style.setProperty("--middle-font-size", "17px");
        document.documentElement.style.setProperty("--small-font-size", "15px");
        document.documentElement.style.setProperty("--smaller-font-size", "11px");
        document.documentElement.style.setProperty("--smallest-font-size", "9px");
    } else if (inp == 50) {
        document.documentElement.style.setProperty("--largest-font-size", "30px");
        document.documentElement.style.setProperty("--larger-font-size", "24px");
        document.documentElement.style.setProperty("--large-font-size", "22px");
        document.documentElement.style.setProperty("--middle-font-size", "18px");
        document.documentElement.style.setProperty("--small-font-size", "16px");
        document.documentElement.style.setProperty("--smaller-font-size", "14px");
        document.documentElement.style.setProperty("--smallest-font-size", "10px");
    } else if (inp <= 60) {
        document.documentElement.style.setProperty("--largest-font-size", "31px");
        document.documentElement.style.setProperty("--larger-font-size", "25px");
        document.documentElement.style.setProperty("--large-font-size", "23px");
        document.documentElement.style.setProperty("--middle-font-size", "19px");
        document.documentElement.style.setProperty("--small-font-size", "17px");
        document.documentElement.style.setProperty("--smaller-font-size", "13px");
        document.documentElement.style.setProperty("--smallest-font-size", "11px");
    } else if (inp <= 80) {
        document.documentElement.style.setProperty("--largest-font-size", "33px");
        document.documentElement.style.setProperty("--larger-font-size", "27px");
        document.documentElement.style.setProperty("--large-font-size", "25px");
        document.documentElement.style.setProperty("--middle-font-size", "21px");
        document.documentElement.style.setProperty("--small-font-size", "19px");
        document.documentElement.style.setProperty("--smaller-font-size", "15px");
        document.documentElement.style.setProperty("--smallest-font-size", "13px");
    } else if (inp == 100) {
        document.documentElement.style.setProperty("--largest-font-size", "37px");
        document.documentElement.style.setProperty("--larger-font-size", "31px");
        document.documentElement.style.setProperty("--large-font-size", "29px");
        document.documentElement.style.setProperty("--middle-font-size", "25px");
        document.documentElement.style.setProperty("--small-font-size", "23px");
        document.documentElement.style.setProperty("--smaller-font-size", "19px");
        document.documentElement.style.setProperty("--smallest-font-size", "17px");
    }
}

if (fontInp) {
    fontInp.oninput = () => {
        fontSettings(fontInp.value);
        updateFontSizeSettingsUI(fontInp.value);
        localStorage.setItem("fontSetting", fontInp.value);
    }
}

let UImode = localStorage.getItem("UImode") || "main";

function UIsetting(mode, element) {
    if (element) {
        document.querySelectorAll(".customizeUICard.main").forEach(i => {
            i.classList.remove("main");
        })
        element.classList.add("main");
    };
    if (mode == "main") {
        document.documentElement.style.removeProperty("--main");
        document.documentElement.style.removeProperty("--white");
        document.documentElement.style.removeProperty("--settingCard-hover");
        document.documentElement.style.removeProperty("--search-button-hover");
    } else if (mode == "secondary") {
        document.documentElement.style.setProperty("--main", "#FFF");
        document.documentElement.style.setProperty("--white", "#1d1f1c");
        document.documentElement.style.setProperty("--settingCard-hover", "#1a1a1a");
        document.documentElement.style.setProperty("--search-button-hover", "#dddddd")
    }
    localStorage.setItem("UImode", mode);
}

function loadSettings() {
    fontSettings(fontSetting);
    if (inpValue) updateFontSizeSettingsUI(fontSetting);
    UIsetting(UImode, document.querySelector(`#${UImode}UI`));
}

window.onload = () => loadSettings();