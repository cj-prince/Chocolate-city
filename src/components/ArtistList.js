import React from "react";
import { useQuery } from "react-query";
import { fetchArtists } from "../apis/api";
import { useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/20/solid";


const ArtistList = () => {
  const { data: artists, isLoading } = useQuery("artists", fetchArtists);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen bg-[#060501]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate("/")}
          className="mb-4 p-2 bg-green-700 text-white rounded-lg"
        >
          Back
        </button>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {artists.map((artist) => (
            <li
              key={artist.id}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3
                      onClick={() => navigate(`/artists/${artist.id}`)}
                      className="truncate text-sm font-medium text-gray-900 cursor-pointer"
                    >
                      {artist?.name}
                    </h3>
                    <span className="inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {artist?.username}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">
                    {artist?.website}
                  </p>
                </div>
                <div>
                  <p
                    className="text-sm  px-4 cursor-pointer"
                    onClick={() => navigate(`/artists/${artist.id}/tweets`)}
                  >
                    <ChatBubbleLeftIcon className="h-5 w-5" />
                  </p>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <a
                      href={`mailto:${artist?.email}`}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <EnvelopeIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Email
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      href={`tel:${artist?.telephone}`}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <PhoneIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtistList;
