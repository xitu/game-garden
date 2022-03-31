/* eslint-disable no-restricted-globals */
import {
    getAssetFromKV
} from "@cloudflare/kv-asset-handler";

async function handleEvent(event) {
    const {
        request
    } = event;
    try {
        return await getAssetFromKV(event);
    } catch (e) {
        let pathname = new URL(event.request.url).pathname;
        if (pathname === '/export') {
            if (request.method === 'POST') {
                const incoming = JSON.stringify(await request.json())
                return new Response(incoming, {
                    headers: {
                        'content-type': 'application/json;charset=UTF-8',
                    },
                })
            } else if (request.method === 'GET') {
                return new Response(`GET`);
            }
        } else {
            return new Response(`"${pathname}" not found`, {
                status: 404,
                statusText: "not found"
            });
        }
    }
}

addEventListener("fetch", event => {
    event.respondWith(handleEvent(event));
});
