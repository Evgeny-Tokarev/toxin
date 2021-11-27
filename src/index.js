import "./js/common.js";
import "./style/style.css";
import "./img/kaka.png";
let adddddddddd = (aaa, b) => aaa + b;
console.log(adddddddddd(4, 999999));

function component() {
  const h1 = document.createElement("h1");

  h1.innerHTML = "Webpack is kakashka!!!";

  return h1;
}

document.body.appendChild(component());
