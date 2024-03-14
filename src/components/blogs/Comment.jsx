import { useAuth } from "../../hooks/useAuth";
import { getAuthorInfo } from "../../utils";

export default function Comment({ comment, handleDeleteComment }) {
    const { auth } = useAuth();
    const isMe = comment.author.id == auth?.user?.id;
    const { fullName = '', authorSrc = null } = getAuthorInfo(comment.author);

    return (
        <div className="flex items-start space-x-4 my-8">
            <div className="avater-img">
                <img src={authorSrc} className="rounded-full" />
            </div>
            <div className="w-full flex">
                <div className="w-full">
                    <h5 className="text-slate -500 font-bold">{fullName}</h5>
                    <p className="text-slate-300">{comment.content}</p>
                </div>
                {
                    isMe &&
                    <div className="trash cursor-pointer" onClick={() => handleDeleteComment(comment.id) }>
                        <img src="/public/assets/icons/trash.svg" alt="trash" className="w-4 h-4" />
                    </div>
                }
            </div>
        </div>
    )
}
