import ytpl from "ytpl";

export const getPlaylist = async (input, loadAll) => {
  try {
    const valid = ytpl.validateID(input);
    if (valid) {
      const playlistId = await ytpl.getPlaylistID(input);
      const videoList = await ytpl(playlistId, {
        pages: loadAll ? Infinity : 1,
      });
      return { success: true, data: videoList };
    }
    throw { message: "Not valid input" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getPlaylistNext = async (continuation) => {
  try {
    const res = await ytpl.continueReq(continuation);
    if (res) {
      return { success: true, data: res };
    }
    throw { message: "Has not more" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
