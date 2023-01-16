import { ChangeEvent, FormEvent, useState } from "react";

interface ValidationCase<T> {
	expression: (v: T) => boolean;
	msg: string;
	priority?: number;
}

interface ValidationError {
	msg: string;
	priority: number;
}

type ValidationErrors<TValues extends Record<string, unknown>> = {
	[name in keyof TValues]: ValidationError[];
};

function useForm<TValues extends Record<string, unknown>>(
	defaultValues?: TValues
) {
	const [values, setValues] = useState<TValues>(defaultValues ?? <TValues>{});
	const [errors, setErrors] = useState<ValidationErrors<TValues>>(
		<ValidationErrors<TValues>>{}
	);

	const validationCases = <
		{ [name in keyof TValues]: ValidationCase<TValues[name]>[] }
	>{};

	const [isSubmitting, setIsSubmitting] = useState(false);

	function handleSubmit(
		onSubmit: (event: FormEvent<HTMLFormElement>, v: TValues) => void,
		onFail?: (
			event: FormEvent<HTMLFormElement>,
			v: ValidationErrors<TValues>
		) => void
	) {
		return (event: FormEvent<HTMLFormElement>) => {
			validateAll();
			event.preventDefault();
			if (Object.keys(errors).some((key) => errors[key].length == 0)) {
				setIsSubmitting(true);
				if (onSubmit) onSubmit(event, values);
				setIsSubmitting(false);
			} else {
				if (onFail) onFail(event, errors);
			}
		};
	}

	function validateField<T extends keyof TValues>(option: T) {
		const vCases = validationCases[option];

		const optionErrors = errors[option] ?? [];
		for (const vCase of vCases) {
			if (vCase.expression(values[option])) {
				const newError = { msg: vCase.msg, priority: vCase.priority ?? 1 };
				optionErrors.push(newError);
			}
		}

		optionErrors.sort((a, b) => b.priority - a.priority);
		setErrors((curr) => ({ ...curr, [option]: optionErrors }));
	}

	function clearValidation<T extends keyof TValues>(option?: T) {
		if (!option) {
			setErrors(<{ [name in keyof TValues]: ValidationError[] }>{});
			return;
		}

		setErrors((curr) => ({ ...curr, [option]: [] }));
	}

	const validateAll = () => {
		clearValidation();

		const keys = Object.keys(values);

		for (const key of keys) {
			validateField(key);
		}
	};

	function getError<T extends keyof TValues>(option: T) {
		const optionErrors = errors[option];
		if (!optionErrors || optionErrors.length == 0) return "";
		return optionErrors[0].msg;
	}

	function register<T extends keyof TValues>(
		option: T,
		validations: ValidationCase<TValues[T]>[] = [],
		required = false
	) {
		if (required) {
			validations.unshift({
				expression: (v) => {
					if (typeof v == "string") return v.trim() == "";
					if (typeof v == "boolean") return v;
					return v == null || v == undefined;
				},
				msg: "This field is required.",
			});
		}
		if (validations && !validationCases[option]) {
			validationCases[option] = validations;
		}
		return {
			onChange: (e: ChangeEvent<HTMLInputElement>) =>
				setValues((curr) => ({ ...curr, [option]: e.target.value })),
			onBlur: () => validateField(option),
			onFocus: () => clearValidation(option),
			value: values[option],
			alertMsg: getError(option),
			name: option,
		};
	}

	return {
		register,
		handleSubmit,
		isSubmitting,
		errors,
		values,
	};
}

export default useForm;
