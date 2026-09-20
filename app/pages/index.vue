<script setup>
import { onMounted } from 'vue'
import { initExperience } from '../scripts/experience.js'
import { initArchive } from '../scripts/app.js'
import SiteEffects from '../components/site/SiteEffects.vue'
import SiteHeader from '../components/site/SiteHeader.vue'
import SiteHero from '../components/site/SiteHero.vue'
import SiteWaiting from '../components/site/SiteWaiting.vue'
import SiteArchive from '../components/site/SiteArchive.vue'
import SiteClosing from '../components/site/SiteClosing.vue'
import SiteFooter from '../components/site/SiteFooter.vue'
import PhotoViewer from '../components/site/PhotoViewer.vue'

useHead({
  htmlAttrs: { lang: 'zh-Hant' },
  title: '鈴音知春 · Until the Lilies Bloom',
  meta: [
    { name: 'theme-color', content: '#b5cfe8' },
    {
      name: 'description',
      content: '李碩珉的舞台、聲音與照片日記。十八個開花階段，等待幸福歸來。',
    },
  ],
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@400&family=Cinzel+Decorative:wght@400;700&family=Dosis:wght@400;500;600&family=Noto+Sans+TC:wght@400;500;600&display=swap',
    },
  ],
})

onMounted(() => {
  initExperience()
  initArchive()
})
</script>

<template>
  <div class="w-full h-full overflow-hidden">
    <SiteEffects />
    <SiteHeader />
    <main>
      <SiteHero />
      <SiteWaiting />
      <SiteArchive />
      <SiteClosing />
    </main>
    <SiteFooter />
    <PhotoViewer />
  </div>
</template>
