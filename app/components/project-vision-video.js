'use client';

import Script from 'next/script';

export default function ProjectVisionVideo() {
  return (
    <div className="project-vision__media project-vision__video-frame">
      <iframe
        src="https://player.vimeo.com/video/1235165279?badge=0&autopause=0&player_id=0&app_id=58479"
        title="THESILENCE_Speaks_newlogo_0927 (1)"
        className="project-vision__video-embed"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
    </div>
  );
}
