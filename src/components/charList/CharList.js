import { Component, useEffect, useRef, useState } from 'react'

import PropTypes from 'prop-types'

import { MarvelService } from '../../services/MarvelService'
import { ErrorMessage } from '../errorMessage/ErrorMessage'
import { Spinner } from '../spinner/Spinner'

import './charList.scss'

export const CharList = (props) => {

  const [charList, setCharList] = useState([]),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(false),
        [offset, setOffset] = useState(210),
        [btnDisabled, setBtnDisabled] = useState(false),
        [charEnded, setCharEnded] = useState(false),
        [fetching, setFetching] = useState(false)
  

  const marvelService = new MarvelService()

  useEffect(() => {
    if(fetching) {
      onRequest()
      setFetching(false)
    }
  }, [fetching])  

  useEffect(() => {
    setFetching(true)
  }, [])

  const onRequest = (offset) => {
    setBtnDisabled(true)

    marvelService
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError)
      console.log(marvelService.getAllCharacters(offset))
  }

  const onCharListLoaded = (chars) => {
    setCharEnded(false)
    if(chars.length < 9) {
      setCharEnded(true)
    }

    setLoading(false)
    setCharList((prevState) => [...prevState, ...chars])
    setOffset((prevState) => prevState + 9)
    setBtnDisabled(false)
  }

  const onError = () => {
    setLoading(false)
    setError(true)
  }

  const spinner = loading ? <Spinner /> : null
  const errorMessage = error ? <ErrorMessage /> : null
  const content = !(loading || error) ? <CharListItem charList={charList} {...props}/> : null

  return (
    <div className="char__list">
        {errorMessage || spinner }
        <ul className="char__grid">
          { content }
        </ul> 
        <button 
          className="button button__main button__long"
          onClick={() => onRequest(offset)}
          style={{display: charEnded ? 'none': 'block'}}
          disabled={btnDisabled}>
          <div className="inner">load more</div>
        </button>
      </div>
  )
}



class CharListItem extends Component {
 

  itemsRef = []

  setRef = (ref) => {
    this.itemsRef.push(ref)

  }

  focusOnItem = (id) => {
    this.itemsRef.forEach(item => item.classList.remove('char__item_selected'))
    this.itemsRef[id].classList.add('char__item_selected')
    this.itemsRef[id].focus()
  }
  
  render() {
    return (  
      <>  
        {
          this.props.charList.map((char, i) => {
            const { id, name, thumbnail } = char
            //const noPicture = thumbnail.match(/image_not_available.jpg$/)
            //const active = charId === id ? "char__item char__item_selected " : "char__item"
  
            let imgStyle = {'objectFit' : 'cover'};
            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return (  
              <li 
                key={id}
                tabIndex={0} 
                ref={this.setRef} 
                className="char__item"
                onClick={() => {
                  this.props.onCharSelected(id)
                  this.focusOnItem(i)
                }}
                onKeyDown={(e) => {
                  if(e.key === 'Enter') {
                    this.props.onCharSelected(id)
                    this.focusOnItem(i)
                  }
                }}>
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div className="char__name">{name}</div>
              </li>
            )
          })
        }
      </>
    )
  }

}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
  cahr: PropTypes.number
}