type Args = Array<string | [
    string,
    any
]>;

export default (...args: Args): string => (
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
