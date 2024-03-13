import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { actions } from "../actions";
import Field from "../components/common/Field";
import useAxios from "../hooks/useAxios";
import { useBlog } from "../hooks/useBlog";

export default function CreateBlogPage() {
    const navigate = useNavigate();
    const { dispatch } = useBlog();
    const { api } = useAxios();
    const fileUploaderRef = useRef();
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        e.preventDefault();

        fileUploaderRef.current.addEventListener("change", imageDisplay);
        fileUploaderRef.current.click();
    };

    const imageDisplay = () => {
        const file = fileUploaderRef.current.files[0];
        setImage(file);
    }

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const handleSave = async (formData) => {
        if (!image) {
           toast.error('Thumbnail field is required!'); 
        }
        const data = new FormData();
        data.append('thumbnail', image);
        data.append('title', formData.title);
        data.append('tags', formData.tags);
        data.append('content', formData.content);
        dispatch({ type: actions.blog.DATA_FETCHING });

        try {
            const response = await api.post(`${import.meta.env.VITE_SERVER_BASE_URL}/blogs`, data);

            if (response.status === 200 || response.status === 201) {
                dispatch({
                    type: actions.blog.DATA_CREATED,
                    data: response.data.blog,
                });
                toast.success("Blog has been created successfully!");
                navigate(`/blogs/${response.data.blog.id}`);
            }
        } catch (error) {
            console.error(error);
            dispatch({
                type: actions.blog.DATA_FETCH_ERROR,
                error,
            });
        }
    };

    return (
        <main>
            <section>
                <div className="container">
                    <form onSubmit={handleSubmit(handleSave)} className="createBlog">
                        <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4">
                            {image && (
                                <img src={URL.createObjectURL(image)} alt="Uploaded" className="mt-2 w-20 h-20 object-cover" />
                            )}
                            <div 
                                className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer"
                                onClick={handleImageUpload}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        stroke-linejoin="round"
                                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                    />
                                </svg>
                                <p>Upload Your Image</p>
                            </div>
                            <input 
                                id="file" 
                                type="file" 
                                accept="image/*" 
                                ref={fileUploaderRef} 
                                hidden 
                            />
                        </div>
                        <div className="mb-6">
                            <Field label="" error={errors.title}>
                                <input
                                    {...register("title", {
                                        required: "title field is required!",
                                    })}
                                    id="title" 
                                    name="title" 
                                    type="text" 
                                    placeholder="Enter your blog title" 
                                />
                            </Field>
                        </div>

                        <div className="mb-6">
                            <Field label="" error={errors.tags}>
                                <input
                                    {...register("tags", {
                                        required: "tags field is required!",
                                    })}
                                    id="tags"
                                    name="tags"
                                    type="text"
                                    placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                                />
                            </Field>
                        </div>

                        <div className="mb-6">
                            <Field label="" error={errors.content}>
                                <textarea
                                    {...register("content", {
                                        required: "Content field is required!",
                                    })}
                                    id="content" 
                                    name="content" 
                                    placeholder="Write your blog content" 
                                    rows="8"
                                ></textarea>
                            </Field>
                        </div>

                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                        >
                            Create Blog
                        </button>
                    </form>
                </div>
            </section>
        </main>
    )
}
