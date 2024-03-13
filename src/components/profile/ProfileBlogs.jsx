import BlogList from "../blogs/BlogList";

const ProfileBlogs = () => {
    return (
        <>
            <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
            <BlogList isProfileBlogs={true} />
        </>
    );
};

export default ProfileBlogs;
