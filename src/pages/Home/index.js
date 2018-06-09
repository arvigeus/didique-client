// @flow
import Handwriting from "components/Handwriting";
import Button from "components/Input/Button";
import Search from "components/Input/Search";
import { PopupContext } from "components/Popup";
import ResponsiveGridLayout from "components/ResponsiveGridLayout";
import AddFriendIcon from "components/icons/AddFriend";
import React from "react";
import { Mutation, Query } from "react-apollo";
import styles from "./Home.module.css";
import AddFriendPopup from "./containers/AddFriendPopup";
import Card from "./containers/Card";
import friendsQuery from "./graphql/friends.graphql";
import moveFriendsMutation from "./graphql/moveFriends.graphql";

type LayoutType = {
  id: string,
  x: number,
  y: number,
  width: number,
  height: number
};

type GridLayoutType = {
  i: string,
  x: number,
  y: number,
  w: number,
  h: number
};

type HomeStateType = {
  query: string,
  location?: ?{
    state: any
  }
};

class Home extends React.PureComponent<null, HomeStateType> {
  state = {
    query:
      this.props.location && this.props.location.state
        ? this.props.location.state.query
        : ""
  };

  searches = new Set([this.state.query]);

  searchFriends = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.searches.add(e.target.value);
    this.setState({ query: e.target.value });
  };

  layout = [];

  onLayoutChange = (
    move: ({ variables: { changes: Array<LayoutType> } }) => void,
    newLayout: Array<LayoutType>
  ) => {
    const changes = newLayout.filter(changed => {
      const old = this.layout.find(elem => elem.i === changed.i);
      return old && (changed.x !== old.x || changed.y !== old.y);
    });
    this.layout = newLayout;
    if (changes.length)
      move({
        variables: {
          changes: changes.map(({ i, x, y, w, h }: GridLayoutType) => ({
            id: i,
            x,
            y,
            width: w,
            height: h
          }))
        }
      });
  };

  updateCache = (cache: any, friendMods: (Array<any>) => Array<any>) => {
    for (const query of this.searches) {
      const { friends } = cache.readQuery({
        query: friendsQuery,
        variables: { query }
      });
      cache.writeQuery({
        query: friendsQuery,
        variables: { query },
        data: { friends: friendMods(friends) }
      });
    }
  };

  onFriendsMoved = (
    cache: any,
    {
      data: {
        moveFriends: { ok, items, errors }
      }
    }: { data: { moveFriends: { ok: boolean, items: Array<LayoutType> } } }
  ) => {
    if (!ok) return;
    this.updateCache(cache, friends => {
      for (const friend of friends) {
        const changed = items.find(({ id }) => id === friend.id);
        if (changed) {
          friend.stats.position.x = changed.x;
          friend.stats.position.y = changed.y;
        }
      }
      return friends;
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
    const { id } = friend;
    this.updateCache(cache, friends => friends.filter(e => e.id !== id));
  };

  render() {
    const { query } = this.state;
    return (
      <>
        <div className={styles.controls}>
          <Search
            id="search-friends"
            className={styles.search}
            label="Search friends"
            hint="Prefix words with # to search for specific tags"
            defaultValue={query}
            delay={850}
            onChange={this.searchFriends}
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
                  !query ? "Loading" : "Searching"
                } friends`}</Handwriting>
              );
            if (error) return <div>Error :(</div>;
            const { friends } = data;

            if (!friends.length) return "Nothing, hmmm...";

            const friendCards = [];
            if (!query) this.layout = [];
            for (const { id, nickname, stats, ...friend } of friends) {
              friendCards.push(
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
                    query={query}
                    stats={stats}
                    onFriendDeleted={this.onFriendDeleted}
                    {...friend}
                  />
                </div>
              );

              if (!query)
                this.layout.push({
                  i: id,
                  x: stats.position.x,
                  y: stats.position.y,
                  w: 1,
                  h: 1
                });
            }

            if (query)
              return <div className={styles.searchGrid}>{friendCards}</div>;

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
                      isDraggable={!query}
                      isResizable={false}
                      onLayoutChange={this.onLayoutChange.bind(
                        this,
                        moveFriends
                      )}
                    >
                      {friendCards}
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
