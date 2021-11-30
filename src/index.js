import "./js/common.js";
import './style/style.scss';
import './img/kaka.png'
let add = (a,b) => a+b;
console.log(add(4,20));


function component() {
    const h1 = document.createElement("h1")
  
    h1.innerHTML =("Webpack is not kakashka!!!");
    h1.classList.add("heading");
  
    return h1;
  }
  
  document.body.appendChild(component());