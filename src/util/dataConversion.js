export const convertData = (input) => {
	const converted = Object.keys(input).map((date) => {
		const entry = input[date];
		return {
			time: new Date(date).getTime() / 1000,
			value: parseFloat(entry["4. close"]),
			volume: parseInt(entry["5. volume"], 10),
		};
	});

	return converted.sort((a, b) => a.time - b.time);
};
