import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { bindActionCreators } from 'redux';
import { Container, List, ItemList, BoxFilter } from './styles';
import { Creators as playlistActions } from '../../store/ducks/playlists';
import apiInterceptor from '../../services/apiInterceptor';

class Playlists extends Component {
  state = {
    objFilter: null,
    playlistDataFilter: null,
    searchTerm: '',
    locale: '',
    country: '',
    limit: '',
    offset: '',
    timestamp: '',
  };

  componentDidMount() {
    this.props.playlistActions.getPlaylistDataRequest(apiInterceptor);
    this.getMockFilter();
  }

  getMockFilter = async () => {
    try {
      const response = await apiInterceptor({
        baseURL: process.env.REACT_APP_API_MOCKY,
        method: 'get',
      });
      this.setState({ objFilter: response.data.filters });
    } catch (err) {
      console.log(err);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleChangeParms = (e) => {
    this.handleChange(e);
  };

  filterByText = (e, playlistData) => {
    this.handleChange(e);

    this.setState({ playlistDataFilter: playlistData }, () => {
      const { searchTerm, playlistDataFilter } = this.state;
      if (searchTerm === '') {
        return false;
      }
      const filterlist = playlistDataFilter.filter((playlist) => {
        return playlist.name.toLowerCase().includes(searchTerm.toLowerCase());
      });
      return this.setState({ playlistDataFilter: filterlist });
    });
  };

  render() {
    const {
      objFilter,
      playlistDataFilter,
      searchTerm,
      locale,
      country,
      limit,
      offset,
      timestamp,
    } = this.state;
    const { playlistData } = this.props;
    const listMap = playlistDataFilter && playlistDataFilter.length > 0 ? playlistDataFilter : playlistData;

    console.log(objFilter);

    return (
      <Container>
        <h1>Playlist</h1>
        {playlistData && (
          <Fragment>
            <BoxFilter>
              <TextField
                label="Search playlist"
                name="searchTerm"
                value={searchTerm}
                onChange={e => this.filterByText(e, playlistData)}
              />

              {objFilter && (
                <Fragment>
                  <TextField
                    select={!!objFilter}
                    label={objFilter[0].name}
                    name="locale"
                    value={locale}
                    onChange={e => this.handleChangeParms(e)}
                  >
                    {objFilter[0].values.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select={!!objFilter}
                    label={objFilter[1].name}
                    name="country"
                    value={country}
                    onChange={e => this.handleChangeParms(e)}
                  >
                    {objFilter[1].values.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    label={objFilter[2].name}
                    name="timestamp"
                    value={timestamp}
                    onChange={e => this.handleChange(e)}
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                  <TextField
                    label={objFilter[3].name}
                    type="number"
                    name="limit"
                    value={limit}
                    onChange={e => this.handleChange(e)}
                    inputProps={{
                      min: objFilter[3].validation.min,
                      max: objFilter[3].validation.max,
                    }}
                  />

                  <TextField
                    label={objFilter[4].name}
                    name="offset"
                    value={offset}
                    onChange={e => this.handleChange(e)}
                  />
                </Fragment>
              )}
            </BoxFilter>
            <List>
              {listMap.map((playlist) => {
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
          </Fragment>
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
