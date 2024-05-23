import { CronJob } from 'cron';
import { pino } from 'pino';
import environment from '../../../config/environment';
import { nftEventService } from './NftEvents';

const logger = pino({ name: 'CRON_TASKS' });
const syncTimeInterval = environment.syncIntervalsMinutes as number;
let endUnixTime =  Date.now() / 1000;
let startUnixTime = endUnixTime - (syncTimeInterval * 60 * 10000);

export const event_sync_job = new CronJob(
    `*/${environment.syncIntervalsMinutes} * * * *`,
    nft_events_sync_jobs,
    null,
    false
  );


async function nft_events_sync_jobs() {
    try {
        console.log("i dey fire cron job");
        nftEventService.fetchLatestEvents(1000, startUnixTime, endUnixTime, undefined)
    } catch (error) {
        logger.info('Error occurred while syncing latest nft events');
    }
}