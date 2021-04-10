<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template v-slot="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template v-slot="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="180" align="center">
        <template v-slot="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template v-slot="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
        align="center"
      >
        <template v-slot="scope">
          <el-tag :type="statusFilter(scope.row.status)">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Created at"
        width="250"
      >
        <template v-slot="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { getArticles } from "@/api/articles";
import { defineComponent, ref } from "vue";
import { IArticleData } from "@/api/types";

export default defineComponent({
  name: "Table",

  setup() {
    const listLoading = ref(false);
    const list = ref<IArticleData[]>([]);

    const listQuery = {
      page: 1,
      limit: 20,
    };

    const statusFilter = (status: string) => {
      const statusMap: { [key: string]: string } = {
        published: "success",
        draft: "gray",
        deleted: "danger",
      };
      return statusMap[status];
    };

    const getList = async () => {
      try {
        listLoading.value = true;
        const { data } = await getArticles(listQuery);
        list.value = data.items;
      } finally {
        listLoading.value = false;
      }
    };

    getList();

    return {
      listLoading,
      list,

      statusFilter,
    };
  },
});
</script>
