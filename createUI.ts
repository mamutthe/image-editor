type positionType = 'leftNavbar' | 'rightNavbar';
type buttonListType = Array<{
  name: string;
  icon: string;
  position: positionType;
  windowProperties: {};
  action: undefined | (() => void);
}>;

class CreateButton {
  name: string;
  position: positionType;
  private $imgElement: HTMLImageElement;
  private action: undefined | (() => void);

  constructor(name: string, position: positionType) {
    this.name = name;
    this.position = position;
    this.$imgElement = document.createElement('img');
    this.action = undefined;
  }

  set Icon(icon: any) {
    const iconFileName: string = icon;
    const $imgElement = document.createElement('img');
    $imgElement.setAttribute('class', 'buttonIcon');
    $imgElement.setAttribute('src', `/icons/${iconFileName}`);
    this.$imgElement = $imgElement;
  }

  get Icon(): HTMLImageElement {
    return this.$imgElement;
  }

  set Action(action: undefined | (() => void)) {
    this.action = action;
  }

  get Action(): undefined | (() => void) {
    return this.action;
  }

  get HTML(): HTMLButtonElement {
    const $filterButton = document.createElement('button');
    $filterButton.setAttribute('type', 'button');
    $filterButton.setAttribute('class', 'filterButton');
    $filterButton.setAttribute('id', this.name);

    if (this.$imgElement !== undefined) {
      $filterButton.appendChild(this.$imgElement);
    }

    return $filterButton;
  }

  save(): void {
    const $navbarElement = document.querySelector(`.${this.position}`);

    if ($navbarElement === null) {
      throw new Error('navbarElement is null, what?');
    }

    $navbarElement.appendChild(this.HTML);
  }
}

class CreateFilterWindow {
  windowTitle: string;

  constructor(windowTitle: string) {
    this.windowTitle = windowTitle;
  }

  get filterWindowElement(): DocumentFragment {
    const documentFragment = `
      <div class="filterWindow" id="${this.windowTitle}FilterWindow">
        <header>
          <span>${this.windowTitle}</span>
            <button><img src="/icons/x.svg"/></button>
        </header>
        <div class="filterWindowBody"></div>
        <footer></footer>
      </div>`;

    return document.createRange().createContextualFragment(documentFragment);
  }

  save(): void {
    const $body = document.querySelector('body') as HTMLElement;
    $body.appendChild(this.filterWindowElement);
  }

  closeEvent(): void {
    const $closeButton = document
      .getElementById(`${this.windowTitle}FilterWindow`)
      ?.querySelector('button');

    $closeButton?.addEventListener('click', (event) => {
      event.target?.parentElement.parentElement.remove();
    });
  }
}

class CreateInputRange {
  inputRange: HTMLInputElement;
  constructor(min: string, max: string, value: string) {
    this.inputRange = document.createElement('input');
    this.inputRange.setAttribute('type', 'range');
    this.inputRange.setAttribute('class', 'inputRange');
    this.inputRange.setAttribute('min', min);
    this.inputRange.setAttribute('max', max);
    this.inputRange.setAttribute('value', value);
  }

  get InputRange(): HTMLInputElement {
    return this.inputRange;
  }
}

class PageEvents {
  generateFilterWindow(): void {
    const buttonList = document.querySelectorAll('.filterButton');

    buttonList.forEach(($filterButton) => {
      $filterButton.addEventListener('click', () => {
        if (
          document.querySelector(`#${$filterButton.id}FilterWindow`) === null
        ) {
          const filterWindow = new CreateFilterWindow($filterButton.id);
          filterWindow.save();
          filterWindow.closeEvent();
        }
      });
    });
  }

  moveFilterWindow(): void {
    const $filterWindows = document.querySelectorAll('.filterWindow');
  }
}

class StartPage {
  loadButtons(): void {
    const buttonList: buttonListType = [
      {
        name: 'Brightness',
        icon: 'brightness.svg',
        position: 'leftNavbar',
        windowProperties: {
          element: 'InputRange',
          elementParameters: ['0', '100', '50']
        },
        action: undefined
      },
      {
        name: 'Contrast',
        icon: 'contrast.svg',
        position: 'leftNavbar',
        windowProperties: {},
        action: undefined
      },
      {
        name: 'Sharpness',
        icon: 'sharpness.svg',
        position: 'leftNavbar',
        windowProperties: {},
        action: undefined
      },
      {
        name: 'Temperature',
        icon: 'temperature.svg',
        position: 'rightNavbar',
        windowProperties: {},
        action: undefined
      },
      {
        name: 'Color',
        icon: 'color.svg',
        position: 'rightNavbar',
        windowProperties: {},
        action: undefined
      },
      {
        name: 'Information',
        icon: 'information.svg',
        position: 'rightNavbar',
        windowProperties: {},
        action: undefined
      }
    ];
    buttonList.forEach((buttonObj) => {
      const { name, icon, position, windowProperties, action } = buttonObj;
      const $newFilterButton = new CreateButton(name, position);
      $newFilterButton.Icon = icon;
      $newFilterButton.Action = action;
      $newFilterButton.save();
    });
  }

  loadEvents(): void {
    const pageEvents = new PageEvents();
    pageEvents.generateFilterWindow();
  }
}

// Carregar modulos
(function () {
  const { loadButtons, loadEvents } = new StartPage();
  loadButtons();
  loadEvents();
})();

/* function loadEvents(): void {
  const $filterWindow = document.querySelectorAll('.filterWindow') as NodeList;
  if ($filterWindow != null) {
    $filterWindow.addEventListener('mousedown', () => {
      $filterWindow.classList.add('filterWindowMovePointer');
      document.addEventListener('mousemove', moveFilterWindow);
    });
  } else throw new Error('$window is null and not an element');

  document.addEventListener('mouseup', () => {
    $filterWindow.classList.remove('filterWindowMovePointer');
    document.removeEventListener('mousemove', moveFilterWindow);
  });

  function moveFilterWindow({
    movementX,
    movementY
  }: {
    movementX: number;
    movementY: number;
  }): void {
    const { left, top }: { left: string; top: string } =
      window.getComputedStyle($filterWindow);
    $filterWindow.style.left = `${parseInt(left) + movementX}px`;
    $filterWindow.style.top = `${parseInt(top) + movementY}px`;
  }
} */
// eventRange() {
//   const range = document.querySelector('.range');
//   const style = document.createElement('style');
//   document.body.appendChild(style);
//   range.addEventListener('input', () => {
//     const value = range.value;
//     const valueBar = (100 * value) / range.max;
//     style.textContent = `.range {background: linear-gradient(to right, #1976d2 ${valueBar}%, #a8cbee ${valueBar}%);}`;
//     style.textContent += `.currentImage {filter: brightness(${Math.abs(
//       value > range.max / 1.5 ? value : value / 4
