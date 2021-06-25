import { useEffect } from 'react';
import { User, getUser } from 'stores/user';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'stores';

const useUser = (): User => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!user.name) {
      dispatch(getUser('tomburgs'));
    }
  }, []);

  return user;
};

export default useUser;
