const Modal = ({ isOpen, onClose, title, children }) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50'>
			<div className='bg-white p-6 rounded-lg shadow-lg max-w-lg w-full'>
				<div className='flex justify-between items-center border-b border-gray-200 pb-2 mb-4'>
					<h2 className='text-lg font-semibold'>{title}</h2>
					<button
						onClick={onClose}
						className='text-gray-400 hover:text-gray-600'
					>
						<svg
							className='w-6 h-6'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M6 18L18 6M6 6l12 12'
							></path>
						</svg>
					</button>
				</div>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
