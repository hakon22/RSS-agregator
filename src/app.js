import i18n from 'i18next';
import createDom from './createDom.js';
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
          name_feeds: 'Ленты',
          name_posts: 'Новости',
          nameNotice: 'Начните читать RSS сегодня! Это легко, это красиво.',
          example: 'Пример: https://ru.hexlet.io/lessons.rss',
          label: 'Ссылка RSS',
          submitButtonName: 'Добавить',
          errorValid: 'Ссылка должна быть валидным URL',
          errorNetwork: 'Проверьте подключение к Интернету',
          errorDuble: 'RSS уже существует',
          addSuccess: 'RSS успешно загружен',
          dontParse: 'Ресурс не содержит валидный RSS',
          view: 'Просмотр',
          project_text: 'created by ',
          project_link: 'https://github.com/hakon22/frontend-project-11',
          project_creator: 'Алексей Каледкин',
        },
      },
    },
  });

  createDom(i18nextInstance);

  const state = {
    selectors: {
      form: document.querySelector('form'),
      p3: document.querySelector('.feedback'),
      input: document.querySelector('input'),
      divPosts: document.querySelector('.posts'),
      divFeeds: document.querySelector('.feeds'),
    },
    dataLinks: {},
    dataLinksTemp: {
      data: [],
    },
    links: [],
  };

  watcher(state, i18nextInstance);
};
