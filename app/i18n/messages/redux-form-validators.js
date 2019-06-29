import Validators from 'redux-form-validators'

Object.assign(Validators.messages, {
  // absence: {
  //   id: 'form.errors.absence',
  //   defaultMessage: 'must be blank'
  // },
  // acceptance: {
  //   id: 'form.errors.acceptance',
  //   defaultMessage: 'must be accepted'
  // },
  // confirmation: {
  //   id: 'form.errors.confirmation',
  //   defaultMessage: "doesn't match `{fieldLabel}`"
  // },
  dateFormat: {
    id: 'form.errors.dateFormat',
    defaultMessage: 'Format attendu : {format}',
  },
  dateInvalid: {
    id: 'form.errors.dateInvalid',
    defaultMessage: "N'est pas une date valide",
  },
  // dateRange: {
  //   id: 'form.errors.dateRange',
  //   defaultMessage: 'shoud be {op} {date}'
  // },
  // email: {
  //   id: 'form.errors.email',
  //   defaultMessage: 'is not a valid email'
  // },
  // equalTo: {
  //   id: 'form.errors.equalTo',
  //   defaultMessage: 'must be equal to {count, number}'
  // },
  // even: {
  //   id: 'form.errors.even',
  //   defaultMessage: 'must be even'
  // },
  // exclusion: {
  //   id: 'form.errors.exclusion',
  //   defaultMessage: 'is reserved'
  // },
  // file: {
  //   id: 'form.errors.file',
  //   defaultMessage: 'is not a file'
  // },
  // fileAccept: {
  //   id: 'form.errors.fileAccept',
  //   defaultMessage: 'invalid file {count, plural, one {type} other {types ({count})}}'
  // },
  // fileTooBig: {
  //   id: 'form.errors.fileTooBig',
  //   defaultMessage:
  //     '{count, plural, one {is} other {{count} files are}} too big (maximum is {count, plural, one {{size}} other {{size} each}})'
  // },
  // fileTooFew: {
  //   id: 'form.errors.fileTooFew',
  //   defaultMessage: 'invalid number of files (minimum is {count})'
  // },
  // fileTooMany: {
  //   id: 'form.errors.fileTooMany',
  //   defaultMessage: 'invalid number of files (maximum is {count})'
  // },
  // fileTooSmall: {
  //   id: 'form.errors.fileTooSmall',
  //   defaultMessage:
  //     '{count, plural, one {is} other {{count} files are}} too small (minimum is {count, plural, one {{size}} other {{size} each}})'
  // },
  // greaterThan: {
  //   id: 'form.errors.greaterThan',
  //   defaultMessage: 'must be greater than {count, number}'
  // },
  // greaterThanOrEqualTo: {
  //   id: 'form.errors.greaterThanOrEqualTo',
  //   defaultMessage: 'must be greater than or equal to {count, number}'
  // },
  // inclusion: {
  //   id: 'form.errors.inclusion',
  //   defaultMessage: 'is not included in the list'
  // },
  // invalid: {
  //   id: 'form.errors.invalid',
  //   defaultMessage: 'is invalid'
  // },
  // lessThan: {
  //   id: 'form.errors.lessThan',
  //   defaultMessage: 'must be less than {count, number}'
  // },
  // lessThanOrEqualTo: {
  //   id: 'form.errors.lessThanOrEqualTo',
  //   defaultMessage: 'must be less than or equal to {count, number}'
  // },
  notAnInteger: {
    id: 'form.errors.notAnInteger',
    defaultMessage: "N'est pas un nombre entier",
  },
  // notANumber: {
  //   id: 'form.errors.notANumber',
  //   defaultMessage: 'is not a number'
  // },
  // odd: {
  //   id: 'form.errors.odd',
  //   defaultMessage: 'must be odd'
  // },
  // otherThan: {
  //   id: 'form.errors.otherThan',
  //   defaultMessage: 'must be other than {count, number}'
  // },
  presence: {
    id: 'form.errors.presence',
    defaultMessage: 'Champ requis',
  },
  // tooLong: {
  //   id: 'form.errors.tooLong',
  //   defaultMessage: 'is too long (maximum is {count, number} {count, plural, one {character} other {characters}})'
  // },
  tooShort: {
    id: 'form.errors.tooShort',
    defaultMessage: 'Est trop court (au moins {count, number} {count, plural, one {caractère} other {caractères}})',
  },
  // url: {
  //   id: 'form.errors.url',
  //   defaultMessage: 'is not a valid URL'
  // },
  wrongLength: {
    id: 'form.errors.wrongLength',
    defaultMessage:
      'Ne fait pas la bonne longueur (doit comporter {count, number} {count, plural, one {caractère} other {caractères}})',
  },
})
