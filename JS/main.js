const config = {
  topCustomers: [
    "MidoAlawieh",
    "RubyEyedReaper",
    "24Hrs_TK",
    "ItzStormizn",
    "Mavyy",
  ],
  serverInfo: {
    discordServerID: "1121855226278846584",
    serverIp: "mc.sentrycraft.net",
  },
};

const discordOnline = document.querySelector(".discord-online");
const minecraftOnline = document.querySelector(".mc-online");
// Get the header element's computed height
const bgi = document.querySelector(".bgi");
const color = document.querySelector(".color");
const headerH = document.querySelector("header"); // Replace "header" with the actual selector for your header element

if (bgi && color && headerH) {
  const headerStyles = getComputedStyle(headerH);
  const headerHeightWithPadding =
    headerH.offsetHeight +
    parseFloat(headerStyles.paddingTop) +
    parseFloat(headerStyles.paddingBottom);

  bgi.style.height = `${headerHeightWithPadding}px`;
  color.style.height = `${headerHeightWithPadding}px`;
}

let toggler = document.querySelector(".toggler");
let mobNav = document.querySelector(".mobile-nav");
let closer = document.querySelector(".closer");
let overlay = document.getElementsByClassName("overlay")[0];

toggler.addEventListener("click", () => {
  mobNav.classList.add("open");
  overlay.classList.add("shown");
});
closer.addEventListener("click", () => {
  mobNav.classList.remove("open");
  overlay.classList.remove("shown");
});
console.log(overlay);
overlay.addEventListener("click", () => {
  mobNav.classList.remove("open");
  overlay.classList.remove("shown");
});

// Get the text element by its ID
const copyText = document.getElementsByClassName("ip");
const copyPopUp = document.querySelector(".copy-popup");
// Add a click event listener to the text element
for (let i = 0; i < copyText.length; i++) {
  if (copyText[i]) {
    copyText[i].addEventListener("click", () => {
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = "sentrycraft.net";
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand("copy");
      document.body.removeChild(tempTextArea);
      copyPopUp.classList.add("copied");
      console.log("hey");
      setTimeout(() => {
        copyPopUp.classList.add("hide");
        setTimeout(() => {
          copyPopUp.classList.remove("copied");
          copyPopUp.classList.remove("hide");
        }, 2500);
      }, 1500);
    });
  }
}

let mobileToggle = document.querySelector(".mobile-store-title");
let mobileCates = document.querySelector(".mobile-cates");

if (mobileToggle !== null) {
  mobileToggle.addEventListener("click", () => {
    if (mobileCates.style.height === "0px" || mobileCates.style.height === "") {
      mobileCates.style.height = mobileCates.scrollHeight + "px";
    } else {
      mobileCates.style.height = "0px";
    }
    mobileToggle.classList.toggle("store-open");
  });
}

let customerHeads = document.querySelector(".customer-heads");

for (let i in config.topCustomers) {
  if (customerHeads) {
    let headParent = document.createElement("div");
    headParent.classList.add("head");
    headParent.setAttribute("username", config.topCustomers[i]);
    let head = document.createElement("img");
    head.setAttribute(
      "src",
      `https://mc-heads.net/avatar/${config.topCustomers[i]}/45`
    );
    head.setAttribute("alt", `${config.topCustomers[i]}`);
    headParent.appendChild(head);
    customerHeads.appendChild(headParent);
  }
}

let rule = document.getElementsByClassName("rule");
let ruleDesc = document.getElementsByClassName("rule-desc");
if (rule != null) {
  for (let i = 0; i < rule.length; i++) {
    rule[i].addEventListener("click", () => {
      if (
        ruleDesc[i].style.height === "0px" ||
        ruleDesc[i].style.height === ""
      ) {
        ruleDesc[i].style.height = ruleDesc[i].scrollHeight + "px";
        rule[i].classList.toggle("rule-open");
      } else {
        ruleDesc[i].style.height = "0px";
        rule[i].classList.toggle("rule-open");
      }
    });
  }
}

const getDiscordOnlineUsers = async () => {
  try {
    const discordServerId = config.serverInfo.discordServerID;

    const apiWidgetUrl = `https://discord.com/api/guilds/${discordServerId}/widget.json`;
    let response = await fetch(apiWidgetUrl);
    let data = await response.json();
    if (!data.presence_count) {
      discordOnline.innerText = "none";
    } else {
      console.log(data.presence_count);
      discordOnline.innerText = `${await data.presence_count} Members Online`;
    }
  } catch (e) {
    discordOnline.innerText = "none";
  }
};

const getMinecraftOnlinePlayer = async () => {
  try {
    const serverIp = config.serverInfo.serverIp;

    const apiUrl = `https://api.mcsrvstat.us/2/${serverIp}`;
    let response = await fetch(apiUrl);
    let data = await response.json();
    if (data.online === true) {
      minecraftOnline.innerText = `${data.players.online} Players Online`;
    } else {
      minecraftOnline.innerHTML = "Server Is Offline";
    }
  } catch (e) {
    console.log(e);
    minecraftOnline.innerHTML = "None";
  }
};

getDiscordOnlineUsers();
getMinecraftOnlinePlayer();

// Get a reference to the ::after pseudo-element by its id
// Create a function to update the scrolling indicator
// Function to update the scrolling indicator
// Function to update scrolling indicators
function updateScrollIndicators() {
  const sectionContentContainers =
    document.querySelectorAll(".section-content");

  sectionContentContainers.forEach((container) => {
    const scrollIndicator = container.querySelector(".scroll-indicator");
    const scrollPercentage =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    const topPosition = `calc(${scrollPercentage}% - 30px)`;

    if (scrollIndicator) {
      scrollIndicator.style.top = topPosition;
    }
  });
}

// Add a scroll event listener to update all scrolling indicators
window.addEventListener("scroll", updateScrollIndicators);

// Initially update the scrolling indicators when the page loads
window.addEventListener("load", updateScrollIndicators);

let members = document.querySelectorAll(".member");
let memberName = document.querySelectorAll(".member-name");
let memberImage = document.querySelectorAll(".member-img");

for (let i = 0; i < members.length; i++) {
  let memberBody = document.createElement("img");
  memberBody.setAttribute("alt", memberName[i].innerText);
  memberBody.setAttribute(
    "src",
    `https://mc-heads.net/body/${memberName[i].innerText}`
  );
  memberImage[i].appendChild(memberBody);
}
