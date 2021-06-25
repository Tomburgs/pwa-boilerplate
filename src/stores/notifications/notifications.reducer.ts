import {
  Notification,
  NotificationId,
  NotificationsActions,
  SHOW_NOTIFICATION,
  HIDE_NOTIFICATION
} from './notifications.actions';

type NotificationsState = {
    [key in NotificationId]: Notification
};

const initialState: NotificationsState = {};

export default (
  state: NotificationsState = initialState,
  action: NotificationsActions
): NotificationsState => {
  switch (action.type) {
  case SHOW_NOTIFICATION: {
    const { notification } = action;
 
    return {
      ...state,
      [Date.now()]: notification
    };
  }

  case HIDE_NOTIFICATION: {
    const { notificationId } = action;
    const {
      [notificationId]: notification,
      ...notifications
    } = state;

    return notifications;
  }

  default:
    return state;
  }
};
