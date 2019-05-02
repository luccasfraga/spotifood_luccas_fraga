import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
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

  componentWillMount() {
    this.getMockyFilter();
    this.props.playlistActions.getPlaylistDataRequest(apiInterceptor);
  }

  componentDidMount() {
    setInterval(() => {
      const { locale, country, limit, offset, timestamp } = this.state;
      const objFilter = {
        locale,
        country,
        limit,
        offset,
        timestamp,
      };
      this.props.playlistActions.getPlaylistDataRequest(apiInterceptor, objFilter);
    }, 30000);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playlistData !== this.state.playlistData) {
      this.setState({ playlistDataFilter: nextProps.playlistData });
    }
  }

  getMockyFilter = async () => {
    try {
      const response = await apiInterceptor({
        baseURL: process.env.REACT_APP_API_MOCKY,
        method: 'get',
      });
      this.setState({ objFilter: response.data.filters });
    } catch (err) {
      // console.log('erro ao trazer os dados mocky', err);
    }
  };

  handleChange = (e) => {
    this.setState(
      {
        searchTerm: '',
        [e.target.name]:
          e.target.name === 'timestamp'
            ? moment(e.target.value).format('YYYY-MM-DDThh:mm:ss')
            : e.target.value,
      },
      () => {
        const { locale, country, limit, offset, timestamp } = this.state;
        const objFilter = {
          locale,
          country,
          limit,
          offset,
          timestamp,
        };
        this.props.playlistActions.getPlaylistDataRequest(apiInterceptor, objFilter);
      },
    );
  };

  handleChangeParms = (e) => {
    this.handleChange(e);
  };

  filterByText = (e) => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      const { searchTerm } = this.state;
      if (searchTerm === '') {
        return this.setState({ playlistDataFilter: this.props.playlistData });
      }
      const filterlist = this.props.playlistData.filter((playlist) => {
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
    // eslint-disable-next-line max-len

    return (
      <Container>
        <h1>
          Spotifood - <span>Playlist</span>
        </h1>
        {playlistData && (
          <Fragment>
            <BoxFilter>
              <TextField
                label="Search playlist"
                name="searchTerm"
                value={searchTerm}
                onChange={e => this.filterByText(e)}
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
                    type="datetime-local"
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
              {playlistDataFilter
                && playlistDataFilter.map((playlist) => {
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

              {!playlistDataFilter.length && (
                <p>There are no playlists for these filters, please change them and try again</p>
              )}
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
