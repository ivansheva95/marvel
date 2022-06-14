import { useHttp } from '../hooks/http.hook'

export const useMarvelService = () =>  {
  const { 
    loading, 
    error, 
    process, 
    setProcess, 
    request, 
    clearError } = useHttp()

  
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/',
        _apiKey = 'apikey=15389df2935b2e135896f53e7a980b0e',
        _OffsetChar = 210

  

  const getAllCharacters = async (offset = _OffsetChar) => {
    const response = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
    return response.data.results.map(_transformCharacter)
  }

  const getCharacter = async (id) => {
    const response =  await request(`${_apiBase}characters/${id}?${_apiKey}`)
    return _transformCharacter(response.data.results[0])
  }

  const getCharacterByName = async (name) => {
    const response = await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
    return response.data.results.map(_transformCharacter)
  }

  const getComics = async (offset = 0) => {
    const response = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
    return response.data.results.map(_transformComics)
  }

  const getComic = async (id) => {
    const response = await request(`${_apiBase}comics/${id}?${_apiKey}`)
    return _transformComics(response.data.results[0])
  }

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      descrition: char.descrition ? `${char.descrition.slice(0, 250)}...` : 'No description',
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items.slice(0, 10)
      //.filter(index => index < 10)
    }
  }

  const _transformComics = comics => {
    return {
      id: comics.id,
      name: comics.series.name,
      price: comics.prices[0].price == 0 ? 'NOT AVAILABLE' : `${comics.prices[0].price}$`,
      thumbnail: `${comics.thumbnail.path}.${comics.thumbnail.extension}`,
      title: comics.title,
      description: comics.description || 'There is no description',
      pageCount: comics.pageCount ? `${comics.pageCount} p.` : 'No information about the number of pages',
      language: comics.textObjects.language || 'en-us'
    }
  }

  return {
    loading,
    error,
    process,
    setProcess,
    getAllCharacters,
    getCharacter,
    getCharacterByName,
    getComics,
    getComic,
    clearError
  }
} 