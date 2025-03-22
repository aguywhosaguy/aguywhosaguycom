const Writer = () => {
	const KeyHandler = (e: KeyboardEvent) => {
		console.log(e.code)
	}

	
	return (
		<div data-theme="silk" class="flex items-center justify-center h-full">
			<textarea
				class="max-w-3xl w-full h-full mt-5 resize-none bg-transparent border-0 outline-none"
				placeholder="Type your text here..."
				rows={30} 
				onKeyDown={KeyHandler}
			/>
		</div>
	);
};

export default Writer;