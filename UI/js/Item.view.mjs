export default class ItemView {
  constructor() {
    this.addItemForm = document.getElementById('add-item-form')
    this.itemsListEl = document.getElementById('item-list')
    this.item = {
      name: '',
      quantity: '',
      unit: '',
      price: ''
    }
    this.itemsList = []
  }

  saveItem(addItem, listItems) {
    this.addItemForm.addEventListener('submit', (event) => {
      event.preventDefault()
      this.item = {
        name: event.target.name.value,
        quantity: event.target.count.value,
        unit: event.target.unit.value,
        unitPrice: event.target.price.value
      } 

      addItem(this.item)
      this.renderAllItems(listItems)
    })
  }

  async renderAllItems(listItems) {
    const ul = document.getElementById('item-list')
    ul.innerHTML = ''
    this.itemsList = await listItems()
    this.itemsList.forEach(item => {
      const li = document.createElement('li')
      li.innerText = item
      this.itemsListEl.appendChild(li) 
    })
  }
}
