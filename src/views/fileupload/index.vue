<template>
  <section class="file-upload-page">
    <div>
      <input type="file" name="" id="" @change="test" />
      <MliLink :underline="false" type="success">测试</MliLink>
    </div>
  </section>
</template>

<script lang="ts">
import MliLink from '@/components/link/index'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: { MliLink }
})
export default class FileUpload extends Vue {
  async test(e: any) {
    console.log('e', e)
    const file = e.target.files && e.target.files[0]
    console.log('isPngImage', await this.isPngImage(file))
    console.log('isJpgImage', await this.isJpgImage(file))
  }

  async isJpgImage(file: File) {
    const startbBStr = await this.blobToString(file.slice(0, 2))
    const endbBStr = await this.blobToString(file.slice(-2, file.size))
    const isJpg = startbBStr === 'FF D8' && endbBStr === 'FF D9'
    return isJpg
  }

  async isPngImage(file: File) {
    const bStr = await this.blobToString(file.slice(0, 8))
    const isPng = bStr === '89 50 4E 47 0D 0A 1A 0A'
    return isPng
  }

  async isGifImage(file: File) {
    const bStr = await this.blobToString(file.slice(0, 6))
    const isGif = bStr === '47 49 46 38 39 61' || bStr === '47 49 46 38 37 61'
    return isGif
  }

  async blobToString(blob: Blob): Promise<string> {
    return new Promise(resolve => {
      const reader = new FileReader()
      reader.onload = () => {
        const ret = (reader.result as string)
          .split('')
          .map(v => v.charCodeAt(0))
          .map(v => v.toString(16).toUpperCase())
          .map(v => v.padStart(2, '0'))
          .join(' ')
        resolve(ret)
      }
      reader.readAsBinaryString(blob)
    })
  }
}
</script>

<style lang="less">
.file-upload-page {
  padding: 5rem;
}
</style>
