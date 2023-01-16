import { useAuth } from "../hooks/AuthContext.js";
import { Button, InputField } from "../components/basic";
import useForm from "../hooks/useForm.js";
import { Link } from "react-router-dom";

function LoginPage() {
	const { login } = useAuth();

	const { register, handleSubmit, isSubmitting } = useForm({
		email: "",
		password: "",
	});

	return (
		<div className="flex flex-col flex-grow justify-center items-center">
			<div className="flex flex-col gap-2 p-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg">
				<h1 className="text-white text-center font-bold text-4xl tracking-wider">
					Sign in
				</h1>
				<div>{}</div>
				<form
					onSubmit={handleSubmit((event, values) =>
						login(values.email, values.password)
					)}
					noValidate
					className="flex flex-col gap-4 justify-center p-2 items-center"
				>
					<InputField
						type="text"
						label="Email"
						required
						{...register("email", [], true)}
					/>{" "}
					<InputField
						type="password"
						label="Password"
						required
						{...register("password", [], true)}
					/>
					<Button
						disabled={isSubmitting}
						className="font-bold tracking-widest border-opacity-100 mt-10 py-[0.5rem] "
						type="submit"
					>
						Login
					</Button>
				</form>
				<p className="text-center text-white">
					Not a member?{" "}
					<Link
						className="underline transition-all hover:opacity-80"
						to={"/sign-up"}
					>
						Join here.
					</Link>
				</p>
			</div>
		</div>
	);
}

export default LoginPage;
