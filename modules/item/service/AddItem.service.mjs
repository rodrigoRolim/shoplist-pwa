import { Either } from "../../../utils/either.mjs"

export default class AddItemService {
  constructor(repository) {
    this.repository = repository
  }
  async execute(item) {
    try {
      await this.repository.addItem(item)
      return Promise.resolve(Either.right(true))
    } catch(error) {
      return Promise.resolve(Either.left({ message: 'Ocorreu um erro ao tentar salvar', error }))
    }
  }
}
