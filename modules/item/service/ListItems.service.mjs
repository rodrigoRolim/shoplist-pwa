import { Either } from "../../../utils/either.mjs"
import ItemEntity from "../entity/Item.entity.mjs"

export default class ListItemService {
  constructor(repository) {
    this.repository = repository
  }

  async execute() {
    try {
      const { docs } = await this.repository.listItems()
      const items = docs.map(itemDoc => new ItemEntity(
        itemDoc.data().name, 
        itemDoc.data().quantity, 
        itemDoc.data().unit, 
        itemDoc.data().unitPrice
      ))
      return Promise.resolve(Either.right(items))
    } catch(error) {
      return Promise.resolve(Either.left({ message: 'Erro ao listar documentos', error }))
    }
  }
}