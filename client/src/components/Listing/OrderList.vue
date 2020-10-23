<template>
  <table class="table table-sm table-borderless">
    <tbody>
      <tr v-for="(order, index) in orders" :log="order" :key="index">
        <td>
          <span :class="`log-indicator align-middle ${order.color}`" />
        </td>
        <td>
          <span class="font-weight-medium">{{ order._id }}</span>
        </td>
        <td class="text-right">
          <span class="text-muted">{{ order.time }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["orders"]
};
</script>
