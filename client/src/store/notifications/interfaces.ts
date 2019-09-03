type NotificationVariant = 'error' | 'success' | 'info' | 'warning';

export interface Notification {
  id: string;
  variant: NotificationVariant;
  message: string;
}
