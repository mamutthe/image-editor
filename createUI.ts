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

  private get HTML(): HTMLButtonElement {
    const $filterButton = document.createElement('button');
    $filterButton.setAttribute('type', 'button');
    $filterButton.setAttribute('class', 'filterButton');
    $filterButton.setAttribute('id', this.name);
    $filterButton.setAttribute('title', this.name);

    if (this.$imgElement !== undefined) {
      $filterButton.appendChild(this.$imgElement);
    }

    $filterButton.addEventListener('click', function () {
      const $filterWindowElement = new CreateFilterWindow(this.name);
      $filterWindowElement.generateWindowElementHTML();
      $filterWindowElement.appendToBody();
    });

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
  filterWindowTitle: string;
  constructor(filterWindowTitle?: string) {
    this.filterWindowTitle = filterWindowTitle;
  }

  generateWindowElementHTML(): DocumentFragment {
    const DocumentFragment = `
    <div class="filterWindow">
      <header>
        <span>${this.filterWindowTitle}</span>
          <button><img src="/icons/x.svg" /></button>
      </header>
      <div class="filterWindowBody"></div>
      <footer></footer>
    </div>`;

    return document.createRange().createContextualFragment(DocumentFragment);
  }

  appendToFilterWindow(element: HTMLElement): void {
    const $filterWindowBody = document.querySelector(
      '.filterWindowBody'
    ) as HTMLElement;
    $filterWindowBody.appendChild(element);
  }

  appendToBody(): void {
    const $windowElement = this.generateWindowElementHTML();
    const $body = document.querySelector('body') as HTMLElement;
    $body.appendChild($windowElement);
  }

  moveFilterWindowEvent(): void {
    const $filterWindow = document.querySelector(
      '.filterWindow'
    ) as HTMLElement;

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

  eventClick(): void {
    const $workspace = document.querySelector('.workspace');
    const $body = document.querySelector<HTMLElement>('body');

    ['left', 'right'].forEach((pos) => {
      const $listButton = document
        ?.querySelector(`.${pos}Navbar`)
        ?.querySelectorAll('.filterButton');
      let checkTimeout = false;

      if ($listButton === undefined || $body === null || $workspace === null) {
        throw new Error('Error event animate click');
      }

      $listButton.forEach(($button) =>
        $button.addEventListener('click', () => {
          if (checkTimeout) return;
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
          } else {
            $body.style.overflow = 'hidden';
            $workspace.setAttribute('class', `workspace-${pos} workspace`);
          }
        })
      );
    });
  }
}

// Carregar modulos
(function () {
  const { loadButtons, eventClick } = new StartPage();
  const { moveFilterWindowEvent } = new CreateFilterWindow();
  loadButtons();
  eventClick();
})();

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
