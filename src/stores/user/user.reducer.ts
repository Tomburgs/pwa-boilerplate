import { User, UserActions, UPDATE_USER } from './user.actions';

type UserState = User;

const initialState: UserState = {
  name: '',
  avatar_url: '',
  bio: '',
  followers: null
};

export default (
  state: UserState = initialState,
  action: UserActions
): UserState => {
  switch (action.type) {
  case UPDATE_USER: {
    const {
      user: {
        name,
        avatar_url,
        bio,
        followers
      }
    } = action;

    return {
      name,
      avatar_url,
      bio,
      followers
    };
  }

  default:
    return state;
  }
};
