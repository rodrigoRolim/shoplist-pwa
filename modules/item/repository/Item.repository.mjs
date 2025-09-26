export default class ItemRepository {
  constructor(data) {
    this.data = data
  }

  addItem(item) {
    return this.data.addItemToDB(item)
  }
  
  listItems() {
    return this.data.listItemsFromDB()
  }

  removeItem(id) {
    return this.data.removeItemFromDB(id)
  }

  listenForItemsCollectionChanges() {
    return this.data.listenToCollectionChanges()
  }
}
