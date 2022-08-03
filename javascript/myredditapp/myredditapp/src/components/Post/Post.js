import React, { useState } from 'react';
import './Post.css';
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
  TiMessage,
} from 'react-icons/ti';
import moment from 'moment';
import shortenNumber from './shortenNumber';
import Card from '../../components/Card/Card';
import Comment from '../Comment/Comment';
import Avatar from '../Avatar/Avatar';

export const Post = (props) => {
  const [voteValue, setVoteValue] = useState(0);

  const { post, onToggleComments } = props;

  const onHandleVote = (newValue) => {
    if (newValue === voteValue) {
      setVoteValue(0);
    } else if (newValue === 1) {
      setVoteValue(1);
    } else {
      setVoteValue(-1);
    }
  };

  const renderUpVote = () => {
    if (voteValue === 1) {
      return <TiArrowUpThick className="iconAction" />;
    }
    return <TiArrowUpOutline className="iconAction" />;
  };

  const renderDownVote = () => {
    if (voteValue === -1) {
      return <TiArrowDownThick className="iconAction" />;
    }
    return <TiArrowDownOutline className="iconAction" />;
  };

  const getVoteType = () => {
    if (voteValue === 1) {
      return 'up-vote';
    }
    if (voteValue === -1) {
      return 'down-vote';
    }

    return '';
  };

  const renderComments = () => {
    if (post.errorComments) {
      return (
        <div>
          <h3>Error loading comments</h3>
        </div>
      );
    }

    if (post.loadingComments) {
      return (
        <div>
            <h3>Please wait - Loading...</h3>
        </div>
      );
    }

    if (post.showingComments) {
      return (
        <div>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <article key={post.id}>
      <Card>
        <div className="postWrapper">
          <div className="postVotesContainer">
            <button
              type="button"
              className={`iconActionButton upVote ${
                voteValue === 1 && 'active'
              }`}
              onClick={() => onHandleVote(1)}
              aria-label="Up vote"
            >
              {renderUpVote()}
            </button>
            <p className={`postVotesValue ${getVoteType()}`}>
              {shortenNumber(post.ups, 1)}
            </p>
            <button
              type="button"
              className={`iconActionButton downVote ${
                voteValue === -1 && 'active'
              }`}
              onClick={() => onHandleVote(-1)}
              aria-label="Down vote"
            >
              {renderDownVote()}
            </button>
          </div>
          <div className="postContainer">
            <h3 className="postTitle">{post.title}</h3>

            <div className="postImageContainer">
              <img src={post.url} alt="" className="postImage" />
            </div>

            <div className="postDetails">
              <span className="authorDetails">
                <Avatar name={post.author} />
                <span className="authorUsername">{post.author}</span>
              </span>
              <span>{moment.unix(post.created_utc).fromNow()}</span>
              <span className="postCommentsContainer">
                <button
                  type="button"
                  className={`iconActionButton ${
                    post.showingComments && 'showingComments'
                  }`}
                  onClick={() => onToggleComments(post.permalink)}
                  aria-label="Show comments"
                >
                  <TiMessage className="iconAction" />
                </button>
                {shortenNumber(post.num_comments, 1)}
              </span>
            </div>

            {renderComments()}
          </div>
        </div>
      </Card>
    </article>
  );
};

export default Post;
