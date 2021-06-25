type Args = Array<string | [
    string,
    any
]>;

const injectClassNames = (...args: Args): string => (
  args.reduce((classes: string[], entry) => {
    if (typeof entry === 'string') {
      return [...classes, entry];
    }

    const [className, value] = entry;

    return value && className
      ? [...classes, className]
      : classes;
  }, []).join(' ')
);

export default injectClassNames;
