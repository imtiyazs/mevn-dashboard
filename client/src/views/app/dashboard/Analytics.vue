<template>
  <div>
    <draggable class="row">
      <!-- Title -->
      <b-colxx xxs="12">
        <mevn-breadcrumb heading="Dashboard" />
        <div class="separator mb-5"></div>
      </b-colxx>

      <!-- Quick Stats -->
      <b-colxx xl="12" lg="12" md="12" class="mb-4">
        <quick-order-stats
          :totalOrders="stats.totalOrders"
          :pendingOrders="stats.totalPendingOrders"
          :completedOrders="stats.totalCompletedOrders"
          :totalPendingPayments="stats.totalPendingPayments"
          :totalCompletedPayments="stats.totalCompletedPayments"
          :totalUsers="stats.totalUsers"
        ></quick-order-stats>
      </b-colxx>

      <!-- Doughnut Chart -->
      <b-colxx v-if="stats.categories" xl="6" lg="6" md="12" class="mb-4">
        <product-categories-doughnut
          :categories="stats.categories"
          :products="stats.products"
        ></product-categories-doughnut>
      </b-colxx>

      <!-- Website Stats -->
      <b-colxx xl="6" lg="6" md="12">
        <website-visit-chart-card></website-visit-chart-card>
      </b-colxx>

      <!-- Line Chart -->
      <b-colxx sm="12" md="6" class="mb-4">
        <small-line-charts
          itemClass="dashboard-small-chart-analytics"
        ></small-line-charts>
      </b-colxx>

      <!-- Users -->
      <b-colxx v-if="stats.users" sm="12" md="3" class="mb-4">
        <users :users="stats.users"></users>
      </b-colxx>

      <!-- Orders -->
      <b-colxx v-if="stats.orders" sm="12" md="3" class="mb-4">
        <order-logs :orders="stats.orders"></order-logs>
      </b-colxx>
    </draggable>
  </div>
</template>

<script>
import axios from "axios";
import Draggable from "vuedraggable";
import QuickOrderStats from "../../../containers/dashboard/QuickOrderStats";
import ProductCategoriesDoughnut from "../../../containers/dashboard/ProductCategoriesDoughnut";
import OrderLogs from "../../../containers/dashboard/OrderLogs";
import Users from "../../../containers/dashboard/Users";
import SmallLineCharts from "../../../containers/dashboard/SmallLineCharts";
import WebsiteVisitsChartCard from "../../../containers/dashboard/WebsiteVisitsChartCard";

export default {
  components: {
    "quick-order-stats": QuickOrderStats,
    "product-categories-doughnut": ProductCategoriesDoughnut,
    "order-logs": OrderLogs,
    draggable: Draggable,
    users: Users,
    "small-line-charts": SmallLineCharts,
    "website-visit-chart-card": WebsiteVisitsChartCard
  },
  data() {
    return {
      stats: {}
    };
  },
  async mounted() {
    try {
      const res = await axios.get("/v1/data/stats");
      this.stats = res.data;
    } catch (e) {
      this.$toasted.error(e.response.data.message);
    }
  }
};
</script>
