import React, { JSX } from "react";
import { handlerInputFileds } from "src/components/InSideForm/handlers/handlerForm";
import "./styles/index.css";
type UseStateCallBack = { setuserdata: CallableFunction };
export function InSideFormFC(props: UseStateCallBack): JSX.Element {
/**
 * This is a modal-window component. 
 * It contains a form for the authentication action.
 * @param uaserData - This is function for received data from the form.
 * @return JSX.Element - The form in modal window.
 */
  /**
   * uaserData это callback function для получения данный и возврата в другие компоненты
   */
  const { setuserdata } = { ...props };
  return (<div className="modal-window">
    <div className="h2">
      {/** HEADER OF FORM */}
      <h2>Подтвердите профиль</h2>
    </div>
    <div onKeyDown={(e: React.KeyboardEvent) => { handlerInputFileds(e, setuserdata); }
      /** This is the event listener on the input filelds from modal window.
       * then will CHANGE THE setUserData FROM MainFC COMPONENT */} className="modal-window__inner form">
    <form>
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
            <input className="form-input_email__inser" type="email" placeholder="mail@site.com" required />
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
              autoCapitalize="current-password" 
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
