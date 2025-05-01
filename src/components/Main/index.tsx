import React, { useEffect, useState } from "react";
import { InSideFormFC } from "src/components/InSideForm";
import { NavBarFC } from "src/components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { updateSetUser, setUser } from "src/reduxes/features/userstate/userSlice";
import { User } from "src/interfesaces";

import { initialState } from "src/reduxes/features/userstate/userSlice";
const user: User = Object.assign({}, initialState);
export function MainFC(): React.JSX.Element {
  const [userData, setUserData] = useState<User>(user);

  const userstate = { "userstate": userData, };
  const userdata = { "setuserdata": setUserData, };

  return (
    <>
      <NavBarFC {...userstate} />
      <InSideFormFC {...userdata} />
    </>
  );
}
