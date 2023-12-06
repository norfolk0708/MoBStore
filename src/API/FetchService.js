import axios from 'axios';

export default class FetchService {
    static async getAllProducts(skip = 0, limit = 100) {
        const response = await axios.get(`https://dummyjson.com/products?skip=${skip}&limit=${limit}`)
            
        return response
    }
    static async getByID(id) {
        const response = await axios.get(`https://dummyjson.com/products/${id}`)
        return response
    }
}