import { useAuth } from "./useAuth";
import { useProfile } from "./useProfile";

export const useCurrentUserInfo = () => {
    const { auth } = useAuth();
    const { state } = useProfile();

    let user = state?.user ?? auth?.user;
    if (user) {
        user.fullName = user.firstName + ' ' + user.lastName;
        user.avatarSrc = user.avatar ? import.meta.env.VITE_SERVER_BASE_URL + '/uploads/avatar/' + user.avatar : `https://ui-avatars.com/api/?name=${user?.firstName}&color=fff&background=EA580C&size=128&length=1`;
    }
    return user;
};