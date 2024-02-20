let staffNavs = document.querySelectorAll(".staff-nav, .mobile-staff-nav");
let staffDef = document.querySelector(".staff-def");
let currentlyActive = staffDef;

function handleNavClick(navElement) {
  let cateClass = navElement.classList[0];
  console.log(cateClass);
  let staffItems = document.querySelector(`.${cateClass}-roles`);
  let activeNav = document.querySelectorAll(".active-nav");
  let toActive = document.querySelectorAll(`.${cateClass}`);
  // Check if the clicked navElement is already active
  if (!navElement.classList.contains("active-nav")) {
    currentlyActive.classList.remove("show");
    activeNav.forEach((nav) => {
      nav.classList.remove("active-nav");
    });
    staffItems.classList.remove("hidden");
    toActive.forEach((nav) => {
      nav.classList.add("active-nav");
    });
    staffItems.classList.add("fade");
    setTimeout(() => {
      staffItems.classList.add("show");
    }, 100);
    staffItems.addEventListener(
      "transitionend",
      () => {
        staffItems.classList.remove("fade");
      },
      { once: true }
    );
    currentlyActive.classList.add("hidden");
    currentlyActive = staffItems;
  }
}

staffNavs.forEach((nav) => {
  nav.addEventListener("click", (event) => {
    event.preventDefault();
    handleNavClick(nav);
  });
});

let mobileToggle = document.querySelector(".mobile-staff-title");
let mobileCates = document.querySelector(".mobile-cates");

if (mobileToggle !== null) {
  mobileToggle.addEventListener("click", () => {
    console.log("hey");
    if (mobileCates.style.height === "0px" || mobileCates.style.height === "") {
      mobileCates.style.height = mobileCates.scrollHeight + "px";
    } else {
      mobileCates.style.height = "0px";
    }
    mobileToggle.classList.toggle("staff-open");
  });
}

let staffMembers = document.querySelectorAll(".staff-member");

staffMembers.forEach((el) => {
  let pfp = el.children[0];
  pfp.setAttribute(
    "src",
    `https://mc-heads.net/head/${el.getAttribute("staff-name")}/left`
  );
});
