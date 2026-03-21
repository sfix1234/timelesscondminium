'use client';

import { useState } from 'react';

export default function ProjectVisionVideo() {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="project-vision__media project-vision__video-frame">
        <iframe
          className="project-vision__video-embed"
          src="https://player.vimeo.com/video/1171493260?autoplay=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          title="THESILENCE_Interview_KengoKuma"
        ></iframe>
      </div>
    );
  }

  return (
    <button
      className="project-vision__media"
      type="button"
      aria-label="STORY VIDEO 動画を再生"
      onClick={() => setIsPlaying(true)}
    >
      <img src="/assets/images/projectvision.jpg" alt="STORY VIDEO" className="project-vision__image" />
      <span className="project-vision__play" aria-hidden="true"></span>
    </button>
  );
}
