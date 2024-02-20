let policyCheck = document.querySelector(".form-checkbox");
let checkMark = document.querySelector(".checkmark");

checkMark.addEventListener("click", () => {
  policyCheck.checked = !policyCheck.checked;
  console.log(policyCheck.checked);
});

let flipper = document.querySelectorAll(".switch-link");
let card = document.querySelector(".card");
flipper.forEach((el) => {
  el.addEventListener("click", () => {
    card.classList.toggle("card-flipped");
    console.log(card);
  });
});
