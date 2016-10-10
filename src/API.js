import { get } from 'axios'
import ServerActions from './actions/ServerActions'

const API = {
  getFlashCards(){
    get(`http://localhost:8000/test`)
      .then(res => {
        let { data } = res
        console.log('data: ', data)
        ServerActions.receiveFlashCards(data)
      })
      .catch(console.error)
  }
}

export default API