import { put } from 'redux-saga/effects';
import {
  addNotification,
  removeNotification,
  RemoveNotificationAction,
  AddNotificationAction,
} from '../actions';
import {
  addNotificationSaga,
  removeNotificationSaga,
} from './notificationsSaga';

import { Notification } from '../interfaces';

describe('notification sagas', () => {
  describe('addNotification saga', () => {
    it('should dispatch ADD_NOTIFICATION action', () => {
      const notification: Notification = {
        id: '123',
        message: 'Hi',
        variant: 'success',
      };

      const action = addNotification(notification) as AddNotificationAction;

      const gen = addNotificationSaga(action);

      expect(gen.next().value).toEqual(put(addNotification(notification)));
      expect(gen.next().done).toBeTruthy();
    });
  });

  describe('removeNotificationSaga', () => {
    it('should dispatch REMOVE_NOTIFICATION action', () => {
      const id = '123';

      const action = removeNotification(id) as RemoveNotificationAction;

      const gen = removeNotificationSaga(action);

      expect(gen.next().value).toEqual(put(removeNotification(id)));
      expect(gen.next().done).toBeTruthy();
    });
  });
});

export {};
