

const REG_CARD_NUM = /[^0-9 ]+/g;
const REG_NUM = /[^0-9]+/g;
const REG_VISA_MASTER_CARD = /\d{1,4}/g;

export function visaMastercardNum(value) {
  return (value.replace(REG_NUM, '').match(REG_VISA_MASTER_CARD) || []).join(' ');
}

export function cardNumber(value) {
  return value.replace(REG_CARD_NUM, '');
}

export function cardDate(value, oldValue) {
  let intValue = int(value);
  return intValue.length > 1 && (oldValue.length < value.length || oldValue.length > 3)
    ? intValue.slice(0, 2) + '/' + intValue.slice(2)
    : intValue;
}

export function int(value) {
  return value.replace(REG_NUM, '');
}
