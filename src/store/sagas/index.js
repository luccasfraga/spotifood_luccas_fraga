import { all, takeLatest } from 'redux-saga/effects';

import { Types as PlaylistTypes } from '../ducks/playlists';
import { getPlaylistData } from './playlists';

export default function* rootSaga() {
  yield all([takeLatest(PlaylistTypes.GET_PLAYLIST_DATA_REQUEST, getPlaylistData)]);
}
