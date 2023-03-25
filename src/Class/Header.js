export default class Header {
  constructor(title, description) {
    this.title = title;
    this.description = description;
  }

  getHeaderTitle() {
    return this.title;
  }

  getHeaderDescription() {
    return this.description;
  }
}
