import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'

import './singleCharacterLayout.scss'

const SingleCharacterLayout = ({ data: { thumbnail, name, descrition } }) => {
  return (
    <div className="single-character">

      <Helmet>
        <meta
          name="description"
          content={descrition}
        />
        <title>{name}</title>
      </Helmet>

      <img src={thumbnail} alt={name} className="single-character__img" />
      <div className="single-comic__info">
        <h2 className="single-character__name">{name}</h2>
        <p className="single-character__descr">{descrition}</p>
      </div>
      <Link to='/' className="single-character__back">Back to all</Link>
    </div>
  )
}

export default SingleCharacterLayout
