<template>
  <v-data-table
    :headers="Object.values(headers)"
    :items="data"
    class="elevation-1"
  >
    <template slot="items" slot-scope="props">
        <td
            v-for="hdr in headers"
            v-bind:key="hdr.value">
            {{ props.item[hdr.value] }}
        </td>
       <!-- <td>{{ props.item['id'] }}</td> -->
    </template>
  </v-data-table>
</template>

<script>
const axios = require('axios');

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    metadata: {},
    headers: {},
    data: [],
  }),

  mounted() {
    axios.get(`https://localhost:44359/api/tweezers/${this.item.referenceLink}`).then((response) => {
      this.metadata = response.data;
      this.headers = this.metadata.propertyData.map(pd => ({
        text: pd.displayName,
        value: pd.propertyName,
      }));
    });
    axios.get(`https://localhost:44359/api/${this.item.referenceLink}`).then((response) => {
      this.data = response.data;
    });
  },
};
</script>
