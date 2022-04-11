import ytpl from "ytpl";

export const getPlaylist = async (url) => {
  const valid = ytpl.validateID(url);

  if (valid) {
    const playlistId = await ytpl.getPlaylistID(url);
    const videoList = await ytpl(playlistId, { pages: 1 });
    return { success: true, data: videoList };
  }

  return { success: false };
};
