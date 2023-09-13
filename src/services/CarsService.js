import { AppState } from "../AppState.js"
import { Car } from "../models/Car.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"





class CarsService {
  async getCars() {
    const res = await api.get('api/cars')
    logger.log('🚗', res.data)
    // REVIEW ALWAYS check res.data before you save to your appstate. it is very VERY easy to screw this up if you aren't looking.
    AppState.cars = res.data.map(car => new Car(car))
  }
  async getCarById(carId) {
    AppState.activeCar = null
    const res = await api.get(`api/cars/${carId}`)
    logger.log('🚗 one car', res.data)
    AppState.activeCar = new Car(res.data)
  }

  async createCar(carData) {
    const res = await api.post('api/cars', carData)
    logger.log('new Car 🚗', res.data)
    const newCar = new Car(res.data)
    AppState.cars.push(newCar)
    return newCar
  }

  async removeCar(carId) {
    const res = await api.delete(`api/cars/${carId}`)
    logger.log('removed car 🚗', res.data)
    AppState.activeCar = null

    let indexToRemove = AppState.cars.findIndex(car => car.id == carId)
    if (indexToRemove >= 0) { // need this incase the car is not in the array (depending on which page the app loaded from)
      AppState.cars.splice(indexToRemove, 1)
    }
  }
}

export const carsService = new CarsService()
