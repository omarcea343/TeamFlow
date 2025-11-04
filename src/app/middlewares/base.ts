import { os } from "@orpc/server";

export const base = os.$context<{ request: Request }>().errors({
	RATE_LIMITED: {
		message: "You have exceeded the rate limit",
	},
	BAD_REQUEST: {
		message: "Bad Request",
	},
	NOT_FOUND: {
		message: "Not Found",
	},
	FORBIDDEN: {
		message: "Forbidden",
	},
	UNAUTHORIZED: {
		message: "Unauthorized",
	},
	INTERNAL_SERVER_ERROR: {
		message: "Internal Server Error",
	},
});
