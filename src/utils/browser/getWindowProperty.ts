
const getWindowProperty = (): Window => (
  typeof window !== 'undefined' ? window : {} as Window
);

export default getWindowProperty;
