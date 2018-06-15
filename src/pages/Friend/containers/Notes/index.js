import Handwriting from "components/Handwriting";
import ResponsiveGridLayout from "components/ResponsiveGridLayout";
import React from "react";
import { Mutation, Query } from "react-apollo";
import Note from "./components/Note";
import moveNotesMutation from "./graphql/moveNotes.graphql";
import notesQuery from "./graphql/notes.graphql";
import styles from "./Notes.module.css";

class Notes extends React.PureComponent {
  onLayoutChange = (
    move: ({
      variables: { changes: Array<LayoutType> }
    }) => void,
    changes: Array<LayoutType>
  ) => {
    move({
      variables: {
        changes,
        nickname: this.props.match.params.nickname
      }
    });
  };

  render() {
    const {
      match: {
        params: { nickname }
      },
      location
    } = this.props;
    const query = location && location.state ? location.state.query : "";
    return (
      <Query
        query={notesQuery}
        variables={{ nickname, query }}
        fetchPolicy="cache-and-network"
      >
        {({ loading, error, data }) => {
          if (loading)
            return (
              <Handwriting fontSize="50px">{`${
                !query ? "Loading" : "Searching"
              } notes`}</Handwriting>
            );
          if (error) return <div>Error :(</div>;
          const { notes } = data;

          if (!notes.length) return "Nothing, hmmm...";

          return (
            <div className={styles.notes}>
              <Mutation mutation={moveNotesMutation} update={this.onNotesMoved}>
                {moveNotes => (
                  <ResponsiveGridLayout
                    cols={{ lg: 60, md: 60, sm: 60, xs: 3, xxs: 3 }}
                    draggableHandle=".grid-item-move"
                    columnWidth={500}
                    rowHeight={10}
                    isDraggable={!query}
                    margin={[5, 5]}
                    onLayoutChange={changes =>
                      this.onLayoutChange(moveNotes, changes)
                    }
                  >
                    {notes.map(
                      ({
                        id,
                        title,
                        text,
                        color,
                        tags,
                        position: { x, y, width, height },
                        updatedAt
                      }) => (
                        <div
                          key={id}
                          className={styles.note}
                          data-grid={{
                            x: x,
                            y: y,
                            w: width,
                            h: height,
                            minW: 20,
                            minH: 15
                          }}
                        >
                          <Note
                            id={id}
                            key={id}
                            nickname={nickname}
                            title={title}
                            text={text}
                            color={color}
                            tags={tags}
                            updatedAt={updatedAt}
                            isDraggable={!query}
                            query={query}
                          />
                        </div>
                      )
                    )}
                  </ResponsiveGridLayout>
                )}
              </Mutation>
            </div>
          );
        }}
      </Query>
    );
  }
}
export default Notes;
