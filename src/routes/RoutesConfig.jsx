import { Route, Routes } from 'react-router-dom';
import CreateBlogPage from '../pages/CreateBlogPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProfilePage from '../pages/ProfilePage';
import RegistrationPage from '../pages/RegistrationPage';
import SingleBlogPage from '../pages/SingleBlogPage';
import UpdateBlogPage from '../pages/UpdateBlogPage';
import PrivateRoutes from './PrivateRoutes';

export default function RoutesConfig() {
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<ProfilePage />} path="/me" />
                <Route element={<CreateBlogPage />} path="/create-blog" />
                <Route element={<UpdateBlogPage />} path="/blog/:id" />
            </Route>
            <Route element={<HomePage />} path="/" exact />
            <Route element={<HomePage />} path="/:id" />
            <Route element={<SingleBlogPage />} path="/blogs/:id" />
            <Route element={<ProfilePage />} path="/author/:id" />
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegistrationPage />} path="/register" />
            <Route element={<NotFoundPage />} path="*" />
        </Routes>
    )
}
