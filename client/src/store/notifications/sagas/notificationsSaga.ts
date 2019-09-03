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

function* addNotification({ notification }: AddNotificationAction) {
  yield put(addNotificationAction(notification));
}

function* removeNotification({ id }: RemoveNotificationAction) {
  yield put(removeNotificationAction(id));
}

export function* notificationsWatcher() {
  yield takeEvery(NotificationsTypes.NEW_NOTIFICATION, addNotification);
  yield takeEvery(NotificationsTypes.REMOVE_NOTIFICATION, removeNotification);
}
