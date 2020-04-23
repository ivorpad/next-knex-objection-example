import Link from "next/link";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { Posts } from "../config/models/posts.model";
import { Post, IndexProps } from "../interfaces";
import * as redis from "async-redis";
const client = redis.createClient();

const IndexPage = (props: IndexProps) => {
  let { posts, name } = props;
  return (
    <Layout title={`Home | ${name || "Next.js"} + TypeScript Example`}>
      <h1>Hello {name || "Next.js"} 👋</h1>
      <p>
        <Link href="/post/new">
          <a>Create Post</a>
        </Link>
      </p>

      {posts.map((post, idx) => {
        return (
          <article key={idx}>
            <h3>
              <Link href="/post/[id]" as={`/post/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </h3>
            <p>{post.content}</p>
          </article>
        );
      })}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  
  const posts = await Posts.query();
  const name = await client.get("name");
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      name,
    },
  };
};

export default IndexPage;
