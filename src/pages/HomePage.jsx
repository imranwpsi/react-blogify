import BlogList from "../components/blogs/BlogList";
import FavouriteBlog from "../components/blogs/FavouriteBlog";
import PopularBlog from "../components/blogs/PopularBlog";

const HomePage = () => {
  return (
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
  )
}

export default HomePage;