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

  getAllCharacters = ({ offset, pageSize }) => {
    const urlParams = new URLSearchParams();
    urlParams.append('apikey', this._apiKey);
    urlParams.append('limit', pageSize);
    urlParams.append('offset', offset);
    return this.getResource(`${this._apiBase}characters?${urlParams.toString()}`);
  };

  getCharacter = (id) => {
    return this.getResource(`${this._apiBase}characters/${id}?apikey=${this._apiKey}`);
  };
}
