import xin from 'xin';

class IonSearchbar extends xin.Component {
  get template () {
    return `
      <div class="searchbar-input-container">
        <div class="searchbar-search-icon"></div>
        <input class="searchbar-input" placeholder$="[[placeholder]]"
          value="{{value}}"
          type="search"
          autocomplete="off"
          autocorrect="off"
          spellcheck="false"
          (focus)="_inputFocused(evt)"
          (blur)="_inputBlurred(evt)">
        <button is="ion-button" clear
          class="searchbar-clear-icon"
          (click)="_buttonTapped(evt)"
          id="clearBtn">&nbsp;</button>
      </div>
    `;
  }

  get props () {
    return {
      value: {
        type: String,
        value: '',
        notify: true,
        observer: '_valueChanged',
      },

      placeholder: {
        type: String,
        value: '',
      },

      color: {
        type: String,
        value: 'danger',
      },
    };
  }

  attached () {
    let mode = this.__app && this.__app.platformMode || 'md';

    this.classList.add(`searchbar-${mode}`);
    this.classList.add(`searchbar-${mode}-${this.color}`);
    // this.classList.add(`searchbar-show-cancel`);
    this.classList.add(`searchbar-left-aligned`);

    this.$.clearBtn.classList.add(`button-clear`);
    this.$.clearBtn.classList.add(`button-clear-${mode}`);

    // add on focus
    // this.classList.add(`searchbar-active`);
  }

  _buttonTapped () {
    this.set('value', '');
  }

  _inputFocused () {
    this.classList.add(`searchbar-has-focus`);
  }

  _inputBlurred () {
    // hack to make sure button clickable before remove focus
    this.async(() => this.classList.remove(`searchbar-has-focus`), 100);
  }

  _valueChanged (value) {
    if (value) {
      this.classList.add(`searchbar-has-value`);
    } else {
      this.classList.remove(`searchbar-has-value`);
    }
  }
}

xin.define('ion-searchbar', IonSearchbar);

export default IonSearchbar;
