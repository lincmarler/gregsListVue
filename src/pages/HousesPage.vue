<template>
  <div class="container-fluid">
    <HouseForm />
    <section class="row p-2">
      <div v-for="house in houses" :key="house.id" class="col-6">

        <HouseCard :house="house" />
      </div>
    </section>
  </div>
</template>

<script>
import Pop from '../utils/Pop';
import { housesService } from '../services/HousesService.js'
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js'

export default {
  setup() {
    onMounted(() => {
      getHouses();
    })

    async function getHouses() {
      try {
        await housesService.getHouses();
      } catch (error) {
        Pop.error(error)
      }
    }
    return {
      houses: computed(() => AppState.houses)
    }
  }
}
</script>
