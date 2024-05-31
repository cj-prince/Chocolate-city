import React from "react";
import { useQuery } from "react-query";
import { fetchAlbums, fetchAlbumPhotos } from "../apis/api";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ArtistAlbums = () => {
  const { artistId } = useParams();
  const { data: albums, isLoading } = useQuery(["albums", artistId], () =>
    fetchAlbums(artistId)
  );
const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen bg-[#060501]">
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold mb-4 text-white">Albums</h2>
          <button
            onClick={() => navigate("/artists")}
            className="mb-4 p-2 bg-green-700 text-white rounded-lg"
          >
            Back
          </button>
        </div>
        <div className="max-h-[calc(100vh-6rem)] overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Photo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Title
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {albums.map((album) => (
                <tr key={album.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {album.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <AlbumPhotos albumId={album.id} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {album.title}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AlbumPhotos = ({ albumId }) => {
  const { data: photos, isLoading } = useQuery(["photos", albumId], () =>
    fetchAlbumPhotos(albumId)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const firstPhoto = photos.length > 0 ? photos[0] : null;

  return (
    <div>
      {firstPhoto && (
        <img
          key={firstPhoto.id}
          src={firstPhoto.thumbnailUrl}
          alt={firstPhoto.title}
          className="h-10 w-10"
        />
      )}
    </div>
  );
};

export default ArtistAlbums;
