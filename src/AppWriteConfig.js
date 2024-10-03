import { Client, Account } from 'appwrite';


const client = new Client();

const url = import.meta.env.VITE_APPWRITE_URL
const apiKey = import.meta.env.VITE_PROJECT_ID

client
    .setEndpoint(url)
    .setProject(apiKey);

export const account = new Account(client)

export default client    