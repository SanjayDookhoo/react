import { useEffect, useLayoutEffect, useRef, useState } from "react";

// TooltipExample
const ExampleUseLayoutEffect = () => {
  const buttonRef = useRef(null);
  const tooltipRef = useRef(null);

  const [style, setStyle] = useState({
    top: 0,
    left: 0,
    opacity: 0,
  });

  // it is a tiny almost unnoticeable flicker on my computer, to test, replace with useEffect
  useLayoutEffect(() => {
    const button = buttonRef.current;
    const tooltip = tooltipRef.current;

    if (!button || !tooltip) return;

    // Measure both elements
    const buttonRect = button.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();

    // Calculate position (centered above button)
    const top =
      buttonRect.top -
      tooltipRect.height -
      8;

    const left =
      buttonRect.left +
      buttonRect.width / 2 -
      tooltipRect.width / 2;

    // Apply final position BEFORE paint
    setStyle({
      top,
      left,
      opacity: 1,
    });
  }, []);

  return (
    <>
      <button ref={buttonRef}>Hover me</button>

      <div
        ref={tooltipRef}
        style={{
          position: "fixed",
          background: "black",
          color: "white",
          padding: "6px 10px",
          borderRadius: 4,
          pointerEvents: "none",
          ...style,
        }}
      >
        Tooltip text
      </div>
    </>
  );
}

export default ExampleUseLayoutEffect;
