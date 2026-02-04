"use client";

import { useState } from "react";

type FormState = {
  title: string;
  author: string;
  body: string;
};

const initialState: FormState = {
  title: "",
  author: "",
  body: "",
};

export default function NewPostForm() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState<FormState | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(formState);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="formRow">
        <div className="field">
          <label className="label" htmlFor="title">
            Title
          </label>
          <input
            className="input"
            id="title"
            name="title"
            placeholder="Name your post"
            value={formState.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label className="label" htmlFor="author">
            Author
          </label>
          <input
            className="input"
            id="author"
            name="author"
            placeholder="Add your name"
            value={formState.author}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor="body">
          Post body
        </label>
        <textarea
          className="textarea"
          id="body"
          name="body"
          placeholder="Write the post content here..."
          rows={6}
          value={formState.body}
          onChange={handleChange}
          required
        />
        <p className="helper">This form is client-side only and doesn&apos;t submit yet.</p>
      </div>

      <div className="formActions">
        <button className="button" type="submit">
          Create post
        </button>
        <button
          className="button buttonGhost"
          type="button"
          onClick={() => {
            setFormState(initialState);
            setSubmitted(null);
          }}
        >
          Reset
        </button>
      </div>

      {submitted ? (
        <div className="card formPreview">
          <p className="p">Preview</p>
          <h3 className="h3">{submitted.title || "Untitled"}</h3>
          <p className="meta">
            {submitted.author ? `By ${submitted.author}` : "Anonymous author"}
          </p>
          <p className="p">{submitted.body || "No body text yet."}</p>
        </div>
      ) : null}
    </form>
  );
}
