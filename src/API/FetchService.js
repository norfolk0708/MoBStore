import axios from 'axios';

export default class FetchService {
    static async getAllProduct() {
        const response = await axios.get(`https://dummyjson.com/products?skip=0&limit=100`)
            
        return response
    }
    static async getByID(id) {
        const response = await axios.get(`https://dummyjson.com/products/${id}`)
            
        return response
    }
}