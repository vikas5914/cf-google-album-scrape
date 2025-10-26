import { WorkerEntrypoint } from 'cloudflare:workers';
import * as GooglePhotosAlbum from 'google-photos-album-image-url-fetch';

export default class WorkerB extends WorkerEntrypoint {
	// Currently, entrypoints without a named handler are not supported
	async fetch(request: Request) {
		const albumUrl = request.url;

		if (!albumUrl) {
			return new Response(
				JSON.stringify({ error: 'albumUrl query parameter is required' }),
				{
					status: 400,
					headers: { 'Content-Type': 'application/json' },
				},
			);
		}

		const re = await GooglePhotosAlbum.fetchImageUrls(albumUrl);
		console.log(JSON.stringify(re, null, 2));
		return new Response(JSON.stringify(re), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		});
	}
}
