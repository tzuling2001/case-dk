<template>
  <svg class="effect-definitions" aria-hidden="true" width="0" height="0">
    <defs>
      <filter id="hero-refraction" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
        <feImage id="water-displacement" x="0" y="0" width="100%" height="100%" preserveAspectRatio="none" result="water" />
        <feDisplacementMap in="SourceGraphic" in2="water" scale="30" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
  <div id="waterdrop-cursor" aria-hidden="true">
    <span class="clover-glass"><i /><i /><i /><i /><em /></span>
    <span class="cursor-arrow" />
  </div>
  <div class="video-backdrop w-full h-full" aria-hidden="true">
    <iframe
      id="background-film"
      title="背景影片 / Background film"
      tabindex="-1"
      allow="autoplay; encrypted-media"
      referrerpolicy="strict-origin-when-cross-origin"
      data-src="https://www.youtube-nocookie.com/embed/GYpUGAFnQBQ?autoplay=1&amp;mute=1&amp;controls=0&amp;playsinline=1&amp;enablejsapi=1&amp;start=4"
    />
  </div>
  <div class="reading-progress" aria-hidden="true" />
  <canvas id="hero-water" aria-hidden="true" class="w-full h-full" />
</template>
