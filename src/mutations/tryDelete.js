export default class TryDelete {
  #deleteFunc;

  constructor({ deleteFunc }) {
    this.#deleteFunc = deleteFunc;
  }

  async runAsync() {
    /** Note - no error handling b/c useMutation does it for us */
    await this.#deleteFunc(); /** No body for delete */
  }
}
