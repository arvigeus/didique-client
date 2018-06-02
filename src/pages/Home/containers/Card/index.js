import cx from "classnames";
import Picture from "components/Picture";
import friendStore from "lib/friendStore";
import React from "react";
import styles from "./Card.module.css";
import Tape from "./Tape";

type CardType = {
  id: string,
  link: string,
  name: string,
  picture: string,
  stats: {
    isOnline: boolean,
    totalMessages: ?number,
    totalEvents: number,
    totalNotes: number,
    totalTodos: number
  },
  onFriendDeleted: any,
  isDraggable: boolean
};

const Card = ({
  id,
  link,
  name,
  picture,
  className,
  stats: { isOnline, messagesCount, eventsCount, notesCount, todosCount },
  onFriendDeleted,
  isDraggable,
  ...props
}: CardType) => (
  <div className={cx([className, styles.card])} {...props}>
    <Tape
      id={id}
      name={name}
      isDraggable={isDraggable}
      messagesCount={messagesCount}
      eventsCount={eventsCount}
      notesCount={notesCount}
      todosCount={todosCount}
      onFriendDeleted={onFriendDeleted}
    />
    <Picture
      link={link}
      src={picture}
      name={name}
      effects={{
        grayscale: isOnline,
        rotate: friendStore(id).picture
      }}
    />
  </div>
);

export default Card;
