const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const btnSignUp = document.getElementById("btnSignUp");
const divInvalid = document.querySelector(".divInvalid");
const divValid = document.querySelector(".divValid");
const divexists = document.querySelector(".divexists");
const btnSignIn = document.getElementById('btnSignIn');
const goToSignUp = document.querySelector('#goToSignUp');
const goToSignIn = document.querySelector('#goToSignIn');
const secSignUp = document.querySelector('#secSignUp');
const secSignIn = document.getElementById('secSignIn');
const emailSignIn = document.getElementById('emailSignIn');
const passwordSignIn = document.getElementById('passwordSignIn');
const siteNameErrorDiv = document.querySelector('.siteNameErrorDiv');
const siteEmailErrorDiv = document.querySelector('.siteEmailErrorDiv');
const longLength = document.querySelector('.longLength');
const uppercasechar = document.querySelector('.uppercasechar');
const lowercasechar = document.querySelector('.lowercasechar');
const digitchar = document.querySelector('.digitchar');
const specialchar = document.querySelector('.specialchar');
const whiteSpace = document.querySelector('.whiteSpace');
const ppassValid = document.querySelector('.p-passValid');
const divValidSignIn = document.querySelector('.divValidSignIn');
const inner = document.querySelector('.inner');
const wrapper = document.querySelector('.wrapper');


let allUsers = [];
let nameInner;


if (localStorage.getItem('inforData') != null) {
    allUsers = JSON.parse(localStorage.getItem('inforData'));
}
if (localStorage.getItem('checkHome')!= null) {
    checkUser = JSON.parse(localStorage.getItem('checkHome'));
}
if (btnSignUp) {

    btnSignUp.addEventListener('click', function () {
        if (nameInput.value !== "" && emailInput.value !== "" & passwordInput.value !== "") {
            var info = {
                nameUser: nameInput.value,
                emailUser: emailInput.value,
                passUser: passwordInput.value
            }
            if (allUsers.some((v) => { return v.emailUser == emailInput.value })) {
                divexists.classList.remove("d-none");
                divValid.classList.add("d-none");
            }
            else {
                if (validateName() && validateEmail() && validatePass()) {
                    allUsers.push(info);
                    localStorage.setItem('inforData', JSON.stringify(allUsers));
                    clearForm();
                    setTimeout(() => {
                        wrapper.classList.remove('animtionn');
                    }, 4000);
                    wrapper.classList.add('animtionn');
                    divInvalid.classList.add("d-none");
                    divValid.classList.remove("d-none");
                    divexists.classList.add("d-none");
                    nameInput.classList.remove('is-valid');
                    emailInput.classList.remove('is-valid');
                    passwordInput.classList.remove('is-valid');
                }
            }
        }
        else {
            divInvalid.classList.remove("d-none");
            divValid.classList.add("d-none");
            divexists.classList.add("d-none");
        }

    })
}
function clearForm() {
    nameInput.value = "";
    emailInput.value = "";
    passwordInput.value = "";
}
if (goToSignUp) {
    goToSignUp.addEventListener('click', function () {
        secSignIn.classList.add('d-none')
        secSignUp.classList.remove('d-none');
    })
}
if (goToSignIn) {
    goToSignIn.addEventListener('click', function () {
        secSignIn.classList.remove('d-none')
        secSignUp.classList.add('d-none');
    })
}
function clearFormSignIn() {
    emailSignIn.value = "";
    passwordSignIn.value = '';

}
if (btnSignIn) {
    btnSignIn.addEventListener('click', function () {
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].emailUser === emailSignIn.value && allUsers[i].passUser === passwordSignIn.value) {
                nameInner = allUsers[i].nameUser;
                localStorage.setItem('userName',JSON.stringify(nameInner));
                window.location.href = 'home.html';
                clearFormSignIn();
                divValidSignIn.classList.add('d-none');
            } else {
                divValidSignIn.classList.remove('d-none');
            }
        }
    })
}
if (inner) {
    if (localStorage.getItem('userName') != null) {
        inner.innerHTML = `welcome ${JSON.parse(localStorage.getItem("userName"))}`;
    }
}
function validateName() {
    if (/^[a-zA-Z ]{4,30}$/.test(nameInput.value)) {
        nameInput.classList.add('is-valid');
        nameInput.classList.remove('is-invalid');
        return true;
    }
    else {
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        siteNameErrorDiv.classList.remove('d-none');
        return false;
    }
}
function validateEmail() {
    if (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(emailInput.value)) {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
        return true;
    }
    else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        siteEmailErrorDiv.classList.remove('d-none');
        return false;
    }
}
function validatePass() {
    const miniAndMax = passwordInput.value.length > 8 && passwordInput.value.length < 20;
    const space = /^\S*$/.test(passwordInput.value);
    const upperCase = /^(?=.*[A-Z]).*$/.test(passwordInput.value);
    const lowerCase = /^(?=.*[a-z]).*$/.test(passwordInput.value);
    const digit = /^(?=.*[0-9]).*$/.test(passwordInput.value);
    const special = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/.test(passwordInput.value);
    if (!miniAndMax) {
        passwordInput.classList.add("is-invalid");
        passwordInput.classList.remove("is-valid");
        longLength.classList.remove('d-none');

        longLength.style.color = "";
        longLength.innerHTML = '1- At 8-20 Characters Long';
        uppercasechar.classList.remove('d-none');

        uppercasechar.style.color = "";
        uppercasechar.innerHTML = '2- At least Uppercase Characte ';
        lowercasechar.classList.remove('d-none');

        lowercasechar.style.color = "";
        lowercasechar.innerHTML = '3- At least Lowercase Character ';
        specialchar.classList.remove('d-none');

        specialchar.style.color = "";
        specialchar.innerHTML = ' 4- At least one Special character';
        digitchar.classList.remove('d-none');

        digitchar.style.color = "";
        digitchar.innerHTML = '5- At least number ';
        ppassValid.classList.remove('d-none');
    }

    if (miniAndMax) {
        longLength.style.color = "#28A745";
        longLength.innerHTML = '1- At 8-20 Characters Long <i class="fa-solid fa-circle-check"></i>';
    }
    if (upperCase) {
        uppercasechar.style.color = "#28A745";
        uppercasechar.innerHTML = '2- At least Uppercase Characte <i class="fa-solid fa-circle-check"></i>';
    }
    if (lowerCase) {
        lowercasechar.style.color = "#28A745";
        lowercasechar.innerHTML = '3- At least Lowercase Character <i class="fa-solid fa-circle-check"></i>';
    }
    if (special) {
        specialchar.style.color = "#28A745";
        specialchar.innerHTML = '4- At least one Special character <i class="fa-solid fa-circle-check"></i>';
    }
    if (digit) {
        digitchar.style.color = "#28A745";
        digitchar.innerHTML = '5- At least number <i class="fa-solid fa-circle-check"></i>';
    }
    if (upperCase && lowerCase && digit && special && miniAndMax) {
        passwordInput.classList.add("is-valid");
        passwordInput.classList.remove("is-invalid");
        ppassValid.classList.add('d-none');
        return true;
    }
}
