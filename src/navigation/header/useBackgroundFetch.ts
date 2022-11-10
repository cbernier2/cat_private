import useCatStore from '../../hooks/useCatStore';
import moment from 'moment/moment';
import useTimeout from '../../hooks/useTimeout';
import {fetchSiteAsyncAction} from '../../redux/site/site-slice';
import useCatDispatch from '../../hooks/useCatDispatch';

const CAT_SITE_REFRESH_FREQUENCY_SECONDS = 5;
const CAT_SITE_REFRESH_FREQUENCY_MS = CAT_SITE_REFRESH_FREQUENCY_SECONDS * 1000;

export const useBackgroundFetch = () => {
  const store = useCatStore();
  const dispatch = useCatDispatch();

  const timeout = useTimeout(async () => {
    const siteState = store.getState().site;
    if (siteState.loading) {
      timeout.start(CAT_SITE_REFRESH_FREQUENCY_MS);
    } else {
      const elapsed = moment.utc().valueOf() - (siteState.lastUpdate || 0);
      if (elapsed >= CAT_SITE_REFRESH_FREQUENCY_MS) {
        await dispatch(fetchSiteAsyncAction());
        timeout.start(CAT_SITE_REFRESH_FREQUENCY_MS);
      } else {
        timeout.start(CAT_SITE_REFRESH_FREQUENCY_MS - elapsed);
      }
    }
  }, 0);

  return timeout;
};
