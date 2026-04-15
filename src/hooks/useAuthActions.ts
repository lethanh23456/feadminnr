import { currentRole, oneSignalRole } from '@/utils/ip';
import { useAuth } from 'react-oidc-context';
import OneSignal from 'react-onesignal';
import { useModel } from 'umi';

export const useAuthActions = () => {
	const { initialState, setInitialState } = useModel('@@initialState');
	const auth = useAuth();

	const handleLogout = () => {
		if (oneSignalRole.valueOf() === currentRole.valueOf()) {
			// FIXME: Update
			OneSignal.logout();
			// OneSignal.getUserId((playerId) => deleteOneSignal({ playerId }));
			// OneSignal.setSubscription(false);
		}

		sessionStorage.clear();
		localStorage.clear();
		auth.removeUser();
		setInitialState({ ...initialState, currentUser: undefined, authorizedPermissions: [], permissionLoading: false });
		window.location.replace('/user/login');
	};

	const handleLogin = () => {
		auth?.signinRedirect();
	};

	return {
		dangXuat: handleLogout,
		dangNhap: handleLogin,
		isLoading: auth?.isLoading || false,
	};
};
