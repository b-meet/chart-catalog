import { useState } from "react";
import Chart from "./components/charts/Chart";
import Tabs from "./components/tabs/Tabs";
import WorkInProgress from "./components/global/WorkInProgress";
import { TABS } from "./constants/constants";

const App = () => {
	const [activeTab, setActiveTab] = useState(TABS.CHART);

	const handleTabToggle = (id) => {
		setActiveTab(id);
	};

	return (
		<article className='text-[18px]'>
			<section className='p-12 pb-0 flex flex-col gap-7'>
				<div className='flex flex-col gap-3'>
					<p className='text-5xl font-semibold text-[#1A243A]'>
						26.23{" "}
						<sup className='align-top text-2xl font-normal text-[#BDBEBF]'>
							USD
						</sup>
					</p>
					<p className='text-[#67BF6B] flex gap-1 items-center'>
						<span>+ 1.42</span>
						<span>(0.4%)</span>
					</p>
				</div>
				<Tabs handleTabToggle={handleTabToggle} activeTab={activeTab} />
			</section>
			<hr />
			{activeTab === TABS.CHART ? (
				<Chart />
			) : (
				<WorkInProgress section={activeTab} />
			)}
		</article>
	);
};

export default App;
