import { useRef } from 'react'
import PropTypes from 'prop-types'


export const CharListItem = (props) => {

  const itemsRef = useRef([])

  const focusOnItem = (id) => {
    itemsRef.current.forEach(item => item.classList.remove('char__item_selected'))
    itemsRef.current[id].classList.add('char__item_selected')
    itemsRef.current[id].focus()
  }

  return (
    <ul className="char__grid">
      {
        props.data.map((char, i) => {
          const { id, name, thumbnail } = char
          const noPicture = thumbnail.match(/image_not_available.jpg$/)
          //const active = charId === id ? "char__item char__item_selected " : "char__item"


          return (
            <li
              key={id}
              tabIndex={0}
              ref={element => itemsRef.current[i] = element}
              className="char__item"
              onClick={() => {
                props.onCharSelected(id)
                focusOnItem(i)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  props.onCharSelected(id)
                  focusOnItem(i)
                }
              }}>
              <img src={thumbnail} alt={name} style={noPicture ? { objectFit: 'unset' } : null} />
              <div className="char__name">{name}</div>
            </li>
          )
        })
      }
    </ul>
  )

}

CharListItem.propTypes = {
  data: PropTypes.array.isRequired,
  onCharSelected: PropTypes.func.isRequired
}