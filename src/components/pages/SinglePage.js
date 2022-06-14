import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useMarvelService } from "../../services/MarvelService"

import { AppBanner } from '../appBanner/AppBanner'
import setContent from '../../utils/setContent'

const SinglePage = ({Component, dataType}) => {
  const {id} = useParams()
  const [data, setData] = useState([])
  const {process, setProcess, getComic, getCharacter} = useMarvelService()

  useEffect(() => {
    updateData()

    return () => setData([])
  }, [id])

  const updateData = () => {

    switch (dataType) {
      case 'comic':
        getComic(id)
          .then(data => setData(data))
          .then(() => setProcess('success'))
        break
      case 'character':
        getCharacter(id)
          .then(data => setData(data))
          .then(() => setProcess('success'))
        break
    }
  }

  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  )
}

export default SinglePage