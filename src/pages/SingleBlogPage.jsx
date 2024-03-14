import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { actions } from "../actions";
import Comment from "../components/blogs/Comment";
import { useAuth } from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { useBlog } from "../hooks/useBlog";
import { useCurrentUserInfo } from "../hooks/useCurrentUserInfo";
import { getAuthorInfo, getFormatDate, getIsLike } from "../utils";

export default function SingleBlogPage() {
    const { auth } = useAuth();
    const { state:blogState, dispatch } = useBlog();
    const userInfo = useCurrentUserInfo();
    const { api } = useAxios();
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState(null);
    const [isLike, setIsLike] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);
    const [likes, setLikes] = useState([]);
    const { blogDetails, loading } = blogState;
    
    const { fullName = '', authorSrc = null } = getAuthorInfo(blogDetails.author);
    let tagsArr = [];
    if (blogDetails?.tags) {
        tagsArr = blogDetails.tags.split(',');
    }

    useEffect(() => {
        setComments(blogDetails.comments);
        if (auth.authToken) {
            setIsFavourite(blogDetails.isFavourite);
        }
    }, [auth.authToken, blogDetails])

    useEffect(() => {
        if (auth.authToken) {
            setIsLike(getIsLike(blogDetails?.likes, auth));
        }
        setLikes(blogDetails?.likes);
    }, [blogDetails.likes, auth])

    useEffect(() => {
        dispatch({ type: actions.blog.DATA_FETCHING });

        const fetchBlogDetails = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}`
                );
                if (response.status === 200) {
                    dispatch({
                        type: actions.blog.BLOG_DETAILS,
                        data: response.data,
                    });
                }
            } catch (error) {
                console.error(error);
                dispatch({
                    type: actions.blog.DATA_FETCH_ERROR,
                    error: error.message,
                });
            }
        };

        fetchBlogDetails();
    }, [api, dispatch, id]);

    if (loading) {
        return <div> We are working...</div>;
    }


    const handleMakeComment = async () => {
        if (!comment) return
        try {
            const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogDetails.id}/comment`, {content: comment});
            const { status, data } = response;

            if (status === 200) {
                setComments(data.comments);
                setComment("");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLike = async () => {
        try {
            const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogDetails.id}/like`);
            const { status, data } = response;

            if (status === 200) {
                setIsLike(data.isLiked);
                setLikes(data.likes)
            }
        } catch (error) {
            console.error(error);
            setIsLike(false);
        }
    };

    const handleFav = async () => {
        try {
            const response = await api.patch(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogDetails.id}/favourite`);
            const { status, data } = response;

            if (status === 200) {
                setIsFavourite(data.isFavourite);
            }
        } catch (error) {
            console.error(error);
            setIsFavourite(false);
        }
    };

    const handleDeleteComment = async (id) => {
        if (!id) return;
        try {
            const response = await api.delete(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogDetails.id}/comment/${id}`);
            const { status, data } = response;

            if (status === 200) {
                setComments(data.comments);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <main>
            {/* <!-- Begin Blogs --> */}
            <section>
                <div className="container text-center py-8">
                    <h1 className="font-bold text-3xl md:text-5xl">{blogDetails.title}</h1>
                    <div className="flex justify-center items-center my-4 gap-4">
                        <Link to={`/author/${blogDetails?.author?.id}`}>
                            <div className="flex items-center capitalize space-x-2">
                                <div className="avater-img">
                                    <img src={authorSrc} className="rounded-full" />
                                </div>

                                <h5 className="text-slate-500 text-sm">{fullName}</h5>
                            </div>
                        </Link>
                        <span className="text-sm text-slate-700 dot">{getFormatDate(blogDetails.createdAt)}</span>
                        <span className="text-sm text-slate-700 dot">{blogDetails?.likes?.length} Likes</span>
                    </div>
                    <img className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96" src={import.meta.env.VITE_SERVER_BASE_URL + '/uploads/blog/' + blogDetails.thumbnail} alt="" />

                    {/* <!-- Tags --> */}
                    <ul className="tags">
                        {tagsArr && tagsArr.map((tag, i) => (
                            <li key={i}>{tag}</li>
                        ))}
                    </ul>

                    {/* <!-- Content --> */}
                    <div 
                        className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left" 
                        dangerouslySetInnerHTML={{ __html: blogDetails.content }} 
                    />
                </div>
            </section>
            {/* <!-- End Blogs --> */}

            {/* <!-- Begin Comments --> */}
            <section id="comments">
                <div className="mx-auto w-full md:w-10/12 container">
                    <h2 className="text-3xl font-bold my-8">Comments ({comments?.length})</h2>
                    {auth.authToken && 
                        <div className="flex items -center space-x-4">
                            <div className="avater-img">
                                <img src={userInfo.avatarSrc} className="rounded-full" />
                            </div>
                            <div className="w-full">
                                <textarea
                                    className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                                    placeholder="Write a comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></textarea>
                                <div className="flex justify-end mt-4">
                                    <button
                                        className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                                        onClick={handleMakeComment}
                                    >
                                        Comment
                                    </button>
                                </div>
                            </div>
                        </div>
                    }

                    {/* <!-- Comment --> */}
                    {
                            comments && comments.map(comment => <Comment comment={comment} key={comment.id} handleDeleteComment={handleDeleteComment} />)
                    }
                </div>
            </section>
        </main>

        {/* <!-- Floating Actions--> */}
        <div className="floating-action">
            <ul className="floating-action-menus">
                <li onClick={handleLike}>
                    {
                        isLike ?
                            <img src="/assets/icons/like-filled.svg" alt="like" />
                            :
                            <img src="/assets/icons/like.svg" alt="like" />

                    }
                        <span>{likes?.length}</span>
                </li>

                <li onClick={handleFav}>
                    {/* <!-- There is heart-filled.svg in the icons folder --> */}
                    {
                        isFavourite ?
                            <img src="/assets/icons/heart-filled.svg" alt="Favourite" />
                            :
                            <img src="/assets/icons/heart.svg" alt="Favourite" />

                    }
                    
                </li>
                <a href="#comments">
                    <li>
                        <img src="/assets/icons/comment.svg" alt="Comments" />
                        <span>{comments?.length}</span>
                    </li>
                </a>
            </ul>
        </div>
        </>
    )
}
