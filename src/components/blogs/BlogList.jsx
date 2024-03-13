import { useEffect, useRef } from "react";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";
import { useBlog } from "../../hooks/useBlog";
import { useProfile } from "../../hooks/useProfile";
import BlogCard from "./BlogCard";

const blogPerPage = 10;

export default function BlogList({ isProfileBlogs = false }) {
    const { state, dispatch } = useBlog();
    const { state: profileState } = useProfile();
    const { api } = useAxios();
    const loaderRef = useRef(null);

    const { blogs, page, hasMore  } = state;

    let blogList = blogs;
    if (isProfileBlogs) {
        blogList = profileState.blogs;
    }

    useEffect(() => {
        const onIntersection = (items) => {
            const loaderItem = items[0];

            if (loaderItem.isIntersecting && hasMore) {
                fetchBlogs();
            }
        }

        const observer = new IntersectionObserver(onIntersection);

        if (observer && loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        dispatch({ type: actions.blog.DATA_FETCHING });

        const fetchBlogs = async () => {
            try {
                const response = await api.get(
                    `${import.meta.env.VITE_SERVER_BASE_URL}/blogs?limit=${blogPerPage}&page=${page}`
                );
                if (response.status === 200) {
                    dispatch({
                        type: actions.blog.DATA_FETCHED,
                        data: response.data.blogs,
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

        // Cleanup
        return () => {
            if (observer) observer.disconnect();
        };
    }, [api, dispatch, page, hasMore]);

    return (
        <>
            {
                blogList && blogList.map((blog) => <BlogCard key={blog.id} blog={blog} isProfileBlogs={isProfileBlogs} />)
            }

            {blogList.length === 0 && <h2 className="text-center text-xl mt-2 p-6"> 🙁 No blogs found 🙁</h2>}

            {
                hasMore && !isProfileBlogs
                ? 
                    <div ref={loaderRef}>Loading more products...</div>
                :
                    blogList.length >= 10 && <h2 className="text-center text-xl mt-2 p-6"> 🙁 You've reached the end. No more blogs to load.' would be helpful for user understanding 🙁</h2>
            }
        </>
        
    )
}
