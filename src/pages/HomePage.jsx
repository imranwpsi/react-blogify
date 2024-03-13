import { useEffect } from "react";
import { actions } from "../actions";
import BlogList from "../components/blogs/BlogList";
import FavouriteBlog from "../components/blogs/FavouriteBlog";
import PopularBlog from "../components/blogs/PopularBlog";
import useAxios from "../hooks/useAxios";
import { useBlog } from "../hooks/useBlog";

const HomePage = () => {
  const { state, dispatch } = useBlog();
  const { api } = useAxios();

  useEffect(() => {
    dispatch({ type: actions.blog.DATA_FETCHING });

    const fetchBlog = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`
        );
        if (response.status === 200) {
          dispatch({
            type: actions.blog.DATA_FETCHED,
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

    fetchBlog();
  }, [api, dispatch]);

  if (state?.loading) {
    return <div> We are working...</div>;
  }

  if (state?.error) {
    return <div> Error in fetching blogs {state?.error?.message}</div>;
  }

  return (
    <main>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div className="space-y-3 md:col-span-5">
              <BlogList blogs={state?.blogs} />
            </div>

            {/* <!-- Sidebar --> */}
            <div className="md:col-span-2 h-full w-full space-y-5">
              <PopularBlog />
              <FavouriteBlog />
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage;