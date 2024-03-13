import BlogCard from "./BlogCard";

export default function BlogList({ blogs }) {
    return (
        !!blogs && blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
    )
}
