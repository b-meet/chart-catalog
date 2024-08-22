import { useEffect, useState } from "react";
import Chart from "./components/charts/Chart";
import Tabs from "./components/tabs/Tabs";
import WorkInProgress from "./components/global/WorkInProgress";
import { TABS } from "./constants/constants";

const App = () => {
	const [activeTab, setActiveTab] = useState(TABS.CHART);
	const [hoveredPrice, setHoveredPrice] = useState(null);
	const [metaData, setMetaData] = useState(null);
	const [chartdata, setChartdata] = useState([]);
	const [percentageChange, setPercentageChange] = useState(0);
	const [ltp, setLtp] = useState(0);

	const handleTabToggle = (id) => {
		setActiveTab(id);
	};

	useEffect(() => {
		if (chartdata && chartdata.length > 0) {
			const lastPrice = chartdata[chartdata.length - 1].value;
			setLtp(lastPrice);
		}
	}, [chartdata]);

	useEffect(() => {
		if (hoveredPrice !== null) {
			const change = ((hoveredPrice - ltp) / ltp) * 100;
			setPercentageChange(change.toFixed(2));
		}
	}, [hoveredPrice, ltp]);

	console.log(percentageChange < 0, "ddd");

	return (
		<article className='text-[18px]'>
			<section className='p-12 pb-0 flex flex-col gap-7'>
				<div className='flex flex-col gap-3'>
					<p className='text-5xl font-semibold text-[#1A243A]'>
						{hoveredPrice ? hoveredPrice : 26.3}
						<sup className='align-top text-2xl font-normal text-[#BDBEBF]'>
							USD
						</sup>
					</p>
					<p
						className={`${
							percentageChange < 0
								? "text-red-400"
								: "text-[#67BF6B]"
						} 'flex gap-1 items-center'`}
					>
						<span>{Math.abs(ltp - hoveredPrice).toFixed(2)}</span>
						<span>({percentageChange}%)</span>
					</p>
				</div>
				<Tabs handleTabToggle={handleTabToggle} activeTab={activeTab} />
			</section>
			<hr />
			{activeTab === TABS.CHART ? (
				<Chart
					setHoveredPrice={setHoveredPrice}
					setMetaData={setMetaData}
					chartdata={chartdata}
					setChartdata={setChartdata}
					ltp={ltp}
				/>
			) : (
				<WorkInProgress section={activeTab} />
			)}
		</article>
	);
};

export default App;
