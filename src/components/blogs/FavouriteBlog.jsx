import { useEffect } from "react";
import { Link } from "react-router-dom";
import { actions } from "../../actions";
import useAxios from "../../hooks/useAxios";
import { useBlog } from "../../hooks/useBlog";

export default function FavouriteBlog() {
    const { state, dispatch } = useBlog();
    const { api } = useAxios();

    const { favouritesBlogs } = state;

    useEffect(() => {
        dispatch({ type: actions.blog.DATA_FETCHING });

        const fetchBlogs = async () => {
            try {
                const response = await api.get(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`);
                if (response.status === 200) {
                    dispatch({
                        type: actions.blog.FAVOURITES_DATA_FETCHED,
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

        fetchBlogs();
    }, [api, dispatch])

    return (
        <div className="sidebar-card">
            <h3
                className="text-slate-300 text-xl lg:text-2xl font-semibold"
            >
                Your Favourites ❤️
            </h3>

            <ul className="space-y-5 my-5">
                {
                    favouritesBlogs && favouritesBlogs.map((blog) => (
                        <li key={blog.id}>
                            <Link to={`/blogs/${blog.id}`}>
                                <h3
                                    className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer"
                                >{blog.title}</h3>
                                <p className="text-slate-600 text-sm">{blog.tags}</p>
                            </Link>
                        </li>
                    ))
                }
                {
                    favouritesBlogs?.length === 0 && <p className="text-center">No Data Found</p>
                }
            </ul>
        </div>
    )
}
