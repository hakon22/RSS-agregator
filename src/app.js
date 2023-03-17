import _ from 'lodash';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from 'i18next';
import watcher from './watcher.js';

export default () => {
    const i18nextInstance = i18n.createInstance();
    i18nextInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
        ru: {
            translation: {
                name: 'RSS агрегатор',
                nameNotice: 'Начните читать RSS сегодня! Это легко, это красиво.',
                example: 'Пример: https://ru.hexlet.io/lessons.rss',
                label: 'Ссылка RSS',
                submitButtonName: 'Добавить',
                errorValid: 'Ссылка должна быть валидным URL',
                errorDuble: 'RSS уже существует',
                },
            },
        },
    });

    const body = document.querySelector('body');
    const main = document.createElement('main');
    const section = document.createElement('section');
    const element = document.createElement('div');
    const divForm = document.createElement('div');
    const divRow = document.createElement('div');
    const divCol = document.createElement('div');
    const divColAuto = document.createElement('div');
    const divFloating = document.createElement('div');
    const form = document.createElement('form');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const inputSubmit = document.createElement('button');
    const h1 = document.createElement('h1');
    const p1 = document.createElement('p');
    const p2 = document.createElement('p');
    const p3 = document.createElement('p');
    h1.classList.add('display-3', 'mb-0');
    h1.textContent = i18nextInstance.t('name');
    p1.classList.add('lead');
    p1.textContent = i18nextInstance.t('nameNotice');
    p2.classList.add('mt-2', 'mb-0', 'text-secondary');
    p2.textContent = i18nextInstance.t('example');
    p3.classList.add('feedback', 'm-0', 'position-absolute', 'small', 'text-danger');
    body.classList.add('d-flex', 'flex-column', 'min-vh-100');
    main.classList.add('flex-grow-1');
    section.classList.add('container-fluid', 'bg-dark', 'p-5');
    element.classList.add('row');
    divForm.classList.add('col-md-10', 'col-lg-8', 'mx-auto', 'text-white');
    divRow.classList.add('row');
    divCol.classList.add('col');
    divFloating.classList.add('form-floating');
    divColAuto.classList.add('col-auto');
    form.classList.add('rss-form', 'text-body');
    form.setAttribute('action', '');
    input.classList.add('form-control', 'w-100');
    input.setAttribute('id', 'url-input');
    input.setAttribute('autofocus', '');
    input.setAttribute('required', '');
    input.setAttribute('name', 'url');
    input.setAttribute('aria-label', 'url');
    input.setAttribute('placeholder', 'ссылка RSS');
    input.setAttribute('autocomplete', 'off');
    label.setAttribute('for', 'url-input');
    label.textContent = i18nextInstance.t('label');
    inputSubmit.setAttribute('type', 'submit');
    inputSubmit.textContent = i18nextInstance.t('submitButtonName');
    inputSubmit.classList.add('h-100', 'btn', 'btn-lg', 'btn-primary', 'px-sm-5');
    divColAuto.append(inputSubmit);
    divFloating.append(input, label);
    divCol.append(divFloating);
    divRow.append(divCol, divColAuto);
    form.append(divRow);
    divForm.append(h1, p1, form, p2, p3);
    element.append(divForm);
    section.append(element);
    main.append(section);
    document.body.appendChild(main);

    const state = {
        selectors: {
            form: form,
            p3: p3,
            input: input,
        },
        feeds: [],
    };

    watcher(state, i18nextInstance);
}
