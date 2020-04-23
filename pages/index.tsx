import Link from "next/link";
import { GetStaticProps } from "next";
import Layout from "../components/Layout";
import { Posts } from "../config/models/posts.model";
import { Post } from "../interfaces";

const IndexPage = (props: any) => {
  let { posts }: { posts: any } = props;

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
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

export const getServerSideProps = async () => {
  const posts = await Posts.query();
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
};

export default IndexPage;
