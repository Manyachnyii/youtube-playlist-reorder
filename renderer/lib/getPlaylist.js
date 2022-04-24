import ytpl from "ytpl";

export const getPlaylist = async (url) => {
  try {
    const valid = ytpl.validateID(url);

    if (valid) {
      const playlistId = await ytpl.getPlaylistID(url);
      const videoList = await ytpl(playlistId, { pages: 1 });
      return { success: true, data: videoList };
    }

    throw { message: "Not valid input" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
