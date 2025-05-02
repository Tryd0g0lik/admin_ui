/**
 * src\components\InSideForm\index.tsx
 */
import React, { JSX, useState, useEffect } from "react";
import { handlerInputFileds } from "src/components/InSideForm/handlers/handlerForm";
import "./styles/index.css";
import taskRequestToServer from "src/components/NavBar/tasks/requestServer";
import { User, UserStatus } from "src/interfesaces";
type UseStateCallBack = { setuserdata: CallableFunction, reduxDispatch: CallableFunction };
import { setUser, resetSetUser } from "src/reduxes/features/userstate/userSlice";
import { useSelector } from "react-redux";
import { RootState } from 'src/reduxes/store';

/**
 * This function checks the usr's tokens/ response from the server.
 * @param res - Response of taskRequestToServer function with type of boolean or User object;
 * @param setuserdata - The useState callback of MainFC component. 
 * @param timeinterval - The NodeJS.Timeout from setInterval function.
 * @returns boolean; If get the true value, it mean we haw all Ok, or false
 */
function clearCach(res: boolean | User, setuserdata: CallableFunction, timeinterval: NodeJS.Timeout): boolean {

  if (typeof res === "boolean" && !res) {
    /** Delete the local storage */
    localStorage.removeItem("user");
    /** Clear the time interval */
    clearInterval(timeinterval);

    return false;
  } else if (typeof res === "object") {
    /** Create the local storage */
    localStorage.setItem("user", JSON.stringify({ ...res }));
    /** Update the user state */
    (setuserdata as (res: User) => void)(res);
    return true;
  }
  return false;
};

export function InSideFormFC(props: UseStateCallBack): JSX.Element {
  /** The variable for status of user */
  const [userstatus, setUserstatus] = useState<string>(UserStatus.STATUS_ANONYMOUSUSER);
  const userstate = useSelector((state: RootState) => state.userstate);

  /**
   * This is a modal-window component. 
   * It contains a form for the authentication action.
   * @return JSX.Element - The form in modal window.
   */
  let timeIntervel: NodeJS.Timeout;
  useEffect(() => {
    return () => {
      userstatus === UserStatus.STATUS_ANONYMOUSUSER ? clearInterval(timeIntervel) : null;
    };
  }, [userstatus]);

  const { setuserdata, reduxDispatch } = { ...props };
  return (<div className="modal-window">
    <div className="h2">
      {/** HEADER OF FORM */}

      <h2>"Подтвердите профиль"</h2>
    </div>
    <div onKeyDown={async (e: React.KeyboardEvent) => {
      const result = handlerInputFileds(e, setuserdata, userstate);
      if (typeof result === "object") {
        /** REDUX DISPATCH RECEIVE THE NEW SET USER */
        (reduxDispatch as (setUser: { payload: User, type: "userstate/setUser" }) => void)(setUser(result));
        let res = await taskRequestToServer(result as User);
        clearCach(res, setuserdata, timeIntervel);
        /** SETINTERVAL FOR UPDATE THE USER TOKENS OF COOKIE */
        timeIntervel = setInterval(async () => {
          const ls = localStorage.getItem("user");
          if (typeof ls !== "string" || (typeof ls === "string" && ls.length === 0)) {
            clearInterval(timeIntervel);
            setUserstatus(UserStatus.STATUS_ANONYMOUSUSER);
            (reduxDispatch as (resetSetUser: { payload: undefined, type: "userstate/resetSetUser" }) => void)(resetSetUser());
          } else if (typeof ls === "string" && ls.length > 0) {
            const user = JSON.parse(ls) as User;
            /** CHECKING AND SEND SINGLE REQUEST FROM GENERATE OR REFRESH */
            res = await (taskRequestToServer as (user: User) => Promise<User | boolean>)(user);
            const answerBool = clearCach(res, setuserdata, timeIntervel);
            if (typeof answerBool === "boolean" && answerBool) {

              setUserstatus((res as User).status);
              /** REDUX DISPATCH RECEIVE THE NEW SET USER */
              (reduxDispatch as (setUser: { payload: User, type: "userstate/setUser" }) => void)(setUser(res as User));
            }
          }
        }, 2591400);
      }

    }}>
      {/** This is the event listener on the input filelds from modal window.
       * then will CHANGE THE setUserData FROM MainFC COMPONENT */}
      <form className="modal-window__inner form">
        <div className="form-input_email">
        <label className="input validator">
          {/** FIELD OF EMAIL */}
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
            </svg>
            <input
              className="form-input_email__inser"
              type="email" placeholder="mail@site.com"
              required
              autoComplete="username" />
          </label>
          <div className=" validator-hint hidden">Enter valid email address</div>
        </div>
        <div className="form__input_password">
          {/** FIELD OF PASSWORD */}
          <label className="input validator">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                ></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              className="form__input_password__inser"
              type="password"
              required
              placeholder="Password"
              minLength={8}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Должно быть более 8 символов, включая цифры, строчные буквы, заглавные буквы"
              autoCapitalize="off"
              autoComplete="current-password"
            />
          </label>

          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
          </p>
        </div>
      </form>
    </div>
  </div>);

}
