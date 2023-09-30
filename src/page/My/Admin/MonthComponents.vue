<template>
  <Box>
    <n-text>
      <n-h2>
        月报
      </n-h2>
      <a-typography-text>
        共计：{{ MonthData['Check'][0]['数量'] + MonthData['Check'][1]['数量'] }}
      </a-typography-text>
    </n-text>
    <a-space>
      <div id="MonthCheck"></div>
      <div id="MonthSub"></div>
    </a-space>
  </Box>
</template>
<script setup>
import {defineProps, onMounted, ref} from "vue";
import {Chart} from '@antv/g2';
import Box from "@/components/BoxComponents.vue";

const props = defineProps(['MonthData']);
const num = ref(210)


/*周报启用*/
const MonthCheckFun = () => {
  const MonthCheck = new Chart({
    container: 'MonthCheck',
    height: num.value,
    width: num.value,
  });
  
  MonthCheck.coordinate({type: 'theta', innerRadius: 0.1});
  
  MonthCheck
    .interval()
    .transform({type: 'stackY'})
    .data(props.MonthData['Check'])
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
  
  MonthCheck.render();
}

/*周报提交*/
const MonthSubFun = () => {
  const MonthSub = new Chart({
    container: 'MonthSub',
    height: num.value,
    width: num.value,
  });
  
  MonthSub.coordinate({type: 'theta', innerRadius: 0.1});
  
  MonthSub
    .interval()
    .transform({type: 'stackY'})
    .data(props.MonthData['Sub'])
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
  
  MonthSub.render();
}


onMounted(() => {
  MonthCheckFun()
  MonthSubFun()
  
})


</script>


<style scoped>

</style>
