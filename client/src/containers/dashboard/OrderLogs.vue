<template>
  <b-card title="Order Logs">
    <vue-perfect-scrollbar
      class="dashboard-logs scroll"
      :settings="{ suppressScrollX: true, wheelPropagation: false }"
    >
      <order-list :orders="orders" />
    </vue-perfect-scrollbar>
  </b-card>
</template>
<script>
import OrderList from "../../components/Listing/OrderList";

export default {
  props: {
    orders: Array
  },
  components: {
    "order-list": OrderList
  }
};
</script>
