export default (): Window => (
    typeof window !== 'undefined' ? window : {} as Window
);
