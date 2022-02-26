const ResultList = ({ videosInfo }) => (
  <article>
    {videosInfo &&
      videosInfo.map(({ video_url, publishDate, description }) => (
        <section key={video_url}>
          <a href={video_url}>{video_url}</a>
          <p>{publishDate}</p>
          <p>{description}</p>
        </section>
      ))}
  </article>
);

export default ResultList;
