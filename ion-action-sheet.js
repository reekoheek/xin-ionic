import xin from 'xin';

class IonActionSheet extends xin.Component {
  get template () {
    return `
      <ion-backdrop (click)="_ionBackdropClicked(evt)" role="presentation" style="opacity: 0.4;"></ion-backdrop>
      <div class="action-sheet-wrapper" style="transform: translateY(0%);">
        <div class="action-sheet-container">
          <div class="action-sheet-group">
            <div class="action-sheet-title" id="acst-hdr-1">Albums</div>
            <button class="disable-hover action-sheet-button action-sheet-button-ios action-sheet-destructive action-sheet-button-default action-sheet-button-default-ios" ion-button="action-sheet-button">
              <span class="button-inner">Delete</span>
              <div class="button-effect"></div>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  created () {
    this.role = 'dialog';
    this.style.zIndex = '9999';
  }

  present () {
    let mode = this.app.platformMode || 'md';
    this.classList.add(`action-sheet-${mode}`);
    this.app.appendChild(this);
  }

  dismiss () {
    this.app.removeChild(this);
  }

  _ionBackdropClicked (evt) {
    this.dismiss();
  }
}

xin.define('ion-action-sheet', IonActionSheet);

let element;
function create (options) {
  if (!element) {
    element = document.createElement('ion-action-sheet');
  }

  // options = options || {};
  //
  // options.title = options.title || '';
  // options.subtitle = options.subtitle || '';
  // if (typeof options.enableBackdropDismiss === 'undefined') {
  //   options.enableBackdropDismiss = true;
  // }

  element.set('app', xin('app'));
  element.all(options);

  return element;
}

module.exports = IonActionSheet;
module.exports.create = create;
