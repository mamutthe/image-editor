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
  for (i = 0; i < createButtonArguments.length; i += 3) {
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

const range = document.querySelector(".range");
const style = document.createElement("style");
document.body.appendChild(style);

range.addEventListener("input", () => {
  const value = range.value;
  const valueBar = (100 * value)/range.max;
  style.textContent = `.range {background: linear-gradient(to right, #1976d2 ${valueBar}%, #a8cbee ${valueBar}%);}`;
  style.textContent += `.currentImage {filter: brightness(${Math.abs(value > (range.max/1.5) ? value : value / 4)});}`;
  console.log(value);
});


