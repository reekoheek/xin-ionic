import xin from 'xin';
import { Async } from 'xin/fn';
import event from 'xin/event';

let queue = [];

class IonToast {
  static create (options) {
    return new IonToast(options);
  }

  constructor ({ message, duration = 3000 } = {}) {
    this.message = message;
    this.duration = duration;
  }

  present () {
    return new Promise(resolve => {
      this.presentCallback = resolve;

      queue.push(this);

      if (queue.length === 1) {
        show(queue);
      }
    });
  }

  dismiss () {
    if (this.dismissCallback) {
      this.dismissCallback();
    } else {
      this._dismiss();
    }
  }

  async _present () {
    this.el = document.createElement('ion-toast');
    this.el.setAttribute('role', 'dialog');
    this.el.classList.add('toast-md');

    this.el.innerHTML = String(`
      <div class="toast-wrapper toast-top" style="transition: transform .3s">
        <div class="toast-container">
          <div class="toast-message"></div>
        </div>
      </div>
    `);

    this.el.querySelector('.toast-message').textContent = this.message;
    xin('app').appendChild(this.el);

    await new Promise(resolve => {
      Async.run(() => {
        this.el.querySelector('.toast-wrapper').style.transform = 'translateY(0%)';
        resolve();
      }, 50);
    });

    if (this.duration !== -1) {
      await new Promise(resolve => {
        this.dismissCallback = resolve;
        Async.run(resolve, this.duration);
      });
      await this._dismiss();
    }
  }

  async _dismiss () {
    if (this.el) {
      await new Promise(resolve => {
        event(this.el).once('transitionend', () => {
          this.el.parentElement.removeChild(this.el);
          this.el = null;
          resolve();
        });
        this.el.querySelector('.toast-wrapper').style.transform = '';
      });
    }

    queue.splice(queue.indexOf(this), 1);

    this.presentCallback();
  }
}

function show (queue) {
  if (!queue.length) {
    return;
  }

  let toast = queue[0];

  toast._present().then(() => {
    show(queue);
  });
}

export default IonToast;
