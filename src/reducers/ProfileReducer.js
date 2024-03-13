import { actions } from "../actions";

const initialState = {
    user: null,
    blogs: [],
    author: null,
    loading: false,
    error: null,
};

const profileReducer = (state, action) => {
    switch (action.type) {
        case actions.profile.DATA_FETCHING: {
            return {
                ...state,
                loading: true,
            };
        }

        case actions.profile.DATA_FETCHED: {
            return {
                ...state,
                loading: false,
                user: action.data,
                blogs: action.data.blogs,
            };
        }

        case actions.profile.AUTHOR_DATA_FETCHED: {
            return {
                ...state,
                loading: false,
                author: action.data,
                blogs: action.data.blogs,
            };
        }

        case actions.profile.DATA_FETCH_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        }

        case actions.profile.USER_DATA_EDITED: {
            return {
                ...state,
                loading: false,
                user: action.data,
            };
        }

        case actions.profile.IMAGE_UPDATED: {
            return {
                ...state,
                loading: false,
                user: {
                    ...state.user,
                    avatar: action.data.avatar,
                },
            };
        }

        case actions.blog.BLOG_DELETED: {
            return {
                ...state,
                loading: false,
                blogs: state.blogs.filter((item) => item.id !== action.data),
            };
        }

        default: {
            return state;
        }
    }
};

export { initialState, profileReducer };

