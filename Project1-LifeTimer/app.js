let check = 0;
let dateOfBirth;
const settingIcon = document.getElementById("settingIcon"); //cliking on setting icon
const settingContent = document.getElementById("settingContent");
const initialText = document.getElementById("initialText"); //Initial text
const finalDOBText = document.getElementById("finalDOBText"); //After clicking button

// Accessing year,month,day,hour,minute,second
const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

let dobInput = document.getElementById("dobInput");
let dobButton = document.getElementById("dobButton");

const toggleDOBSelector = () => {
    if (check == 0) {
        settingContent.classList.add("hide");
    } else {
        settingContent.classList.remove("hide");
    }
    check = !check;
};

const twodigitNumber = (number) => {
    return number > 9 ? number : `0${number}`;
};

const updateAge = () => {
    const currentDate = new Date(); //current date function new Date();
    const dateDiff = currentDate - dateOfBirth;
    const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
    const month = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365)) % 12;
    const day = Math.floor(dateDiff / (1000 * 60 * 60 * 24)) % 30;
    const hour = Math.floor(dateDiff / (1000 * 60 * 60)) % 24;
    const minute = Math.floor(dateDiff / (1000 * 60)) % 60;
    const second = Math.floor(dateDiff / 1000) % 60;

    yearEl.innerHTML = twodigitNumber(year);
    monthEl.innerHTML = twodigitNumber(month);
    dayEl.innerHTML = twodigitNumber(day);
    hourEl.innerHTML = twodigitNumber(hour);
    minuteEl.innerHTML = twodigitNumber(minute);
    secondEl.innerHTML = twodigitNumber(second);
};

const localStorageGetter = () => {
    const year = localStorage.getItem("year");
    const month = localStorage.getItem("month");
    const date = localStorage.getItem("date");

    if (year && month && date) {
        dateOfBirth = new Date(year, month, date);
    }
    updateAge();
};

const handleToggler = () => {
    updateAge();
    if (dateOfBirth) {
        initialText.classList.add("hide");
        finalDOBText.classList.remove("hide");
    } else {
        finalDOBText.classList.add("hide");
        initialText.classList.remove("hide");
    }
};

const setDOB = () => {
    const dateString = dobInput.value;
    dateOfBirth = dateString ? new Date(dateString) : null;

    if (dateOfBirth) {
        localStorage.setItem("year", dateOfBirth.getFullYear);
        localStorage.setItem("month", dateOfBirth.getMonth);
        localStorage.setItem("date", dateOfBirth.getDate);

    }
    setInterval(() => {
        updateAge(); //to update the time at each interval
    }, 1000);
    handleToggler();
};

handleToggler();
localStorageGetter();
settingIcon.addEventListener("click", toggleDOBSelector);

dobButton.addEventListener("click", setDOB);
