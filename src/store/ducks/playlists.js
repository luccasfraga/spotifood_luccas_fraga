import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  getPlaylistDataRequest: ['apiInterceptor'],
  getPlaylistDataSuccess: ['data'],
});

const INITIAL_STATE = {
  playlistData: null,
};

const getPlaylistDataSuccess = (state = INITIAL_STATE, action) => {
  return { ...state, playlistData: action.data };
};

export default createReducer(INITIAL_STATE, {
  [Types.GET_PLAYLIST_DATA_SUCCESS]: getPlaylistDataSuccess,
});
