import * as React from 'react'
import { Posts } from "../../config/models/posts.model";

export default ({post}) => {
  return (
    <div>
      <h3>{post?.title}</h3>
      <p>{post?.content}</p>
    </div>
  )
}

export const getStaticProps = async ({params}) => {
  const post: any = await Posts.query().findById(params.id);
  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
  };
};

export async function getStaticPaths() {
  // `any` temporarily
  const posts: any = await Posts.query();
  const paths = posts.map(post => ({ params: { id: post.id.toString() } }));

  return {
    paths,
    fallback: true,
  };
}