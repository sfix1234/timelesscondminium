'use client';

export default function ProjectVisionVideo() {
  return (
    <div className="project-vision__media project-vision__video-frame">
      <iframe
        src="https://player.vimeo.com/video/1181502145?autoplay=1&muted=1&loop=1&playsinline=1&controls=1&title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479"
        title="THE SILENCE Project Vision"
        className="project-vision__video-embed"
        allow="autoplay; fullscreen; picture-in-picture"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
