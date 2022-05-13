import { Component } from "react"

import { AppHeader } from "./components/appHeader/AppHeader"
import { RandomChar } from "./components/randomChar/RandomChar"
import { CharList } from "./components/charList/CharList"
import { CharInfo } from "./components/charInfo/CharInfo"
import { ErrorBoundary } from "./components/errorBoundary/ErrorBoundary"

import decoration from './resources/img/vision.png';

export class App extends Component {
  state = {
    charId: null
  }

  onCharSelected = (charId) => {
    this.setState({
      charId
    })
  }

  render() {
    const { charId } = this.state

    return (
      <div className="app">
        <AppHeader />
  
        <main>
          <RandomChar />
          <div className="char__content">
            <CharList charId={charId} onCharSelected={this.onCharSelected}/>
            <ErrorBoundary>
              <CharInfo charId={charId}/>
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision"/>
        </main>
      </div>
    )
  }
}