import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCurrentUserInfo } from "../../hooks/useCurrentUserInfo";

export default function Header() {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const userInfo = useCurrentUserInfo();

    const handleLogout = () => {
        setAuth({});
        navigate("/login");
    }

    return (
        <header>
            <nav className="container">
                {/* <!-- Logo --> */}
                <div>
                    <Link to="/">
                        <img className="w-32" src="/assets/logo.svg" alt="lws" />
                    </Link>
                </div>

                {/* <!-- Actions - Login, Write, Home, Search -->
              <!-- Notes for Developers -->
              <!-- For Logged in User - Write, Profile, Logout Menu -->
              <!-- For Not Logged in User - Login Menu --> */}
                <div>
                    <ul className="flex items-center space-x-5">
                        <li>
                            <Link
                                to="/create-blog"
                                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                            >
                                Write
                            </Link>
                        </li>
                        <li>
                            <a
                                href="./search.html"
                                className="flex items-center gap-2 cursor-pointer"
                            >
                                <img
                                    src="/assets/icons/search.svg"
                                    alt="Search"
                                />
                                <span>Search</span>
                            </a>
                        </li>
                        <li>
                            {
                                auth.authToken ? 
                                    <div onClick={handleLogout} className="text-white/50 hover:text-white transition-all duration-200 cursor-pointer">Logout</div> 
                                :
                                    <Link to="/login" className="text-white/50 hover:text-white transition-all duration-200">Login</Link>
                            }
                        </li>
                        <li>
                            <Link to="me" className="flex items-center">
                                {/* <!-- Circular Div with background color --> */}
                                <div className="avater-img">
                                    { userInfo?.avatarSrc && <img src={userInfo.avatarSrc} className="rounded-full" /> }
                                    {/* <!-- User's first name initial --> */}
                                </div>

                                {/* <!-- Logged-in user's name --> */}
                                <span className="text-white ml-2">{userInfo?.fullName}</span>

                                {/* <!-- Profile Image --> */}
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
