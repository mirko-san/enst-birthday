<template>
  <div class="flex justify-center">
    <div class="rounded overflow-hidden shadow-lg p-4">
      <table class="table-auto">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header" v-text="header" />
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in internalContents" :key="item.id">
            <td v-text="item.secondName" />
            <td v-text="item.firstName" />
            <td v-text="item.unit" />
            <td v-text="item.birthday" />
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { client } from "@/core/client";

interface Unit {
  id: string;
  name: string;
  [key: string]: unknown;
}

interface Content {
  unitId: string;
  [key: string]: unknown;
}

export default defineComponent({
  name: "ContentTable",
  props: {
    contents: Array,
  },
  data() {
    return {
      units: [] as Unit[],
      headers: ["secondName", "firstName", "unit", "birthday"],
    };
  },
  created() {
    this.getUnits();
  },
  computed: {
    internalContents() {
      return (this.contents as Content[]).map((item) => {
        const unitName = this.units.filter((unit) => unit.id === item.unitId)[0]
          .name;
        return {
          ...item,
          unit: unitName || "",
        };
      });
    },
  },
  methods: {
    async getUnits() {
      const res = await client("enst_units");
      this.units = res.contents as Unit[];
    },
  },
});
</script>
