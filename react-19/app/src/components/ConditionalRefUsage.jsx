import { useEffect, useRef, useState } from "react";

const ConditionalRefUsage = () => {
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (show) {
      // The react lifecycle ensures that the DOM is rendered first, before useEffect executes, so this element will always exists to be focused when checked like this
      inputRef.current.focus();
    }
  }, [show]);

  return (
    <>
      <button onClick={() => setShow(s => !s)}>
        Toggle
      </button>

      {show ? <input ref={inputRef} /> : null}
    </>
  );
}

export default ConditionalRefUsage