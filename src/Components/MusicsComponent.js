import React from 'react';
import PropTypes from 'prop-types';
import './Component.css';

class MusicsComponent extends React.Component {
  render() {
    const { previewUrl, trackName, trackId, index, Handler, Check } = this.props;
    return (

      <div className="AudioTracks">
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          {}
        </audio>
        <label htmlFor="Favorite">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            checked={ Check }
            type="checkbox"
            id="Favorite"
            onChange={ () => { Handler(index); } }
          />
        </label>
      </div>
    );
  }
}

MusicsComponent.defaultProps = {
  previewUrl: '',
  trackName: '',
  trackId: '',
  index: null,
  Handler: undefined,
  Check: false,
};

MusicsComponent.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
  trackId: PropTypes.string,
  index: PropTypes.number,
  Handler: PropTypes.func,
  Check: PropTypes.bool,
};

export default MusicsComponent;
