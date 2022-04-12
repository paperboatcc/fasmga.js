import fasmga from "fasmga.js";

const fasmClient = new fasmga.Client("YOUR API TOKEN!");

// The function getUrls return an array of object were are all your url(s)
const { response, error } = await fasmClient.getUrls();

if (error) throw error;

console.log(response);
