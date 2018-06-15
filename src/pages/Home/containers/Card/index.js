import cx from "classnames";
import Picture from "components/Picture";
import friendStore from "lib/friendStore";
import React from "react";
import { Link } from "react-router-dom";
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
  query: ?string
};

const Card = ({
  id,
  link,
  name,
  picture,
  className,
  stats: { isOnline, messagesCount, eventsCount, notesCount, todosCount },
  query,
  ...props
}: CardType) => (
  <div className={cx([className, styles.card])} {...props}>
    <Tape
      id={id}
      name={name}
      link={link}
      query={query}
      messagesCount={messagesCount}
      eventsCount={eventsCount}
      notesCount={notesCount}
      todosCount={todosCount}
    />
    <Link to={{ pathname: link, state: { query } }}>
      <Picture
        src={picture}
        name={name}
        effects={{
          grayscale: isOnline,
          rotate: friendStore(id).picture
        }}
      />
    </Link>
  </div>
);

export default Card;
