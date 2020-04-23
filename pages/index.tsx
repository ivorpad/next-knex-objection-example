import Link from "next/link";
import { GetServerSideProps } from "next";
import Layout from "../components/Layout";
import { Posts } from "../config/models/posts.model";
import { Post, IndexProps } from "../interfaces";
import * as redis from "async-redis";
const client = redis.createClient();

const IndexPage = (props: IndexProps) => {
  let { posts, name, count } = props;
  return (
    <Layout title={`Home | ${name} + TypeScript Example`}>
      <h1>Hello {name} 👋</h1>
      <p>
        <Link href="/post/new">
          <a>Create Post</a>
        </Link>
      </p>

      <h3>Count of posts: {count} (from redis)</h3>

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
  const count = await client.get("post:count");

  if(posts.length !== +count) {
    await client.set("post:count", posts.length)
  }
  
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
      name: name ? name : "Next.js",
      count: count || posts.length,
    },
  };
};

export default IndexPage;
