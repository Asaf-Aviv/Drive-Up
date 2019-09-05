import { put as untypedPut, takeEvery, PutEffect } from 'redux-saga/effects';
import {
  AddNotificationAction,
  addNotification as addNotificationAction,
  removeNotification as removeNotificationAction,
  NotificationActionTypes,
  RemoveNotificationAction,
} from '../actions';
import { NotificationsTypes } from '../constants';

const put = <A extends NotificationActionTypes>(action: A): PutEffect<A> => untypedPut(action);

export function* addNotificationSaga({ notification }: AddNotificationAction) {
  yield put(addNotificationAction(notification));
}

export function* removeNotificationSaga({ id }: RemoveNotificationAction) {
  yield put(removeNotificationAction(id));
}

export function* notificationsWatcher() {
  yield takeEvery(NotificationsTypes.ADD_NOTIFICATION, addNotificationSaga);
  yield takeEvery(NotificationsTypes.REMOVE_NOTIFICATION, removeNotificationSaga);
}
