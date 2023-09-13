<template>
    <div class="container">
        <section v-if="activeHouse" class="row justify-content-center">
            <div class="col-12">
                <img class="img-fluid" :src="activeHouse.imgUrl" alt="">
            </div>
            <div class="col-12">
                <section class="row text-center">
                    <div class="col-6 fs-3">
                        <p>Bedrooms: {{ activeHouse.bedrooms }}</p>
                        <p>Bathrooms: {{ activeHouse.bathrooms }}</p>
                        <p>Stories: {{ activeHouse.levels }}</p>
                    </div>
                    <div class="col-6 fs-4">
                        <p>${{ activeHouse.price }}</p>
                        <p>Built: {{ activeHouse.year }}</p>
                    </div>
                    <div class="col-12 fs-3">{{ activeHouse.description }}</div>
                </section>
            </div>
            <div class="col-12">
                <button v-if="activeHouse.creatorId == account.id" @click="deleteHouse" class="btn btn-danger">
                    Delete<i class="mdi mdi-nuke"></i>
                </button>
            </div>
        </section>
        <section v-else class="text-center">
            <div>
                <i class="mdi mdi-loading mdi-spin text-primary fs-2">loading</i>
            </div>
        </section>
    </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState';
import { useRoute, useRouter } from 'vue-router';
import Pop from '../utils/Pop';
import { housesService } from '../services/HousesService';

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
        onMounted(() => {
            getHouseById()
        })
        async function getHouseById() {
            try {
                const houseId = route.params.houseId
                await housesService.getHouseById(houseId)
            } catch (error) {
                Pop.error(error)
            }
        }

        return {
            activeHouse: computed(() => AppState.activeHouse),
            account: computed(() => AppState.account),
            async deleteHouse() {
                try {
                    if (await Pop.confirm('Are you sure you want to delete?')) {
                        const houseId = AppState.activeHouse.id
                        await housesService.deleteHouse(houseId)
                        router.push({ name: 'Houses' })
                        Pop.success('house removed')
                    }
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>


<style></style>