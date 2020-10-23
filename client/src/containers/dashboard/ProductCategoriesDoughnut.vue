<template>
  <b-card class="mb-2" title="Product Category In Demand">
    <div class="dashboard-donut-chart">
      <doughnut-chart :data="chartData" shadow />
    </div>
  </b-card>
</template>
<script>
import DoughnutChart from "../../components/Charts/Doughnut";
import { ThemeColors } from "../../utils";
const colors = ThemeColors();

export default {
  components: {
    "doughnut-chart": DoughnutChart
  },
  props: {
    categories: Array,
    products: Array
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "",
            borderColor: [
              colors.themeColor3,
              colors.themeColor2,
              colors.themeColor1
            ],
            backgroundColor: [
              colors.themeColor3_10,
              colors.themeColor2_10,
              colors.themeColor1_10
            ],
            borderWidth: 2,
            data: []
          }
        ]
      }
    };
  },
  created() {
    // Insert data labels
    this.chartData.labels = this.categories.map(
      category => category.categoryName
    );

    // For each label
    this.chartData.labels.forEach(categoryName => {
      // Get category Id
      const categoryId = this.categories.find(
        category => category.categoryName === categoryName
      )._id;

      // Count products for each category Id
      this.chartData.datasets[0].data.push(
        this.products.filter(product => product.categoryId === categoryId)
          .length
      );
    });

    console.log(this.chartData.datasets[0].data);
  }
};
</script>
