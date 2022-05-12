import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import AlbumComponent from '../Components/AlbumComponent';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      dissableBtn: true,
      albumlist: [],
      checkSearch: false,
      artistName: '',
    };
    this.SearchInput = this.SearchInput.bind(this);
    this.SearchBtn = this.SearchBtn.bind(this);
  }

  ResultMensage() {
    const { checkSearch, albumlist, artistName } = this.state;
    if (checkSearch === true && albumlist.length === 0) {
      return (
        <h4>Nenhum álbum foi encontrado</h4>
      );
    }
    if (checkSearch === true && albumlist.length !== 0) {
      return (
        <h4>{`Resultado de álbuns de: ${artistName}`}</h4>
      );
    }
  }

  SearchInput(event) {
    const minLength = 2;
    this.setState({ search: event.target.value });
    if (event.target.value.length >= minLength) {
      this.setState({ dissableBtn: false });
    } else {
      this.setState({ dissableBtn: true });
    }
  }

  listOfAlbuns(array) {
    const list = array.map((value) => (
      <div key={ value.collectionId }>
        <Link
          to={ `/album/${value.collectionId}` }
          data-testid={ `link-to-album-${value.collectionId}` }
        >
          <AlbumComponent
            img={ value.artworkUrl100 }
            collectionName={ value.collectionName }
            artistName={ value.artistName }
          />
        </Link>
      </div>
    ));
    return list;
  }

  async SearchBtn() {
    const { search } = this.state;
    this.setState({ albumlist: [], artistName: search });
    let returnApi = [];
    returnApi = await searchAlbumsAPI(search);
    this.setState({ search: '', albumlist: returnApi, checkSearch: true });
  }

  render() {
    const { dissableBtn, search, albumlist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <section>
          <form>
            <input
              type="text"
              data-testid="search-artist-input"
              value={ search }
              onChange={ this.SearchInput }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ dissableBtn }
              onClick={ this.SearchBtn }
            >
              Procurar

            </button>
          </form>
          {this.ResultMensage()}
          {this.listOfAlbuns(albumlist)}
        </section>
      </div>
    );
  }
}

export default Search;
