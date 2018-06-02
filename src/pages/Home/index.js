// @flow
import Handwriting from "components/Handwriting";
import Button from "components/Input/Button";
import Search from "components/Input/Search";
import ResponsiveGridLayout from "components/ResponsiveGridLayout";
import AddFriendIcon from "components/icons/AddFriend";
import React from "react";
import { Mutation, Query } from "react-apollo";
import styles from "./Home.module.css";
import AddFriendPopup from "./containers/AddFriendPopup";
import Card from "./containers/Card";
import friendsQuery from "./graphql/friends.graphql";
import moveFriendsMutation from "./graphql/moveFriends.graphql";
import { PopupContext } from "components/Popup";

type LayoutType = {
  i: string,
  x: number,
  y: number,
  width: number,
  height: number
};

type HomeStateType = {
  query: string
};

class Home extends React.PureComponent<null, HomeStateType> {
  state = {
    query: ""
  };

  layout = [];

  searchFriends = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  onLayoutChange = (
    move: ({ variables: { changes: Array<LayoutType> } }) => void,
    newLayout: Array<LayoutType>
  ) => {
    if (this.state.query) return;
    const changes = newLayout.filter(changed => {
      const old = this.layout.find(elem => elem.i === changed.i);
      return old && (changed.x !== old.x || changed.y !== old.y);
    });
    this.layout = newLayout;
    if (changes.length)
      move({
        variables: {
          changes: changes.map(({ i, x, y, w, h }) => ({
            id: i,
            x,
            y,
            width: w,
            height: h
          }))
        },
        refetchQueries: ["friends"]
      });
  };

  getFriendsFromCache = (cache: any) => {
    const { query } = this.state;
    const { friends } = cache.readQuery({
      query: friendsQuery,
      variables: { query }
    });
    return friends;
  };

  onFriendsMoved = (
    cache: any,
    {
      data: {
        moveFriends: { ok, items, errors }
      }
    }
  ) => {
    if (!ok) return;
    const { query } = this.state;
    const friends = this.getFriendsFromCache(cache);
    for (const friend of friends) {
      const changed = items.find(({ id }) => id === friend.id);
      if (changed) {
        friend.stats.position.x = changed.x;
        friend.stats.position.y = changed.y;
      }
    }
    cache.writeQuery({
      query: friendsQuery,
      variables: { query },
      data: { friends }
    });
  };

  onFriendDeleted = (
    cache,
    {
      data: {
        deleteFriend: { ok, friend, errors }
      }
    }
  ) => {
    if (!ok) return;
    const { query } = this.state;
    const friends = this.getFriendsFromCache(cache);
    const { id } = friend;
    cache.writeQuery({
      query: friendsQuery,
      variables: { query },
      data: { friends: friends.filter(e => e.id !== id) }
    });
  };

  render() {
    const { query } = this.state;
    const isDraggable = !query;
    return (
      <>
        <div className={styles.controls}>
          <Search
            id="search-friends"
            className={styles.search}
            label="Search friends"
            delay={850}
            onChange={this.searchFriends}
            autoFocus
          />
          <PopupContext.Consumer>
            {showPopup => (
              <Button
                className={styles.addFriend}
                onClick={() => {
                  showPopup(<AddFriendPopup cancel={() => showPopup(null)} />);
                }}
              >
                <AddFriendIcon size={34} />
                <span>Add friend</span>
              </Button>
            )}
          </PopupContext.Consumer>
        </div>
        <Query query={friendsQuery} variables={{ query }}>
          {({ loading, error, data }) => {
            if (loading)
              return (
                <Handwriting fontSize="50px">{`${
                  isDraggable ? "Loading" : "Searching"
                } friends`}</Handwriting>
              );
            if (error) return <div>Error :(</div>;
            const { friends } = data;

            if (!friends.length) return "Nothing, hmmm...";

            if (isDraggable) {
              this.layout = friends.map(
                ({
                  id: i,
                  stats: {
                    position: { x, y }
                  }
                }) => ({ i, x, y, w: 1, h: 1 })
              );
            }

            return (
              <div className={styles.home}>
                <Mutation
                  mutation={moveFriendsMutation}
                  update={this.onFriendsMoved}
                >
                  {moveFriends => (
                    <ResponsiveGridLayout
                      cols={{ lg: 4, md: 4, sm: 3, xs: 2, xxs: 1 }}
                      draggableHandle=".grid-item-move"
                      rowHeight={380}
                      margin={[40, 5]}
                      isDraggable={isDraggable}
                      isResizable={false}
                      onLayoutChange={this.onLayoutChange.bind(
                        this,
                        moveFriends
                      )}
                    >
                      {friends.map(({ id, nickname, stats, ...friend }) => (
                        <div
                          key={id}
                          data-grid={{
                            x: stats.position.x,
                            y: stats.position.y,
                            w: 1,
                            h: 1
                          }}
                        >
                          <Card
                            id={id}
                            link={`/friend/${nickname}`}
                            isDraggable={isDraggable}
                            stats={stats}
                            onFriendDeleted={this.onFriendDeleted}
                            {...friend}
                          />
                        </div>
                      ))}
                    </ResponsiveGridLayout>
                  )}
                </Mutation>
              </div>
            );
          }}
        </Query>
      </>
    );
  }
}

export default Home;
