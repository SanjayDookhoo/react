"use client";

import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
};

const onClickHandler = () => {
    alert('test')
}

export default function Button({ children }: ButtonProps) {
  return (
    <button onClick={onClickHandler}>
      {children}
    </button>
  );
}
