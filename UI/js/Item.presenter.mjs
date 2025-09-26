export default class AddItemFormPresenter {
  static async init({ model, view, services }) {
    this.addedItem = {}
    
    this.model = model
    this.view = view
    this.services = services

    this.view.saveItem(this.addItem.bind(this), this.listItems.bind(this))
    this.view.renderAllItems(this.listItems.bind(this))
  }

  static async addItem(item) {
    const either = await this.services.addItem.execute(item)
    return either.matchWith({
      right: (item) => {
        return this.model.addItem(item)
      },
      left: (error) => {
        console.error(error)
        return error
      },
    })
  }

  static async listItems() {
    const either = await this.services.listItems.execute()
    return either.matchWith({
      right: (items) => {
        return this.model
          .addItems(items)
          .map(item => `nome: ${item.name} quantidade: ${item.quantity} unidade: ${item.unit} preço da unidade: ${item.unitPrice}`)
      },
      left: (error) => {
        console.error(error)
        return error
      },
    })
  }

  #formatToBRLCurrency(value) {
    const commaPosition = value.toString().indexOf('.')
    const splitedValue = value.toString().split('.')
    const integerPart = splitedValue[0]
    const decimalPart = splitedValue[1]
    const numberVector = integerPart.split('')
    const dotsCount = Math.round(integerPart.length / 3)
    const firstDotPosition = integerPart.length % 3 || 3
    
    numberVector.slice(firstDotPosition, 0, '.')

    for(let i = 0; i < dotsCount; i++) {
      
    }
  }
}
