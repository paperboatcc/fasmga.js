import fasmga from "fasmga.js";

const fasmClient = new fasmga.Client("YOUR API TOKEN!");

// The function edit the link that you provide the id
const { response, error } = await fasmClient.edit("id of the url to edit", {
	// You can edit 4 things, captcha - unembedify - nsfw - password
	// You must provide at a least one
	// In this case we want to add a password, please note if you use "#remove#" as password we remove password:
	password: "mySuperSecurePassword"
});

if (error) throw error;

console.log(response);
