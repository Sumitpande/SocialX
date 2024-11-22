import { Request, Response } from "express";
import { Comment } from "../models/Comment";
import mongoose, { Schema } from "mongoose";
import { IPost, Post } from "../models/Post";
import { IPostLike, PostLike } from "../models/PostLike";
import { paginate } from "../utils/helper";
const coolDown = new Set();

const USER_LIKES_PAGE_SIZE = 9;

export const createPost = async (req: Request, res: Response) => {
    try {
        const { content } = req.body;
        const userId = req.userId;
        if (!content) {
            throw new Error("All input required");
        }

        if (coolDown.has(userId)) {
            throw new Error("You are posting too frequently. Please try again shortly.");
        }

        // coolDown.add(userId);
        // setTimeout(() => {
        //     coolDown.delete(userId);
        // }, 60000);

        // const post = await Post.create({
        //     content,
        //     creator: userId,
        // });

        res.json(req.body);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

// export const getPost = async (req: Request, res: Response) => {
//     try {
//         const postId = req.params.id;
//         const { userId } = req.body;

//         if (!mongoose.Types.ObjectId.isValid(postId)) {
//             throw new Error("Post does not exist");
//         }

//         const post = await Post.findById(postId).populate("poster", "-password");

//         if (!post) {
//             throw new Error("Post does not exist");
//         }

//         if (userId) {
//             await setLiked([post], userId);
//         }

//         await enrichWithUserLikePreview([post]);

//         return res.json(post);
//     } catch (err) {
//         return res.status(400).json({ error: err });
//     }
// };

// export const updatePost = async (req: Request, res: Response) => {
//     try {
//         const postId = req.params.id;
//         const { content, userId, isAdmin } = req.body;

//         const post = await Post.findById(postId);

//         if (!post) {
//             throw new Error("Post does not exist");
//         }

//         if (post.creator != userId && !isAdmin) {
//             throw new Error("Not authorized to update post");
//         }

//         post.content = content;
//         post.edited = true;

//         await post.save();

//         return res.json(post);
//     } catch (err) {
//         return res.status(400).json({ error: err });
//     }
// };

// export const deletePost = async (req: Request, res: Response) => {
//     try {
//         const postId = req.params.id;
//         const { userId, isAdmin } = req.body;

//         const post = await Post.findById(postId);

//         if (!post) {
//             throw new Error("Post does not exist");
//         }

//         if (post.creator != userId && !isAdmin) {
//             throw new Error("Not authorized to delete post");
//         }

//         await post.deleteOne();

//         await Comment.deleteMany({ post: post._id });

//         return res.json(post);
//     } catch (err) {
//         console.log(err);
//         return res.status(400).json({ error: err });
//     }
// };

export const setLiked = async (posts: any, userId: string) => {
    let searchCondition = {};
    if (userId) searchCondition = { userId };

    const userPostLikes = await PostLike.find(searchCondition); //userId needed

    posts.forEach((post: Record<string, any>) => {
        userPostLikes.forEach((userPostLike: any) => {
            if (userPostLike?.postId.equals(post._id)) {
                post.liked = true;
                return;
            }
        });
    });
};

export const enrichWithUserLikePreview = async (posts: Record<string, any>[]) => {
    const postMap = posts.reduce((result: Record<string, any>, post: Record<string, any>) => {
        result[post._id] = post;
        return result;
    }, {});

    const postLikes = await PostLike.find({
        postId: { $in: Object.keys(postMap) },
    })
        .limit(200)
        .populate("userId", "username");

    postLikes.forEach((postLike) => {
        const post = postMap[postLike.postId as string];
        if (!post.userLikePreview) {
            post.userLikePreview = [];
        }
        post.userLikePreview.push(postLike.userId);
    });
};

// export const getUserLikedPosts = async (req: Request, res: Response) => {
//     try {
//         const likerId = req.params.id;
//         const { userId } = req.body;
//         let { page, sortBy } = req.query;

//         if (!sortBy) sortBy = "-createdAt";
//         if (!page) page = 1;

//         let posts = await PostLike.find({ userId: likerId })
//             .sort(sortBy)
//             .populate({ path: "postId", populate: { path: "poster" } });

//         posts = paginate(posts, 10, page);

//         const count = posts.length;

//         const responsePosts: IPost[] = [];
//         posts.forEach((post) => {
//             responsePosts.push(post.postId as IPost);
//         });

//         if (userId) {
//             await setLiked(responsePosts, userId);
//         }

//         await enrichWithUserLikePreview(responsePosts);

//         return res.json({ data: responsePosts, count });
//     } catch (err) {
//         console.log(err);
//         return res.status(400).json({ error: err });
//     }
// };

export const getPosts = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const { author, search, liked } = req.query;
        const { page, sortBy } = req.query;
        const pageQ: any = page ? page : "1";
        const sortByQ: any = sortBy ? sortBy : "1";

        let posts = await Post.find().populate("creator").sort(sortByQ);
        console.log("posts -------------", posts);
        if (author) {
            posts = posts.filter((post: any) => post.creator.username == author);
        }

        if (search) {
            posts = posts.filter((post) => post.content.toLowerCase().includes((search as string).toLowerCase()));
        }

        const count = posts.length;

        posts = paginate(posts, 10, pageQ);

        if (userId) {
            await setLiked(posts, userId);
        }

        await enrichWithUserLikePreview(posts);

        return res.json({ data: posts, count });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ error: err });
    }
};

// export const likePost = async (req: Request, res: Response) => {
//     try {
//         const postId = req.params.id;
//         const { userId } = req.body;

//         const post = await Post.findById(postId);

//         if (!post) {
//             throw new Error("Post does not exist");
//         }

//         const existingPostLike = await PostLike.findOne({ postId, userId });

//         if (existingPostLike) {
//             throw new Error("Post is already liked");
//         }

//         await PostLike.create({
//             postId,
//             userId,
//         });

//         post.likes = (await PostLike.find({ postId })).length;

//         await post.save();

//         return res.json({ success: true });
//     } catch (err) {
//         return res.status(400).json({ error: err });
//     }
// };

// export const unlikePost = async (req, res) => {
//     try {
//         const postId = req.params.id;
//         const { userId } = req.body;

//         const post = await Post.findById(postId);

//         if (!post) {
//             throw new Error("Post does not exist");
//         }

//         const existingPostLike: IPostLike | null = await PostLike.findOne({ postId, userId });

//         if (!existingPostLike) {
//             throw new Error("Post is already not liked");
//         }

//         await existingPostLike.remove();

//         post.likes = (await PostLike.find({ postId })).length;

//         await post.save();

//         return res.json({ success: true });
//     } catch (err) {
//         return res.status(400).json({ error: err });
//     }
// };

// export const getUserLikes = async (req: Request, res: Response) => {
//     try {
//         const { postId } = req.params;
//         const { anchor } = req.query;

//         const postLikesQuery = PostLike.find({ postId: postId })
//             .sort("_id")
//             .limit(USER_LIKES_PAGE_SIZE + 1)
//             .populate("userId", "username");

//         if (anchor) {
//             postLikesQuery.where("_id").gt(anchor);
//         }

//         const postLikes = await postLikesQuery.exec();

//         const hasMorePages = postLikes.length > USER_LIKES_PAGE_SIZE;

//         if (hasMorePages) postLikes.pop();

//         const userLikes = postLikes.map((like) => {
//             return {
//                 id: like._id,
//                 username: like.userId.username,
//             };
//         });

//         return res.status(400).json({ userLikes: userLikes, hasMorePages, success: true });
//     } catch (err) {
//         return res.status(400).json({ error: err });
//     }
// };
