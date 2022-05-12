import React from 'react';
import PropTypes from 'prop-types';

class AlbumComponent extends React.Component {
  render() {
    const { img, testAlbum, artistName, testArtist, collectionName } = this.props;
    return (
      <div>
        <img src={ img } alt={ testAlbum } />
        <h4 data-testid={ testAlbum }>{collectionName}</h4>
        <h5 data-testid={ testArtist }>{artistName}</h5>
      </div>
    );
  }
}

AlbumComponent.defaultProps = {
  collectionName: '',
  img: '',
  testAlbum: '',
  artistName: '',
  testArtist: '',
};

AlbumComponent.propTypes = {
  collectionName: PropTypes.string,
  img: PropTypes.string,
  testAlbum: PropTypes.string,
  artistName: PropTypes.string,
  testArtist: PropTypes.string,
};

export default AlbumComponent;
