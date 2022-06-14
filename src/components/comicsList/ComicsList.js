import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useMarvelService } from '../../services/MarvelService';
import { ErrorMessage } from '../errorMessage/ErrorMessage';
import { Spinner } from '../spinner/Spinner';


import './comicsList.scss';

const setContent = (process, Component, data, btnDisabled) => {
  switch(process) {
    case 'waiting':
      return <Spinner />
    case 'loading':
      return btnDisabled ? <Component data={data}/> : <Spinner />
    case 'success':
      return <Component data={data}/>
    case 'error': 
      return <ErrorMessage />
    default: 
      throw new Error('Unexpected progress state')
  }
}

export const ComicsList = () => {

  const [comics, setComics] = useState([]),
        [offset, setOffset] = useState(100),
        [btnDisabled, setBtnDisabled] = useState(false),
        [comicEnd, setComicEnd] = useState(false)

  const {process, setProcess, getComics} = useMarvelService()

  useEffect(() => {
      onRequest(offset, true)

  }, [])
  

  const onRequest = (offset, initial) => {
    initial ? setBtnDisabled(false) : setBtnDisabled(true)

    getComics(offset)
      .then(onComicsLoaded)
      .then(() => setProcess('success'))
  }

  const onComicsLoaded = (comics) => {
    comics.length < 8 && setComicEnd(true)

    setComics(prevState => ([...prevState, ...comics]))

    setOffset(prev => prev + 8)
    setBtnDisabled(false)
  }


  return (
    <div className="comics__list">

      { setContent(process, View, comics, btnDisabled) }

      <button 
        onClick={() => onRequest(offset)}
        disabled={btnDisabled} 
        style={{'display': comicEnd ? 'none' : 'block'}}
        className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

const View = ({data}) => {
  return (
    <ul className="comics__grid">
    { 
      data.map((item, i) => {
        const {id, name, price, thumbnail} = item

        return (
          <li className="comics__item" key={i}>
            <Link to={`${id}`}>
              <img src={thumbnail} alt="ultimate war" className="comics__item-img" />
              <div className="comics__item-name">{name}</div>
              <div className="comics__item-price">{price}</div>
            </Link>
          </li>
        )
      })
    }
    
  </ul>
  )
}