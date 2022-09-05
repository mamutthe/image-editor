/**
 *  Criar um elemento de um botão
 */
var CreateButton = /** @class */ (function () {
    /**
     *
     * @param {*} name - Nome de exibição do botão.
     * @param {*} loc  - Localização do elemento na tela, ele vai adicionar uma class leftNavbar ou rightNavbar.
     */
    function CreateButton(name, loc) {
        this.name = name;
        if (!_TYPELOC.includes(loc))
            throw new Error("".concat(loc, " n\u00E3o \u00E9 um TypeLoc valido!"));
        this.loc = document.querySelector(".".concat(loc));
    }
    Object.defineProperty(CreateButton.prototype, "buttonIcon", {
        /**
         *  Retornar o elemento da imagem gerada pela função buttonIcon.
         */
        get: function () {
            return this._buttonIcon;
        },
        /**
         * Criar um elemento de imagem.
         *
         * @param {*} svgIcon - Nome do arquivo em /icons
         */
        set: function (svgIcon) {
            var buttonIcon = document.createElement("img");
            buttonIcon.setAttribute("class", "buttonIcon");
            buttonIcon.setAttribute("src", "/icons/".concat(svgIcon));
            this._buttonIcon = buttonIcon;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateButton.prototype, "buttonAction", {
        /**
         * Retornar o HTML da ação do botão.
         */
        get: function () {
            return this._buttonAction;
        },
        /**
         * Setar HTML da ação do botão.
         *
         * @param {*} action - HTML
         */
        set: function (action) {
            this._buttonAction = action;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreateButton.prototype, "HTML", {
        /**
         * Gerar o HTML do botão.
         */
        get: function () {
            if (this.name === undefined || this.loc === undefined)
                throw new Error("Invalid HTML");
            var filterButton = document.createElement("button");
            filterButton.setAttribute("type", "button");
            filterButton.setAttribute("class", "filterButton purpleGradient");
            filterButton.setAttribute("id", this.name);
            filterButton.setAttribute("title", this.name);
            // Adicionar Icone
            if (this._buttonIcon !== undefined)
                filterButton.appendChild(this.buttonIcon);
            return filterButton;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Salvar o HTML do botão no elemento da localização escolhida.
     */
    CreateButton.prototype.save = function () {
        var buttonEntry = document.createElement("button-entry");
        if (this._buttonAction !== undefined) {
            var buttonAction = document.createElement("button-action");
            buttonAction.appendChild(this.buttonAction);
            buttonEntry.appendChild(buttonAction);
        }
        buttonEntry.appendChild(this.HTML);
        this.loc.appendChild(buttonEntry);
    };
    return CreateButton;
}());
/**
 *  Modulos da página
 */
var Start = /** @class */ (function () {
    function Start() {
    }
    /**
     *  Botões
     */
    Start.prototype.loadingButtons = function () {
        var listButtons = [
            {
                name: "Brightness",
                icon: "brightness.svg",
                pos: "leftNavbar",
                action: function () {
                    var inputRange = document.createElement("input");
                    inputRange.setAttribute("type", "range");
                    inputRange.setAttribute("class", "range");
                    inputRange.setAttribute("min", "0.0");
                    inputRange.setAttribute("max", "8");
                    inputRange.setAttribute("value", "0");
                    inputRange.setAttribute("step", "0.1");
                    return inputRange;
                }
            },
            {
                name: "Contrast",
                icon: "contrast.svg",
                pos: "leftNavbar",
                action: undefined
            },
            {
                name: "Sharpness",
                icon: "sharpness.svg",
                pos: "leftNavbar",
                action: undefined
            },
            {
                name: "Temperature",
                icon: "temperature.svg",
                pos: "rightNavbar",
                action: undefined
            },
            {
                name: "Color",
                icon: "color.svg",
                pos: "rightNavbar",
                action: undefined
            },
            {
                name: "Information",
                icon: "information.svg",
                pos: "rightNavbar",
                action: undefined
            },
        ];
        listButtons.forEach(function (buttonObj) {
            var name = buttonObj.name, icon = buttonObj.icon, pos = buttonObj.pos, action = buttonObj.action;
            var button = new CreateButton(name, pos);
            button.buttonIcon = icon;
            if (action !== undefined)
                button.buttonAction = action();
            button.save();
        });
    };
    /**
     *  Um Footer???
     */
    Start.prototype.footer = function () {
        var footer = document.createElement("figcaption");
        footer.setAttribute("class", "footer purpleBackgound");
        document.body.appendChild(footer);
    };
    /**
     * Evento do input[type=range]
     */
    Start.prototype.eventRange = function () {
        var range = document.querySelector(".range");
        var style = document.createElement("style");
        document.body.appendChild(style);
        range.addEventListener("input", function () {
            var value = range.value;
            var valueBar = (100 * value) / range.max;
            style.textContent = ".range {background: linear-gradient(to right, #1976d2 ".concat(valueBar, "%, #a8cbee ").concat(valueBar, "%);}");
            style.textContent += ".currentImage {filter: brightness(".concat(Math.abs(value > range.max / 1.5 ? value : value / 4), ");}");
        });
    };
    return Start;
}());
// Carregar modulos
(function () {
    var loadingPage = new Start();
    loadingPage.loadingButtons();
    loadingPage.footer();
    loadingPage.eventRange();
})();
var obj = {
    x: 0,
    set addX(value) {
        this.x = value + 1;
    }
};
