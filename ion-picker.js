import xin from 'xin';

let element;

class IonPickerCol extends xin.Component {
  get template () {
    return `
      <div class="picker-opts" (touchstart)="_touchStarted(evt)" (touchmove)="_touchMoved(evt)" (touchend)="_touchEnd(evt)">
        <template id="repeater" is="xin-repeat" items="[[col.options]]" as="option">
          <button is="ion-button" picker-opt
            (click)="_optionClicked(evt)"
            class="disable-hover"
            class.picker-opt-selected="[[option.selected]]"
            style.transform="[[option._trans]]">[[option.label]]</button>
        </template>
      </div>
    `;
  }

  get props () {
    return {
      col: {
        type: Array,
        observer: '_colChanged',
      },

      selectedIndex: {
        type: Number,
        observer: '_selectedIndexChanged',
      },
    };
  }

  created () {
    this.classList.add('picker-col');
  }

  _optionClicked (evt) {
    evt.stopImmediatePropagation();
    this.set('selectedIndex', this.$.repeater.indexForElement(evt.target));
  }

  _touchStarted (evt) {
    evt.stopImmediatePropagation();
    this.startY = evt.touches[0].pageY;
  }

  _touchMoved (evt) {
    evt.stopImmediatePropagation();
    this.debounce('_touchMoved', () => {
      let y = evt.touches[0].pageY;
      let deltaY = this.startY - y;
      this.update(this.y - deltaY);
    });
  }

  _touchEnd (evt) {
    evt.stopImmediatePropagation();
    let option = this.col.options.find(option => option.selected);
    let index = this.col.options.indexOf(option);
    if (index === -1) {
      index = this.col.options[0]._y > 0 ? 0 : this.col.options.length - 1;
    }
    // force notify selected index
    this['selectedIndex'] = index;
    this.notify('selectedIndex', index);
  }

  _colChanged (col) {
    let index = col ? col.selectedIndex : -1;
    this.selectedIndex = index;
    this.notify('selectedIndex', index);
  }

  _selectedIndexChanged (index) {
    let y = index > 0 ? index * -41 : 0;
    this.set('col.selectedIndex', index);
    this.set('y', y);
    this.update(y);
  }

  update (y) {
    if (this.col && this.col.options) {
      this.col.options.forEach((option, i) => {
        let posY = y + (i * 41);
        option.selected = posY >= -20 && posY <= 20;
        option._y = posY;
        option._trans = `rotateX(0deg) translate3d(0px, ${posY}px, 0px)`;
      });

      this.$.repeater.notify('items');
    }
  }
}

xin.define('ion-picker-col', IonPickerCol, { extends: 'div' });

class IonPicker extends xin.Component {
  static create (options) {
    if (!element) {
      element = document.createElement('ion-picker');
    }

    element.all(options);

    return element;
  }

  get template () {
    return `
      <ion-backdrop (click)="_cancelClicked(evt)" disable-activated="" role="presentation" tappable="" style="opacity: 0.26;"></ion-backdrop>
      <div class="picker-wrapper" style="transform: translateY(0%);">
        <div class="picker-toolbar">
          <div class="picker-toolbar-button picker-toolbar-cancel">
            <button is="ion-button" clear class="disable-hover" (click)="_cancelClicked(evt)">Cancel</button>
          </div>
          <div class="picker-toolbar-button">
            <button is="ion-button" clear class="disable-hover" (click)="_doneClicked(evt)">Done</button>
          </div>
        </div>
        <div class="picker-columns">
          <div class="picker-above-highlight"></div>
          <template is="xin-repeat" items="[[columns]]" as="column">
            <div is="ion-picker-col" col="[[column]]" style="min-width: 48px;"></div>
          </template>
          <div class="picker-below-highlight"></div>
        </div>
      </div>
    `;
  }

  get props () {
    return {
      columns: {
        type: Array,
      },

      onCancel: {
        type: Object,
      },

      onDone: {
        type: Object,
      },
    };
  }

  attached () {
    let mode = this.__app.platformMode || 'md';

    this.setAttribute('role', 'dialog');
    this.style.zIndex = 9999;
    this.classList.add(`picker-${mode}`);
  }

  present () {
    xin('app').appendChild(this);
  }

  dismiss () {
    xin('app').removeChild(this);
  }

  _cancelClicked (evt) {
    evt.stopImmediatePropagation();
    this.dismiss();
    if (this.onCancel) {
      this.onCancel();
    }
  }

  _doneClicked (evt) {
    evt.stopImmediatePropagation();
    this.dismiss();
    if (this.onDone) {
      this.onDone(this.columns.map(col => {
        let option = col.options[col.selectedIndex];
        if (option) {
          return option.value;
        }
      }));
    }
  }
}

xin.define('ion-picker', IonPicker);

export default IonPicker;
