import { Notification } from './interfaces';
import notificationsReducer, { initialState } from './reducers';
import { NotificationActionTypes, addNotification, removeNotification } from './actions';

describe('notification reducer', () => {
  it('should return the initial state', () => {
    expect(
      notificationsReducer(undefined, {} as NotificationActionTypes)
    ).toEqual(
      initialState
    );
  });

  it('should handle ADD_NOTIFICATION', () => {
    const state: Notification[] = [];

    const notification: Notification = {
      id: '123',
      message: 'hello',
      variant: 'success',
    };

    expect(
      notificationsReducer(state, addNotification(notification))
    ).toEqual(
      [notification]
    );
  });

  it('should handle REMOVE_NOTIFICATION', () => {
    const state: Notification[] = [
      { id: '1', message: 'hello', variant: 'success' },
      { id: '2', message: 'hi', variant: 'info' },
      { id: '3', message: 'yallow', variant: 'warning' },
    ];

    const action = removeNotification('2');

    expect(
      notificationsReducer(state, action)
    ).toEqual([
      { id: '1', message: 'hello', variant: 'success' },
      { id: '3', message: 'yallow', variant: 'warning' },
    ]);
  });

  it('REMOVE_NOTIFICATION should return the current state if id is not found', () => {
    const state: Notification[] = [
      { id: '1', message: 'hello', variant: 'success' },
      { id: '2', message: 'hi', variant: 'info' },
      { id: '3', message: 'yallow', variant: 'warning' },
    ];

    const action = removeNotification('4');

    expect(
      notificationsReducer(state, action)
    ).toEqual(
      state
    );
  });
});

export {};
