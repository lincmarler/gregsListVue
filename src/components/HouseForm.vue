<template>
    <form class="row" @submit.prevent="createHouse">
        <div class="col-3">
            <label for="house-bath">Bathrooms</label>
            <input v-model="houseData.bathrooms" type="number" id="house-bath" class="form-control"
                placeholder="# of bathrooms" min="1" required>
        </div>
        <div class="col-3">
            <label for="house-bed">Bedrooms</label>
            <input v-model="houseData.bedrooms" type="number" id="house-bed" class="form-control"
                placeholder="# of bedrooms" min="1" required>
        </div>
        <div class="col-3">
            <label for="house-levels">Stories</label>
            <input v-model="houseData.levels" type="number" id="house-levels" class="form-control" placeholder="# of levels"
                min="1" required>
        </div>
        <div class="col-3">
            <label for="house-year">Year</label>
            <input v-model="houseData.year" type="number" id="house-year" class="form-control" placeholder="year built"
                min="1500" required>
        </div>
        <div class="col-4">
            <label for="house-price">Price</label>
            <input v-model="houseData.price" type="number" id="house-price" class="form-control" placeholder="price"
                min="1000" required>
        </div>
        <div class="col-8">
            <label for="house-description">Description</label>
            <textarea v-model="houseData.description" type="text" id="house-description" class="form-control"
                placeholder="describe your home" minlength="1" maxlength="500"></textarea>
        </div>
        <div class="col-12 text-center">
            <label for="house-imgUrl">Image URL</label>
            <input v-model="houseData.imgUrl" type="url" id="house-imgUrl" class="form-control" placeholder="must be url"
                min="1" required>
            <img class="img-fluid mt-1" :src="houseData.imgUrl" alt="">
        </div>
        <div class="col-12">
            <button class="btn btn-primary" title="submit house data">
                Submit
            </button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Pop from '../utils/Pop';
import { housesService } from '../services/HousesService';

export default {
    setup() {
        const houseData = ref({})
        const router = useRouter()
        return {
            houseData,
            async createHouse() {
                try {
                    const newHouse = await housesService.createHouse(houseData.value)
                    houseData.value = {}
                    Pop.toast('House Created', 'good job')
                    router.push({ name: 'House Details', params: { houseId: newHouse.id } })
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
};
</script>


<style></style>