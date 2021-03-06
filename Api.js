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
    // 로그인
    postLogin: async(login_id, password) => {
        return await postJsonRequest("/auth/login", {
            login_id,
            password
        });
    },
    // 로그아웃
    postLogout: async(login_id) => {
        return await postJsonRequest("/auth/logout", { login_id });
    },
    // 아이디 중복확인
    getDoubleCheckId: async(login_id) => {
        return await postJsonRequest('/auth/doublecheck/id', { login_id });
    },
    // 닉네임 중복확인
    getDoubleCheckNickName: async(nickname) => {
        return await postJsonRequest('/auth/doublecheck/nickname', { nickname });
    },
    // 이메일 인증번호 전송(비밀번호 재설정, 회원가입 시)
    postAuthEmail: async(email) => {
        return await postJsonRequest('/auth/email', { email });
    },
    // 이메일 인증번호 확인(비밀번호 재설정, 회원가입 시) 
    postAuthEmailCheck: async(email, verify_code) => {
        return await postJsonRequest("/auth/email/verify", {
            email,
            verify_code
        });
    },
    // 비밀번호 재설정
    postPwReset: async(login_id, changePassword) => {
        return await postJsonRequest("/auth/password/reset", {
            login_id,
            changePassword
        });
    },

    // ============User=============
    // 회원가입
    postUser: async(user_data) => {
        return await postJsonRequest('/user', user_data);
    },
    // 회원정보 수정
    postUserUpdate: async(user_data) => {
        return await postJsonRequest('/user/update', user_data);
    },
    // 내 정보 조회
    getMyDataRead: async(login_id) => {
        return await postJsonRequest("/user/status", {
            login_id,
        });
    },
    // 다른 회원 정보 조회
    getUserDataRead: async(userId) => {
        console.log("userid", userId);
        return await getRequest(`/user/${userId}`);
    },
    // 회원 탈퇴
    deleteUser: async() => {
        return await getRequest('/user');
    },

    // ============Post=============
    // 내가 등록한 상품 조회
    postMyProduct: async(user_id) => {
        return await postJsonRequest("/post/mypost", { user_id });
    },
    // 내가 찜한 상품 조회
    // 내가 거래한 상품 조회

    // 전체 상품 조회
    getProductsListRead: async() => {
        return await getRequest('/post/all')
    },
    // 지역별 전체 상품 조회
    getProductsOfAreaListRead: async(area) => {
        return await getRequest('/post', { area });
    },
    // 카테고리별 전체 상품 조회
    getProductsOfCategoryListRead: async(category) => {
        return await getRequest('/post', { category });
    },
    // 상품 상세 조회
    getProductDetailRead: async(postId) => {
        return await getRequest(`/post/${postId}`);
    },
    // 상품 등록
    postProductEnroll: async(postObject) => {
        return await postJsonRequest('/post', postObject);
    },
    // 상품 수정
    putProductUpdate: async(postId, postObject) => {
        return await putJsonRequest(`/post/${postId}`, postObject);
    },
    // 상품 삭제
    deleteProduct: async(postId) => {
        return await deleteJsonRequest(`/post/${postId}`);
    },
    // 조회수 증가
    putPostHit: async(post_id) => {
        return await putJsonRequest('/post/hit', { post_id });
    },

    // ============Blame=============
    postBlame: async(blameObject) => {
        return await postJsonRequest('/blame', blameObject);
    },

    // ============Chat=============
    // 채팅내용 가져오기
    postChatRead: async(chatroom_id) => {
        return await postJsonRequest('/chat', { chatroom_id });
    },
    // 채팅방 생성
    postCreateChatroom: async(userObject) => {
        return await postJsonRequest('/chat/room', userObject);
    },
    // 채팅방 리스트 요청
    postChatroomListRead: async(user_id) => {
        return await postJsonRequest('/chat/roomlist', { user_id });
    },


    // ============Admin=============
    // 회원 정보 조회
    getUsersDataRead: async(userId) => {
        return await getRequest('/admin/${userId}');
    },
    // 회원 강제 탈퇴
    deleteForceUser: async(user_login_id) => {
        return await getRequest('/admin');
    },
    // 회원 강제 탈퇴 복구
    postRestoreUser: async(user_login_id) => {
        return await postJsonRequest('/admin/restoration', user_login_id);
    },
    // 전체 회원 목록 조회
    getUserDataListRead: async() => {
        return await getRequest('/admin/all');
    },
    // 검색한 닉네임으로 회원 목록 조회
    getSearchFromNicknameRead: async(nickname) => {
        return await getRequest('/admin/nickname', nickname);
    },
    // 신고 횟수 순으로 회원 목록 조회
};

export default Api;