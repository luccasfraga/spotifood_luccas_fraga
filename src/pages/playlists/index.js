import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Creators as playlistActions } from '../../store/ducks/playlists';
import apiInterceptor from '../../services/apiInterceptor';

class Playlists extends Component {
  state = {};

  componentDidMount() {
    const { playlistData } = this.props;

    this.props.playlistActions.getPlaylistDataRequest(apiInterceptor);
  }

  render() {
    return (
      <div>
        <h1>Playlist</h1>
      </div>
    );
  }
}

Playlists.defaultProps = {};

Playlists.propTypes = {};

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
