import store from 'stores';
import { showNotification } from 'stores/notifications';

export default (err: Error): Promise<any> => {
    // eslint-disable-next-line
    console.error(err);

    store.dispatch(
        showNotification({
            message: '⚠️ There was an error while fetching response.',
            isExpirable: true
        })
    );

    return Promise.reject();
};
