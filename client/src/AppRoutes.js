import { Routes, Route } from "react-router-dom";

import {
  HomePage,
  LoginPage,
  SignupPage,
  LandingPage,
  BlogPage,
  CreateBlogPage,
  EditBlogPage,
  SearchBlogsPage,
} from "./pages";
import {
  BLOG_PAGE_URL,
  CREATE_BLOG_URL,
  EDIT_BLOG_URL,
  HOME_PAGE_URL,
  LOGIN_URL,
  ROOT_URL,
  SIGNUP_URL,
  SEARCH_BLOGS_URL,
} from "./routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROOT_URL} element={<LandingPage />} />
      <Route path={HOME_PAGE_URL} element={<HomePage />} />
      <Route path={LOGIN_URL} element={<LoginPage />} />
      <Route path={SIGNUP_URL} element={<SignupPage />} />
      <Route path={BLOG_PAGE_URL} element={<BlogPage />} />
      <Route path={CREATE_BLOG_URL} element={<CreateBlogPage />} />
      <Route path={EDIT_BLOG_URL} element={<EditBlogPage />} />
      <Route path={SEARCH_BLOGS_URL} element={<SearchBlogsPage />} />
    </Routes>
  );
};

export default AppRoutes;
