import * as GooglePhotosAlbum from 'google-photos-album-image-url-fetch';

export default {
	// Currently, entrypoints without a named handler are not supported
	async fetch(request: Request) {
		//const albumUrl = request.url;

		const url = new URL(request.url);

		if(!url.href.startsWith("https://photos.app.goo.gl/")) {
			return new Response(JSON.stringify({ error: 'Invalid request' }), {
				status: 200,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const albumUrl = url.href;

		//const albumUrl = 'https://photos.app.goo.gl/h2Jwy1115xj3W8xD9';

		const re = await GooglePhotosAlbum.fetchImageUrls(albumUrl);
		//console.log(JSON.stringify(re, null, 2));
		return new Response(JSON.stringify(re), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	},
};
