import axios from '@/utils/axios';
import { ipNR } from '@/utils/ip';
import { getAuthHeader } from '@/utils/apiHelper';

export async function createPost(token: string, title: string, content: string, url_anh: string, editor_realname: string) {
    return axios.post(`${ipNR}/editor/create-post`, { title, content, url_anh, editor_realname }, getAuthHeader(token));
}

export async function getAllPost(token: string) {
    return axios.get(`${ipNR}/editor/all-posts`, getAuthHeader(token));
}

export async function getPostById(id: number, token: string) {
    return axios.get(`${ipNR}/editor/post/${id}`, getAuthHeader(token));
}

export async function updatePost(id: number, title: string, content: string, url_anh: string, token: string) {
    return axios.patch(`${ipNR}/editor/update-post`, { id, title, content, url_anh }, getAuthHeader(token));
}

export async function deletePost(id: number, token: string) {
    return axios.delete(`${ipNR}/editor/delete-post`, {
        data: { id },
        ...getAuthHeader(token)
    });
}

export async function lockPost(id: number, token: string) {
    return axios.patch(`${ipNR}/editor/lock-post`, { id }, getAuthHeader(token));
}

export async function unlockPost(id: number, token: string) {
    return axios.patch(`${ipNR}/editor/unlock-post`, { id }, getAuthHeader(token));
}

