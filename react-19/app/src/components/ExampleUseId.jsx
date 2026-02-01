import { useId } from "react";

const ExampleUseId = () => {
  const id = useId();
  const id2 = useId();

  console.log(id,id2)

  return (
    <>
      <label htmlFor={id}>Email</label>
      <input id={id} />
    </>
  );
}

export default ExampleUseId