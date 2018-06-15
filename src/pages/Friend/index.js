import cx from "classnames";
import Handwriting from "components/Handwriting";
import Picture from "components/Picture";
import CalendarIcon from "components/icons/Calendar";
import MessagesIcon from "components/icons/Messages";
import NotesIcon from "components/icons/Notes";
import Search from "components/Input/Search";
import TodoIcon from "components/icons/Todo";
import friendStore from "lib/friendStore";
import React from "react";
import { Query } from "react-apollo";
import { NavLink, Redirect, Route, Switch } from "react-router-dom";
import styles from "./Friend.module.css";
// import Messages from "./containers/Messages";
import Notes from "./containers/Notes";
// import Todo from "./containers/Todo";
import Paperclip from "./components/Paperclip";
import BackButton from "./components/BackButton";
// import Calendar from "./containers/Calendar";
//import Handwriting from "components/Handwriting";
//import Picture from "components/Picture";
import Details from "./containers/Details";
import friendQuery from "./friend.graphql";

class Friend extends React.PureComponent {
  state = {
    query:
      this.props.location && this.props.location.state
        ? this.props.location.state.query
        : null
  };

  searches = new Set([this.state.query]);

  searchFriend = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.searches.add(e.target.value);
    this.setState({ query: e.target.value });
  };

  render() {
    const {
      match: {
        params: { nickname }
      }
    } = this.props;
    const { query } = this.state;
    const url = `/friend/${nickname}`;
    return (
      <Query query={friendQuery} variables={{ nickname }}>
        {({ loading, error, data }) => {
          if (loading)
            return <Handwriting fontSize="50px">Loading friend</Handwriting>;
          if (error) return <div>Error :(</div>;

          const { friend } = data;

          if (!friend)
            return (
              <Redirect
                to={{
                  pathname: "/"
                }}
              />
            );

          const {
            id,
            name,
            picture,
            stats: {
              isOnline,
              messagesCount,
              eventsCount,
              notesCount,
              todosCount
            }
          } = friend;

          const badgeClass = cx(styles.badge, {
            [styles.badgeSearching]: !!query
          });

          return (
            <div className={styles.wrapper}>
              <BackButton to={{ pathname: "/", state: { query } }} />
              <section className={styles.picture}>
                <Paperclip />
                <Picture
                  src={picture}
                  className={styles.photo}
                  name={name}
                  effects={{
                    grayscale: isOnline,
                    rotate: friendStore(id).picture
                  }}
                />
              </section>
              <Search
                id="search-friends"
                className={styles.search}
                label="Search"
                hint="Prefix words with # to search for specific tags"
                delay={850}
                defaultValue={query}
                onChange={this.searchFriend}
              />
              <section className={styles.links}>
                <NavLink
                  to={url}
                  exact
                  className={cx("button", styles.link, styles["details-link"])}
                >
                  Details
                </NavLink>
                <NavLink
                  to={{ pathname: `${url}/messages`, state: { query } }}
                  className={cx("button", styles.link, styles["messages-link"])}
                >
                  <MessagesIcon
                    title="Messages"
                    size={26}
                    className={styles.iconLink}
                    badge={messagesCount}
                    badgeClass={badgeClass}
                  />
                  Messages
                </NavLink>
                <NavLink
                  to={{ pathname: `${url}/calendar`, state: { query } }}
                  className={cx("button", styles.link, styles["calendar-link"])}
                >
                  <CalendarIcon
                    title="Calendar"
                    size={26}
                    className={styles.iconLink}
                    badge={eventsCount}
                    badgeClass={badgeClass}
                  />
                  Calendar
                </NavLink>
                <NavLink
                  to={{ pathname: `${url}/notes`, state: { query } }}
                  className={cx("button", styles.link, styles["notes-link"])}
                >
                  <NotesIcon
                    title="Notes"
                    size={26}
                    className={styles.iconLink}
                    badge={notesCount}
                    badgeClass={badgeClass}
                  />
                  Notes
                </NavLink>
                <NavLink
                  to={{ pathname: `${url}/tasks`, state: { query } }}
                  className={cx("button", styles.link, styles["todo-link"])}
                >
                  <TodoIcon
                    title="Tasks"
                    size={26}
                    className={styles.iconLink}
                    badge={todosCount}
                    badgeClass={badgeClass}
                  />
                  Tasks
                </NavLink>
              </section>
              <section className={styles.page}>
                <Switch>
                  <Route path="/friend/:nickname/" exact component={Details} />
                  <Route path="/friend/:nickname/notes" component={Notes} />
                  {/* <Route
                path=`${url}/messages` nickname={nickname}
                exact
                render={(props) => <Messages {...props} nickname={nickname}>}
              />
              <Route path=`${url}/calendar` exact render={(props) => <Calendar {...props} nickname={nickname}/>} />
              <Route path=`${url}/tasks` exact render={(props) => <Todo {...props} nickname={nickname}>/} /> */}
                </Switch>
              </section>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Friend;
