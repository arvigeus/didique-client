import cx from "classnames";
import Editor from "components/Editor";
import MoveIcon from "components/icons/Move";
import TrashIcon from "components/icons/Trash";
import React from "react";
import { Mutation } from "react-apollo";
import deleteNoteMutation from "../graphql/deleteNote.graphql";
import notesQuery from "../graphql/notes.graphql";
import styles from "./Note.module.css";

class Note extends React.PureComponent {
  onNoteDeleted = (
    cache,
    {
      data: {
        deleteNote: { ok, note, errors }
      }
    }
  ) => {
    if (!ok) return;
    const { nickname, query } = this.props;
    const queryParams = {
      query: notesQuery,
      variables: { nickname, query }
    };
    const { notes } = cache.readQuery(queryParams);
    cache.writeQuery({
      ...queryParams,
      data: { notes: notes.filter(e => e.id !== note.id) }
    });
  };

  render() {
    const {
      isDraggable,
      nickname,
      id,
      title,
      text,
      tags,
      color,
      updatedAt,
      query,
      ...props
    } = this.props;
    return (
      <Mutation mutation={deleteNoteMutation} update={this.onNoteDeleted}>
        {deleteNote => (
          <form
            name={id}
            className={cx(styles.note, styles[color] || styles.yellow)}
            {...props}
          >
            <div className={styles.header}>
              <div className={styles.remove} title="Remove">
                <TrashIcon
                  size={30}
                  className={styles.iconControls}
                  onClick={() => {
                    deleteNote({
                      variables: { nickname, id }
                    });
                  }}
                />
              </div>
              <input className={styles.title} defaultValue={title} />
              {isDraggable ? (
                <div
                  className={cx([styles.move, "grid-item-move"])}
                  title="Move"
                >
                  <MoveIcon size={30} className={styles.iconControls} />
                </div>
              ) : (
                <div className={styles.move} />
              )}
            </div>
            <div className={styles.content}>
              <Editor onChange={(text, medium) => {}}>{text}</Editor>
            </div>
            <div className={styles.footer}>
              {tags.map(tag => (
                <label key={tag} className={styles.tag}>
                  {tag}{" "}
                  <input className={styles.removeTag} type="button" value="x" />
                </label>
              ))}
            </div>
          </form>
        )}
      </Mutation>
    );
  }
}

export default Note;
