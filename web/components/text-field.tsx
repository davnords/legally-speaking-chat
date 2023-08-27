interface TextFieldProps {
    value: string | number
    onChange: React.ChangeEventHandler<HTMLInputElement>
    type?: React.HTMLInputTypeAttribute
    name?: string
    placeholder?: string
    label?: string
}
function TextField({ value, onChange, type = 'text', name, placeholder, label }: TextFieldProps) {
    return <div>{label ? <label
        htmlFor={name}
        className="mb-3 block text-sm font-medium text-dark dark:text-white"
    >
        {label}
    </label> : null}
        <input
            value={value}
            onChange={onChange}
            type={type}
            name={name}
            placeholder={placeholder}
            className="w-full rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"
        />
    </div>
}

export default TextField