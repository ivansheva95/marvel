

export class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiKey = 'apikey=15389df2935b2e135896f53e7a980b0e'
  _baseOffset = 210

  getResource = async (url) => {
    let response = await fetch(url)

    if(!response.ok) {
      throw new Error(`Cloud not fetch ${url}, status: ${response.status}`)
    }

    return response.json()
  }

  getAllCharacters = async (offset = this._baseOffset) => {
    const response = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
    return response.data.results.map(this._transformCharacter)
  }

  getCharacter = async (id) => {
    const response =  await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
    return this._transformCharacter(response.data.results[0])
  }

  _transformCharacter = (char) => {
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
} 