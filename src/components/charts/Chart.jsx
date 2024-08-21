import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import {
	dayData,
	monthData,
	sixMonthData,
	threeDayData,
	weekData,
	yearData,
} from "../../assets/data";
import Icons from "../global/Icons";

const Chart = () => {
	const chartContainerRef = useRef();
	const chartRef = useRef();
	const seriesRef = useRef();
	const [selectedRange, setSelectedRange] = useState("day");

	useEffect(() => {
		const dataSets = {
			day: dayData,
			threeDay: threeDayData,
			week: weekData,
			month: monthData,
			sixMonth: sixMonthData,
			year: yearData,
		};

		const colors = {
			backgroundColor: "white",
			lineColor: "#2962FF",
			textColor: "black",
			areaTopColor: "#2962FF",
			areaBottomColor: "rgba(41, 98, 255, 0.28)",
		};

		if (!chartRef.current) {
			chartRef.current = createChart(chartContainerRef.current, {
				width: chartContainerRef.current.clientWidth,
				height: chartContainerRef.current.clientHeight,
				background: colors.backgroundColor,
			});
			seriesRef.current = chartRef.current.addLineSeries({
				color: colors.lineColor,
				lineWidth: 2,
			});
		}

		seriesRef.current.setData(dataSets[selectedRange]);

		chartRef.current.applyOptions({
			chart: {
				backgroundColor: colors.backgroundColor,
			},
			xAxis: {
				color: colors.textColor,
			},
			yAxis: {
				color: colors.textColor,
			},
			lineSeries: {
				color: colors.lineColor,
			},
		});

		const resizeObserver = new ResizeObserver(() => {
			chartRef.current.applyOptions({
				width: chartContainerRef.current.clientWidth,
			});
		});

		resizeObserver.observe(chartContainerRef.current);

		return () => resizeObserver.disconnect();
	}, [selectedRange]);

	const handleRangeChange = (range) => {
		setSelectedRange(range);
	};

	return (
		<section className='p-12 pt-9'>
			<section className='flex justify-between items-center text-[#6F7177] pb-4'>
				<div className='flex sm:gap-10 gap-3 items-center'>
					<button
						title='fullscreen'
						className='flex sm:gap-2 gap-1 items-center'
					>
						<Icons type='fullscreen' />
						<span className='hidden sm:block'>Fullscreen</span>
					</button>
					<button
						title='compare'
						className='flex sm:gap-2 gap-1 items-center'
					>
						<Icons type='addCircle' />
						<span className='hidden sm:block'>Compare</span>
					</button>
				</div>
				<div>
					<button
						onClick={() => handleRangeChange("day")}
						className={`${
							selectedRange === "day"
								? "bg-[#4B40EE] rounded-md text-white"
								: ""
						} px-3 py-1 text-base`}
					>
						1d
					</button>
					<button
						onClick={() => handleRangeChange("threeDay")}
						className={`${
							selectedRange === "threeDay"
								? "bg-[#4B40EE] rounded-md text-white"
								: ""
						} px-3 py-1 text-base`}
					>
						3d
					</button>
					<button
						onClick={() => handleRangeChange("week")}
						className={`${
							selectedRange === "week"
								? "bg-[#4B40EE] rounded-md text-white"
								: ""
						} px-3 py-1 text-base`}
					>
						1w
					</button>
					<button
						onClick={() => handleRangeChange("month")}
						className={`${
							selectedRange === "month"
								? "bg-[#4B40EE] rounded-md text-white"
								: ""
						} px-3 py-1 text-base`}
					>
						1m
					</button>
					<button
						onClick={() => handleRangeChange("sixMonth")}
						className={`${
							selectedRange === "sixMonth"
								? "bg-[#4B40EE] rounded-md text-white"
								: ""
						} px-3 py-1 text-base`}
					>
						6m
					</button>
					<button
						onClick={() => handleRangeChange("year")}
						className={`${
							selectedRange === "year"
								? "bg-[#4B40EE] rounded-md text-white"
								: ""
						} px-3 py-1 text-base`}
					>
						1y
					</button>
				</div>
			</section>
			<div
				id='chart'
				ref={chartContainerRef}
				style={{ height: "400px", width: "100%" }}
			/>
		</section>
	);
};

export default Chart;
