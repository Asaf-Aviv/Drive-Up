import { Notification } from './interfaces';
import { NotificationsTypes } from './constants';

export interface AddNotificationAction {
  type: typeof NotificationsTypes.ADD_NOTIFICATION;
  notification: Notification;
}

export interface RemoveNotificationAction {
  type: typeof NotificationsTypes.REMOVE_NOTIFICATION;
  id: string;
}

export type NotificationActionTypes =
  | AddNotificationAction
  | RemoveNotificationAction;

export const addNotification = (notification: Notification): NotificationActionTypes => ({
  type: NotificationsTypes.ADD_NOTIFICATION,
  notification,
});

export const removeNotification = (id: string): NotificationActionTypes => ({
  type: NotificationsTypes.REMOVE_NOTIFICATION,
  id,
});
