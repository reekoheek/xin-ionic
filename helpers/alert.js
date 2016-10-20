import '../ion-alert';

let element;
let app;

function getApp () {
  if (!app) {
    app = document.querySelector('.xin-app');
  }
  return app;
}

function create (options) {
  if (!element) {
    element = document.createElement('ion-alert');
  }

  options = options || {};

  options.title = options.title || '';
  options.subtitle = options.subtitle || '';
  if (typeof options.enableBackdropDismiss === 'undefined') {
    options.enableBackdropDismiss = true;
  }

  element.set('app', getApp());
  element.set(options);

  return element;
}

module.exports.create = create;
