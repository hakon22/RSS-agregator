import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './style.css';
// import Icon from './avocado.png';

const component = () => {
    const element = document.createElement('div');
    const form = document.createElement('form');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const inputSubmit = document.createElement('input');
    input.setAttribute('id', 'one');
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'name');
    label.setAttribute('for', 'one');
    label.textContent = 'URL:';
    inputSubmit.setAttribute('type', 'submit');
    inputSubmit.setAttribute('value', 'Добавить');
    form.append(label, input, inputSubmit);
    element.append(form);
    element.classList.add('container');

//    const myIcon = new Image();
//    myIcon.src = Icon;

//    element.appendChild(myIcon);

    return element;
}

document.body.appendChild(component());