let policyCheck = document.querySelector(".form-checkbox");
let checkMark = document.querySelector(".checkmark");

checkMark.addEventListener("click", () => {
  policyCheck.checked = !policyCheck.checked;
  console.log(policyCheck.checked);
});
