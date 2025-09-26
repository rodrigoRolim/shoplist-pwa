import ItemView from "./UI/js/Item.view.mjs"
import ItemPresenter from "./UI/js/Item.presenter.mjs"

import ItemsModel from './UI/js/Item.model.mjs'

import AddItemService from "./modules/item/service/AddItem.service.mjs"
import ListItemService from "./modules/item/service/ListItems.service.mjs"

import ItemRepository from "./modules/item/repository/Item.repository.mjs"
import ItemData from "./modules/item/Data/Item.data.mjs"
import { addDoc, collection, db, deleteDoc, doc, enableIndexedDbPersistence, getDocs } from "./modules/item/Infra/firebase.data.mjs"

document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.mjs')
      .then(req => console.log('service worker registered', req))
      .catch(error => console.log('service not registered', error))
  }
  
  const data = new ItemData(addDoc, deleteDoc, doc, getDocs, collection, db, enableIndexedDbPersistence)
  const repository = new ItemRepository(data)
  const addItemService = new AddItemService(repository)
  const listItemsService = new ListItemService(repository)

  // Add item form
  ItemPresenter.init({ 
    model: new ItemsModel(), 
    view: new ItemView(),
    services: { 
      addItem: addItemService, 
      listItems: listItemsService 
    }
  })
  
})