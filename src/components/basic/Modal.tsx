import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ModalProps {
	children: JSX.Element | JSX.Element[];
	show: boolean;
	toggle: () => void;
}

function Modal({ children, show, toggle }: ModalProps) {
	return (
		<div
			className={`${
				show ? "display" : "hidden"
			} fixed w-screen  h-screen bg-black/60 top-0 left-0 flex justify-center items-center`}
			onClick={toggle}
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="relative z-10 w-[clamp(100px,_100%_,40vw)] h-[clamp(100px,_100%_,60vh)] p-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg grid justify-center "
			>
				{children}
				<button
					onClick={toggle}
					className="absolute -top-5 -right-5 bg-white hover:scale-105 active:scale-95 transition-all backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-xl shadow-lg w-10 h-10 "
				>
					<FontAwesomeIcon icon={faX} color={"white"} />
				</button>
			</div>
		</div>
	);
}

export default Modal;
