import React from 'react';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import './charInfo.scss';

class CharInfo extends React.Component {
  state = {
    char: null,
  };

  marvelService = new MarvelService();

  getChar = async () => {
    if (!this.props.charId) return;
    const response = await this.marvelService.getCharacter(this.props.charId);
    this.setState({
      char: response.data.results[0],
    });
  };

  charIdWatcher = (prevCharId, charId) => {
    if (prevCharId === charId) return;
    this.getChar();
  };

  componentDidUpdate = (prevProps) => {
    this.charIdWatcher(prevProps.charId, this.props.charId);
  };

  render() {
    const { char } = this.state;
    return char ? <View char={char} /> : <Skeleton />;
  }
}

const View = (props) => {
  const { thumbnail, name, urls, comics } = props.char;
  return (
    <div className="char__info">
      <div className="char__basics">
        <img src={`${thumbnail.path}.${thumbnail.extension}`} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={urls[0].url} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={urls[1].url} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr"></div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.items.map((item) => {
          return (
            <li key={item.id} className="char__comics-item">
              {item.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CharInfo;
