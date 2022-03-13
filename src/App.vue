<template>
  <div class="container mx-auto mt-6">
    <div>
      <content-table :contents="contents" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { client } from "@/core/client";

import ContentTable from "./components/ContentTable.vue";

export default defineComponent({
  name: "App",
  components: { ContentTable },
  data() {
    return {
      contents: [] as unknown[],
    };
  },
  created() {
    this.getBirthdays();
  },
  methods: {
    async getBirthdays() {
      const res = await client("enst_birthday");
      this.contents = res.contents;
    },
  },
});
</script>
