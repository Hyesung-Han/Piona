const SET_INIT = 'setInit';
const SET_USER = 'setUser';
const SET_NICKNAME = 'setNickname';
const SET_EMAIL = 'setEmail';
const SET_BIO = 'setBio';
const SET_LINK = 'setLink';
const SET_IMAGEURL = 'setImageUrl';

const UserInitialState = {
  user: {
    user_address: '',
    user_nickname: '',
    user_email: '',
    user_bio: '',
    user_link: '',
    user_image_url: '',
  },
};

export const setInit = () => ({
  type: SET_INIT,
});

export const setUser = user => ({
  type: SET_USER,
  user,
});

export const setNickname = user_nickName => ({
  type: SET_NICKNAME,
  user_nickName,
});

export const setEmail = user_email => ({
  type: SET_EMAIL,
  user_email,
});

export const setBio = user_bio => ({
  type: SET_LINK,
  user_bio,
});

export const setLink = user_link => ({
  type: SET_BIO,
  user_link,
});

export const setImageUrl = user_image_url => ({
  type: SET_IMAGEURL,
  user_image_url,
});

export const UserReducer = (state = UserInitialState, action) => {
  switch (action.type) {
    case SET_INIT:
      return {
        user: UserInitialState.user,
      };

    case SET_USER:
      return {
        state,
        user: action.user,
      };

    case SET_NICKNAME:
      state.user.user_nickName = action.user_nickName;
      return {...state};

    case SET_EMAIL:
      state.user.user_email = action.user_email;
      return {...state};

    case SET_BIO:
      state.user.user_bio = action.user_bio;
      return {...state};

    case SET_LINK:
      state.user.user_link = action.user_link;
      return {...state};

    case SET_IMAGEURL:
      state.user.user_image_url = action.user_image_url;
      return {...state};

    default:
      return state;
  }
};
