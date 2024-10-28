// src/services/api.ts
import axios from 'axios'

const API_BASE_URL = 'https://api.alteg.com'

export const getAvailableTimes = (specialist_id: string, date: string, services: string[]) => {
    return axios.get(`${API_BASE_URL}/available-times`, {
        params: {
            specialist_id,
            date,
            services
        }
    })
}

export const createBooking = (bookingData: {
    name: string
    email: string
    services: string[]
    specialist: string
    date: string
    time: string
}) => {
    return axios.post(`${API_BASE_URL}/bookings`, bookingData)
}
