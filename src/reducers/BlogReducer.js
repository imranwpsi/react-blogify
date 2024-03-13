import { actions } from "../actions";

const initialState = {
    blogs: [],
    popularBlogs: [],
    favouritesBlogs: [],
    blogDetails: {},
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
};

const blogReducer = (state, action) => {
    switch (action.type) {
        case actions.blog.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
            };
        }

        case actions.blog.DATA_FETCHED: {
            return {
                ...state,
                blogs: [...state.blogs, ...action.data],
                loading: false,
                page: action.data.length === 0 ? state.page : state.page + 1,
                hasMore: action.data.length === 0 ? false : true,
            };
        }

        case actions.blog.POPULAR_DATA_FETCHED: {
            return {
                ...state,
                popularBlogs: action.data,
                loading: false,
            };
        }

        case actions.blog.FAVOURITES_DATA_FETCHED: {
            return {
                ...state,
                favouritesBlogs: action.data,
                loading: false,
            };
        }

        case actions.blog.DATA_FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case actions.blog.DATA_CREATED: {
            return {
                ...state,
                loading: false,
                blogs: [...state.blogs, action.data],
            };
        }

        case actions.blog.BLOG_DELETED: {
            return {
                ...state,
                loading: false,
                blogs: state.blogs.filter((item) => item.id !== action.data),
            };
        }

        case actions.blog.BLOG_DETAILS: {
            return {
                ...state,
                loading: false,
                blogDetails: action.data,
            };
        }

        case actions.blog.DATA_EDITED: {
            return {
                ...state,
                loading: false,
                user: action.data,
            };
        }

        default: {
            return state;
        }
    }
};

export { blogReducer, initialState };

