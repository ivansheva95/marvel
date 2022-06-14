import { useEffect, useState } from 'react'

import mjolnir from '../../resources/img/mjolnir.png'
import { useMarvelService } from '../../services/MarvelService'
import setContent from '../../utils/setContent'


import './randomChar.scss'


export const RandomChar = () => {
  
  const [char, setChar] = useState({})

  const { process, setProcess, getCharacter } = useMarvelService()

  useEffect(() => updateChar(), [])

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000 + 1) + 1011000);

    getCharacter(id)
      .then(char => setChar(char))
      .then(() => setProcess('success'))
  }
  
    // const spinner = loading ? <Spinner /> : null
    // const errorMessage = error ? <ErrorMessage /> : null
    // const content = !(spinner || errorMessage) ? <View char={char}/> : null

    return (
      <div className="randomchar">
       { setContent(process, View, char) }
        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!<br/>
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">
            Or choose another one
          </p>
          <button className="button button__main">
            <div onClick={updateChar} className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    )
}


const View = ({ data }) => {
  const {name, descrition, thumbnail, homepage, wiki} = data

  const noPicture = toString(thumbnail).search(/image_not_available.jpg$/)

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
