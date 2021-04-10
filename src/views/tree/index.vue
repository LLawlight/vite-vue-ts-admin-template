<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom: 30px"
    />
    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { ElTree } from "element-plus";
import { TreeNodeData } from "element-plus/lib/el-tree/src/tree.type";

export default defineComponent({
  name: "Tree",

  setup() {
    const filterText = ref("");
    const tree2 = ref();

    const data2 = [
      {
        id: 1,
        label: "Level one 1",
        children: [
          {
            id: 4,
            label: "Level two 1-1",
            children: [
              {
                id: 9,
                label: "Level three 1-1-1",
              },
              {
                id: 10,
                label: "Level three 1-1-2",
              },
            ],
          },
        ],
      },
      {
        id: 2,
        label: "Level one 2",
        children: [
          {
            id: 5,
            label: "Level two 2-1",
          },
          {
            id: 6,
            label: "Level two 2-2",
          },
        ],
      },
      {
        id: 3,
        label: "Level one 3",
        children: [
          {
            id: 7,
            label: "Level two 3-1",
          },
          {
            id: 8,
            label: "Level two 3-2",
          },
        ],
      },
    ];

    const defaultProps = {
      children: "children",
      label: "label",
    };

    watch(filterText, (value) => {
      (tree2.value as typeof ElTree).filter(value);
    });

    const filterNode = (value: string, data: TreeNodeData) => {
      if (!value) {
        return true;
      }
      return data.label && data.label.indexOf(value) !== -1;
    };

    return {
      data2,
      defaultProps,

      filterText,

      tree2,

      filterNode,
    };
  },
});
</script>
