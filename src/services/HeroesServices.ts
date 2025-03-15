import axios from 'axios';
import type HeroInterface from '../interfaces/HeroInterface';

const API_URL = 'https://codetest-api.applivery.io/pentathlon/heroes/';
const AUTH_TOKEN = localStorage.getItem('apiKey')!;

axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export const getHeroes = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching heroes:', error);
        throw error;
    }
};

export const createHero = async (hero: HeroInterface) => {
    try {
        const response = await axios.post(API_URL, hero, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating hero:', error);
        throw error;
    }
};

export const updateHero = async (heroId: string, hero: HeroInterface) => {
    try {
        const response = await axios.put(`${API_URL}${heroId}`, hero, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating hero:', error);
        throw error;
    }
};

export const deleteHero = async (heroId: string) => {
    try {
        const response = await axios.delete(`${API_URL}${heroId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting hero:', error);
        throw error;
    }
};