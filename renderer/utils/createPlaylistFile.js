export const createPlaylistFile = (playlist, author, title) => {
  const filename = `${author} - ${title}`;
  const videos = playlist
    .map(
      ({ shortUrl, author: { name }, title, durationSec }) => `
#EXTINF:${durationSec}, "${name}" - "${title}"
#EXTVLCOPT:network-caching=1000
${shortUrl}
`
    )
    .join("");

  const playlistFile = new File(
    ["#EXTM3U\n", `#EXTPLAYLIST:"${filename}"\n`, videos],
    `${filename}.m3u8`,
    {
      type: "text/plain;charset=utf-8",
    }
  );

  return playlistFile;
};
