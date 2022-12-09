import './charList.scss';
import React from 'react';
import MarvelService from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';

class CharList extends React.Component {
  state = {
    list: [],
    isLoading: true,
  };

  marvelService = new MarvelService();

  getCharList = async () => {
    this.setState({ isLoading: true });
    const response = await this.marvelService.getAllCharacters();
    this.setState({ isLoading: false });
    const list = response.data.results;
    this.setState({
      list,
    });
  };

  componentDidMount = () => {
    this.getCharList();
  };

  render() {
    const { onChangeChar } = this.props;
    const { list, isLoading } = this.state;
    const elementList = (
      <ul className="char__grid">
        {list.map((item) => {
          return (
            <li className="char__item" key={item.id} onClick={() => onChangeChar(item.id)}>
              <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.name} />
              <div className="char__name">{item.name}</div>
            </li>
          );
        })}
      </ul>
    );

    return (
      <div className="char__list">
        {isLoading ? <Spiner /> : null}
        {elementList}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
