import React, {JSX} from "react";
import "./styles/index.css";

export function NavBarFC(): JSX.Element {
  return (<>
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a>Item 1</a></li>
            <li>
              <a>Администратор</a>
              <ul className="p-2">
                <li><a>Добавление поста</a></li>
                <li><a>Редактирование поста</a></li>
                <li><a>Удаление поста</a></li>
              </ul>
            </li>
            <li><a>Выход</a></li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Machineheads</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li>
            <details>
              <summary>Администратор</summary>
              <ul className="p-2">
                <li><a>Добавление поста</a></li>
                <li><a>Редактирование поста</a></li>
                <li><a>Удаление поста</a></li>
              </ul>
            </details>
          </li>
          <li><a>Выход</a></li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn">Вход</a>
      </div>
    </div>
    <section className="h1" >
      <h1 className="text-3xl font-bold underline pb-8">
        Администратор
      </h1>
    </section>

  </>);
} 