'use client';

import { useState } from 'react';

export default function ProjectVisionVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="project-vision__media project-vision__video-frame">
      {isPlaying ? (
        <iframe
          src="https://player.vimeo.com/video/1235165279?autoplay=1&playsinline=1&badge=0&autopause=0&player_id=0&app_id=58479"
          title="THESILENCE_Speaks_newlogo_0927 (1)"
          className="project-vision__video-embed"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <button
          className="project-vision__poster"
          type="button"
          aria-label="Kengo Kuma Speaks を再生"
          onClick={() => setIsPlaying(true)}
        >
          <img
            className="project-vision__image"
            src="/assets/images/propatyinfo/6innergarden_after.jpg"
            alt=""
            width="1600"
            height="900"
            loading="lazy"
          />
          <span className="project-vision__play-prompt" aria-hidden="true">
            <span className="project-vision__play" />
            <span className="project-vision__play-label">PLAY FILM</span>
          </span>
        </button>
      )}
    </div>
  );
}
