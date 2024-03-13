import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getAuthorInfo, getFormatDate, truncateText } from "../../utils";

export default function BlogCard({ blog }) {
    const [showAction, setShowAction] = useState(false);
    const { auth } = useAuth();

    const isMe = blog?.author?.id == auth?.user?.id;
    const { fullName, authorSrc } = getAuthorInfo(blog.author);

    function toggleAction() {
        setShowAction(!showAction);
    }

    return (
        <div className="blog-card">
            <Link to={`/blogs/${blog.id}`}>
                <img
                    className="blog-thumb"
                    src={import.meta.env.VITE_SERVER_BASE_URL + '/uploads/blog/' + blog.thumbnail}
                    alt=""
                />
            </Link>
            <div className="mt-2 relative">
                <Link to={`/blogs/${blog.id}`}>
                    <h3
                        className="text-slate-300 text-xl lg:text-2xl"
                    >
                        {blog.title}
                    </h3>
                
                    <p className="mb-6 text-base text-slate-500 mt-1">{truncateText(blog.content, 180)}</p>

                    {/* <!-- Meta Informations --> */}
                    <div className="flex justify-between items-center">
                        <Link to={`/author/${blog.author.id}`}>
                            <div className="flex items-center capitalize space-x-2">
                                <div className="avater-img">
                                    <img src={authorSrc} className="rounded-full" />
                                </div>

                                <div>
                                    <h5
                                        className="text-slate-500 text-sm"
                                    >
                                        <a href="./profile.html">{fullName}</a>
                                    </h5>
                                    <div
                                        className="flex items-center text-xs text-slate-700"
                                    >
                                        <span>{getFormatDate(blog.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>

                        <div
                            className="text-sm px-2 py-1 text-slate-700"
                        >
                            <span>{blog.likes.length} Likes</span>
                        </div>
                    </div>
                </Link>

                {/* <!-- action dot --> */}
                <div className="absolute right-0 top-0">
                    {isMe && (
                        <button onClick={toggleAction}>
                            <img
                                src="/assets/icons/3dots.svg"
                                alt="3dots of Action"
                            />
                        </button>
                    )}

                    {/* <!-- Action Menus Popup --> */}
                    {showAction && (
                        <div className="action-modal-container">
                            <button
                                className="action-menu-item hover:text-lwsGreen"
                            >
                                <img
                                    src="/assets/icons/edit.svg"
                                    alt="Edit"
                                />
                                Edit
                            </button>
                            <button
                                className="action-menu-item hover:text-red-500"
                            >
                                <img
                                    src="/assets/icons/delete.svg"
                                    alt="Delete"
                                />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
                {/* <!-- action dot ends --> */}
            </div>
        </div>
    )
}