import mjolnir from '../../resources/img/mjolnir.png'
import { MarvelService } from '../../services/MarvelService'
import { Spinner } from '../spinner/Spinner'
import { ErrorMessage } from '../errorMessage/ErrorMessage'

import './randomChar.scss'
import React from 'react'


export class RandomChar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      char: {},
      loading: true,
      error: false
     }

     console.log('constructor')
  }

  componentDidMount() {
    console.log('mount')
    this.updateChar()
  }

  onCharLoaded = (char) => {
    this.setState({
      char, 
      loading: false
    })
  }

  onCharLoading = () => {
    this.setState({
      loading: true
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  marvelService = new MarvelService()

  updateChar = () => {
    console.log('update')
    const id = Math.floor(Math.random() * (1011400 - 1011000 + 1) + 1011000);
    this.onCharLoading()
    this.marvelService
        .getCharacter(id)
        .then(this.onCharLoaded)
        .catch(this.onError)
  }

  render() {
    console.log('render')
    const {char, loading, error} = this.state

    const spinner = loading ? <Spinner /> : null
    const errorMessage = error ? <ErrorMessage /> : null
    const content = !(spinner || errorMessage) ? <View char={char}/> : null

    return (
      <div className="randomchar">
       { spinner || errorMessage || content }
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!<br/>
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
            Or choose another one
          </p>
          <button className="button button__main">
            <div onClick={this.updateChar} className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    )
  }

}

const View = ({ char }) => {
  const {name, descrition, thumbnail, homepage, wiki} = char

  const noPicture = thumbnail.match(/image_not_available.jpg$/)

  return (
    <div className="randomchar__block">
      <img src={thumbnail} style={noPicture ? { objectFit: 'contain' } : null} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{descrition}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}
