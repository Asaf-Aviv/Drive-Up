/* eslint-disable no-multi-spaces */
enum NotificationsTypes {
  ADD_NOTIFICATION    = 'ADD_NOTIFICATION',
  REMOVE_NOTIFICATION = 'REMOVE_NOTIFICATION',
}
/* eslint-enable no-multi-spaces */

export type NotificationVariant = 'error' | 'success' | 'info' | 'warning';

export interface Notification {
  id: string;
  variant: NotificationVariant;
  message: string;
}

interface AddNotificationAction {
  type: typeof NotificationsTypes.ADD_NOTIFICATION;
  notification: Notification;
}

interface RemoveNotificationAction {
  type: typeof NotificationsTypes.REMOVE_NOTIFICATION;
  id: string;
}

type NotificationActionTypes = (
  | AddNotificationAction
  | RemoveNotificationAction
)

export const addNotification = (notification: Notification): NotificationActionTypes => ({
  type: NotificationsTypes.ADD_NOTIFICATION,
  notification,
});

export const removeNotification = (id: string): NotificationActionTypes => ({
  type: NotificationsTypes.REMOVE_NOTIFICATION,
  id,
});

const initialState: Notification[] = [];

export default (
  state = initialState,
  action: NotificationActionTypes,
): Notification[] => {
  switch (action.type) {
    case NotificationsTypes.ADD_NOTIFICATION:
      return [...state, action.notification];
    case NotificationsTypes.REMOVE_NOTIFICATION:
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};
