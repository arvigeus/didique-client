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
import { Link } from "react-router-dom";
import { Mutation } from "react-apollo";
import deleteFriend from "../../graphql/deleteFriend.graphql";
import styles from "./Tape.module.css";
import { PopupContext, ConfirmPopup } from "components/Popup";

type TapePropsType = {
  id: string,
  name: string,
  link: string,
  query: ?string,
  messagesCount?: number,
  eventsCount?: number,
  notesCount?: number,
  todosCount?: number,
  onFriendDeleted: any
};

const Tape = ({
  id,
  name,
  link,
  query,
  messagesCount,
  eventsCount,
  notesCount,
  todosCount,
  onFriendDeleted
}: TapePropsType) => {
  const friend = friendStore(id);
  return (
    <>
      {!!query ? (
        <div
          className={cx([styles.tape, styles.tapeMove, "grid-item-move"])}
          style={{ transform: `rotate(${friend.tapeMove}deg)` }}
          title="Move"
        >
          <MoveIcon size={30} className={styles.iconControls} />
        </div>
      ) : null}
      {/* TODO: Don't show Delete if user is me */}
      <Mutation mutation={deleteFriend} update={onFriendDeleted}>
        {deleteFriend => (
          <PopupContext.Consumer>
            {(showPopup: any => void) => (
              <div
                title="Remove"
                className={cx([styles.tape, styles.tapeDelete])}
                style={{ transform: `rotate(${friend.tapeDelete}deg)` }}
                onClick={e => {
                  showPopup(
                    <ConfirmPopup
                      ok={() => {
                        deleteFriend({
                          variables: { id }
                        });
                        showPopup(null);
                      }}
                      cancel={() => showPopup(null)}
                    >
                      <>
                        Are you sure you want to{" "}
                        <span style={{ color: "red" }}>REMOVE</span>{" "}
                        <strong>{name}</strong>?
                      </>
                    </ConfirmPopup>
                  );
                }}
              >
                <TrashIcon size={30} className={styles.iconControls} />
              </div>
            )}
          </PopupContext.Consumer>
        )}
      </Mutation>
      <div
        className={cx([styles.tape, styles.tapeLinks])}
        style={{
          top: `${friend.tapeLinks.top}px`,
          right: `${friend.tapeLinks.right}px`
        }}
      >
        {/* TODO: Don't show messages if user is me */}
        <Link
          to={{ pathname: `${link}/messages`, state: { query } }}
          className={styles.iconLink}
          draggable={false}
        >
          <MessagesIcon
            title="Messages"
            size={36}
            badge={messagesCount}
            badgeClass={styles.badge}
          />
        </Link>
        <Link
          to={{ pathname: `${link}/calendar`, state: { query } }}
          className={styles.iconLink}
          draggable={false}
        >
          <CalendarIcon
            title="Calendar"
            size={36}
            badge={eventsCount}
            badgeClass={styles.badge}
          />
        </Link>
        <Link
          to={{ pathname: `${link}/notes`, state: { query } }}
          className={styles.iconLink}
          draggable={false}
        >
          <NotesIcon
            title="Notes"
            size={36}
            badge={notesCount}
            badgeClass={styles.badge}
          />
        </Link>
        <Link
          to={{ pathname: `${link}/tasks`, state: { query } }}
          className={styles.iconLink}
          draggable={false}
        >
          <TodoIcon
            title="Tasks"
            size={36}
            badge={todosCount}
            badgeClass={styles.badge}
          />
        </Link>
      </div>
    </>
  );
};

export default Tape;
