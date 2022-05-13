import { Component } from 'react'
import PropTypes from 'prop-types'

import { MarvelService } from '../../services/MarvelService'
import { Spinner } from '../spinner/Spinner'
import { ErrorMessage } from '../errorMessage/ErrorMessage'
import { Skeleton } from '../skeleton/Skeleton'

import './charInfo.scss'

export class CharInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      char: null,
      loading: false,
      error: false
    }
  }

  componentDidMount() {
      this.updateChar()
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.charId !== prevProps.charId) {
      this.updateChar()
    }
  }

  marvelService = new MarvelService() 

  updateChar = () => {
    const { charId } = this.props

    if(!charId) {
      return
    }

    this.onCharLoading()
    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError)
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

  render() {
    const { char, loading, error } = this.state

    const skeleton = char || loading || error ? null : <Skeleton /> 
    const spinner = loading ? <Spinner /> : null
    const errorMessage = error ? <ErrorMessage /> : null
    const content = !(loading || error || !char) ? <View char={char} /> : null

    return (
      <div className="char__info">
        { skeleton || spinner || errorMessage || content }
      </div>
    )
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char

  const noPicture = thumbnail.match(/image_not_available.jpg$/)


  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} style={noPicture ? { objectFit: 'unset' } : null} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {
          comics.map((comics, index) => {
            return (
              <li key={index} className="char__comics-item">
                {comics.name}
              </li>
            )
          })  
        }
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number
}