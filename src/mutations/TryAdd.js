export default class TryAdd {
  #addFunc;

  constructor({ addFunc }) {
    this.#addFunc = addFunc;
  }

  async runAsync({ body }) {
    await this.#addFunc(body);
  }
}
