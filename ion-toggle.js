import xin from 'xin';

class IonToggle extends xin.Component {
  get template () {
    return '' + `
      <div class="toggle-icon" class.toggle-checked="[[checked]]">
        <div class="toggle-inner"></div>
      </div>
      <button class="item-cover disable-hover item-cover-md item-cover-default item-cover-default-md"
        ion-button="item-cover"
        role="checkbox"
        type="button"
        aria-checked$="[[checked]]"
        aria-disabled="false"
        (click)="_buttonClicked(evt)"
        >
        <span class="button-inner"></span>
        <div class="button-effect"></div>
      </button>
    `;
  }

  get props () {
    return Object.assign({}, super.props, {
      checked: {
        type: Boolean,
        notify: true,
      },
    });
  }

  attached () {
    super.attached();

    this.classList.add('toggle');
    this.classList.add('toggle-md');
  }

  _buttonClicked (evt) {
    this.set('checked', !this.checked);
  }
}

xin.define('ion-toggle', IonToggle);

export default IonToggle;
