export default class Model {
  constructor() {
    this.presenter = null;
    this.listValues = {};
  }

  registerWith(presenter) {
    this.presenter = presenter;
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  setItem(name, newValue) {
    console.log(newValue);
    let isMatch = false;
    $.each(Object.values(this.listValues), (value) => {
      if (value === name) {
        this.listValues[name] = newValue;
        isMatch = true;
      }
      if (!isMatch) {
        this.listValues[name] = newValue;
      }
    });
  }

  getValue(name) {
    console.log(name);
    return this.listValues[name];
  }
}
