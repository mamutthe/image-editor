"use strict";
class CreateButton {
    constructor(name, position) {
        this.name = name;
        this.position = position;
        this.$imgElement = document.createElement('img');
        this.action = undefined;
    }
    set Icon(icon) {
        const iconFileName = icon;
        const $imgElement = document.createElement('img');
        $imgElement.setAttribute('class', 'buttonIcon');
        $imgElement.setAttribute('src', `/icons/${iconFileName}`);
        this.$imgElement = $imgElement;
    }
    get Icon() {
        return this.$imgElement;
    }
    set Action(action) {
        this.action = action;
    }
    get Action() {
        return this.action;
    }
    get HTML() {
        const $filterButton = document.createElement('button');
        $filterButton.setAttribute('type', 'button');
        $filterButton.setAttribute('class', 'filterButton');
        $filterButton.setAttribute('id', this.name);
        $filterButton.setAttribute('title', this.name);
        if (this.$imgElement !== undefined) {
            $filterButton.appendChild(this.$imgElement);
        }
        return $filterButton;
    }
    create() {
        const $buttonEntry = document.createElement('button-entry');
        const $navbarElement = document.querySelector(`.${this.position}`);
        if ($navbarElement === null) {
            throw new Error('Location Element is null, what?');
        }
        /*
        if (this.action !== undefined) {
          const $buttonAction = document.createElement('button-action');
          $buttonAction.appendChild(this.action as Node);
          $buttonEntry.appendChild($buttonAction);
        } */
        $buttonEntry.appendChild(this.HTML);
        $navbarElement.appendChild($buttonEntry);
    }
}
class StartPage {
    loadButtons() {
        const buttonList = [
            {
                name: 'Brightness',
                icon: 'brightness.svg',
                position: 'leftNavbar',
                action: () => {
                    const inputRange = document.createElement('input');
                    inputRange.setAttribute('type', 'range');
                    inputRange.setAttribute('class', 'range');
                    inputRange.setAttribute('min', '0.0');
                    inputRange.setAttribute('max', '8');
                    inputRange.setAttribute('value', '0');
                    inputRange.setAttribute('step', '0.1');
                    return inputRange;
                }
            },
            {
                name: 'Contrast',
                icon: 'contrast.svg',
                position: 'leftNavbar',
                action: undefined
            },
            {
                name: 'Sharpness',
                icon: 'sharpness.svg',
                position: 'leftNavbar',
                action: undefined
            },
            {
                name: 'Temperature',
                icon: 'temperature.svg',
                position: 'rightNavbar',
                action: undefined
            },
            {
                name: 'Color',
                icon: 'color.svg',
                position: 'rightNavbar',
                action: undefined
            },
            {
                name: 'Information',
                icon: 'information.svg',
                position: 'rightNavbar',
                action: undefined
            }
        ];
        buttonList.forEach((buttonObj) => {
            const { name, icon, position, action } = buttonObj;
            const newButton = new CreateButton(name, position);
            newButton.Icon = icon;
            newButton.Action = action;
            newButton.create();
        });
    }
    eventClick() {
        const $workspace = document.querySelector('.workspace');
        const $body = document.querySelector('body');
        ['left', 'right'].forEach((pos) => {
            var _a;
            const $listButton = (_a = document === null || document === void 0 ? void 0 : document.querySelector(`.${pos}Navbar`)) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.filterButton');
            let checkTimeout = false;
            if ($listButton === undefined || $body === null || $workspace === null) {
                throw new Error('Error event animate click');
            }
            $listButton.forEach(($button) => $button.addEventListener('click', () => {
                if (checkTimeout)
                    return;
                const workspaceClass = $workspace.getAttribute('class');
                if (workspaceClass === null) {
                    throw new Error('Error event class animate click');
                }
                if (workspaceClass.split(' ').indexOf(`workspace-${pos}`) !== -1) {
                    checkTimeout = true;
                    $workspace.setAttribute('class', 'workspace');
                    setTimeout(() => {
                        $body.style.overflow = 'inherit';
                        checkTimeout = false;
                    }, 200);
                }
                else {
                    $body.style.overflow = 'hidden';
                    $workspace.setAttribute('class', `workspace-${pos} workspace`);
                }
            }));
        });
    }
}
const $window = document.getElementById('window');
function onDrag({ movementX, movementY }) {
    let { left, top } = window.getComputedStyle($window);
    left = parseInt(left);
    top = parseInt(top);
    $window.style.top = (top + movementY).toString() + 'px';
    $window.style.left = (left + movementX).toString() + 'px';
}
/* if ($window != null) { */
$window.addEventListener('mousedown', () => {
    $window.classList.add('filterWindowMovePointer');
    document.addEventListener('mousemove', onDrag);
});
/* } else throw new Error('$window is null and not an element'); */
// Carregar modulos
(function () {
    const { loadButtons, eventClick } = new StartPage();
    loadButtons();
    eventClick();
})();
document.addEventListener('mouseup', () => {
    $window.classList.remove('filterWindowMovePointer');
    document.removeEventListener('mousemove', onDrag);
});
// class SlidableFilterInterface
/* class Start {
  loadingButtons(): void {
    const buttonList: buttonListType = [
      {
        name: 'Brightness',
        icon: 'brightness.svg',
        pos: 'leftNavbar',
        action: () => {
          const inputRange = document.createElement('input');
          inputRange.setAttribute('type', 'range');
          inputRange.setAttribute('class', 'range');
          inputRange.setAttribute('min', '0.0');
          inputRange.setAttribute('max', '8');
          inputRange.setAttribute('value', '0');
          inputRange.setAttribute('step', '0.1');

          return inputRange;
        }
      },
      {
        name: 'Contrast',
        icon: 'contrast.svg',
        pos: 'leftNavbar',
        action: undefined
      },
      {
        name: 'Sharpness',
        icon: 'sharpness.svg',
        pos: 'leftNavbar',
        action: undefined
      },
      {
        name: 'Temperature',
        icon: 'temperature.svg',
        pos: 'rightNavbar',
        action: undefined
      },
      {
        name: 'Color',
        icon: 'color.svg',
        pos: 'rightNavbar',
        action: undefined
      },
      {
        name: 'Information',
        icon: 'information.svg',
        pos: 'rightNavbar',
        action: undefined
      }
    ];
  }
}
 */
/* type posType = 'leftNavbar' | 'rightNavbar';
 type buttonListType = Array<{
  name: string;
  icon: string;
  pos: posType;
  action: () => void;
}>;

class CreateButton {
  /**
   *
   * @param {*} name - Nome de exibição do botão.D
   * @param {*} loc  - Localização do elemento na tela, ele vai adicionar uma class leftNavbar ou rightNavbar.
  name: string;
  pos: Element | null;
  $icon: Element | null;
  _action: unknown;
  constructor(name: string, pos: posType) {
    this.name = name;
    this.pos = document.querySelector(`.${pos}`);
    this.$icon = null;
    this._action = undefined;
  }

  set buttonIcon(icon: string) {
    const $elementImg = document.createElement('img');
    $elementImg.setAttribute('class', 'buttonIcon');
    $elementImg.setAttribute('src', `/icons/${icon}`);
    this.$icon = $elementImg;
  }

  /**
   * Setar HTML da ação do botão.
   *
   * @param {*} action - HTML

  set buttonAction(action) {
    this._action = action;
  }

  /**

  get buttonAction(): unknown {
    return this._action;
  }

  /**
   *  Retornar o elemento da imagem gerada pela função buttonIcon.

  get buttonIcon() {
    return this.$icon;
  }

  /**
   * Gerar o HTML do botão.

  get HTML() {
    if (this.name === undefined || this.loc === undefined) {
      throw new Error('Invalid HTML');
    }

    const filterButton = document.createElement('button');
    filterButton.setAttribute('type', 'button');
    filterButton.setAttribute('class', 'filterButton purpleGradient');
    filterButton.setAttribute('id', this.name);
    filterButton.setAttribute('title', this.name);

    // Adicionar Icone
    if (this._buttonIcon !== undefined) {
      filterButton.appendChild(this.buttonIcon);
    }

    return filterButton;
  }

  /**
   * Salvar o HTML do botão no elemento da localização escolhida.

  save() {
    const buttonEntry = document.createElement('button-entry');

    if (this.buttonAction !== undefined) {
      const buttonAction = document.createElement('button-action');
      buttonAction.appendChild(this.buttonAction);
      buttonEntry.appendChild(buttonAction);
    }

    buttonEntry.appendChild(this.HTML);

    this.loc.appendChild(buttonEntry);
  }
}

/**
 *  Modulos da página

class Start {
  /**
   *  Botões

  loadingButtons() {
    const buttonList: buttonListType = [
      {
        name: 'Brightness',
        icon: 'brightness.svg',
        pos: 'leftNavbar',
        action: () => {
          const inputRange = document.createElement('input');
          inputRange.setAttribute('type', 'range');
          inputRange.setAttribute('class', 'range');
          inputRange.setAttribute('min', '0.0');
          inputRange.setAttribute('max', '8');
          inputRange.setAttribute('value', '0');
          inputRange.setAttribute('step', '0.1');

          return inputRange;
        },
      },
      {
        name: 'Contrast',
        icon: 'contrast.svg',
        pos: 'leftNavbar',
        action: undefined,
      },
      {
        name: 'Sharpness',
        icon: 'sharpness.svg',
        pos: 'leftNavbar',
        action: undefined,
      },
      {
        name: 'Temperature',
        icon: 'temperature.svg',
        pos: 'rightNavbar',
        action: undefined,
      },
      {
        name: 'Color',
        icon: 'color.svg',
        pos: 'rightNavbar',
        action: undefined,
      },
      {
        name: 'Information',
        icon: 'information.svg',
        pos: 'rightNavbar',
        action: undefined,
      },
    ];

    buttonList.forEach((buttonPropertiesObj) => {
      const { name, icon, pos, action } = buttonPropertiesObj;
      const $button = new CreateButton(name, pos);
      $button.buttonIcon = icon;
      if (action !== undefined) $button.buttonAction = action();
      $button.save();
    });
  }

  /**
   *  Um Footer???

  footer() {
    const footer = document.createElement('figcaption');
    footer.setAttribute('class', 'footer purpleBackgound');
    document.body.appendChild(footer);
  }

  /**
   * Evento do input[type=range]

  eventRange() {
    const range = document.querySelector('.range');
    const style = document.createElement('style');
    document.body.appendChild(style);

    range.addEventListener('input', () => {
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
*/
