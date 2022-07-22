import { useState } from "react";

const useText = (defaultText: string) => {
  const [text, setText] = useState(defaultText);
  const clearText = () => setText("");

  return { text, setText, clearText };
};

export default useText;
