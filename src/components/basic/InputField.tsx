import { InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	alertMsg?: string;
}

const InputField = ({
	label,
	name,
	type,
	required,
	value,
	onChange,
	placeholder,
	alertMsg,
	...props
}: InputFieldProps) => {
	return (
		<div className={"flex flex-col justify-center items-start gap-1 flex-grow"}>
			{label && (
				<label
					className={"font-medium spacing text-white tracking-wider"}
					htmlFor={name}
				>
					{label}
				</label>
			)}
			<input
				className={`bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 placeholder-slate-100/30 text-white border rounded-md px-3 py-1 w-full ${
					alertMsg ? "border-red-400" : "border-white"
				}`}
				name={name}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
				type={type}
				required={required}
				{...props}
			/>
			{alertMsg && <p className="text-red-400">{alertMsg}</p>}
		</div>
	);
};

export default InputField;
