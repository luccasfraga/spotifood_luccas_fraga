import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Container, List, ItemList } from './styles';
import { Creators as playlistActions } from '../../store/ducks/playlists';
import apiInterceptor from '../../services/apiInterceptor';

class Playlists extends Component {
  state = {};

  componentDidMount() {
    this.props.playlistActions.getPlaylistDataRequest(apiInterceptor);
  }

  render() {
    const { playlistData } = this.props;
    return (
      <Container>
        <h1>Playlist</h1>
        {playlistData && (
          <List>
            {playlistData.map((playlist) => {
              return (
                <ItemList
                  key={playlist.id}
                  style={{ backgroundImage: `url(${playlist.images[0].url})` }}
                >
                  <a
                    href={playlist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <span>
                        {playlist.name}
                        <em>{playlist.owner.display_name}</em>
                      </span>
                    </div>
                  </a>
                </ItemList>
              );
            })}
          </List>
        )}
      </Container>
    );
  }
}

Playlists.defaultProps = {
  playlistData: null,
};

Playlists.propTypes = {
  playlistActions: PropTypes.object.isRequired,
  playlistData: PropTypes.array,
};

const mapStateToProps = store => ({
  playlistData: store.playlists.playlistData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    playlistActions: bindActionCreators(playlistActions, dispatch),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Playlists);
