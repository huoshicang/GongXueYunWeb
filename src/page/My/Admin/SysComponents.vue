<template>
  <Box>
    <n-text>
      <n-h2>
        系统用户
      </n-h2>
      <a-typography-text>
        共计：{{ SysUserData['CheckInfo'][0]['数量'] + SysUserData['CheckInfo'][1]['数量'] }}
      </a-typography-text>
    </n-text>
    
    <a-space>
      <div id="SysCheck"></div>
      <div id="SysRole"></div>
    </a-space>
  </Box>
</template>
<script setup>
import {defineProps, onMounted, ref} from "vue";
import {Chart} from '@antv/g2';
import Box from "@/components/BoxComponents.vue";

const props = defineProps(['SysUserData']);
const num = ref(210)


/*周报启用*/
const SysCheckFun = () => {
  const SysCheck = new Chart({
    container: 'SysCheck',
    height: num.value,
    width: num.value,
  });
  
  SysCheck.coordinate({type: 'theta', innerRadius: 0.1});
  
  SysCheck
    .interval()
    .transform({type: 'stackY'})
    .data(props.SysUserData['CheckInfo'])
    .encode('y', '数量')
    .encode('color', 'name')
    .style('inset', 1)
    .style('radius', 10)
    .scale('color', {
      palette: 'spectral',
      offset: (t) => t * 0.1 + 0.8,
    })
    .label({text: 'name', fontSize: 10, fontWeight: 'bold'})
    .label({
      text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
      fontSize: 9,
      dy: 12,
    })
    .animate('enter', {type: 'waveIn'})
    .legend(false);
  
  SysCheck.render();
}


/*周报启用*/
const SysRoleFun = () => {
  const SysRole = new Chart({
    container: 'SysRole',
    height: num.value,
    width: num.value,
  });
  
  SysRole.coordinate({type: 'theta', innerRadius: 0.1});
  
  SysRole
    .interval()
    .transform({type: 'stackY'})
    .data(props.SysUserData['Role'])
    .encode('y', '数量')
    .encode('color', 'name')
    .style('inset', 1)
    .style('radius', 10)
    .scale('color', {
      palette: 'spectral',
      offset: (t) => t * 0.1 + 0.8,
    })
    .label({text: 'name', fontSize: 10, fontWeight: 'bold'})
    .label({
      text: (d, i, data) => (i < data.length - 3 ? d.value : ''),
      fontSize: 9,
      dy: 12,
    })
    .animate('enter', {type: 'waveIn'})
    .legend(false);
  
  SysRole.render();
}

onMounted(() => {
  SysCheckFun()
  SysRoleFun()
})


</script>


<style scoped>

</style>
