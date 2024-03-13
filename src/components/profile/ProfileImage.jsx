import { useRef } from "react";
import useAxios from "../../hooks/useAxios";
import { useProfile } from "../../hooks/useProfile";

import { actions } from "../../actions";
import { useCurrentUserInfo } from "../../hooks/useCurrentUserInfo";

const ProfileImage = () => {
    const { dispatch } = useProfile();
    const { api } = useAxios();
    const fileUploaderRef = useRef();
    const userInfo = useCurrentUserInfo();

    const handleImageUpload = (event) => {
        event.preventDefault();

        fileUploaderRef.current.addEventListener("change", updateImageDisplay);
        fileUploaderRef.current.click();
    };

    const updateImageDisplay = async () => {
        try {
            const formData = new FormData();
            for (const file of fileUploaderRef.current.files) {
                formData.append("avatar", file);
            }

            const response = await api.post(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${userInfo.id}/avatar`,
                formData
            );
            if (response.status === 200) {
                dispatch({
                    type: actions.profile.IMAGE_UPDATED,
                    data: response.data,
                });
            }
        } catch (error) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: error.message,
            });
        }
    };

    return (
        <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <img
                className="w-full h-full grid place-items-center text-5xl rounded-full"
                src={userInfo.avatarSrc}
                alt={userInfo.fullName}
            />

            <form id="form" encType="multipart/form-data">
                <button
                    className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
                    onClick={handleImageUpload}
                    type="submit"
                >
                    <img src="/assets/icons/edit.svg" alt="Edit" />
                </button>
                <input id="file" type="file" ref={fileUploaderRef} hidden />
            </form>
        </div>
    );
};

export default ProfileImage;
