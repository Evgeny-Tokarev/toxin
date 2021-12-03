// import * as $ from "jquery";
import './style/style.scss';
import './img/kaka.png';
function component() {
  const h1 = document.createElement('h1');

  h1.innerHTML = 'Webpack';
  h1.classList.add('heading');

  return h1;
}

document.body.appendChild(component());
