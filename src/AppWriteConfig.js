import { Client, Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66d598020027f7ae5098');

export const account = new Account(client)

export default client    