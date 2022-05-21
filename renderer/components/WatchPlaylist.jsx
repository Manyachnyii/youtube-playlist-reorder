import { useEffect, useState } from "react";
import {
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";

export const WatchPlaylist = ({ playlist }) => {
  const [slicedPlaylist, setSlicedPlaylist] = useState([]);
  const step = 200;

  useEffect(() => {
    const listSlices = [];
    for (let i = 0; i < playlist.length; i = i + step) {
      const slice = playlist.slice(i, i + step);
      listSlices.push(slice);
    }
    setSlicedPlaylist(listSlices);
  }, [playlist, step]);

  return (
    <UncontrolledAccordion defaultOpen="0">
      {slicedPlaylist?.map((videos, index) => (
        <AccordionItem key={videos}>
          <AccordionHeader targetId={`${index}`}>
            {`${index * step + 1} - ${index * step + videos.length}`}
          </AccordionHeader>
          <AccordionBody accordionId={`${index}`}>
            <div className="ratio ratio-16x9">
              <iframe
                id={`yt-player${index}`}
                name={`YouTube player ${index}`}
                src={`http://www.youtube.com/embed/?&modestbranding=1&iv_load_policy=3&showinfo=0&rel=0&playlist=${videos}`}
                className="player embed-responsive-item"
                sandbox="allow-same-origin allow-scripts allow-presentation"
                scrolling="no"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </AccordionBody>
        </AccordionItem>
      ))}
    </UncontrolledAccordion>
  );
};
