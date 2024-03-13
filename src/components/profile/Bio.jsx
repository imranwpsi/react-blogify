import { useState } from "react";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";
import { useCurrentUserInfo } from "../../hooks/useCurrentUserInfo";
import { useProfile } from "../../hooks/useProfile";

const Bio = ({ isMe }) => {
    const userInfo = useCurrentUserInfo();
    const { dispatch } = useProfile();
    const { api } = useAxios();
    const { state } = useProfile();

    const userBio = isMe ? userInfo?.bio : state.author?.bio;

    const [bio, setBio] = useState(userBio);
    const [editMode, setEditMode] = useState(false);

    const handleBioEdit = async () => {
        dispatch({ type: actions.profile.DATA_FETCHING });

        try {
            const response = await api.patch(
                `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
                { bio }
            );

            if (response.status === 200) {
                dispatch({
                    type: actions.profile.USER_DATA_EDITED,
                    data: response.data.user,
                });
            }
            setEditMode(false);
        } catch (err) {
            dispatch({
                type: actions.profile.DATA_FETCH_ERROR,
                error: err.message,
            });
        }
    };

    return (
        <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
                {!editMode ? (
                    <p className="leading-[188%] text-gray-400 lg:text-lg">
                        {userBio}
                    </p>
                ) : (
                    <textarea
                        value={bio}
                        rows={4}
                        cols={55}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Write your bio content"
                    />
                )}
            </div>
            {!editMode ? (
                isMe &&
                <button
                    className="flex-center h-7 w-7 rounded-full"
                    onClick={() => setEditMode(true)}
                >
                    <img src="/assets/icons/edit.svg" alt="Edit" />
                </button>
            ) : (
                <button
                    className="flex-center h-7 w-7 rounded-full"
                    onClick={handleBioEdit}
                >
                    <img src="/assets/icons/check.svg" alt="Check" />
                </button>
            )}
        </div>
    );
};

export default Bio;
