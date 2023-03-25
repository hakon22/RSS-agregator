export default class Post {
  constructor(id, title, description, link) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.link = link;
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
}
