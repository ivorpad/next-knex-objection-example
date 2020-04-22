import { NextApiRequest, NextApiResponse } from "next";
import { Posts } from "../../../config/models/posts.model";
import { Post } from "../../../interfaces";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      let title: string;
      let content: string;

      if (typeof req.body === "string") {
        const data: Post = JSON.parse(req.body);
        title = data.title;
        content = data.content;
      } else {
        ({ title, content } = req.body);
      }
      const postDto: Post = { title, content };
      const post = await Posts.query().insert(postDto);
      res.status(200).json(post);
    }
  } catch (err) {
    console.log("title and content are required");
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};
