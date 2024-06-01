import React, { useState } from "react";

const TweetModal = ({ showModal, setShowModal, handleCreateTweet }) => {
  const [newTweet, setNewTweet] = useState("");

  const handleCloseModal = () => {
    setNewTweet("");
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div className="fixed z-50 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg shadow-xl p-4 z-50">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Create Tweet</h2>
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={handleCloseModal}
                >
                  &times;
                </button>
              </div>
              <input
                type="text"
                value={newTweet}
                onChange={(e) => setNewTweet(e.target.value)}
                placeholder="Write a tweet..."
                className="border text-black border-gray-300 rounded-md px-3 py-2 mb-2 w-full"
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={() => {
                  handleCreateTweet(newTweet);
                  handleCloseModal();
                }}
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TweetModal;
