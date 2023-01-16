import photo from "../assets/images/404PageEater.webp";
function NotFoundPage() {
	return (
		<div className="w-full h-[calc(100vh-50px)] img flex gap-6 flex-col justify-center items-center">
			<div className="relative flex justify-center">
				<img src={photo} className="max-w-sm shadow-lg rounded-lg" />
				<div className="absolute w-full flex-grow self-end py-3 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 rounded-b-lg shadow-lg">
					<h1 className="text-white text-center text-3xl">
						The page is no more... 404
					</h1>
				</div>
			</div>
		</div>
	);
}

export default NotFoundPage;
