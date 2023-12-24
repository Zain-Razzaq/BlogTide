// Auth server URLs
export const getRegisterNewUserAuthURL = () => `/register`;
export const getUserLoginAuthURL = () => `/login`;
export const getUserLogoutAuthURL = () => `/logout`;
export const getUserValidation = () => `/validate-user`;
export const getExploreBlogsURL = () => `/blog/explore-blogs/:pageNumber`;
export const getCurrentUserBlogsURL = () => `/blog/current-user-blogs`;
export const getBlogByIdURL = (blogId) => `/blog/${blogId}`;
export const getCreateNewBlogURL = () => `/blog/create-blog`;
export const getDeleteBlogURL = (blogId) => `/blog/delete-blog/${blogId}`;
export const getUpdateBlogURL = (blogId) => `/blog/update-blog/${blogId}`;
export const getSearchBlogsURL = () => `/blog/search-blogs`;
