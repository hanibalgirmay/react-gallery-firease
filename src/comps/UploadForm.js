import React, { useState } from "react";
import ProgressBar from "./Progress";

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const types = ["image/png", "image/jpeg"];
  const [error, setError] = useState(null);

  const chageHandler = (e) => {
    // console.log("chage");
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select image file(png or jpg) only");
    }
  };
  return (
    <form>
      <label>
        <input type="file" onChange={chageHandler} />
        <span>+</span>
      </label>
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div className="img">{file.name}</div>}
        {file && <ProgressBar file={file} setFile={setFile} />}
      </div>
    </form>
  );
};

export { UploadForm };
