import React, { Component } from 'react'
import CardStore from '../stores/CardStore'
import ToAPIActions from '../actions/ToAPIActions'

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      testData: CardStore.getAllFlashCards()
    }

    this.testFunc = this.testFunc.bind(this)
    this._onChange = this._onChange.bind(this)
  }

  componentWillMount() {
    CardStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    CardStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ 
      testData: CardStore.getAllFlashCards() 
    })
  }

  testFunc(e){
    e.preventDefault()
    ToAPIActions.getFlashCards()
  }

  render() {
    return (
      <div>
        {this.state.testData ? <h1>{this.state.testData}</h1> : <h1>data not received</h1> }
        <button className="btn btn-primary" onClick={this.testFunc}>Test</button> 
      </div>

    )
  }
}
  