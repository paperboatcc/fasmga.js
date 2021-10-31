import fasmga from "fasmga.js";

const fasmClient = new fasmga.Client("YOUR API TOKEN!");

// This delete the url, you can't restore a deleted url
const { response, error } = await fasmClient.delete("id of the url to delete");

if (error) throw error;

console.log(response);
