import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { actions } from "../actions";
import useAxios from "../hooks/useAxios";
import { useBlog } from "../hooks/useBlog";
import { getAuthorInfo, getFormatDate } from "../utils";

export default function SingleBlogPage() {
    const { state:blogState, dispatch } = useBlog();
    const { api } = useAxios();
    const { id } = useParams();

    const { blogDetails, loading, error } = blogState;
    const { fullName = '', authorSrc = null } = getAuthorInfo(blogDetails.author);
    let tagsArr = [];
    if (blogDetails?.tags) {
        tagsArr = blogDetails.tags.split(',');
    }

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

    if (error) {
        return <div> Error in fetching blog details {error?.message}</div>;
    }

    return (
        <main>
            {/* <!-- Begin Blogs --> */}
            <section>
                <div className="container text-center py-8">
                    <h1 className="font-bold text-3xl md:text-5xl">{blogDetails.title}</h1>
                    <div className="flex justify-center items-center my-4 gap-4">
                        <div className="flex items-center capitalize space-x-2">
                            <div className="avater-img">
                                <img src={authorSrc} className="rounded-full" />
                            </div>

                            <h5 className="text-slate-500 text-sm">{fullName}</h5>
                        </div>
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
                    <h2 className="text-3xl font-bold my-8">Comments (3)</h2>
                    <div className="flex items -center space-x-4">
                        <div className="avater-img bg-indigo-600 text-white">
                            <span className="">S</span>
                        </div>
                        <div className="w-full">
                            <textarea
                                className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                                placeholder="Write a comment"
                            ></textarea>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Comment One --> */}
                    <div className="flex items-start space-x-4 my-8">
                        <div className="avater-img bg-orange-600 text-white">
                            <span className="">S</span>
                        </div>
                        <div className="w-full">
                            <h5 className="text-slate -500 font-bold">Saad Hasan</h5>
                            <p className="text-slate-300">
                                Today I was mob programming with Square's Mobile & Performance Reliability team and we toyed with an
                                interesting idea. Our codebase has classes that represent screens a user can navigate to. These classes
                                are defined in modules, and these modules have an owner team defined. When navigating to a screen, we
                                wanted to have the owner team information available, at runtime. We created a build tool that looks at
                                about 1000 Screen classes, determines the owner team, and generates a class to do the lookup at runtime.
                                The generated code looked like this:
                            </p>
                        </div>
                    </div>

                    {/* <!-- Comment Two --> */}
                    <div className="flex items-start space-x-4 my-8">
                        <div className="avater-img bg-green-600 text-white">
                            <span className="">S</span>
                        </div>
                        <div className="w-full">
                            <h5 className="text-slate -500 font-bold">Saad Hasan</h5>
                            <p className="text-slate-300">
                                Today I was mob programming with Square's Mobile & Performance Reliability team and we toyed with an
                                interesting idea. Our codebase has classes that represent screens a user can navigate to. These classes
                                are defined in modules, and these modules have an owner team defined. When navigating to a screen, we
                                wanted to have the owner team information available, at runtime. We created a build tool that looks at
                                about 1000 Screen classes, determines the owner team, and generates a class to do the lookup at runtime.
                                The generated code looked like this:
                            </p>
                        </div>
                    </div>

                    {/* <!-- Comment Three --> */}
                    <div className="flex items-start space-x-4 my-8">
                        <div className="avater-img bg-indigo-600 text-white">
                            <span className="">S</span>
                        </div>
                        <div className="w-full">
                            <h5 className="text-slate -500 font-bold">Saad Hasan</h5>
                            <p className="text-slate-300">
                                Today I was mob programming with Square's Mobile & Performance Reliability team and we toyed with an
                                interesting idea. Our codebase has classes that represent screens a user can navigate to. These classes
                                are defined in modules, and these modules have an owner team defined. When navigating to a screen, we
                                wanted to have the owner team information available, at runtime. We created a build tool that looks at
                                about 1000 Screen classes, determines the owner team, and generates a class to do the lookup at runtime.
                                The generated code looked like this:
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
