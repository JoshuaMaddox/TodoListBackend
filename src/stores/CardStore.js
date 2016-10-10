import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'

let _allFlashCards = ''

class CardStore extends EventEmitter {
  constructor(){
    super()

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'CARD_RECEIVED':
        _allFlashCards = action.payload.flashcards
        console.log('_allFlashCards: ', _allFlashCards)
        this.emit('CHANGE')
        break
      }
    })
  }

  startListening(cb){
    this.on('CHANGE', cb)
  }

  stopListening(cb){
    this.on('CHANGE', cb)
  }

  getAllFlashCards(){
    return _allFlashCards
  }

}

export default new CardStore