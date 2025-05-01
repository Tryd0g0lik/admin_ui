import React, { useEffect, useState } from "react";
import { InSideFormFC } from "src/components/InSideForm";
import { NavBarFC } from "src/components/NavBar";
// import { useDispatch } from "react-redux";
import { User } from "src/interfesaces";

import { initialState } from "src/reduxes/features/userstate/userSlice";
const user: User = Object.assign({}, initialState);
export function MainFC(): React.JSX.Element {
  const [userData, setUserData] = useState<User>(user);
  // const dispatch = useDispatch();
  /**
   * userstate данные от userData. 
   * В плане они обновляются по redux-у
   * NavBarFC часть контента зависит от
   *  статуса пользователя, 
   */

  const userstate = { "userstate": userData };
  const userdata = { "setuserdata": setUserData };
  useEffect(() => {
    console.log(`@USERSTATE: ${userData}`);
  }, [userData]);
  return (
    <>
      <NavBarFC {...userstate} />
      <InSideFormFC {...userdata} />
    </>
  );
}
