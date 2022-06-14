import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import { useMarvelService } from '../../services/MarvelService'
// import { Spinner } from '../spinner/Spinner'
// import { ErrorMessage } from '../errorMessage/ErrorMessage'
// import { Skeleton } from '../skeleton/Skeleton'
import setContent from '../../utils/setContent'

import './charInfo.scss'


export const CharInfo = ({ charId }) => {
  
  const [char, setChar] = useState(null)
  const {process, setProcess, getCharacter} = useMarvelService() 
  
  useEffect(() => {
    updateChar()

    return () => setChar(null)
  }, [charId])

  const updateChar = () => {
    if(!charId) return

    getCharacter(charId)
      .then(char => setChar(char))
      .then(() => setProcess('success'))
  }

    // const skeleton = char || loading || error ? null : <Skeleton /> 
    // const spinner = loading ? <Spinner /> : null
    // const errorMessage = error ? <ErrorMessage /> : null
    // const content = !(loading || error || !char) ? <View char={char} /> : null

    return (
      <div className="char__info">
        {/* { skeleton || spinner || errorMessage || content } */}
        {setContent(process, View, char)}
      </div>
    )

}

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data

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