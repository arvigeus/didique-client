// @flow
import cx from "classnames";
import CalendarIcon from "components/icons/Calendar";
import MessagesIcon from "components/icons/Messages";
import MoveIcon from "components/icons/Move";
import NotesIcon from "components/icons/Notes";
import TodoIcon from "components/icons/Todo";
import TrashIcon from "components/icons/Trash";
import { ConfirmPopup, PopupContext } from "components/Popup";
import friendStore from "lib/friendStore";
import React from "react";
import { Mutation } from "react-apollo";
import { Link } from "react-router-dom";
import deleteFriendMutation from "../../graphql/deleteFriend.graphql";
import friendsQuery from "../../graphql/friends.graphql";
import styles from "./Tape.module.css";

type TapePropsType = {
  id: string,
  name: string,
  link: string,
  query: ?string,
  messagesCount?: number,
  eventsCount?: number,
  notesCount?: number,
  todosCount?: number
};

class Tape extends React.PureComponent<TapePropsType> {
  onFriendDeleted = (
    cache,
    {
      data: {
        deleteFriend: { ok, friend, errors }
      }
    }
  ) => {
    if (!ok) return;
    const { query } = this.props;
    const params = {
      query: friendsQuery,
      variables: { query }
    };
    const { friends } = cache.readQuery(params);
    cache.writeQuery({
      ...params,
      data: { friends: friends.filter(e => e.id !== friend.id) }
    });
  };

  render() {
    const {
      id,
      name,
      link,
      query,
      messagesCount,
      eventsCount,
      notesCount,
      todosCount
    } = this.props;
    const friend = friendStore(id);
    const badgeClass = cx(styles.badge, { [styles.badgeSearching]: !!query });
    return (
      <>
        {!query ? (
          <div
            className={cx([styles.tape, styles.tapeMove, "grid-item-move"])}
            style={{ transform: `rotate(${friend.tapeMove}deg)` }}
            title="Move"
          >
            <MoveIcon size={30} className={styles.iconControls} />
          </div>
        ) : null}
        {/* TODO: Don't show Delete if user is me */}
        <Mutation mutation={deleteFriendMutation} update={this.onFriendDeleted}>
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
              badgeClass={badgeClass}
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
              badgeClass={badgeClass}
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
              badgeClass={badgeClass}
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
              badgeClass={badgeClass}
            />
          </Link>
        </div>
      </>
    );
  }
}

export default Tape;
