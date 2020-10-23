<template>
  <b-card title="Top Users">
    <vue-perfect-scrollbar
      class="scroll dashboard-list-with-user"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
    >
      <list-with-user-item
        v-for="(user, index) in users"
        :data="user"
        detail-path="#"
        :key="index"
      />
    </vue-perfect-scrollbar>
  </b-card>
</template>
<script>
import ListWithUserItem from "../../components/Listing/ListWithUserItem";

export default {
  props: {
    users: Array
  },
  components: {
    "list-with-user-item": ListWithUserItem
  }
};
</script>
