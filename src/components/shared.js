export default {
  convertDate: (date) => {
    date = date.split('-');
    const [year, month, day] = date;
    return new Date(year, month, day);
  },
  validate: (evt) => {
    const { name, classList, value } = evt.target;
    let regex;

    const checkInput = (pattern, val) => {
      if (!val || !pattern.test(val)) {
        classList.add('error_field');
      } else {
        classList.remove('error_field');
      }
    };

    switch (name) {
      case 'phone_number':
        regex = /[0-9]{3}-[0-9]{3}-[0-9]{4}/;
        checkInput(regex, value);
        break;
      case 'first_name':
      case 'last_name':
        regex = /^[a-zA-Z]+(-?|\s?)([a-zA-Z]+?)$/i;
        checkInput(regex, value);
        break;
      case 'job_title':
        regex = /^[-a-z0-9,/()&:. ]*[a-z][-a-z0-9,/()&:. ]*$/i;
        checkInput(regex, value);
        break;
      case 'email':
        regex = /^\S+@\S+$/;
        checkInput(regex, value);
        break;
      default:
        return;
    }
  },
};
