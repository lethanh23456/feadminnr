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

