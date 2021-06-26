import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  Notification as INotification,
  NotificationId,
  hideNotification
} from 'stores/notifications';
import { injectClassNames } from 'utils/css';
import { ANIMATION_DURATION, NOTIFICATION_TTL } from 'components/notificationList';
import styles from './Notification.module.scss';

type NotificationProps = {
    notificationId: NotificationId,
    notification: INotification
};

const {
  notification,
  notificationOpen,
  notificationClose
} = styles;

const useHideNotification = (
  notificationId: NotificationId,
  setIsClosing: (isClosing: boolean) => void
): () => void => {
  const dispatch = useDispatch();

  return () => {
    setIsClosing(true);

    setTimeout(() => {
      dispatch(hideNotification(notificationId));
    }, ANIMATION_DURATION);
  };
};

const useIsClosing = (
  notificationId: NotificationId,
  isExpirable: boolean
): [
    boolean,
    () => void
] => {
  const [isClosing, setIsClosing] = useState(false);
  const hideNotification = useCallback(
    useHideNotification(notificationId, setIsClosing),
    [notificationId]
  );

  useEffect(() => {
    const timeout = (
      isExpirable && setTimeout(
        hideNotification,
        NOTIFICATION_TTL
      )
    );

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);

  return [isClosing, hideNotification];
};

export default function Notification({
  notificationId,
  notification: { message, isExpirable }
}: NotificationProps): JSX.Element {
  const [isClosing, hideNotification] = useIsClosing(notificationId, isExpirable);

  const notificationState = isClosing
    ? notificationClose
    : notificationOpen;

  return (
    <li
      className={
        injectClassNames(
          notification,
          notificationState
        )
      }
    >
      <button
        type="button"
        aria-label="close notification"
        onClick={ hideNotification }
      />
      <p>
        { message }
      </p>
    </li>
  );
}
