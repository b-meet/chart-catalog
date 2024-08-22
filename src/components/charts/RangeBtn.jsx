const RangeButton = ({ selectedRange, setSelectedRange, range, label }) => {
	const handleRangeChange = (range) => setSelectedRange(range);
	return (
		<button
			onClick={() => handleRangeChange(range)}
			className={`${
				selectedRange === range
					? "bg-[#4B40EE] rounded-md text-white"
					: ""
			} px-3 py-1 text-base`}
		>
			{label}
		</button>
	);
};

export default RangeButton;
