import View from './view';
import Model from './model';
import Presenter from './presenter';

const view = [];
const presenter = [];
const model = [];
$('.input_type_expandable').each(function (i, input) {
  model[i] = new Model();
  view[i] = new View(this);
  presenter[i] = new Presenter(view[i]);
  presenter[i].setModel(model[i]);
  view[i].registerWith(presenter[i]);
  view[i].init(input);
});
