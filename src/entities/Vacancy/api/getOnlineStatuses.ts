import { VacancyService } from './VacancyService';
import { SourceId } from '../model/Sources';
import axios from 'axios';

export const getOnlineStatuses = async (source: SourceId, signal: AbortSignal): Promise<boolean> => {
  switch (source) {
    case 'sj': {
      try {
        await VacancyService.getSuperjobOnlineStatus(signal);
        return true;
      } catch (e) {
        if (axios.isCancel(e)) throw e;
        return false;
      }
    }
    case 'hh': {
      try {
        await VacancyService.getHHOnlineStatus(signal);
        return true;
      } catch (e) {
        if (axios.isCancel(e)) throw e;
        return false;
      }
    }
    case 'tv': {
      try {
        await VacancyService.getTrudvsemById('1', '1', signal);
        return true;
      } catch (e) {
        if (axios.isCancel(e)) throw e;
        return false;
      }
    }
    default: {
      return false;
    }
  }
};
