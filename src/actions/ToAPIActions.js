import API from '../API'

const ToAPIActions = {
  getFlashCards(){
  console.log('In the toAPIActions action: ')
  API.getFlashCards() 
  }
}
export default ToAPIActions