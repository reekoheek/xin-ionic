import xin from 'xin';
import { val } from 'xin/object';
import IonPicker from './ion-picker';

import moment from 'moment';

const FORMATTING_TOKENS = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g; // eslint-disable-line no-useless-escape
const ELIGIBLE_TOKENS = ['h', 'hh', 'H', 'HH', 'm', 'mm', 's', 'ss', 'S', 'SS', 'a', 'A', 'M', 'MM', 'MMM', 'DD', 'YYYY'];

const DAY_HOURS = (() => { let days = []; for (let i = 0; i < 12; i++) days.push(i + 1); return days; })();
const HOURS = (() => { let days = []; for (let i = 0; i < 24; i++) days.push(i); return days; })();
const MINUTES = (() => { let days = []; for (let i = 0; i < 60; i++) days.push(i); return days; })();
const MONTHS = (() => { let days = []; for (let i = 0; i < 12; i++) days.push(i); return days; })();
const AMPM = ['am', 'pm'];

const NOW = new Date();

class IonDateTime extends xin.Component {
  get template () {
    return '' +
    `
      <div class="datetime-text">[[valueText]]</div>
      <button (click)="_showActionSheet" id="btn" aria-haspopup="true" class="item-cover disable-hover item-cover-default" ion-button="item-cover" type="button">
        <span class="button-inner"></span>
        <div class="button-effect"></div>
      </button>
    `;
  }

  get props () {
    return {
      value: {
        type: Date,
        notify: true,
      },

      valueText: {
        type: String,
        value: '',
        computed: '_computeValueText(value)',
      },

      displayFormat: {
        type: String,
        required: true,
      },

      pickerFormat: {
        type: String,
        required: true,
      },

      min: {
        type: String,
        value: () => NOW.getFullYear() - 50,
      },

      max: {
        type: String,
        value: () => NOW.getFullYear() + 50,
      },
    };
  }

  attached () {
    let mode = (this.__app && this.__app.platformMode) || 'md';

    this.classList.add(`datetime-${mode}`);
    this.$.btn.classList.add(`item-cover-${mode}`);
    this.$.btn.classList.add(`item-cover-default-${mode}`);
  }

  _computeValueText (dt) {
    if (dt) {
      return moment(dt).format(this.displayFormat);
    }
  }

  _getPickerColumns (dt) {
    dt = dt || new Date();
    let now = moment(dt);

    let columns = [];
    let unparsedTokens = [];

    this.pickerFormat.match(FORMATTING_TOKENS).forEach(token => {
      if (ELIGIBLE_TOKENS.indexOf(token) === -1) return;

      let column = {
        options: [],
        selectedIndex: -1,
      };

      columns.push(column);

      switch (token) {
        case 'h':
          column.options = DAY_HOURS.map(h => ({ label: h + '', value: h + '' }));
          break;
        case 'hh':
          column.options = DAY_HOURS.map(h => ({ label: (h < 10) ? `0${h}` : `${h}`, value: (h < 10) ? `0${h}` : `${h}` }));
          break;
        case 'H':
          column.options = HOURS.map(h => ({ label: h + '', value: h + '' }));
          break;
        case 'HH':
          column.options = HOURS.map(h => ({ label: (h < 10) ? `0${h}` : `${h}`, value: (h < 10) ? `0${h}` : `${h}` }));
          break;
        case 'm':
          column.options = MINUTES.map(m => ({ label: m + '', value: m + '' }));
          break;
        case 'mm':
          column.options = MINUTES.map(m => ({ label: (m < 10) ? `0${m}` : `${m}`, value: (m < 10) ? `0${m}` : `${m}` }));
          break;
        case 'M':
          column.options = MONTHS.map(m => ({ label: (m + 1) + '', value: (m + 1) + '' }));
          break;
        case 'MM':
          column.options = MONTHS.map(m => ({ label: ((m + 1) < 10) ? `0${(m + 1)}` : `${(m + 1)}`, value: ((m + 1) < 10) ? `0${(m + 1)}` : `${(m + 1)}` }));
          break;
        case 'MMM':
          let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          column.options = MONTHS.map(m => ({
            label: months[m],
            value: months[m],
          }));
          break;
        case 'a':
          column.options = AMPM.map(a => ({ label: a, value: a }));
          break;
        case 'A':
          column.options = AMPM.map(a => ({ label: a.toUpperCase(), value: a.toUpperCase() }));
          break;
        case 'DD':
          let results = [];
          for (let i = 1; i <= 31; i++) {
            let label = i < 10 ? `0${i}` : `${i}`;
            results.push({
              label: label,
              value: label,
            });
          }
          column.options = results;
          break;
        case 'YYYY':
          let years = [];
          for (let i = this.min; i <= this.max; i++) {
            years.push({
              label: i + '',
              value: i + '',
            });
          }
          column.options = years;
          break;
        default:
          unparsedTokens.push(token);
      }

      let nowToken = now.format(token);
      let options = val(column.options);
      let selected = options.find(c => {
        return c.label === nowToken;
      });

      if (selected === null || selected === undefined) {
        selected = (Math.abs(options[0].value - nowToken) < Math.abs(options[options.length - 1].value - nowToken))
          ? options[0]
          : options[options.length - 1];
      }

      if (selected !== null && selected !== undefined) {
        column.selectedIndex = options.indexOf(selected);
      }
    });

    if (unparsedTokens.length) {
      console.warn(`Unparsed datetime tokens ${unparsedTokens}`);
    }
    return columns;
  }

  _showActionSheet () {
    let columns = this._getPickerColumns(this.value);
    let picker = IonPicker.create({
      columns: columns,
      onDone: data => {
        this.set(
          'value',
          moment(this.pickerFormat.match(FORMATTING_TOKENS).map((token, index) => {
            return ELIGIBLE_TOKENS.indexOf(token) === -1 ? token : data.splice(0, 1).pop();
          }).join(''),
          this.pickerFormat).toDate()
        );
      },
    });
    picker.present();
  }
}

xin.define('ion-datetime', IonDateTime);
