import { serve } from 'bun';
import { assets } from './routes/assets';
import { inventory } from './routes/inventory';
import { taskLists } from './routes/taskLists';
import { tasks } from './routes/tasks';
import { CustomResponse } from './utils/customResponse';
import { dateFormatter } from './utils/dates';
import { logger } from './utils/logger';

logger.info(`Server started at: ${dateFormatter.format(Date.now())}`);

serve({
  routes: {
    // Static routes
    '/api/status': { GET: () => new CustomResponse('OK') },
    '/api/inventory': inventory,
    '/api/assets': assets,
    '/api/taskLists': taskLists,
    '/api/tasks': tasks,

    // Wildcard route for all routes that start with "/api/" and aren't otherwise matched
    '/api/*': CustomResponse.json({ message: 'Not found' }, { status: 404 }),
  },
  error(error) {
    return new CustomResponse(JSON.stringify({ error: error.message }), { status: 500 });
  },
  fetch() {
    return CustomResponse.json({ message: 'Not Found' }, { status: 404 });
  },
  port: 3005,
});
