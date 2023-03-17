import onChange from 'on-change';
import * as yup from 'yup';

export default (state, i18nextInstance) => {
  yup.setLocale({
    mixed: {
      notOneOf: 'errorDuble',
    },
    string: {
      url: 'errorValid',
    },
  });

  const render = (path, value, previousValue) => {
    if (path === 'selectors.p3.textContent') {
      /*
      if (value === 'Ссылка должна быть валидным URL') {
        state.selectors.input.classList.add('is-invalid');
      }
      if (value === 'RSS уже существует') {
        */
        state.selectors.input.classList.add('is-invalid');
//      }
    }
    if (path === 'feeds') {
      state.selectors.input.classList.remove('is-invalid');
      state.selectors.form.reset();
      state.selectors.input.focus();
      state.selectors.p3.classList.remove('text-danger');
      state.selectors.p3.classList.add('text-success');
    }
  };
  const watchedState = onChange(state, render);
  
  
    state.selectors.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const schema = yup.string().url().notOneOf(state.feeds);
        schema.validate(e.target[0].value).then((value) => watchedState.feeds.push(value))
        .catch((error) => watchedState.selectors.p3.textContent = i18nextInstance.t(error.errors[0]));
    });
};