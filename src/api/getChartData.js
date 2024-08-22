import axios from "axios";
import { convertData } from "../util/dataConversion";

export const getDailyData = async (setMetaData, setChartdata) => {
	try {
		const res = await axios.get(
			`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=${"demo"}`
		);
		console.log(res.data["Time Series (Daily)"], "res");
		setMetaData(res.data["Meta Data"]);
		const data = convertData(res?.data["Time Series (Daily)"]);
		setChartdata(data);
	} catch (error) {
		console.log(error);
	}
};

export const getWeeklyData = async (setMetaData, setChartdata) => {
	try {
		const res = await axios.get(
			`https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=${"demo"}`
		);
		console.log(res.data["Weekly Time Series"], "res");
		setMetaData(res.data["Meta Data"]);
		const data = convertData(res?.data["Weekly Time Series"]);
		setChartdata(data);
	} catch (error) {
		console.log(error);
	}
};

export const getMonthlyData = async (setMetaData, setChartdata) => {
	try {
		const res = await axios.get(
			`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=${"demo"}`
		);
		console.log(res.data["Monthly Time Series"], "res");
		setMetaData(res.data["Meta Data"]);
		const data = convertData(res?.data["Monthly Time Series"]);
		setChartdata(data);
	} catch (error) {
		console.log(error);
	}
};

// DUE TO PAID API SERVICES I COULD NOT USE THE FOLLOWING APPROACH SURPRIZINGLY ITS WORKING THE ABOVE WAY SO.....

// import axios from "axios";
// import { convertData } from "../util/dataConversion";
// import { API_KEY } from "../constants/constants";

// export const getTimeSeriesData = async (
// 	dataRange,
// 	setMetaData,
// 	setChartdata
// ) => {
// 	try {
// 		const api = {
// 			daily: "TIME_SERIES_DAILY",
// 			weekly: "TIME_SERIES_WEEKLY",
// 			monthly: "TIME_SERIES_MONTHLY",
// 		};

// 		const res = await axios.get(
// 			`https://www.alphavantage.co/query?function=${api[dataRange]}&symbol=IBM&outputsize=full&apikey=${API_KEY}`
// 		);

// 		const responseKey = {
// 			daily: "Time Series (Daily)",
// 			weekly: "Weekly Time Series",
// 			monthly: "Monthly Time Series",
// 		};

// 		const timeSeriesData = res.data[responseKey[dataRange]];
// 		const data = convertData(timeSeriesData);
// 		setChartdata(data);
// 		setMetaData(res.data["Meta Data"]);
// 	} catch (error) {
// 		console.log(error);
// 	}
// };
