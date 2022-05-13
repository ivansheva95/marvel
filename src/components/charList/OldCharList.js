import { Component } from 'react'
import { MarvelService } from '../../services/MarvelService'
import { ErrorMessage } from '../errorMessage/ErrorMessage'
import { Spinner } from '../spinner/Spinner'

import './charList.scss'

export class CharList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      charList: [],
      loading: true,
      error: false,
      newItemLoading: false,
      offset: 210
    }
  }

  marvelService = new MarvelService()

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.onStartCharListLoaded)
      .catch(this.onError)
  }

  onRequest = (offset) => {
    this.onCharListLoading()

    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onError)
  }

  onCharListLoading = () => {
    this.setState({newItemLoading: true})
  }

  onStartCharListLoaded = (charList) => {
    this.setState({
        charList,
        loading: false,
        newItemLoading: false,
        offset: this.state.offset + 9
      })
  }

  onCharListLoaded = (newCharList) => {
    this.setState(({charList, offset}) => ({
        charList: [...charList, ...newCharList],
        loading: false,
        newItemLoading: false,
        offset: offset + 9
      }))
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  render() {
    const { charList, loading, error, newItemLoading, offset } = this.state

    const char = charList.map(char => {
      const { id, name, thumbnail } = char
      const noPicture = thumbnail.match(/image_not_available.jpg$/)
      

      return (
        <li key={id} onClick={() => this.props.onCharSelected(id)} className="char__item">
          <img src={thumbnail} alt={name} style={noPicture ? { objectFit: 'unset' } : null}/>
          <div className="char__name">{name}</div>
        </li>
      )
    })

    const spinner = loading ? <Spinner /> : null
    const errorMessage = error ? <ErrorMessage /> : null
    const content = !(loading || error) ? char : null

    return (
      <div className="char__list">
        {errorMessage || spinner }
        <ul className="char__grid">
          { content }
        </ul> 
        <button onClick={() => this.onRequest(offset)} disabled={newItemLoading} className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
} 