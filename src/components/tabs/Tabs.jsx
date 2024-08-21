import { TABS } from "../../constants/constants";

const Tabs = ({ handleTabToggle, activeTab }) => {
	return (
		<div className='flex items-center gap-4'>
			<button
				onClick={() => handleTabToggle(TABS.SUMMARY)}
				className={`${
					activeTab === TABS.SUMMARY ? "active-tab" : ""
				} px-2 py-5 text-[#6F7177]`}
			>
				{TABS.SUMMARY}
			</button>
			<button
				onClick={() => handleTabToggle(TABS.CHART)}
				className={`${
					activeTab === TABS.CHART ? "active-tab" : ""
				} px-2 py-5 text-[#6F7177]`}
			>
				{TABS.CHART}
			</button>
			<button
				onClick={() => handleTabToggle(TABS.STATISTICS)}
				className={`${
					activeTab === TABS.STATISTICS ? "active-tab" : ""
				} px-2 py-5 text-[#6F7177]`}
			>
				{TABS.STATISTICS}
			</button>
			<button
				onClick={() => handleTabToggle(TABS.ANALYSIS)}
				className={`${
					activeTab === TABS.ANALYSIS ? "active-tab" : ""
				} px-2 py-5 text-[#6F7177]`}
			>
				{TABS.ANALYSIS}
			</button>
			<button
				onClick={() => handleTabToggle(TABS.SETTINGS)}
				className={`${
					activeTab === TABS.SETTINGS ? "active-tab" : ""
				} px-2 py-5 text-[#6F7177]`}
			>
				{TABS.SETTINGS}
			</button>
		</div>
	);
};

export default Tabs;
