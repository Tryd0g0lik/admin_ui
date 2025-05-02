/**
 * src\components\Main\index.tsx
 */
import React, { useEffect, useState } from "react";
import { InSideFormFC } from "src/components/InSideForm";
import { NavBarFC } from "src/components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from 'src/reduxes/store';
import { User } from "src/interfesaces";
import { handlerButtonExitFC } from "src/components/Main/nabdler/handlerButtonExit";

export function MainFC(): React.JSX.Element {
  const storeuserstate = useSelector((state: RootState) => state.userstate);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<User>(storeuserstate);

  const userstate = { "userstate": userData, };
  const userdata = { "setuserdata": setUserData, reduxDispatch: dispatch };
  useEffect(() => {
    setUserData(storeuserstate);
  }, [storeuserstate, userData]);
  return (
    <div onClick={handlerButtonExitFC}>
      <NavBarFC {...userstate} />
      <InSideFormFC {...userdata} />
    </div>
  );
}
