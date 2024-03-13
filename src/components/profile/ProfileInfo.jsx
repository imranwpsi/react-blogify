import { useCurrentUserInfo } from "../../hooks/useCurrentUserInfo";
import { useProfile } from "../../hooks/useProfile";
import Bio from "./Bio";
import ProfileImage from "./ProfileImage";

const ProfileInfo = ({ isMe }) => {
    const userInfo = useCurrentUserInfo();
    const { state } = useProfile();

    const userFullName = isMe ? userInfo?.fullName : state.author?.fullName;
    const userEmail = isMe ? userInfo?.email : state.author?.email;
    
    return (
        <div className="flex flex-col items-center py-8 text-center">
            {/* <!-- profile image --> */}
            <ProfileImage isMe={isMe} />
            {/* <!-- name , email --> */}
            <div>
                <h3 className="text-2xl font-semibold text-white lg:text-[28px]">{userFullName}</h3>
                <p className="leading-[231%] lg:text-lg">{userEmail}</p>
            </div>

            {/* <!-- bio --> */}
            <Bio isMe={isMe} />
            <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>
    );
};

export default ProfileInfo;
