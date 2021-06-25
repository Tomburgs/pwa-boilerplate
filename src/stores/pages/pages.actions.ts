export const UPDATE_SCHEMA = 'UPDATE_SCHEMA';
export const UPDATE_PAGES = 'UPDATE_PAGES';

export interface PageDetails {
    title: string,
    description: string
}

export interface Schema {
    [key: string]: PageDetails
}

export interface Page {
    id: string,
    title: string,
    description: string,
    content: string
}

export interface Pages {
    [key: string]: Page
}

export interface UpdateSchema {
    type: typeof UPDATE_SCHEMA,
    schema: Schema
}

export interface UpdatePages {
    type: typeof UPDATE_PAGES,
    page: Page
}

export type PagesActions = UpdateSchema | UpdatePages;

export const updateSchema = (schema: Schema): UpdateSchema => ({
  type: UPDATE_SCHEMA,
  schema
});

export const updatePages = (page: Page): UpdatePages => ({
  type: UPDATE_PAGES,
  page
});
