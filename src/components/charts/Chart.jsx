import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";
import Icons from "../global/Icons";
import Modal from "../global/Modal";
import {
	getDailyData,
	getMonthlyData,
	getWeeklyData,
} from "../../api/getChartData";
import RangeButton from "./RangeBtn";

const Chart = ({ chartdata, setHoveredPrice, setChartdata, ltp }) => {
	const chartContainerRef = useRef();
	const chartRef = useRef();
	const seriesRef = useRef();
	const volumeSeriesRef = useRef();
	const chartWrapperRef = useRef();
	const [selectedRange, setSelectedRange] = useState("day");
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	useEffect(() => {
		if (selectedRange === "day") {
			getDailyData(setChartdata);
		} else if (selectedRange === "week") {
			getWeeklyData(setChartdata);
		} else {
			getMonthlyData(setChartdata);
		}
	}, [selectedRange, setChartdata]);

	useEffect(() => {
		if (!chartdata) return;

		const colors = {
			backgroundColor: "white",
			lineColor: "#2962FF",
			volumeColor: "#E8E7FF99",
			textColor: "black",
		};

		if (!chartRef.current) {
			chartRef.current = createChart(chartContainerRef.current, {
				width: chartContainerRef.current.clientWidth,
				height: chartContainerRef.current.clientHeight,
				background: colors.backgroundColor,
			});

			volumeSeriesRef.current = chartRef.current.addHistogramSeries({
				color: colors.volumeColor,
				priceFormat: {
					type: "volume",
				},
				priceScaleId: "",
				scaleMargins: {
					top: 0.8,
					bottom: -0.6,
				},
			});

			seriesRef.current = chartRef.current.addLineSeries({
				color: colors.lineColor,
				lineWidth: 2,
				zIndex: 999,
			});
		}

		seriesRef.current.setData(
			chartdata.map((item) => ({
				time: item.time,
				value: item.value,
			}))
		);

		volumeSeriesRef.current.setData(
			chartdata.map((item) => ({
				time: item.time,
				value: item.volume,
			}))
		);

		chartRef.current.subscribeCrosshairMove((param) => {
			if (!param.time || !param.seriesData) {
				setHoveredPrice(ltp);
				return;
			}
			const price = param.seriesData.get(seriesRef.current);
			if (price) {
				setHoveredPrice(price.value);
			}
		});

		const resizeObserver = new ResizeObserver(() => {
			chartRef.current.applyOptions({
				width: chartContainerRef.current.clientWidth,
				height: chartContainerRef.current.clientHeight,
			});
		});
		resizeObserver.observe(chartContainerRef.current);

		return () => {
			chartRef.current.unsubscribeCrosshairMove();
			resizeObserver.disconnect();
		};
	}, [chartdata, ltp, setHoveredPrice]);

	const toggleFullscreen = () => {
		if (isFullscreen) {
			document.exitFullscreen();
		} else {
			chartWrapperRef.current.requestFullscreen();
		}
	};

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};

		document.addEventListener("fullscreenchange", handleFullscreenChange);
		return () => {
			document.removeEventListener(
				"fullscreenchange",
				handleFullscreenChange
			);
		};
	}, []);

	return (
		<section
			ref={chartWrapperRef}
			className={`p-12 pt-9 ${isFullscreen ? "p-0" : ""}`}
		>
			<section
				className={`flex justify-between items-center text-[#6F7177] pb-4`}
			>
				<div className='flex sm:gap-10 gap-3 items-center'>
					<button
						title='fullscreen'
						onClick={toggleFullscreen}
						className={`flex sm:gap-2 gap-1 items-center ${
							isFullscreen ? "fullscreen-btn" : ""
						}`}
					>
						<Icons type='fullscreen' />
						<span className='hidden sm:block'>
							{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
						</span>
					</button>
					<button
						title='compare'
						onClick={openModal}
						className='flex sm:gap-2 gap-1 items-center'
					>
						<Icons type='addCircle' />
						<span className='hidden sm:block'>Compare</span>
					</button>
				</div>
				<div>
					<RangeButton
						range='day'
						label='1d'
						selectedRange={selectedRange}
						setSelectedRange={setSelectedRange}
					/>
					<RangeButton
						range='week'
						label='1w'
						selectedRange={selectedRange}
						setSelectedRange={setSelectedRange}
					/>
					<RangeButton
						range='month'
						label='1m'
						selectedRange={selectedRange}
						setSelectedRange={setSelectedRange}
					/>
				</div>
			</section>
			<Modal isOpen={isModalOpen} onClose={closeModal} title='Compare'>
				<div className='flex flex-col gap-8 justify-center items-center'>
					<p>
						This feature is for premium users only. Premium users
						have higher chances of success.{" "}
						<strong>Get the 3-month free trial today</strong>
					</p>
					<a
						href='https://www.linkedin.com/in/b-meet/'
						target='_blank'
						className='bg-[#4B40EE] text-white rounded-md py-1 px-6'
						onClick={closeModal}
					>
						Contact Sales
					</a>
				</div>
			</Modal>
			<div
				ref={chartContainerRef}
				style={
					isFullscreen
						? { height: "90vh" }
						: { height: "400px", width: "100%" }
				}
			/>
		</section>
	);
};

export default Chart;
