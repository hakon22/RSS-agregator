export default class Post {
  constructor(id, title, description, link) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.link = link;
    this.status = false;
  }

  getId() {
    return this.id;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getLink() {
    return this.link;
  }

  getStatus() {
    return this.status;
  }

  setStatus() {
    this.status = true;
  }
}
