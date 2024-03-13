import { Route, Routes } from 'react-router-dom';
import CreateBlogPage from '../pages/CreateBlogPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProfilePage from '../pages/ProfilePage';
import RegistrationPage from '../pages/RegistrationPage';
import SingleBlogPage from '../pages/SingleBlogPage';
import PrivateRoutes from './PrivateRoutes';

export default function RoutesConfig() {
    return (
        <Routes>
            <Route element={<PrivateRoutes />}>
                <Route element={<HomePage />} path="/" exact />
                <Route element={<ProfilePage />} path="/me" />
                <Route element={<ProfilePage />} path="/author/:id" />
                <Route element={<CreateBlogPage />} path="/create-blog" />
                <Route element={<SingleBlogPage />} path="/blogs/:id" />
            </Route>
            <Route element={<LoginPage />} path="/login" />
            <Route element={<RegistrationPage />} path="/register" />
            <Route element={<NotFoundPage />} path="*" />
        </Routes>
    )
}
