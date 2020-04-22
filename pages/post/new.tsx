import * as React from "react";
import styled from "styled-components";
import Router from "next/router";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 20%;
  & > * + * {
    margin-top: 1rem;
  }

  input[type="text"],
  textarea {
    padding: 0.5rem 0.5rem;
    border: 2px solid lightgray;
  }

  input[type="submit"] {
    width: 5rem;
  }
`;

function NewPost() {
  const [values, setValues] = React.useState({});

  const handleForm = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const post = await fetch(`/api/posts`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (post.ok) Router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>Enter Post Content</h3>
      <Form onSubmit={handleFormSubmit}>
        <input
          onChange={handleForm}
          name="title"
          type="text"
          placeholder="enter title"
        />
        <textarea
          onChange={handleForm}
          name="content"
          placeholder="enter content"
        ></textarea>
        <input type="submit" value="submit" />
      </Form>
    </div>
  );
}

export default NewPost;
