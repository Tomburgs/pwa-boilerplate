import { AppThunk } from 'stores';
import { executeGet } from 'utils/request';
import { updateSchema, updatePages } from './pages.actions';

export const getSchema = (): AppThunk => (
  async dispatch => {
    const schema = await executeGet('/api/schema');

    dispatch(updateSchema(schema));
  }
);

export const getPage = (pageId: string): AppThunk => (
  async dispatch => {
    const page = await executeGet(`/api/page/${pageId}`);

    dispatch(updatePages(page));
  }
);
