let storeNavs = document.querySelectorAll(".store-nav, .mobile-store-nav");
let storeInfo = document.querySelector(".store-info");
let currentlyActive = storeInfo;

function handleNavClick(navElement) {
  let cateClass = navElement.classList[0];
  let storeItems = document.querySelector(`.${cateClass}-items`);
  let activeNav = document.querySelectorAll(".active-nav");
  let toActive = document.querySelectorAll(`.${cateClass}`);

  // Check if the clicked navElement is already active
  if (!navElement.classList.contains("active-nav")) {
    currentlyActive.classList.remove("show");
    activeNav.forEach((nav) => {
      nav.classList.remove("active-nav");
    });
    storeItems.classList.remove("hidden");
    toActive.forEach((nav) => {
      nav.classList.add("active-nav");
    });
    storeItems.classList.add("fade");
    setTimeout(() => {
      storeItems.classList.add("show");
    }, 100);
    storeItems.addEventListener(
      "transitionend",
      () => {
        storeItems.classList.remove("fade");
      },
      { once: true }
    );
    currentlyActive.classList.add("hidden");
    currentlyActive = storeItems;
  }
}

storeNavs.forEach((nav) => {
  nav.addEventListener("click", (event) => {
    event.preventDefault();
    handleNavClick(nav);
  });
});

let item = document.querySelectorAll(".item");
let itemImage = document.querySelectorAll(".item-img");
let itemName = document.querySelectorAll(".item-name");
let itemDesc = document.querySelectorAll(".item-desc");
let itemPrice = document.querySelectorAll(".price-parent");
let itemBuy = document.querySelectorAll(".button");

for (let i = 0; i < item.length; i++) {
  item[i].addEventListener("click", () => {
    let overlay = document.createElement("div");
    overlay.classList.add("item-overlay");
    let clonedImage = itemImage[i].cloneNode(true);
    let clonedName = itemName[i].cloneNode(true);
    let clonedDesc = itemDesc[i].cloneNode(true);
    let clonedPrice = itemPrice[i].cloneNode(true);
    // let clonedPriceDlt = itemPriceDlt[i].cloneNode(true);
    let clonedBuy = itemBuy[i].cloneNode(true);

    let itemBig = document.createElement("div");
    itemBig.classList.add("item-big");
    let itemSideOne = document.createElement("div");
    let itemSideTwo = document.createElement("div");
    let itemClose = document.createElement("i");
    itemClose.classList.add("item-close", "fa-solid", "fa-xmark");
    itemSideOne.classList.add("item-side-one");
    itemSideTwo.classList.add("item-side-two");
    itemSideOne.appendChild(clonedImage);
    itemSideTwo.appendChild(clonedName);
    // itemSideTwo.appendChild(clonedPriceDlt);
    itemSideTwo.appendChild(clonedPrice);
    itemSideTwo.appendChild(clonedDesc);
    itemSideTwo.appendChild(clonedBuy);
    itemBig.appendChild(itemSideOne);
    itemBig.appendChild(itemSideTwo);
    itemBig.appendChild(itemClose);
    document.body.appendChild(itemBig);
    document.body.appendChild(overlay);
    setTimeout(() => {
      itemBig.classList.add("item-big-shown");
    }, 300);
    itemClose.addEventListener("click", () => {
      itemBig.classList.add("item-big-hidden");
      overlay.style.display = "none";
      setTimeout(() => {
        itemBig.classList.remove("item-big-shown");
        itemBig.style.display = "none";
      }, 300);
    });
    overlay.addEventListener("click", () => {
      itemBig.classList.add("item-big-hidden");
      overlay.style.display = "none";
      setTimeout(() => {
        itemBig.classList.remove("item-big-shown");
        itemBig.style.display = "none";
      }, 300);
    });
  });
}

window.onscroll = (e) => {
  if (itemBig) {
    if (itemBig.style.display != "none") {
      return;
    } else {
      event.preventDefault();
    }
  }
};
