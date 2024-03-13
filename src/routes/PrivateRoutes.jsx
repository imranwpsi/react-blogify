import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import BlogProvider from "../providers/BlogProvider";

const PrivateRoutes = () => {
    const { auth } = useAuth();

    return (
        <>
            {auth.authToken ? (
                <>
                    <BlogProvider>
                        <Outlet />
                    </BlogProvider>
                </>
            ) : (
                <Navigate to="/login" />
            )}
        </>
    );
};

export default PrivateRoutes;
