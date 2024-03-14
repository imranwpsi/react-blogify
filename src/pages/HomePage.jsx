import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogList from "../components/blogs/BlogList";
import BlogSearch from "../components/blogs/BlogSearch";
import FavouriteBlog from "../components/blogs/FavouriteBlog";
import PopularBlog from "../components/blogs/PopularBlog";
import usePortal from "../hooks/usePortal";

const HomePage = () => {
  const { id } = useParams();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState(null);
  const { data: blogData } = usePortal(searchQuery);

  console.log('id', id);

  useEffect(() => {
    if (id) {
      setShowSearch(true);
    }
    else {
      setShowSearch(false);
    }
  }, [id]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      {showSearch && <BlogSearch onSearch={handleSearch} blogData={blogData} />}
      <main>
        <section>
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              <div className="space-y-3 md:col-span-5">
                <BlogList />
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
    </>
  )
}

export default HomePage;