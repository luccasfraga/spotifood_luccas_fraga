import { call, put } from 'redux-saga/effects';

import { Creators as PlaylistActions } from '../ducks/playlists';

export function* getPlaylistData(action) {
  try {
    const response = yield call(action.apiInterceptor.get, 'browse/featured-playlists');
    yield put(PlaylistActions.getPlaylistDataSuccess(response.data.playlists.items));
  } catch (error) {
    console.error(error);
  }
}
