<template>
  <dialog id="photo-viewer" aria-label="照片檢視">
    <button class="viewer-close" aria-label="關閉照片">×</button>
    <div class="viewer-layout">
      <div class="viewer-image">
        <img alt="">
      </div>
      <div class="viewer-info">
        <span class="eyebrow">PHOTO DIARY</span>
        <h2 />
        <p />
        <div class="viewer-controls">
          <button class="prev" aria-label="上一張照片">←</button>
          <span class="position" />
          <button class="next" aria-label="下一張照片">→</button>
        </div>
        <a class="source" target="_blank" rel="noopener noreferrer">閱讀照片原帖 ↗</a>
      </div>
    </div>
  </dialog>
</template>
