import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const QuillEditor = ({ data, setData }) => {
  return (
    <ReactQuill
      theme="bubble"
      value={data}
      onChange={setData}
      className="quill-editor"
      placeholder="Tell me about yourself..."
    />
  );
};

export default QuillEditor;
