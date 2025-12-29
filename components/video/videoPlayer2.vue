<template>
    <video
      ref="videoRef"
      id="my-video"
      class="video-js vjs-default-skin"
      controls
      preload="auto"
      width="100%"
      height="auto"
      poster="/images/default/img_coach_09.png"
    >
      <source src="https://media.w3.org/2010/05/sintel/trailer.mp4" type="video/mp4" />

        <!-- <track
    kind="subtitles"
    src="/subtitles/ko.vtt"
    srclang="ko"
    label="Korean"
    default
  />
  <track
    kind="subtitles"
    src="/subtitles/en.vtt"
    srclang="en"
    label="English"
  /> -->
    </video>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'

// 버튼 컴포넌트 정의
const Button = videojs.getComponent('Button')
class MyCustomButton extends Button {
  constructor(player, options) {
    super(player, options)
    this.controlText('Custom')
    this.addClass('vjs-icon-cog')
    this.addClass('vjs-custom-button')
  }

  handleClick() {
    alert('커스텀 버튼 클릭됨!')
  }
}
videojs.registerComponent('MyCustomButton', MyCustomButton)

const videoRef = ref(null)
let player = null

onMounted(() => {
  if (videoRef.value) {
    player = videojs(videoRef.value, {
      controls: true,
      autoplay: false,
      preload: 'auto',
      fluid: true,
      controlBar: {
        volumePanel: {
          inline: false, // ✅ 세로형 볼륨
        },
        children: [
          'playToggle',
          'volumePanel',
          'currentTimeDisplay',
          'progressControl',
          'durationDisplay',
          'subsCapsButton', // ✅ 자막 버튼
          'fullscreenToggle'
        ]
      },
    })

    player.ready(() => {
      player.getChild('controlBar').addChild('MyCustomButton', {}, 4)
    })
  }
})

onBeforeUnmount(() => {
  player?.dispose()
})


</script>
<style lang="scss" scoped>
@use '@/assets/scss/components/video.scss';
</style>
