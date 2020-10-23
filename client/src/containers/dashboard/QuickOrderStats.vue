<template>
  <div class="icon-cards-row">
    <draggable class="row">
      <b-colxx xl="2" lg="2" class="mb-2">
        <icon-card
          title="Pending Orders"
          icon="iconsminds-clock"
          :value="pendingOrders"
        />
      </b-colxx>
      <b-colxx xl="2" lg="2" class="mb-2">
        <icon-card
          title="Completed Orders"
          icon="iconsminds-basket-coins"
          :value="completedOrders"
        />
      </b-colxx>
      <b-colxx xl="2" lg="2" class="mb-2">
        <icon-card
          title="Total Orders"
          icon="iconsminds-arrow-refresh"
          :value="totalOrders"
        />
      </b-colxx>
      <b-colxx xl="2" lg="2" class="mb-2">
        <icon-card
          title="Pending Payments"
          icon="iconsminds-dollar"
          :value="totalPendingPayments"
        />
      </b-colxx>
      <b-colxx xl="2" lg="2" class="mb-2">
        <icon-card
          title="Completed Payments"
          icon="iconsminds-money-bag"
          :value="totalCompletedPayments"
        />
      </b-colxx>
      <b-colxx xl="2" lg="2" class="mb-2">
        <icon-card
          title="Total Users"
          icon="iconsminds-user"
          :value="totalUsers"
        />
      </b-colxx>
    </draggable>
  </div>
</template>
<script>
import IconCard from "../../components/Cards/IconCard";
import Draggable from "vuedraggable";
export default {
  props: {
    totalOrders: Number,
    pendingOrders: Number,
    completedOrders: Number,
    totalPendingPayments: Number,
    totalCompletedPayments: Number,
    totalUsers: Number
  },
  components: {
    draggable: Draggable,
    "icon-card": IconCard
  }
};
</script>
