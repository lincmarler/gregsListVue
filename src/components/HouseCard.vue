<template>
    <router-link :to="{ name: 'House Details', params: { houseId: house.id } }">
        <div class="house-card bg-light lighten-2 elevation-2 p-3">
            <section class="row">
                <div class="col-6">
                    <div class="">
                        <img class="image-space" :src="house.imgUrl" alt="">
                    </div>
                </div>
                <div class="col-6 bg-dark text-light">
                    <p>Bath: {{ house.bathrooms }} Bed: {{ house.bedrooms }} Stories: {{ house.levels }}</p>
                    <p>${{ house.price }}</p>
                    <p>{{ house.description }}</p>
                    <p>Built: {{ house.year }}</p>
                </div>
            </section>
        </div>
    </router-link>
</template>

<script>
import { House } from '../models/House';

export default {
    props: { house: { type: House, required: true } },
    setup() {
        return {};
    },
};
</script>


<style lang="scss" scoped>
.image-space {
    height: 30vh;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.house-card {
    height: 30vh;
    overflow: hidden;
    transition: all .1s ease;
    cursor: pointer;

    &:hover {
        transition: all .2s ease;
        transform: scale(1.03);
    }
}
</style>