import { token_sync_job } from "../modules/module02/services/tokenCronTask";
import { event_sync_job } from "../modules/module01/services/cronTasks";

(async () => {
  try {
    const App = require("./app").default;
    const app = new App();
    app.listen();
  } catch (err: any) {
    console.error(
      "Something went wrong when initializing the server:\n",
      err.stack
    );
  }
})();

//cron jobs
event_sync_job.start();
token_sync_job.start();
