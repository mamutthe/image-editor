const _TYPELOC = ["leftNavbar", "rightNavbar"];

/**
 *  Criar um elemento de um botão
 */
class CreateButton {
  /**
   *
   * @param {*} name - Nome de exibição do botão.
   * @param {*} loc  - Localização do elemento na tela, ele vai adicionar uma class leftNavbar ou rightNavbar.
   */
  constructor(name, loc) {
    this.name = name;
    if (!_TYPELOC.includes(loc))
      throw new Error(`${loc} não é um TypeLoc valido!`);

    this.loc = document.querySelector(`.${loc}`);
  }

  /**
   * Criar um elemento de imagem.
   *
   * @param {*} svgIcon - Nome do arquivo em /icons
   */
  set buttonIcon(svgIcon) {
    let buttonIcon = document.createElement("img");
    buttonIcon.setAttribute("class", "buttonIcon");
    buttonIcon.setAttribute("src", `/icons/${svgIcon}`);

    this._buttonIcon = buttonIcon;
  }

  /**
   * Setar HTML da ação do botão.
   *
   * @param {*} action - HTML
   */
  set buttonAction(action) {
    this._buttonAction = action;
  }

  /**
   * Retornar o HTML da ação do botão.
   */
  get buttonAction() {
    return this._buttonAction;
  }

  /**
   *  Retornar o elemento da imagem gerada pela função buttonIcon.
   */
  get buttonIcon() {
    return this._buttonIcon;
  }

  /**
   * Gerar o HTML do botão.
   */
  get HTML() {
    if (this.name === undefined || this.loc === undefined)
      throw new Error("Invalid HTML");

    const filterButton = document.createElement("button");
    filterButton.setAttribute("type", "button");
    filterButton.setAttribute("class", "filterButton purpleGradient");
    filterButton.setAttribute("id", this.name);
    filterButton.setAttribute("title", this.name);

    // Adicionar Icone
    if (this._buttonIcon !== undefined)
      filterButton.appendChild(this.buttonIcon);

    return filterButton;
  }

  /**
   * Salvar o HTML do botão no elemento da localização escolhida.
   */
  save() {
    const buttonEntry = document.createElement("button-entry");

    if (this._buttonAction !== undefined) {
      const buttonAction = document.createElement("button-action");
      buttonAction.appendChild(this.buttonAction);
      buttonEntry.appendChild(buttonAction);
    }

    buttonEntry.appendChild(this.HTML);

    this.loc.appendChild(buttonEntry);
  }
}

/**
 *  Modulos da página
 */
class Start {
  /**
   *  Botões
   */
  loadingButtons() {
    const listButtons = [
      {
        name: "Brightness",
        icon: "brightness.svg",
        pos: "leftNavbar",
        action: () => {
          const inputRange = document.createElement("input");
          inputRange.setAttribute("type", "range");
          inputRange.setAttribute("class", "range");
          inputRange.setAttribute("min", "0.0");
          inputRange.setAttribute("max", "8");
          inputRange.setAttribute("value", "0");
          inputRange.setAttribute("step", "0.1");

          return inputRange;
        },
      },
      {
        name: "Contrast",
        icon: "contrast.svg",
        pos: "leftNavbar",
        action: undefined,
      },
      {
        name: "Sharpness",
        icon: "sharpness.svg",
        pos: "leftNavbar",
        action: undefined,
      },
      {
        name: "Temperature",
        icon: "temperature.svg",
        pos: "rightNavbar",
        action: undefined,
      },
      {
        name: "Color",
        icon: "color.svg",
        pos: "rightNavbar",
        action: undefined,
      },
      {
        name: "Information",
        icon: "information.svg",
        pos: "rightNavbar",
        action: undefined,
      },
    ];

    listButtons.forEach((buttonObj) => {
      const { name, icon, pos, action } = buttonObj;
      const button = new CreateButton(name, pos);
      button.buttonIcon = icon;
      if (action !== undefined) button.buttonAction = action();
      button.save();
    });
  }

  /**
   *  Um Footer???
   */
  footer() {
    const footer = document.createElement("figcaption");
    footer.setAttribute("class", "footer purpleBackgound");
    document.body.appendChild(footer);
  }

  /**
   * Evento do input[type=range]
   */
  eventRange() {
    const range = document.querySelector(".range");
    const style = document.createElement("style");
    document.body.appendChild(style);

    range.addEventListener("input", () => {
      const value = range.value;
      const valueBar = (100 * value) / range.max;
      style.textContent = `.range {background: linear-gradient(to right, #1976d2 ${valueBar}%, #a8cbee ${valueBar}%);}`;
      style.textContent += `.currentImage {filter: brightness(${Math.abs(
        value > range.max / 1.5 ? value : value / 4
      )});}`;
    });
  }
}

// Carregar modulos
(function () {
  const loadingPage = new Start();
  loadingPage.loadingButtons();
  loadingPage.footer();
  loadingPage.eventRange();
})();

const obj = {
  x: 0,
  set addX(value) {
    this.x = value + 1;
  },
};
