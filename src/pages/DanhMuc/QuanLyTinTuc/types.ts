export interface Post {
	id: number;
	title: string;
	content: string;
	url_anh: string;
	editor_id?: number;
	editor_realname: string;
	status?: string;
	is_locked?: boolean;
	create_at?: string;
	update_at?: string;
	createdAt?: string; // fallback
	updatedAt?: string; // fallback
}

export interface PostFormValues {
	title: string;
	content: string;
	url_anh: string;
	editor_realname?: string;
}
