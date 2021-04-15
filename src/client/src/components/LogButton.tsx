import React, { Dispatch, SetStateAction } from 'react';
import { useLogOut } from '../hooks/useAuth';

const LogButton = ({
  token,
  setOpen,
}: {
  token: string;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const { mutateAsync } = useLogOut();

  const handleLogOut = () => {
    mutateAsync()
      .then(() => setOpen(false))
      .catch((e) => console.log(e));
  };

  return (
    <>
      {token ? (
        <button onClick={handleLogOut}>logout</button>
      ) : (
        <button onClick={() => setOpen((prev) => !prev)}>login</button>
      )}
    </>
  );
};

export default LogButton;
