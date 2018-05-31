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
import moveFriendMutation from "./graphql/moveFriend.graphql";

type HomeStateType = {
  query: ?string,
  showDialog: boolean
};

class Home extends React.PureComponent<null, HomeStateType> {
  state = {
    query: null,
    showDialog: false
  };

  searchFriends = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ query: e.target.value });
  };

  showAddFriendPopup = () => {
    this.setState({ showDialog: true });
  };

  closeAddFriendPopup = () => {
    this.setState({ showDialog: false });
  };

  render() {
    const { query, showDialog } = this.state;
    const isDraggable = !query;
    return (
      <>
        {showDialog ? (
          <AddFriendPopup cancel={this.closeAddFriendPopup} />
        ) : null}
        <div className={styles.controls}>
          <Search
            id="search-friends"
            className={styles.search}
            label="Search friends"
            delay={850}
            onChange={this.searchFriends}
            autoFocus
          />
          <Button
            className={styles.addFriend}
            onClick={this.showAddFriendPopup}
          >
            <AddFriendIcon size={34} />
            <span>Add friend</span>
          </Button>
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

            return (
              <div className={styles.home}>
                <Mutation
                  mutation={moveFriendMutation}
                  update={(
                    cache,
                    {
                      data: {
                        moveFriend: {
                          ok,
                          friend: {
                            id,
                            stats: {
                              position: { x, y }
                            }
                          },
                          errors
                        }
                      }
                    }
                  ) => {
                    if (!ok) {
                      // TODO: Display error
                      return;
                    }
                    const { friends } = cache.readQuery({
                      query: friendsQuery
                    });
                    const friend = friends.find(elem => elem.id === id);
                    if (friend) {
                      friend.stats.position.x = x;
                      friend.stats.position.y = y;
                    }
                  }}
                >
                  {moveFriend => (
                    <ResponsiveGridLayout
                      cols={{ lg: 6, md: 4, sm: 3, xs: 2, xxs: 1 }}
                      draggableHandle=".grid-item-move"
                      rowHeight={340}
                      margin={[40, 5]}
                      isDraggable={isDraggable}
                      onDragStop={(friendCards, prevState, { i: id, x, y }) => {
                        moveFriend({ variables: { id, x, y } });
                      }}
                    >
                      {friends.map(({ id, nickname, stats, ...friend }) => (
                        <Card
                          key={id}
                          id={id}
                          link={`/friend/${nickname}`}
                          isDraggable={isDraggable}
                          data-grid={{
                            x: stats.position.x,
                            y: stats.position.y,
                            w: 1,
                            h: 1
                          }}
                          stats={stats}
                          {...friend}
                        />
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
