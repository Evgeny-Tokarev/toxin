export default class Presenter {
  constructor(view) {
    this.view = view;
    this.model = null;
  }

  submit() {
    console.log(this.model.listValues);
  }

  setModel(model) {
    this.model = model;
  }

  setItem(name, value) {
    this.model.setItem(name, value);
    if (this.model.getValue(name) >= 1) {
      this.view.setListItem(name, this.model.getValue(name), false);
    } else {
      this.view.setListItem(name, this.model.getValue(name), true);
    }
  }

  increaseItem(name) {
    this.model.setItem(name, this.model.getValue(name) * 1 + 1);
    this.view.setListItem(name, this.model.getValue(name), false);
  }

  decreaseItem(name) {
    if (this.model.getValue(name) > 1) {
      this.model.setItem(name, this.model.getValue(name) - 1);
      this.view.setListItem(name, this.model.getValue(name), false);
    } else {
      this.model.setItem(name, this.model.getValue(name) - 1);
      this.view.setListItem(name, this.model.getValue(name), true);
    }
  }
}
