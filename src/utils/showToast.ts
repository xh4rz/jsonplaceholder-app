import { toast } from 'react-toastify';

export const showToast = (
	message: string,
	variant: 'success' | 'warning' | 'error' | 'info'
) => {
	toast.clearWaitingQueue();

	toast.dismiss();

	const toastType = (variant: string) => {
		if (variant === 'success') return toast.success;
		if (variant === 'warning') return toast.warning;
		if (variant === 'error') return toast.error;
		if (variant === 'info') return toast.info;
	};

	toastType(variant)!(message, {
		position: 'bottom-left',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'colored'
	});
};

export const clearToast = () => {
	toast.clearWaitingQueue();

	toast.dismiss();
};
