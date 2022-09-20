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
            throw new Error('navbarElement is null, what?');
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
class CreateFilterWindow {
    constructor(filterWindowTitle) {
        this.filterWindowTitle = filterWindowTitle;
    }
    generateWindowElement() {
        const htmlTemplate = `
    <div class="filterWindow">
      <header>
        <span>${this.filterWindowTitle}</span>
          <button><img src="/icons/x.svg" /></button>
      </header>
      <div class="filterWindowBody"></div>
      <footer></footer>
    </div>`;
        return document.createRange().createContextualFragment(htmlTemplate);
    }
    appendElementToFilterWindow(element) {
        const $filterWindowBody = document.querySelector('.filterWindowBody');
        $filterWindowBody.appendChild(element);
    }
    moveWindowEvent() {
        const $filterWindow = document.querySelector('.filterWindow');
        if ($filterWindow != null) {
            $filterWindow.addEventListener('mousedown', () => {
                $filterWindow.classList.add('filterWindowMovePointer');
                document.addEventListener('mousemove', moveWindow);
            });
        }
        else
            throw new Error('$window is null and not an element');
        document.addEventListener('mouseup', () => {
            $filterWindow.classList.remove('filterWindowMovePointer');
            document.removeEventListener('mousemove', moveWindow);
        });
        function moveWindow({ movementX, movementY }) {
            let { left, top } = window.getComputedStyle($filterWindow);
            $filterWindow.style.left = `${parseInt(left) + movementX}px`;
            $filterWindow.style.top = `${parseInt(top) + movementY}px`;
        }
    }
    saveHTML() {
        var _a;
        const $windowElement = this.generateWindowElement();
        (_a = document.querySelector('.body')) === null || _a === void 0 ? void 0 : _a.appendChild($windowElement);
    }
}
class CreateInputRange {
    constructor(min, max) {
        this.inputRange = document.createElement('input');
        this.inputRange.setAttribute('type', 'range');
        this.inputRange.setAttribute('class', 'inputRange');
        this.inputRange.setAttribute('min', min);
        this.inputRange.setAttribute('max', max);
        this.inputRange.setAttribute('value', '50');
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
                action: () => {
                    const $contrastFilterWindow = new CreateFilterWindow('Contrast');
                    $contrastFilterWindow.appendElementToFilterWindow;
                    $contrastFilterWindow.generateWindowElement();
                    $contrastFilterWindow.saveHTML();
                }
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
// Carregar modulos
(function () {
    const { loadButtons, eventClick } = new StartPage();
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
