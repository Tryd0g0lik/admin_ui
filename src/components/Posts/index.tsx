/**
 * src\components\Posts\index.tsx
 */
import React, { useEffect, useState } from "react";
import { InSideFormFC } from "src/components/InSideForm";
import { NavBarFC } from "src/components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from 'src/reduxes/store';
import { User, } from "src/interfesaces";
import { handlerButtonExitFC } from "src/services/handler/handlerButtonExit";
import { Header01FC } from "src/components/Header";
import taskHandlerButton from "src/components/Posts/tasks/taskButtomPost";
import taskHandlerClickByTag from "src/components/Posts/tasks/taskTagsUnderPost";
import "./styles/style.css";
import { PostType } from "src/interfesaces";

export function PostFC(): React.JSX.Element {
  const [posts, setPosts] = useState<PostType[]>([]);
  const storeuserstate = useSelector((state: RootState) => state.userstate);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<User>(storeuserstate);
  /** SAVE THE INTINAL QUANRIRY OF POST  */
  const map = new Map();
  const userstate = { "userstate": userData };
  const userdata = { "setuserdata": setUserData, reduxDispatch: dispatch };
  let htmlInitial: HTMLElement[] = [];
  useEffect(() => {
    setUserData(storeuserstate);
  }, [storeuserstate, userData]);
  return (
    <div onClick={handlerButtonExitFC}>
      <NavBarFC {...userstate}/>
      < Header01FC userstatus={storeuserstate["status"]} head="Посты" />
      <InSideFormFC {...userdata} />
      <main>
        <section className="posts" >
          <div className="posts_button__loading" onMouseDown={(e: React.MouseEvent) => {
            /* THE TASK OF HANdLE TO THE CLICKS BY BUTTON */
            taskHandlerButton(e, setPosts, map);
          }}>
            <button className="posts_button btn btn-accent">Загрузить</button>
          </div>
          <div className="posts_container container">
            <div className="posts_post" onMouseDown={(e: React.MouseEvent) => {
              /** HANDLER CLICK BY TAG UNDER ONE POST */
              taskHandlerClickByTag(e, htmlInitial, map, posts);
            }} >
              {posts && posts.map((item) => {
                return (
                  <div className="chat chat-start" key={item.id}>
                    <div className="date date-create">{item.createdAt}</div>
                    <div className="chat-header"> {item.title} </div>
                    <div className="chat-image avatar">
                      <div className="w-24 rounded-xl">
                        <img
                          alt={item.previewPicture.name}
                          src={item.previewPicture.url}
                        />
                        <p className="post-author">{typeof item.authorName === 'string' ? item.authorName : ''}</p>
                      </div>
                    </div>
                    <div className="chat-bubble">{item.code}</div>
                    <div className="tag-names">{item.tagNames.map((view: string) => (
                      <span className="tag-name">{view}</span>
                    ))}</div>
                    <div className="date date-updated">{item.updatedAt}</div>
                  </div>);
              }

              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
