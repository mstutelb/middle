import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import decoration from '../../resources/img/vision.png';
import React from 'react';
import ErrorWrapper from '../errorWrapper/ErrorWrapper';

class App extends React.Component {
  state = {
    selectedChar: null,
  };

  onChangeChar = (id) => {
    this.setState({
      selectedChar: id,
    });

    console.log(id);
  };

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />
          <div className="char__content">
            <CharList onChangeChar={this.onChangeChar} />
            <ErrorWrapper>
              <CharInfo charId={this.state.selectedChar} />
            </ErrorWrapper>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    );
  }
}

export default App;
