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
        $filterButton.addEventListener('click', function () {
            const $filterWindowElement = new CreateFilterWindow();
            console.log($filterWindowElement.$windowElement);
            $filterWindowElement.appendToBody();
            loadEvents();
        });
        return $filterButton;
    }
    save() {
        const $navbarElement = document.querySelector(`.${this.position}`);
        if ($navbarElement === null) {
            throw new Error('navbarElement is null, what?');
        }
        $navbarElement.appendChild(this.HTML);
    }
}
class CreateFilterWindow {
    constructor() {
        this.$windowElement = this.generateWindowElementHTML();
    }
    generateWindowElementHTML() {
        const DocumentFragment = `
    <div class="filterWindow">
      <header>
        <span></span>
          <button onClick='closeEvent()'><img src="/icons/x.svg" /></button>
      </header>
      <div class="filterWindowBody"></div>
      <footer></footer>
    </div>`;
        return document.createRange().createContextualFragment(DocumentFragment);
    }
    appendToFilterWindow(element) {
        const $filterWindowBody = document.querySelector('.filterWindowBody');
        $filterWindowBody.appendChild(element);
    }
    appendToBody() {
        const $body = document.querySelector('body');
        $body.appendChild(this.$windowElement);
    }
}
class CreateInputRange {
    constructor(min, max, value) {
        this.inputRange = document.createElement('input');
        this.inputRange.setAttribute('type', 'range');
        this.inputRange.setAttribute('class', 'inputRange');
        this.inputRange.setAttribute('min', min);
        this.inputRange.setAttribute('max', max);
        this.inputRange.setAttribute('value', value);
    }
    get InputRange() {
        return this.inputRange;
    }
}
class StartPage {
    loadButtons() {
        const buttonList = [
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
}
// Carregar modulos
(function () {
    const { loadButtons } = new StartPage();
    loadButtons();
})();
function loadEvents() {
    const $filterWindow = document.querySelectorAll('.filterWindow');
    if ($filterWindow != null) {
        $filterWindow.addEventListener('mousedown', () => {
            $filterWindow.classList.add('filterWindowMovePointer');
            document.addEventListener('mousemove', moveFilterWindow);
        });
    }
    else
        throw new Error('$window is null and not an element');
    document.addEventListener('mouseup', () => {
        $filterWindow.classList.remove('filterWindowMovePointer');
        document.removeEventListener('mousemove', moveFilterWindow);
    });
    function moveFilterWindow({ movementX, movementY }) {
        const { left, top } = window.getComputedStyle($filterWindow);
        $filterWindow.style.left = `${parseInt(left) + movementX}px`;
        $filterWindow.style.top = `${parseInt(top) + movementY}px`;
    }
}
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
