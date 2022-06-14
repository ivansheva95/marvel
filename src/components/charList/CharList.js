import { useEffect, useMemo, useState } from 'react'

import PropTypes from 'prop-types'

import { CharListItem } from './CharListItem'
import { useMarvelService } from '../../services/MarvelService'
import { ErrorMessage } from '../errorMessage/ErrorMessage'
import { Spinner } from '../spinner/Spinner'

import './charList.scss'

const setContent = (process, Component, data, props, btnDisabled) => {
  switch(process) {
    case 'waiting':
      return <Spinner />
    case 'loading':
      return btnDisabled ? <Component data={data} {...props}/> : <Spinner />
    case 'success':
      return <Component data={data} {...props}/> 
    case 'error':
      return <ErrorMessage />
    default:
      throw new Error('Unexpected process state')
  }
}

export const CharList = (props) => {

  const [charList, setCharList] = useState([]),
        [offset, setOffset] = useState(210),
        [btnDisabled, setBtnDisabled] = useState(false),
        [charEnded, setCharEnded] = useState(false)
  
  const {process, setProcess, getAllCharacters } = useMarvelService()

        
useEffect(() => {
  onRequest(offset, true)
}, []) 

  const onRequest = (offset, initial) => {
    initial ? setBtnDisabled(false) : setBtnDisabled(true)

      getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess('success'))
  }

  const onCharListLoaded = (chars) => {
    setCharEnded(false)
    if(chars.length < 9) {
      setCharEnded(true)
    }

    setCharList((prevState) => [...prevState, ...chars])
    setOffset((prevState) => prevState + 9)
    setBtnDisabled(false)
  }

  const element = useMemo(() => {
    return setContent(process, CharListItem, charList, props, btnDisabled)
  }, [process])

  return (
    <div className="char__list">
        
        {element}

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


CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
  cahr: PropTypes.number
}