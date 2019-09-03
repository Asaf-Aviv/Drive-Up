import { NotificationActionTypes } from './actions';
import { NotificationsTypes } from './constants';
import { Notification } from './interfaces';

const initialState: Notification[] = [];

export default function notificationsReducer(
  state = initialState,
  action: NotificationActionTypes,
): Notification[] {
  switch (action.type) {
    case NotificationsTypes.ADD_NOTIFICATION:
      return [...state, action.notification];
    case NotificationsTypes.REMOVE_NOTIFICATION:
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
}
