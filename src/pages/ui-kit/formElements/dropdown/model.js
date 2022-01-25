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
    return this.listValues[name];
  }
}
