export default class ItemData {
  constructor(addDoc, deleteDoc, doc, getDocs, collection, db, enableIndexedDbPersistence) {
    this.collectionName = 'shoplist'
    this.db = db
    this.addDoc = addDoc
    this.deleteDoc = deleteDoc
    this.getDocs = getDocs
    this.doc = doc
    this.enableIndexedDbPersistence = enableIndexedDbPersistence

    this.collectionShoplist = collection(db, this.collectionName)

    this.#enableIndexedDB(db)
  }

  async #enableIndexedDB() {
    return this.enableIndexedDbPersistence(this.db)
   /*  try {
      await this.enableIndexedDbPersistence(db)
    } catch(error) {
      if (error.code === 'failed-precodition') {
        console.warn('persistence failed')
      } else if (error.code === 'unimplemented') {
        console.warn('Persistence no supported.')
      }
    } */
  }

  addItemToDB(item) {
    return this.addDoc(this.collectionShoplist, item)
  }

  removeItemFromDB(id) {
    const docRef = doc(db, this.collectionName, id)
    return this.deleteDoc(docRef)
  }

  listItemsFromDB() {
    return this.getDocs(this.collectionShoplist)
  }

  listenToCollectionChanges() {
    onSnapshot(this.collectionShoplist, (snapshot) => {
      return Promise.resolve(snapshot.docChanges)
    })
  }
}