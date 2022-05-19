import Script from "next/script";

export const Player = ({ playlist }) => {
  return (
    <div class="ratio ratio-16x9">
      <iframe
        id="yt-player"
        name="YouTube player"
        src={`http://www.youtube.com/embed/?playlist=${playlist}&modestbranding=1&iv_load_policy=3&showinfo=0&rel=0&enablejsapi=1`}
        className="player embed-responsive-item"
        sandbox="allow-same-origin allow-scripts allow-presentation"
        scrolling="no"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};
