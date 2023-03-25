/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import onChange from 'on-change';
import * as yup from 'yup';
import axios from 'axios';
import uniqueId from 'lodash/uniqueId.js';
import Feed from './Class/Feed.js';
import Post from './Class/Post.js';
import Header from './Class/Header.js';

export default (state, i18nextInstance) => {
  yup.setLocale({
    mixed: {
      notOneOf: 'errorDuble',
    },
    string: {
      url: 'errorValid',
    },
  });

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
  const reloadData = (url, dataOld) => {
    axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`)
      .then((response) => {
        const parsedDoc = parser(response);
        if (!parsedDoc.isEqualNode(dataOld)) {
          const data = [...parsedDoc.querySelectorAll('item')];
          const data2 = [...dataOld.querySelectorAll('item')];
          const newData = data.filter((i) => data2.indexOf(i) < 0);
//          const newData = data.filter((x) => {
  //          const title = x.querySelector('title');
    //        const result = state.dataLinks[url].data.find((y) => y.title === title.textContent);
      //      if (!result) return x;
        //  });
          let ulStr;
          console.log(newData)
          if (newData.length > 0) {
            const ulPost = state.selectors.divPosts.querySelector('ul');
            const title = newData[0].querySelector('title');
            const description = newData[0].querySelector('description');
            const link = newData[0].querySelector('link');
            const id = uniqueId();
            const post = new Post(id, title.textContent, description.textContent, link.textContent);
            state.dataLinks[url].data.push(post);
            const liPost = document.createElement('li');
            const a = document.createElement('a');
            const button = document.createElement('button');
            a.classList.add('fw-bold');
            a.setAttribute('href', post.getLink());
            a.setAttribute('data-id', post.getId());
            a.setAttribute('target', '_blank');
            a.setAttribute('rel', 'noopener noreferrer');
            a.textContent = post.getTitle();
            button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
            button.setAttribute('type', 'button');
            button.setAttribute('data-id', post.getId());
            button.setAttribute('data-bs-toggle', 'modal');
            button.setAttribute('data-bs-target', '#modal');
            button.textContent = i18nextInstance.t('view');
            liPost.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
            liPost.append(a, button);
            ulStr = liPost.outerHTML;
            ulPost.innerHTML = ulStr + ulPost.innerHTML;
          }
        }
      });
    setTimeout(reloadData, 5000, url, dataOld);
  };

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

  const newFeed = (feeds, value) => {
    const titleFirst = feeds.querySelector('title');
    const descriptionFirst = feeds.querySelector('description');
    const header = new Header(titleFirst.textContent, descriptionFirst.textContent);
    state.dataLinks[value].header = header;
    const data = feeds.querySelectorAll('item');
    if (state.links.length === 1) {
      genDomFeeds(state.selectors.divPosts, state.selectors.divFeeds);
    }
    const ul = state.selectors.divFeeds.querySelector('ul');
    const ulPost = state.selectors.divPosts.querySelector('ul');
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    const p = document.createElement('p');
    li.classList.add('list-group-item', 'border-0', 'border-end-0');
    h3.classList.add('h6', 'm-0');
    p.classList.add('m-0', 'small', 'text-black-50');
    h3.textContent = header.getHeaderTitle();
    p.textContent = header.getHeaderDescription();
    li.append(h3, p);
    ul.prepend(li);
    let ulStr = '';
    data.forEach((i) => {
      const title = i.querySelector('title');
      const description = i.querySelector('description');
      const link = i.querySelector('link');
      const id = uniqueId();
      const post = new Post(id, title.textContent, description.textContent, link.textContent);
      state.dataLinks[value].data.push(post);
      const liPost = document.createElement('li');
      const a = document.createElement('a');
      const button = document.createElement('button');
      a.classList.add('fw-bold');
      a.setAttribute('href', post.getLink());
      a.setAttribute('data-id', post.getId());
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.textContent = post.getTitle();
      button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
      button.setAttribute('type', 'button');
      button.setAttribute('data-id', post.getId());
      button.setAttribute('data-bs-toggle', 'modal');
      button.setAttribute('data-bs-target', '#modal');
      button.textContent = i18nextInstance.t('view');
      liPost.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
      liPost.append(a, button);
      ulStr += liPost.outerHTML;
    });
    ulPost.innerHTML = ulStr + ulPost.innerHTML;
    setTimeout(reloadData, 5000, value, feeds);
  };

  const render = (path, value) => {
    if (path === 'selectors.p3.textContent') {
      state.selectors.p3.classList.remove('text-success');
      state.selectors.p3.classList.add('text-danger');
      state.selectors.input.classList.add('is-invalid');
    }
    if (path === 'links') {
      const newUrl = value[value.length - 1];
      state.selectors.input.classList.remove('is-invalid');
      axios.get(`https://allorigins.hexlet.app/get?disableCache=true&url=${newUrl}`)
        .then((response) => {
          const parsedDoc = parser(response);
          newFeed(parsedDoc, newUrl);
          state.selectors.p3.classList.remove('text-danger');
          state.selectors.p3.classList.add('text-success');
          state.selectors.p3.textContent = i18nextInstance.t('addSuccess');
          state.selectors.form.reset();
          state.selectors.input.focus();
        })
        .catch((e) => {
          state.selectors.p3.classList.remove('text-success');
          state.selectors.p3.classList.add('text-danger');
          state.links.pop();
          if (e.request) {
            state.selectors.p3.textContent = i18nextInstance.t('errorNetwork');
          } else {
            state.selectors.p3.textContent = i18nextInstance.t('dontParse');
          }
        });
    }
  };
  const watchedState = onChange(state, render);

  state.selectors.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const schema = yup.string().url().notOneOf(state.links);
    schema.validate(e.target[0].value).then((value) => {
      watchedState.dataLinks[value] = new Feed();
      watchedState.links.push(value);
    })
      .catch((error) => {
        watchedState.selectors.p3.textContent = i18nextInstance.t(error.errors[0]);
      });
  });
};
