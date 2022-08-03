import React from 'react';
import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import './Comment.css';
import Avatar from '../Avatar/Avatar';

const Comment = (props) => {
  const { comment } = props;
  return (
    <div className="comment">
      <div className="commentMetadata">
        <Avatar name={comment.author} />
        <p className="commentAuthor">{comment.author}</p>
        <p className="commentCreatedTime">
          {moment.unix(comment.created_utc).fromNow()}
        </p>
      </div>
      <ReactMarkdown source={comment.body} />
    </div>
  );
};

export default Comment;
