import { useEffect } from 'react';
import { RootState } from 'stores';
import { getSchema, Schema } from 'stores/pages';
import { useDispatch, useSelector } from 'react-redux';

const useSchema = (): Schema => {
  const dispatch = useDispatch();
  const { schema } = useSelector(
    (state: RootState) => state.pages
  );

  useEffect(() => {
    if (!Object.keys(schema).length) {
      dispatch(getSchema());
    }
  }, []);

  return schema;
};

export default useSchema;
