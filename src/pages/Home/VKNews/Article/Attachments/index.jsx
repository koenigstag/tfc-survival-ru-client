import React, { useCallback, useState } from "react";
import styles from './Attachments.module.sass';
import AttachImage from "./Images";
import AttachVideo from "./Video";

const Attachments = (props) => {
  const { post } = props;
  const [showAttachments, setShowAttachments] = useState(false);

  console.log(showAttachments);

  const attachments = useCallback((show) => {
    if (show && post.attachments.length) {
      if (post.attachments[0].type === "photo") {
        return post.attachments.map((att, index) => <AttachImage key={`${post.id}_${index}`} att={att} post={post} />);
      }

      if (post.attachments[0].type === "video") {
        return <AttachVideo key={`${post.id}_${0}`} post={post} />;
      }

      return <></>
    }
  }, [post]);

  return (
    <div>
      <details style={{ marginTop: "20px" }}>
        <summary
          onClick={() => {
            setShowAttachments(true);
          }}
        >
          Вложения
        </summary>
          <div className={styles.postAttaches}>
            {attachments(showAttachments)}
          </div>
      </details>
    </div>
  );
};

export default Attachments;
