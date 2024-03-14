export const getAuthorInfo = (author) => {
    let fullName = '';
    let authorSrc = 'https://ui-avatars.com/api/?name=${author?.firstName}&color=fff&background=EA580C&size=128&length=1';
    if (author) {
        fullName = author.firstName + ' ' + author.lastName;
        authorSrc = author.avatar ? import.meta.env.VITE_SERVER_BASE_URL + '/uploads/avatar/' + author.avatar : `https://ui-avatars.com/api/?name=${author?.firstName}&color=fff&background=EA580C&size=128&length=1`;
    }
    return { fullName, authorSrc };
};

export const getFormatDate = (isoDateString) => {
    const isoDate = new Date(isoDateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    return isoDate.toLocaleDateString('en-US', options);
}

export const truncateText = (text, maxLength) => {
    if (text) {
        if (text.length <= maxLength) {
            return text;
        } else {
            return text.substring(0, maxLength) + '...';
        }
    }
};

export const getIsLike = (likes, auth) => {
    let isLike = false;
    if (likes?.length > 0) {
        likes.forEach(like => {
            if (like.id == auth.user.id) {
                isLike = true;
            }
        });
    }
    return isLike;
}
