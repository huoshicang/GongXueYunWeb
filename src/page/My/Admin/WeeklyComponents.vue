<template>
  <Box>
    <n-text>
      <n-h2>
        周报
      </n-h2>
      <a-typography-text>
        共计：{{ WeeklyData['Check'][0]['数量'] + WeeklyData['Check'][1]['数量'] }}
      </a-typography-text>
    </n-text>
    
    <a-space>
      <div id="WeeklyCheck"></div>
      <div id="WeeklySub"></div>
    </a-space>
  </Box>
</template>
<script setup>
import {defineProps, onMounted, ref} from "vue";
import {Chart} from '@antv/g2';
import Box from "@/components/BoxComponents.vue";

const props = defineProps(['WeeklyData']);
const num = ref(210)


/*周报启用*/
const WeeklyCheckFun = () => {
  const WeeklyCheck = new Chart({
    container: 'WeeklyCheck',
    height: num.value,
    width: num.value,
  });
  
  WeeklyCheck.coordinate({type: 'theta', innerRadius: 0.1});
  
  WeeklyCheck
    .interval()
    .transform({type: 'stackY'})
    .data(props.WeeklyData['Check'])
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
  
  WeeklyCheck.render();
}

/*周报提交*/
const WeeklySubFun = () => {
  const WeeklySub = new Chart({
    container: 'WeeklySub',
    height: num.value,
    width: num.value,
  });
  
  WeeklySub.coordinate({type: 'theta', innerRadius: 0.1});
  
  WeeklySub
    .interval()
    .transform({type: 'stackY'})
    .data(props.WeeklyData['Sub'])
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
  
  WeeklySub.render();
}


onMounted(() => {
  WeeklyCheckFun()
  WeeklySubFun()
  
})


</script>


<style scoped>

</style>
