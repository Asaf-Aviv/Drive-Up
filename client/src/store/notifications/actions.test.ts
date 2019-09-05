import { Notification } from './interfaces';
import { addNotification, removeNotification, AddNotificationAction, RemoveNotificationAction } from './actions';
import { NotificationsTypes } from './constants';

describe('notification actions', () => {
  it('should create an action to add a notification', () => {
    const notification: Notification = {
      id: '123',
      message: 'Hello',
      variant: 'success'
    }

    const expectedAction: AddNotificationAction = {
      type: NotificationsTypes.ADD_NOTIFICATION,
      notification,
    };

    expect(addNotification(notification)).toEqual(expectedAction);
  });

  it('should create an action to remove a notification', () => {
    const id = '123'

    const expectedAction: RemoveNotificationAction = {
      type: NotificationsTypes.REMOVE_NOTIFICATION,
      id,
    };

    expect(removeNotification(id)).toEqual(expectedAction);
  });
});
