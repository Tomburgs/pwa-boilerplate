export const UPDATE_USER = 'UPDATE_USER';

export interface User {
    name: string,
    avatar_url: string,
    bio: string,
    followers: number | null
}

export interface UpdateUserAction {
    type: typeof UPDATE_USER,
    user: User
}

export type UserActions = UpdateUserAction;

export const updateUser = (user: User): UpdateUserAction => ({
  type: UPDATE_USER,
  user
});
