import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const api = "https://halfbean01.herokuapp.com/api";

const getRequest = async(path, params = {}) => {
    try {
        const token = await AsyncStorage.getItem("user", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                let UserInfo = JSON.parse(result);
                return UserInfo.token;
            }
        });
        const response = await axios.get(api + path, {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "*/*",
            },
            params,
        });
        return response;
    } catch (e) {
        console.log(e);
        return [];
    }
};

const postFormRequest = async(path, body) => {
    try {
        const token = await AsyncStorage.getItem("user", (err, result) => {
            if (err) {
                console.log(err);
            } else {
                let UserInfo = JSON.parse(result);
                return UserInfo.token;
            }
        });
        const { data } = await axios.post(api + path, body, {
            headers: {
                authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            },
        });
        return data;
    } catch (e) {
        console.log(e);
    }
};

const postJsonRequest = async(path, body) => {
    try {
        const user = await AsyncStorage.getItem("user")

        if (user) {
            const token = await AsyncStorage.getItem("user", (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let UserInfo = JSON.parse(result);
                    return UserInfo.token;
                }
            });
            const { data } = await axios.post(api + path, body, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return data;
        } else {
            const { data } = await axios.post(api + path, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};

const putJsonRequest = async(path, body) => {
    try {
        const user = await AsyncStorage.getItem("user")

        if (user) {
            const token = await AsyncStorage.getItem("user", (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let UserInfo = JSON.parse(result);
                    return UserInfo.token;
                }
            });
            const { data } = await axios.put(api + path, body, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return data;
        } else {
            const { data } = await axios.put(api + path, body, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};

const deleteJsonRequest = async(path) => {
    try {
        const user = await AsyncStorage.getItem("user")

        if (user) {
            const token = await AsyncStorage.getItem("user", (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    let UserInfo = JSON.parse(result);
                    return UserInfo.token;
                }
            });
            const { data } = await axios.delete(api + path, {
                headers: {
                    authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            return data;
        } else {
            const { data } = await axios.delete(api + path, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return data;
        }
    } catch (e) {
        console.log(e);
    }
};

const Api = {
    // ============Auth=============
    // ?????????
    postLogin: async(login_id, password) => {
        return await postJsonRequest("/auth/login", {
            login_id,
            password
        });
    },
    // ????????????
    postLogout: async(login_id) => {
        return await postJsonRequest("/auth/logout", { login_id });
    },
    // ????????? ????????????
    getDoubleCheckId: async(login_id) => {
        return await postJsonRequest('/auth/doublecheck/id', { login_id });
    },
    // ????????? ????????????
    getDoubleCheckNickName: async(nickname) => {
        return await postJsonRequest('/auth/doublecheck/nickname', { nickname });
    },
    // ????????? ???????????? ??????(???????????? ?????????, ???????????? ???)
    postAuthEmail: async(email) => {
        return await postJsonRequest('/auth/email', { email });
    },
    // ????????? ???????????? ??????(???????????? ?????????, ???????????? ???) 
    postAuthEmailCheck: async(email, verify_code) => {
        return await postJsonRequest("/auth/email/verify", {
            email,
            verify_code
        });
    },
    // ???????????? ?????????
    postPwReset: async(login_id, changePassword) => {
        return await postJsonRequest("/auth/password/reset", {
            login_id,
            changePassword
        });
    },

    // ============User=============
    // ????????????
    postUser: async(user_data) => {
        return await postJsonRequest('/user', user_data);
    },
    // ???????????? ??????
    postUserUpdate: async(user_data) => {
        return await postJsonRequest('/user/update', user_data);
    },
    // ??? ?????? ??????
    getMyDataRead: async(login_id) => {
        return await postJsonRequest("/user/status", {
            login_id,
        });
    },
    // ?????? ?????? ?????? ??????
    getUserDataRead: async(userId) => {
        console.log("userid", userId);
        return await getRequest(`/user/${userId}`);
    },
    // ?????? ??????
    deleteUser: async() => {
        return await getRequest('/user');
    },

    // ============Post=============
    // ?????? ????????? ?????? ??????
    postMyProduct: async(user_id) => {
        return await postJsonRequest("/post/mypost", { user_id });
    },
    // ?????? ?????? ?????? ??????
    // ?????? ????????? ?????? ??????

    // ?????? ?????? ??????
    getProductsListRead: async() => {
        return await getRequest('/post/all')
    },
    // ????????? ?????? ?????? ??????
    getProductsOfAreaListRead: async(area) => {
        return await getRequest('/post', { area });
    },
    // ??????????????? ?????? ?????? ??????
    getProductsOfCategoryListRead: async(category) => {
        return await getRequest('/post', { category });
    },
    // ?????? ?????? ??????
    getProductDetailRead: async(postId) => {
        return await getRequest(`/post/${postId}`);
    },
    // ?????? ??????
    postProductEnroll: async(postObject) => {
        return await postJsonRequest('/post', postObject);
    },
    // ?????? ??????
    putProductUpdate: async(postId, postObject) => {
        return await putJsonRequest(`/post/${postId}`, postObject);
    },
    // ?????? ??????
    deleteProduct: async(postId) => {
        return await deleteJsonRequest(`/post/${postId}`);
    },
    // ????????? ??????
    putPostHit: async(post_id) => {
        return await putJsonRequest('/post/hit', { post_id });
    },

    // ============Blame=============
    postBlame: async(blameObject) => {
        return await postJsonRequest('/blame', blameObject);
    },

    // ============Chat=============
    // ???????????? ????????????
    postChatRead: async(chatroom_id) => {
        return await postJsonRequest('/chat', { chatroom_id });
    },
    // ????????? ??????
    postCreateChatroom: async(userObject) => {
        return await postJsonRequest('/chat/room', userObject);
    },
    // ????????? ????????? ??????
    postChatroomListRead: async(user_id) => {
        return await postJsonRequest('/chat/roomlist', { user_id });
    },


    // ============Admin=============
    // ?????? ?????? ??????
    getUsersDataRead: async(userId) => {
        return await getRequest('/admin/${userId}');
    },
    // ?????? ?????? ??????
    deleteForceUser: async(user_login_id) => {
        return await getRequest('/admin');
    },
    // ?????? ?????? ?????? ??????
    postRestoreUser: async(user_login_id) => {
        return await postJsonRequest('/admin/restoration', user_login_id);
    },
    // ?????? ?????? ?????? ??????
    getUserDataListRead: async() => {
        return await getRequest('/admin/all');
    },
    // ????????? ??????????????? ?????? ?????? ??????
    getSearchFromNicknameRead: async(nickname) => {
        return await getRequest('/admin/nickname', nickname);
    },
    // ?????? ?????? ????????? ?????? ?????? ??????
};

export default Api;