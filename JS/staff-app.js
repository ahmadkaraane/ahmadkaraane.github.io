let staffConfig = {
  email: "alawiyamohammad292@gmail.com",
};

let contactForm = document.forms[0];
let position = document.querySelector(".position");
let posDrop = document.querySelector(".position-dropdown");
let options = document.querySelector(".options");
let optionsChildren = Array.from(options.children);
let positionTitle = document.querySelector(".pos-title");
let selectedPosition = document.querySelector("#selectedPosition");
let staffForm = document.forms[0];
const fullNameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const ageInput = document.getElementById("age");
const countryInput = document.getElementById("Country");
const timeZoneInput = document.getElementById("time-zone");
const experienceInput = document.getElementById("exp");
const applicationReasonInput = document.getElementById("reason");
const goodStaffInput = document.getElementById("good-staff");
const discordUsernameInput = document.getElementById("dc-username");
const minecraftUsernameInput = document.getElementById("mc-username");
// Regular Expressions for Input Validation

const fullNameRegex = /^[A-Za-z\s'-]{2,100}$/i;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i;
const ageRegex = /^(1[6-9]|[2-9]\d)$/i;
const countryRegex = /^[A-Za-z\s'-]{2,100}$/i;
const timeZoneRegex = /^[A-Za-z\s\d'+-]+$/i;
const discordUsernameRegex = /^[A-Za-z0-9_#-]{3,32}$/i;
const minecraftUsernameRegex = /^[A-Za-z0-9_]{3,16}$/i;

position.onclick = (e) => {
  if (options.style.height === "0px" || options.style.height === "") {
    options.style.height = options.scrollHeight + "px";
  } else {
    options.style.height = "0px";
  }
  options.classList.toggle("open");
};
for (let i in optionsChildren) {
  optionsChildren[i].onclick = (e) => {
    let classToAdd = optionsChildren[i].classList[0];
    for (let j in optionsChildren) {
      position.classList.remove(`position-${optionsChildren[j].classList[0]}`);
      optionsChildren[j].classList.remove("selected");
    }
    optionsChildren[i].classList.add("selected");
    position.classList.add(`position-${optionsChildren[i].classList[0]}`);
    selectedPosition.setAttribute(
      "value",
      `${optionsChildren[i].classList[0]}`
    );
    positionTitle.innerHTML = `${optionsChildren[i].innerHTML} <i class="fa-solid fa-caret-down"></i>`;
    positionTitle.innerHTML[0].toUpperCase();
    position.classList.remove("invalid-pos");
  };
}

staffForm.onsubmit = (e) => {
  let isValid = true;

  function validateField(inputElement, regex) {
    if (!regex.test(inputElement.value)) {
      inputElement.parentElement.classList.add("invalid-inp");
      isValid = false;
    } else {
      inputElement.parentElement.classList.remove("invalid-inp");
    }
  }

  if (!selectedPosition.value) {
    posDrop.classList.add("invalid-inp");
    isValid = false;
    posDrop.scrollIntoView({ behavior: "smooth" });
  } else {
    posDrop.classList.remove("invalid-inp");
  }
  // Validate Full Name
  validateField(fullNameInput, fullNameRegex);

  // Validate Email Address
  validateField(emailInput, emailRegex);

  // Validate Age
  validateField(ageInput, ageRegex);

  // Validate Country
  validateField(countryInput, countryRegex);

  // Validate Time Zone
  validateField(timeZoneInput, timeZoneRegex);

  // Validate Experience
  if (experienceInput.value < 10) {
    experienceInput.parentElement.classList.add("invalid-inp");
    isValid = false;
  } else {
    experienceInput.parentElement.classList.remove("invalid-inp");
  }
  // Validate Application Reason
  if (applicationReasonInput.value < 10) {
    applicationReasonInput.parentElement.classList.add("invalid-inp");
    isValid = false;
  } else {
    applicationReasonInput.parentElement.classList.remove("invalid-inp");
  }
  // Validate Good Staff
  if (goodStaffInput.value < 10) {
    goodStaffInput.parentElement.classList.add("invalid-inp");
    isValid = false;
  } else {
    goodStaffInput.parentElement.classList.remove("invalid-inp");
  }

  validateField(discordUsernameInput, discordUsernameRegex);

  // Validate Minecraft Username
  validateField(minecraftUsernameInput, minecraftUsernameRegex);

  console.log(isValid);
  if (!isValid) {
    event.preventDefault(); // Prevent form submission
    const firstInvalidInput = document.querySelector(".invalid-inp");
    if (firstInvalidInput) {
      firstInvalidInput.scrollIntoView({ behavior: "smooth" });
    }
  } else {
    staffForm.method = "POST";
    staffForm.action = `https://formsubmit.co/${staffConfig.email}`;
  }
};
