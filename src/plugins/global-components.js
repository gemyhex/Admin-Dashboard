import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseSelect from '@/components/common/BaseSelect.vue'
import BaseTable from '@/components/common/Table/BaseTable.vue'
import BasePagination from '@/components/common/BasePagination.vue'
import BaseModal from '@/components/common/BaseModal.vue'
import BaseToaster from "@/components/common/BaseToaster.vue";
import BaseToolbar from '@/components/common/Table/BaseToolbar.vue'
import DynamicForm from '@/components/common/DynamicForm.vue'
import DynamicChart from '@/components/common/charts/DynamicChart.vue'
import SummaryCard from '@/components/common/BaseSummaryCard.vue'
import SkeletonCard from '@/components/common/fallback/SkeletonCard.vue'
import SkeletonChart from '@/components/common/fallback/SkeletonChart.vue'


export default {
  install(app) {
    const components = {
      BaseInput,
      BaseButton,
      BaseSelect,
      BaseTable,
      BasePagination,
      BaseModal,
      BaseToaster,
      BaseToolbar,
      DynamicForm,
      DynamicChart,
      SummaryCard,
      SkeletonCard,
      SkeletonChart
    }

    for (const [name, component] of Object.entries(components)) {
      app.component(name, component)
    }
  },
}
