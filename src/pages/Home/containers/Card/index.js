import cx from "classnames";
import Picture from "components/Picture";
import friendStore from "lib/friendStore";
import React from "react";
import styles from "./Card.module.css";
import Tape from "./Tape";

type CardType = {
  id: string,
  name: string,
  picture: string,
  stats: {
    isOnline: boolean,
    totalMessages: ?number,
    totalEvents: number,
    totalNotes: number,
    totalTodos: number
  },
  isDraggable: boolean
};

const Card = ({
  id,
  name,
  picture,
  className,
  stats: { isOnline, messagesCount, eventsCount, notesCount, todosCount },
  isDraggable,
  ...props
}: CardType) => (
  <div key={id} className={cx([className, styles.card])} {...props}>
    <Tape
      id={id}
      isDraggable={isDraggable}
      messagesCount={messagesCount}
      eventsCount={eventsCount}
      notesCount={notesCount}
      todosCount={todosCount}
    />
    <Picture
      link={`/friend/${id}`}
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
