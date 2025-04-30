/**
 * src\components\NavBar\index.tsx
 */
import React, { JSX, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { User } from "src/interfesaces";
import taskStylesOfModalWindow from "src/components/NavBar/tasks/stylesModalWindow";
import { handlerButtonLoginOut } from "src/components/NavBar/hamdlers/handlerBotton";

import "./styles/index.css";
// type Dispatcher = { dispetcher: ReturnType<typeof useDispatch> };
type userStateConstantes = { userstate: User };

export function NavBarFC(props: userStateConstantes): JSX.Element {
  const { userstate } = { ...props };
  useEffect(() => {
    if (userstate["status"]) {
      /**
       * Получаем userstate - состояние пользователя
       * Если аноним то часть менб скрыто
       * Если админ то все меню открыто
       * остальных не трогаем пока
       * 
       * ++ Обработчик нажатия кнопки входа
       */
      console.log('Вы вошли в систему', userstate["status"]);
    } else {
      console.log('Вы не вошли в систему');
    }
  }, [userstate]);
  return (<>
    <header onClick={(e: React.MouseEvent) => {
      const resultBoolean = handlerButtonLoginOut(e);
      if (resultBoolean) {
        /** IF CLICK BY BUTTON  */
        Promise.all([taskStylesOfModalWindow()]).catch((error) => {
          console.log(`Error: ${error.message}`);
          // Действие, которое нужно выполнить при ошибке
        }).then(() => {
          console.log('Все окей');
          // Действие, которое нужно выполнить после разрешения промиса
        });
      }
    }}>
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
        <div className="button navbar-end">
          <a className="button__click btn">Вход</a>
      </div>
    </div>
    </header>
    <section className="h1" >
      <h1 className="text-3xl font-bold underline pb-8">
        Администратор
      </h1>
    </section>

  </>);
} 
