import {httpRequest} from '@/services/api'

export function fetchDashboardOverview() {
  return httpRequest('/assessment/general/home')
}
