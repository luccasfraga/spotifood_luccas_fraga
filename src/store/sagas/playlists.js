import { call, put } from 'redux-saga/effects';

import { Creators as PlaylistActions } from '../ducks/playlists';

export function* getPlaylistData(action) {
  try {
    const { objFilter } = action;

    let query = '';

    if (objFilter) {
      query = '?';

      if (objFilter.locale) {
        query += `&locale=${objFilter.locale}`;
      }

      if (objFilter.country) {
        query += `&country=${objFilter.country}`;
      }

      if (objFilter.limit) {
        query += `&limit=${objFilter.limit}`;
      }

      if (objFilter.offset) {
        query += `&offset=${objFilter.offset}`;
      }

      if (objFilter.timestamp) {
        query += `&timestamp=${objFilter.timestamp}`;
      }
    }

    const response = yield call(action.apiInterceptor.get, `browse/featured-playlists${query}`);
    yield put(PlaylistActions.getPlaylistDataSuccess(response.data.playlists.items));
  } catch (error) {
    console.error(error);
  }
}
