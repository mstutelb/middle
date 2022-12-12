import './charList.scss';
import React from 'react';
import MarvelService from '../../services/MarvelService';
import Spiner from '../spiner/Spiner';

class CharList extends React.Component {
  state = {
    list: [],
    isLoading: true,
    currentPage: 1,
  };

  pageSize = 9;
  marvelService = new MarvelService();

  getCharList = async () => {
    console.log('getCharList');
    this.setState({ isLoading: true });
    const offset = (this.state.currentPage - 1) * this.pageSize;
    const response = await this.marvelService.getAllCharacters({ offset, pageSize: this.pageSize });
    this.setState({ isLoading: false });
    const newList = response.data.results;
    this.setState(({ list }) => ({
      list: [...list, ...newList],
    }));
  };

  loadMore = async () => {
    await this.setState(({ currentPage }) => {
      console.log('setState');
      return { currentPage: currentPage + 1 };
    });

    this.getCharList();
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
        <button onClick={this.loadMore} className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
