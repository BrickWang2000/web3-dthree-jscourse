<template>
  <div class="home">
    <Scene ></Scene>
  </div>
</template>

<script>
// @ is an alias to /src
import Scene from "@/components/Scene.vue";
import HelloWorld from '@/components/HelloWorld.vue'
import testVertex from  '@/shader/test/Vertex.glsl'

// console.log(testVertex);

export default {
  name: 'HomeView',
  components: {
    Scene
  }
}
</script>
