import { Schema, Pages, PagesActions, UPDATE_SCHEMA, UPDATE_PAGES } from './pages.actions';

interface PagesState {
    schema: Schema,
    pages: Pages
}

const initialState = {
  schema: {},
  pages: {}
};

export default (
  state: PagesState = initialState,
  action: PagesActions
): PagesState => {
  switch (action.type) {
  case UPDATE_SCHEMA: {
    const { schema } = action;

    return {
      ...state,
      schema
    };
  }

  case UPDATE_PAGES: {
    const { pages } = state;
    const { page } = action;
    const { id } = page;

    return {
      ...state,
      pages: {
        ...pages,
        [id]: page
      }
    };
  }

  default:
    return state;
  }
};
