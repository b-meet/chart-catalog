import { useState } from "react";
import Chart from "./components/charts/Chart";

const App = () => {
	const [activeTab, setActiveTab] = useState(2);

	const handleTabToggle = (id) => {
		setActiveTab(id);
	};

	console.log(activeTab);

	return (
		<article className='text-[18px]'>
			<section className='p-12 pb-0 flex flex-col gap-7'>
				<div className='flex flex-col gap-3'>
					<p className='text-5xl font-semibold text-[#1A243A]'>
						63,179.71{" "}
						<sup className='align-top text-2xl font-normal text-[#BDBEBF]'>
							USD
						</sup>
					</p>
					<p className='text-[#67BF6B] flex gap-1 items-center'>
						<span>+ 2,161.42</span>
						<span>(3.54%)</span>
					</p>
				</div>
				<div className='flex items-center gap-4'>
					<button
						onClick={() => handleTabToggle(1)}
						className={`${
							activeTab === 1 ? "active-tab" : ""
						} px-2 py-5 text-[#6F7177]`}
					>
						Summary
					</button>
					<button
						onClick={() => handleTabToggle(2)}
						className={`${
							activeTab === 2 ? "active-tab" : ""
						} px-2 py-5 text-[#6F7177]`}
					>
						Chart
					</button>
					<button
						onClick={() => handleTabToggle(3)}
						className={`${
							activeTab === 3 ? "active-tab" : ""
						} px-2 py-5 text-[#6F7177]`}
					>
						Statistics
					</button>
					<button
						onClick={() => handleTabToggle(4)}
						className={`${
							activeTab === 4 ? "active-tab" : ""
						} px-2 py-5 text-[#6F7177]`}
					>
						Analysis
					</button>
					<button
						onClick={() => handleTabToggle(5)}
						className={`${
							activeTab === 5 ? "active-tab" : ""
						} px-2 py-5 text-[#6F7177]`}
					>
						Settings
					</button>
				</div>
			</section>
			<hr />
			<Chart />
		</article>
	);
};

export default App;
