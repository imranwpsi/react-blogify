import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { truncateText } from "../../utils";

export default function BlogSearch({ onSearch, blogData }) {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            onSearch(query);
        }, 500);

        return () => clearTimeout(debounceTimer);
    }, [query, onSearch]);

    return (
        <section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
            {/* <!-- Search Container --> */}
            <div
                className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10"
            >
                {/* <!-- Search --> */}
                <div>
                    <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">Search for Your Desire Blogs</h3>
                    <input
                        type="text"
                        placeholder="Start Typing to Search"
                        className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* <!-- Search Result --> */}
                <div className="">
                    <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
                    <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain"
                    >
                        {blogData && blogData?.data?.map(search => (
                            <div className="flex gap-6 py-2" key={search.id}>
                                <img className="h-28 object-contain" src={import.meta.env.VITE_SERVER_BASE_URL + '/uploads/blog/' + search?.thumbnail} alt="" />
                                <div className="mt-2">
                                    <h3 className="text-slate-300 text-xl font-bold">{search?.title}</h3>
                                    {/* <!-- Meta Informations --> */}
                                    <p className="mb-6 text-sm text-slate-500 mt-1">{truncateText(search?.content, 180)}</p>
                                </div>
                            </div>
                        ))}
                        {
                            blogData?.data?.length < 1 && <p>Data not found</p>
                        }
                    </div>
                </div>

                <Link to="/">
                    <img src="/assets/icons/close.svg" alt="Close" className="absolute right-2 top-2 cursor-pointer w-8 h-8" />
                </Link>
            </div>
        </section>
    )
}
