import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';
import AlbumComponent from '../Components/AlbumComponent';
import MusicsComponent from '../Components/MusicsComponent';

class Album extends React.Component {
  constructor() {
    super();
    this.JustNumbers = this.JustNumbers.bind(this);
    this.ReturnFromFetch = this.ReturnFromFetch.bind(this);
    this.AlbumDate = this.AlbumDate.bind(this);
    this.ListOfMusics = this.ListOfMusics.bind(this);
    this.CheckboxHandler = this.CheckboxHandler.bind(this);
    this.Load = this.Load.bind(this);
    this.ChangeChecked = this.ChangeChecked.bind(this);
    this.FavoriteSongs = this.FavoriteSongs.bind(this);
    this.state = {
      Musics: [],
      fetchResponse: false,
      Loading: false,
      checked: [],
    };
  }

  componentDidMount() {
    this.FavoriteSongs();
    this.ReturnFromFetch();
  }

  MusicsFavoriteFilter(MusicId) {
    const { Musics } = this.state;
    const arrayOfIds = Musics.map((value) => value.trackId);
    const filter = arrayOfIds.indexOf(MusicId);
    this.ChangeChecked(filter);
  }

  async FavoriteSongs() {
    this.setState({ Loading: true });
    const favorite = await getFavoriteSongs();
    favorite.forEach((value) => this.MusicsFavoriteFilter(value.trackId));
    this.setState({ Loading: false });
  }

  TurnCheckInToFalse(length) {
    let newChecked = [];
    for (let i = 0; i < length; i += 1) {
      newChecked = [...newChecked, false];
    }
    newChecked.shift();
    this.setState({ checked: newChecked });
  }

  JustNumbers(string) {
    const numsStr = string.replace(/[^0-9]/g, '');
    return numsStr;
  }

  async ReturnFromFetch() {
    const { match } = this.props;
    const AlbumId = this.JustNumbers(match.url);
    const List = await getMusics(AlbumId);
    this.setState({ Musics: List, fetchResponse: true });
    this.TurnCheckInToFalse(List.length);
  }

  ChangeChecked(index) {
    const { checked } = this.state;
    const newChecked = checked;
    newChecked[index] = true;
    this.setState({ checked: newChecked });
  }

  async CheckboxHandler(index) {
    this.setState({ Loading: true });
    const { Musics } = this.state;
    await addSong(Musics[index]);
    this.setState({ Loading: false });
    this.ChangeChecked(index);
    console.log(this.state);
  }

  Load() {
    const { Loading } = this.state;
    if (Loading === false) {
      return this.ListOfMusics();
    }
    return <p>Carregando...</p>;
  }

  ListOfMusics() {
    const { Musics, fetchResponse, checked } = this.state;
    if (fetchResponse === true) {
      const musicList = Musics.map((value, index) => (
        <div key={ value.trackID }>
          <MusicsComponent
            previewUrl={ value.previewUrl }
            trackName={ value.trackName }
            trackId={ value.trackId }
            index={ index }
            Handler={ this.CheckboxHandler }
            Check={ checked[index] }
          />
        </div>
      ));
      musicList.shift();
      return musicList;
    }
  }

  AlbumDate() {
    const { Musics, fetchResponse } = this.state;
    if (fetchResponse === true) {
      return (
        <AlbumComponent
          img={ Musics[0].artworkUrl100 }
          collectionName={ Musics[0].collectionName }
          artistName={ Musics[0].artistName }
          testAlbum="album-name"
          testArtist="artist-name"
        />
      );
    }
  }

  render() {
    console.log(this.state);
    return (
      <div data-testid="page-album">
        <Header />
        <h1>Album</h1>
        {this.AlbumDate()}
        <div />
        {this.Load()}
      </div>
    );
  }
}

Album.defaultProps = {
  match: '',
};

Album.propTypes = {
  match: PropTypes.string,
};

export default Album;
