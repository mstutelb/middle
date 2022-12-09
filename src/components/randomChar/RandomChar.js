import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import React from 'react';
import MarvelService from '../../services/MarvelService';
import Spiner from '../spiner/Spiner.js';
import ErrorMessage from '../errorMessage/ErrorMessage';

class RandomChar extends React.Component {
  state = {
    loading: false,
    name: null,
    description: null,
    thumbnail: null,
    homepage: null,
    wiki: null,
    timerId: null,
  };

  marvelService = new MarvelService();

  componentDidMount = () => {
    const timerId = setInterval(this.updateChar, 3000);
    this.setState({
      timerId,
    });
  };

  componentWillUnmount = () => {
    clearInterval(this.state.timerId);
  };

  updateChar = () => {
    this.setState({
      loading: true,
      isError: false,
    });
    const id = 1011005;

    this.marvelService
      .getCharacter(id)
      .then((response) => {
        const char = response.data.results[0];
        this.setState({
          name: char.name,
          description: char.description,
          thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
          homepage: char.urls[0].url,
          wiki: char.urls[1].url,
        });
      })
      .catch(() => {
        this.setState({
          isError: true,
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  };

  render() {
    const { loading, isError } = this.state;
    return (
      <div className="randomchar">
        {loading ? <Spiner /> : null}
        {isError ? <ErrorMessage /> : null}
        {!loading && !isError ? <View char={this.state} /> : null}

        <div className="randomchar__static">
          <p className="randomchar__title">
            Random character for today!
            <br />
            Do you want to get to know him better?
          </p>
          <p className="randomchar__title">Or choose another one</p>
          <button onClick={this.updateChar} className="button button__main">
            <div className="inner">try it</div>
          </button>
          <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
        </div>
      </div>
    );
  }
}

function View(props) {
  const { thumbnail, name, description, homepage, wiki } = props.char;
  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default RandomChar;
