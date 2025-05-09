import React, {JSX} from "react";
import {HendlerPropType } from "src/interfesaces";

/**
 * 
 * @param props.userstatus: `string`. This is status user. Status is '`ANONYMOUSUSER`' or '`ADMIN`" amd some.
 * @param props.head: `string | undefined`. This is property "head" for tag "`<h1>`" from the page. For the head you can write\
 *  text for the header or "`head={undefined}`" to the . "`< Header01FC ... head={undefined} />`"
 * @returns JSC.ELEMENT. This is component "`<h1>`".
 */
export function Header01FC(props: HendlerPropType): JSX.Element {
  // на главную , свойство "head" не передаётся.
  const { userstatus, head } = props;
  return (
    
    <section className="h1" >
      {window.location.pathname === "/admin_ui/" && window.location.pathname.length < 2 && !userstatus.includes("ANONYMOUSUSER") && (
        
          <h1 className="">
            {userstatus === "SUPER_ADMIN" ? "Вы вошли в систему как Администратор" : `${userstatus} - Вы вошли в профиль`}
          </h1>
      )}
      {
        window.location.pathname === "/admin_ui/" && window.location.pathname.length < 2 && userstatus.includes("ANONYMOUSUSER") && (
          <h1 className="">
            Подтвердите свой профиль.
          </h1>
        )
      }
      {window.location.pathname.length > 1 && !userstatus.includes("ANONYMOUSUSER") && (
        <h1 className="">
          {head}
        </h1>)
      }
    </section>
  );
}
