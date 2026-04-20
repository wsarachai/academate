// src/app/middleware/toast.js
// isRejectedWithValue — true when mutation.rejected carries a payload
import { isRejectedWithValue } from '@reduxjs/toolkit';

const toastMiddleware = _storeAPI => next => action => {
	if (isRejectedWithValue(action)) {
		// action.payload is what transformErrorResponse returned
		const status = action.payload?.status ?? 'ERR';
		const message = action.payload?.data?.message ?? 'Request failed';

		// Swap console.error for your toast library, e.g.:
		// import toast from 'react-hot-toast';
		// toast.error(`[${status}] ${message}`);
		console.error(`[API ${status}] ${message}`);
	}
	return next(action);
};

export default toastMiddleware;
