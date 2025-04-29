import React from "react";
import { InSideFormFC } from "src/components/InSideForm";
import { NavBarFC } from "src/components/NavBar";


export function MainFC(): React.JSX.Element {
  return (
    <>
      <NavBarFC />
      <InSideFormFC />
    </>
  );
}