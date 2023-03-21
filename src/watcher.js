/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import onChange from 'on-change';
import * as yup from 'yup';
import axios from 'axios';
import uniqueId from 'lodash/uniqueId.js';

export default (state, i18nextInstance) => {
  yup.setLocale({
    mixed: {
      notOneOf: 'errorDuble',
    },
    string: {
      url: 'errorValid',
    },
  });

  const genDomFeeds = (divPosts, divFeeds) => {
    const divPostsCard = document.createElement('div');
    const divPostsCardBody = document.createElement('div');
    const divFeedsCard = document.createElement('div');
    const divFeedsCardBody = document.createElement('div');
    const h2 = document.createElement('h2');
    const h2Post = document.createElement('h2');
    const ul = document.createElement('ul');
    const ulPost = document.createElement('ul');
    h2.classList.add('card-title', 'h4');
    h2.textContent = i18nextInstance.t('name_feeds');
    h2Post.classList.add('card-title', 'h4');
    h2Post.textContent = i18nextInstance.t('name_posts');
    ul.classList.add('list-group', 'border-0', 'rounded-0');
    ulPost.classList.add('list-group', 'border-0', 'rounded-0');
    divFeedsCard.classList.add('card', 'border-0');
    divFeedsCardBody.classList.add('card-body');
    divPostsCard.classList.add('card', 'border-0');
    divPostsCardBody.classList.add('card-body');
    divFeedsCardBody.append(h2);
    divFeedsCard.append(divFeedsCardBody, ul);
    divPostsCardBody.append(h2Post);
    divPostsCard.append(divPostsCardBody, ulPost);
    divFeeds.append(divFeedsCard);
    divPosts.append(divPostsCard);
  };

  const newFeed = (feeds) => {
    const titleFirst = feeds.querySelector('title');
    const descriptionFirst = feeds.querySelector('description');
    state.general.push({ id: uniqueId('gen_'), data: { title: titleFirst.textContent, description: descriptionFirst.textContent } });
    const item = feeds.querySelectorAll('item');
    genDomFeeds(state.selectors.divPosts, state.selectors.divFeeds);
    const ul = state.selectors.divFeeds.querySelector('ul');
    const ulPost = state.selectors.divPosts.querySelector('ul');
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    h3.classList.add('h6', 'm-0');
    p.classList.add('m-0', 'small', 'text-black-50');
    h3.textContent = titleFirst.textContent;
    p.textContent = descriptionFirst.textContent;
    li.append(h3, p);
    ul.append(li);
    item.forEach((i) => {
      const title = i.querySelector('title');
      const description = i.querySelector('description');
      state.feeds.push({ id: uniqueId(), data: { title: title.textContent, description: description.textContent } });
      const liPost = document.createElement('li');
      liPost.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      liPost.textContent = title.textContent;
      ulPost.append(liPost);
    });
    console.log(state.feeds);
    console.log(state.general);
  };
  const parser = (response) => {
    const pars = new DOMParser();
    const xmlString = response.data.contents;
    const doc = pars.parseFromString(xmlString, 'application/xml');
    const error = doc.querySelector('parsererror');
    if (error) {
      throw Error;
    }
    return doc.documentElement;
  };

  const render = (path, value) => {
    if (path === 'selectors.p3.textContent') {
      if (value === i18nextInstance.t('errorValid')) {
        state.selectors.p3.classList.remove('text-success');
        state.selectors.p3.classList.add('text-danger');
        state.selectors.input.classList.add('is-invalid');
      }
      if (value === i18nextInstance.t('errorDuble')) {
        state.selectors.p3.classList.remove('text-success');
        state.selectors.p3.classList.add('text-danger');
        state.selectors.input.classList.add('is-invalid');
      }
    }
    if (path === 'links') {
      state.selectors.input.classList.remove('is-invalid');
      state.selectors.form.reset();
      state.selectors.input.focus();
      axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${value}`)
        .then((response) => {
          state.selectors.p3.classList.remove('text-danger');
          state.selectors.p3.classList.add('text-success');
          state.selectors.p3.textContent = i18nextInstance.t('addSuccess');
          const parsedDoc = parser(response);
          newFeed(parsedDoc);
        })
        .catch(() => {
          state.selectors.p3.classList.remove('text-success');
          state.selectors.p3.classList.add('text-danger');
          state.selectors.p3.textContent = i18nextInstance.t('dontParse');
          state.links.pop();
        });
    }
  };
  const watchedState = onChange(state, render);

  state.selectors.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const schema = yup.string().url().notOneOf(state.links);
    schema.validate(e.target[0].value).then((value) => watchedState.links.push(value))
      .catch((error) => {
        watchedState.selectors.p3.textContent = i18nextInstance.t(error.errors[0]);
      });
  });
};
