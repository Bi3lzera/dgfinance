interface TextAreaProps {
    id?: string;
    name?: string;
    rows?: number;
    className?: string;
    placeholder?: string;
    maxLength?: number;
}

export default function TextArea({ id, name, rows, className, placeholder, maxLength }: TextAreaProps) {
    return (
        <textarea
            id={id}
            name={name}
            rows={rows}
            className={`border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${className}`}
            placeholder={placeholder}
            maxLength={maxLength}>
        </textarea>
    );
}