export const getAuthHeader = (token?: string) => {
	const resolvedToken = token?.trim() || localStorage.getItem('access_token') || '';

	return {
		headers: resolvedToken
			? {
					Authorization: `Bearer ${resolvedToken}`,
				}
			: {},
	};
};
