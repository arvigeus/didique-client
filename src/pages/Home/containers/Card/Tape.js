// @flow
import cx from "classnames";
import CalendarIcon from "components/icons/Calendar";
import MessagesIcon from "components/icons/Messages";
import MoveIcon from "components/icons/Move";
import NotesIcon from "components/icons/Notes";
import TodoIcon from "components/icons/Todo";
import TrashIcon from "components/icons/Trash";
import friendStore from "lib/friendStore";
import React from "react";
import { Mutation } from "react-apollo";
import deleteFriend from "../../graphql/deleteFriend.graphql";
import friendsQuery from "../../graphql/friends.graphql";
import styles from "./Tape.module.css";

type TapePropsType = {
  id: string,
  isDraggable: boolean,
  messagesCount?: number,
  eventsCount?: number,
  notesCount?: number,
  todosCount?: number,
  onFriendDeleted: any
};

const Tape = ({
  id,
  isDraggable,
  messagesCount,
  eventsCount,
  notesCount,
  todosCount,
  onFriendDeleted
}: TapePropsType) => {
  const friend = friendStore(id);
  return (
    <>
      {isDraggable ? (
        <div
          className={cx([styles.tape, styles.tapeMove])}
          style={{ transform: `rotate(${friend.tapeMove}deg)` }}
        >
          <MoveIcon
            size={30}
            className={cx([styles.iconControls, "grid-item-move"])}
          />
        </div>
      ) : null}
      {/* TODO: Don't show Delete if user is me */}
      <div
        className={cx([styles.tape, styles.tapeDelete])}
        style={{ transform: `rotate(${friend.tapeDelete}deg)` }}
      >
        <Mutation mutation={deleteFriend} update={onFriendDeleted}>
          {deleteFriend => (
            <TrashIcon
              link="#"
              size={30}
              className={styles.iconControls}
              onClick={e => {
                e.preventDefault();
                deleteFriend({
                  variables: { id },
                  refetchQueries: ["friends"]
                });
              }}
            />
          )}
        </Mutation>
      </div>
      <div
        className={cx([styles.tape, styles.tapeLinks])}
        style={{
          top: `${friend.tapeLinks.top}px`,
          right: `${friend.tapeLinks.right}px`
        }}
      >
        {/* TODO: Don't show messages if user is me */}
        <MessagesIcon
          size={36}
          link={`/friend/${id}/messages`}
          className={styles.iconLink}
          badge={messagesCount}
          badgeClass={styles.badge}
        />
        <CalendarIcon
          size={36}
          link={`/friend/${id}/calendar`}
          className={styles.iconLink}
          badge={eventsCount}
          badgeClass={styles.badge}
        />
        <NotesIcon
          size={36}
          link={`/friend/${id}/notes`}
          className={styles.iconLink}
          badge={notesCount}
          badgeClass={styles.badge}
        />
        <TodoIcon
          size={36}
          link={`/friend/${id}/todo`}
          className={styles.iconLink}
          badge={todosCount}
          badgeClass={styles.badge}
        />
      </div>
    </>
  );
};

export default Tape;
