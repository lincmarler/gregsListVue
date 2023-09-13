export class House {
    constructor(data) {
        this.id = data.id
        this.bathrooms = data.bathrooms
        this.bedrooms = data.bedrooms
        this.description = data.description
        this.levels = data.levels
        this.price = data.price
        this.year = data.year
        this.creatorId = data.creator.id
        this.imgUrl = data.imgUrl
    }
}