import React from "react";

function Title({ text1, text2 }) {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <p className="text-muted-foreground">
        {text1}{" "}
        <span className="text-secondary-foreground font-bold">{text2}</span>
      </p>
    </div>
  );
}

export default Title;
