import _fetch from "node-fetch";

interface Post {
	id: number;
	title: string;
	body: string;
}

interface UserInfo {
	id: number;
	name: string;
	username: string;
	email: string;
}

interface MergedUser {
	id: number;
	name: string;
	username: string;
	email: string;
	posts: Post[];
}

const isPost = (post: unknown): post is Post => {
	if (typeof post !== "object" || post === null) return false;
	const postObj = post as Post;
	return (
		typeof postObj.id === "number" &&
		typeof postObj.title === "string" &&
		typeof postObj.body === "string"
	);
};

export function isMergedUser(obj: unknown): obj is MergedUser {
	if (typeof obj !== "object" || obj === null) return false;
	const userObj = obj as MergedUser;
	return (
		typeof userObj.id === "number" &&
		typeof userObj.name === "string" &&
		typeof userObj.username === "string" &&
		typeof userObj.email === "string" &&
		Array.isArray(userObj.posts) &&
		userObj.posts.every(isPost)
	);
}

export const makeRequests = async (
	usersUrl: URL,
	postsUrl: URL,
): Promise<MergedUser> => {
	const [user, post] = await Promise.all([
		fetch(usersUrl.toString()),
		fetch(postsUrl.toString()),
	]);
	if (!user.ok || !post.ok) {
		throw new Error("One or both requests failed");
	}
	const userInfo: UserInfo = await user.json();
	const postData: Post = await post.json();

	const mergedUser: MergedUser = {
		id: userInfo.id,
		name: userInfo.name,
		username: userInfo.username,
		email: userInfo.email,
		posts: [
			{
				id: postData.id,
				title: postData.title,
				body: postData.body,
			},
		],
	};
	return mergedUser;
};

declare global {
	const fetch: typeof _fetch;
}
