export default class MarvelService {
  _apiKey = '819e65a02a5f14bab5603114aff2dda3';
  _apiBase = 'https://gateway.marvel.com:443/v1/public/';

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = () => {
    return this.getResource(`${this._apiBase}characters?apikey=${this._apiKey}&limit=9`);
  };

  getCharacter = (id) => {
    return this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
  };
}
