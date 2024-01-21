// src/routes/dataTable/+page.server.ts

import { spawn } from 'child_process';
import type { RequestHandler } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async () => {
    try {
        const pythonProcess = spawn('python', ['/Users/omarelyoussef/scrapingg/scrapingProject/src/backend/app.py']);
        let data = '';

        for await (const chunk of pythonProcess.stdout) {
            data += chunk;
        }

        const statusCode = await new Promise((resolve) => {
            pythonProcess.on('close', resolve);
        });

        if (statusCode !== 0) {
            throw new Error(`Script exited with code ${statusCode}`);
        }

        return {
            status: 200,
            body: JSON.parse(data)
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: 'Failed to fetch data' }
        };
    }
};
