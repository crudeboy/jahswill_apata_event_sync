import { CronJob } from 'cron';
import { pino } from 'pino';
import environment from '../../../config/environment';
import { nftEventService } from '../../module01/services/NftEvents';
import { tokenService } from '.';


const logger = pino({ name: 'CRON_TASKS' });
const syncTimeInterval = environment.syncIntervalsMinutes as number;
let endUnixTime =  Date.now() / 1000;
let startUnixTime = endUnixTime - (syncTimeInterval * 60 * 10000);

export const token_sync_job = new CronJob(
    `*/${environment.tokenSyncIntervalsMinutes} * * * *`,
    token_sync_jobs,
    null,
    false
  );


export async function token_sync_jobs() {
    try {
        logger.info('Synching tokens...')
        let res = await nftEventService.fetchEventsWithinTimeRange();
        tokenService.syncNewTokens(res);
        tokenService.setPriceToMiniminLatestListingPrice()
    } catch (error) {
        logger.info('Error occurred while syncing latest nft events');
    }
}