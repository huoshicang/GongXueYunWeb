<template>
<div id="pagination">
  <a-pagination :total="props.total"
                :current="props.currentPage"
                :page-size="props.pageSize"
                show-page-size
                show-total
                show-jumper
                @change="handleCurrentChange"
                @page-size-change="handleSizeChange">
    <template #page-item="{ page }">
      - {{page}} -
    </template>
    <template #page-item-step="{ type }">
      <icon-send :style="type==='previous' ? {transform:`rotate(180deg)`} : undefined" />
    </template>
    <template #page-item-ellipsis>
      <icon-sun-fill />
    </template>
  </a-pagination>
</div>
</template>
<script setup>
import {defineProps} from "vue";


const props = defineProps({
  total: {
    type: Number, // 数据类型
    default: 0, // 未传值时的默认值
  },
  pageSize: {
    type: Number,
    default: 15,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits();

// 处理切换每页大小
const handleSizeChange = (newSize) => {
  emit("update:pageSize", newSize);
};

// 处理切换页码
const handleCurrentChange = (newPage) => {
  emit("update:currentPage", newPage);
};
/** 分页组件
 * 暴露上面2个方法给父组件，实现当前页码的传输
 * */

</script>
<style scoped>
#pagination{
  padding: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
