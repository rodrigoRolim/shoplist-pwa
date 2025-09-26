export default class ItemsModel {
  constructor() {
    this.items = []
  }

  addItem(item) {
    this.items.push(item)
    return item
  }

  addItems(items) {
    this.items = Array.from(items)
    return this.items
  }
  
  removeItem(id) {
    this.items = this.items.filter(item => item.id !== id)
    return id
  }

  getItems() {
    return this.items
  }

}
