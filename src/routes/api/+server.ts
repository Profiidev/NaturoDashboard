import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { pb } from '$lib/pocketbase/pocketbase';
import PocketBase from 'pocketbase';
import { exec } from 'node:child_process';

export const POST: RequestHandler = async (e: RequestEvent) => {
  let body;
  try {
    body = await e.request.json()
  } catch (e) {
    return new Response(JSON.stringify({}), { status: 401 });
  }

  const token = body.token;
  const app = body.app;
  const cmd = body.cmd;
  if (!token || !app || !cmd) {
    return new Response(JSON.stringify({}), { status: 400 });
  }

  let isValid = false;
	try {
		const temp = new PocketBase(pb.baseUrl);
		temp.authStore.save(token, null);
		if (temp.authStore.isValid) {
			await temp.collection('users').authRefresh();
			isValid = true;
		}
	} catch (_) {}
  if (!isValid) {
    return new Response(JSON.stringify({}),{ status: 401 });
  }
  console.log(`Incoming request from ${e.getClientAddress()} with app: ${app} and command: ${cmd}`);

  exec('screen -d -r survival -X stuff "say hello world\n"', (err, output) => {
		if (err) {
			return;
		}
		
		console.log('Output: \n', output);
	});

	return new Response(JSON.stringify({ message: 'Done' }), { status: 200 });
};
