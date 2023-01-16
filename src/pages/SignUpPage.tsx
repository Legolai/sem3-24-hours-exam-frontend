import { Link } from "react-router-dom";
import { Button, InputField } from "../components/basic";
import useForm from "../hooks/useForm";

function SignUpPage() {
	const { register, handleSubmit, isSubmitting, values } = useForm({
		username: "",
		password: "",
		confirmPassword: "",
	});

	return (
		<div className="flex flex-col flex-grow justify-center items-center">
			<div className="flex flex-col gap-2 p-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg">
				<h1 className="text-white text-center font-bold text-4xl tracking-wider">
					Sign up
				</h1>
				<div>{}</div>
				<form
					onSubmit={handleSubmit((e, v) => {})}
					noValidate
					className="flex flex-col gap-4 justify-center p-2 items-center"
				>
					<InputField label="Username" {...register("username", [], true)} />
					<InputField label="Password" {...register("password", [], true)} />
					<InputField
						label="ConfirmPassword"
						{...register(
							"confirmPassword",
							[
								{
									expression: (v) => v != values.password,
									msg: "Passwords does not match.",
								},
							],
							true
						)}
					/>
					<Button
						className="font-bold tracking-widest border-opacity-100 mt-10 py-[0.5rem]"
						disabled={isSubmitting}
					>
						Join the club
					</Button>
				</form>
				<p className="text-center text-white">
					Already a member?{" "}
					<Link
						className="underline transition-all hover:opacity-80"
						to={"/sign-in"}
					>
						Sign in.
					</Link>
				</p>
			</div>
		</div>
	);
}

export default SignUpPage;
