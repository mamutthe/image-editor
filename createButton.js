let createButtonArguments = [
  "Brightness",
  "brightness.svg",
  "leftNavbar",
  "Contrast",
  "contrast.svg",
  "leftNavbar",
  "Sharpness",
  "sharpness.svg",
  "leftNavbar",
  "Temperature",
  "temperature.svg",
  "rightNavbar",
  "Color",
  "color.svg",
  "rightNavbar",
  "Information",
  "information.svg",
  "rightNavbar",
];

const createNavbarButton = (name, svgIcon, navbarPosition, jsCode) => {
  let filterButton = document.createElement("button");
  filterButton.setAttribute("type", "button");
  filterButton.setAttribute("class", "filterButton purpleGradient");
  filterButton.setAttribute("id", name);
  filterButton.setAttribute("title", name);
  let buttonIcon = document.createElement("img");
  buttonIcon.setAttribute("class", "buttonIcon");
  buttonIcon.setAttribute("src", `/icons/${svgIcon}`);
  filterButton.appendChild(buttonIcon);
  const desiredNavbar = document.querySelector(`.${navbarPosition}`);
  desiredNavbar.appendChild(filterButton);
};

const setNavbarButtons = (createButtonArguments) => {
  for (i = 0; i < createButtonArguments.length; i = i + 3) {
    createNavbarButton(
      createButtonArguments[i],
      createButtonArguments[i + 1],
      createButtonArguments[i + 2]
    );
  }
};

const footer = () => {
  let footer = document.createElement("figcaption");
  let body = document.querySelector(".body");
  footer.setAttribute("class", "footer purpleBackgound");
  body.appendChild(footer);
};

setNavbarButtons(createButtonArguments);
footer();
