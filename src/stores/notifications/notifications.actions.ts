export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export type NotificationId = number;

export interface Notification {
    message: string,
    isExpirable: boolean
}

export interface ShowNotificationAction {
    type: typeof SHOW_NOTIFICATION,
    notification: Notification
}

export interface HideNotificationAction {
    type: typeof HIDE_NOTIFICATION,
    notificationId: NotificationId
}

export type NotificationsActions = ShowNotificationAction | HideNotificationAction;

export const showNotification = (notification: Notification): ShowNotificationAction => ({
  type: SHOW_NOTIFICATION,
  notification
});

export const hideNotification = (notificationId: NotificationId): HideNotificationAction => ({
  type: HIDE_NOTIFICATION,
  notificationId
});
