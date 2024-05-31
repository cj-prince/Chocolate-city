import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchTweets, createTweet, updateTweet, deleteTweet } from "../apis/api";
import { useParams } from "react-router-dom";

const ArtistTweets = () => {
  const { artistId } = useParams();
  const { data: tweets, isLoading } = useQuery(["tweets", artistId], () =>
    fetchTweets(artistId)
  );
  const queryClient = useQueryClient();

  const [newTweet, setNewTweet] = useState("");
  const [editTweet, setEditTweet] = useState(null);

  const createTweetMutation = useMutation(createTweet, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tweets", artistId]);
    },
  });

  const updateTweetMutation = useMutation(
    ({ tweetId, content }) => updateTweet(tweetId, { body: content }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tweets", artistId]);
      },
    }
  );

  const deleteTweetMutation = useMutation(deleteTweet, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tweets", artistId]);
    },
  });

  const handleCreateTweet = () => {
    if (newTweet.trim()) {
      createTweetMutation.mutate({ postId: artistId, body: newTweet });
      setNewTweet("");
    }
  };

  const handleUpdateTweet = () => {
    if (editTweet?.content.trim()) {
      updateTweetMutation.mutate({
        tweetId: editTweet.id,
        content: editTweet.content,
      });
      setEditTweet(null);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Tweets</h2>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id} className="flex justify-between items-center">
            {editTweet?.id === tweet.id ? (
              <input
                type="text"
                value={editTweet.content}
                onChange={(e) =>
                  setEditTweet({ ...editTweet, content: e.target.value })
                }
              />
            ) : (
              <span>{tweet.body}</span>
            )}
            <div>
              {editTweet?.id === tweet.id ? (
                <button onClick={handleUpdateTweet}>Save</button>
              ) : (
                <button
                  onClick={() =>
                    setEditTweet({ id: tweet.id, content: tweet.body })
                  }
                >
                  Edit
                </button>
              )}
              <button onClick={() => deleteTweetMutation.mutate(tweet.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTweet}
          onChange={(e) => setNewTweet(e.target.value)}
          placeholder="Write a tweet..."
        />
        <button onClick={handleCreateTweet}>Tweet</button>
      </div>
    </div>
  );
};

export default ArtistTweets;
