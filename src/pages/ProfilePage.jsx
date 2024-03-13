import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actions } from "../actions";
import ProfileBlogs from "../components/profile/ProfileBlogs";
import ProfileInfo from "../components/profile/ProfileInfo";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useProfile } from "../hooks/useProfile";


export default function ProfilePage() {
  const { state, dispatch } = useProfile();
  const { api } = useAxios();
  const { auth } = useAuth();
  const { id } = useParams();

  const isMe = (id == auth?.user?.id) || (typeof id === 'undefined');

  useEffect(() => {
    const userId = id ?? auth?.user?.id;
    dispatch({ type: actions.profile.DATA_FETCHING });
    const fetchProfile = async () => {
      try {
        const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/profile/${userId}`);

        if (response.status === 200) {
          if (typeof id !== 'undefined' && isMe) {
            dispatch({
              type: actions.profile.DATA_FETCHED,
              data: response.data,
            });
            dispatch({
              type: actions.profile.AUTHOR_DATA_FETCHED,
              data: response.data,
            });
          }
          else if (typeof id !== 'undefined') {
            dispatch({
              type: actions.profile.AUTHOR_DATA_FETCHED,
              data: response.data,
            });
          }
          else {
            dispatch({
              type: actions.profile.DATA_FETCHED,
              data: response.data,
            });
          }
        }
      } catch (error) {
        console.error(error);
        dispatch({
          type: actions.profile.DATA_FETCH_ERROR,
          error: error.message,
        });
      }
    };

    fetchProfile();
  }, [api, auth?.user?.id, dispatch]);

  if (state?.loading) {
    return <div> Fetching your Profile data...</div>;
  }

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        {/* <!-- profile info --> */}
        <ProfileInfo isMe={isMe} />

        <ProfileBlogs />
      </div>
    </main>
  )
}
