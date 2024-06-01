import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  fetchTweets,
  createTweet,
  updateTweet,
  deleteTweet,
} from "../apis/api";
import { useParams } from "react-router-dom";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusIcon,
  PlusCircleIcon,
} from "@heroicons/react/20/solid";
import TweetModal from "./TweetModal";

const ArtistTweets = () => {
  const { artistId } = useParams();
  const navigate = useNavigate();
  const { data: tweets, isLoading } = useQuery(["tweets", artistId], () =>
    fetchTweets(artistId)
  );
  const queryClient = useQueryClient();

  const [editTweet, setEditTweet] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const createTweetMutation = useMutation(createTweet, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tweets", artistId]);
      setShowModal(false);
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

  const handleCreateTweet = (newTweet) => {
    if (newTweet.trim()) {
      createTweetMutation.mutate({ postId: artistId, body: newTweet });
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
    <div className="w-full bg-[#060501] text-white text-center overflow-y-auto">
      <div className="flex justify-end gap-4 mx-auto max-w-7xl pt-4 px-4">
        <button onClick={() => setShowModal(true)}>
          <PlusCircleIcon className="h-6 w-6" />
        </button>
        <button
          onClick={() => navigate("/artists")}
          className="mb-4 p-2 bg-green-700 text-white rounded-lg"
        >
          Back
        </button>
      </div>
      <div className="grid grid-cols-1 mt-8 mb-8 max-w-2xl px-4 mx-auto gap-4">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="bg-white rounded p-4 shadow">
            <div className="mb-2 text-black">
              {editTweet?.id === tweet.id ? (
                <textarea
                className="border ring-2 w-full"
                  type="text"
                  value={editTweet.content}
                  onChange={(e) =>
                    setEditTweet({ ...editTweet, content: e.target.value })
                  }
                />
              ) : (
                <span>{tweet.body}</span>
              )}
            </div>
            <div className="text-gray-500 text-sm">
              {tweet.email} - {tweet.name}
            </div>
            <div className="mt-2 flex text-black items-center">
              {editTweet?.id === tweet.id ? (
                <button onClick={handleUpdateTweet}>Save</button>
              ) : (
                <button
                  onClick={() =>
                    setEditTweet({ id: tweet.id, content: tweet.body })
                  }
                >
                  <PencilSquareIcon className="h-6 w-6" />
                </button>
              )}
              <button onClick={() => deleteTweetMutation.mutate(tweet.id)}>
                <TrashIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <TweetModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleCreateTweet={handleCreateTweet}
      />
    </div>
  );
};

export default ArtistTweets;
