const main = async () => {
	const fasmga = await import("fasmga.js");

	const fasmClient = new fasmga.Client("YOUR API TOKEN!");

	const { response, error } = await fasmClient.short({
		// You can put any url here
		url: "https://example.com",
		// If url is nsfw please use true instead of false
		nsfw: false,
		// You can use id or idtype (if id exist idtype is ignored)
		idtype: "aBCde",

		// If you want you can add captcha, unembedify or a password
		// In this case we add captcha
		captcha: true
	});

	if (error) throw error;

	console.log(response);
};

main();
