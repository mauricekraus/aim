import React from 'react';

import { Grid } from '@material-ui/core';

import HeatMap from 'components/HeatMap/HeatMap';
import { Spinner, Text } from 'components/kit';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

import { ANALYTICS_EVENT_KEYS } from 'config/analytics/analyticsKeysMap';

import { trackEvent } from 'services/analytics';

import useProjectContributions from './useProjectContributions';

import './ProjectContributions.scss';

function ProjectContributions(): React.FunctionComponentElement<React.ReactNode> {
  const { projectContributionsStore } = useProjectContributions();
  function shiftDate(date: any, numDays: any) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  }
  let today = new Date();
  return (
    <ErrorBoundary>
      <Grid className='ProjectContributions' container spacing={1}>
        <Grid item>
          <Text component='h2' size={24} weight={600} tint={100}>
            Statistics
          </Text>
          <div className='ProjectContributions__Statistics__card'>
            <Text size={16} component='span' color='secondary'>
              Experiments
            </Text>
            <Text component='strong' size={36} weight={600} color='secondary'>
              {projectContributionsStore.data?.num_experiments ?? (
                <Spinner className='Activity__loader' color='#fff' size={32} />
              )}
            </Text>
          </div>
          <div className='ProjectContribution__Statistics__card'>
            <Text size={16} component='span' color='secondary'>
              Runs
            </Text>
            <Text component='strong' size={36} weight={600} color='secondary'>
              {projectContributionsStore.data?.num_runs ?? (
                <Spinner className='Activity__loader' color='#fff' size={32} />
              )}
            </Text>
          </div>
        </Grid>
        <Grid xs item>
          <Text component='h2' size={24} weight={600} tint={100}>
            Activity
          </Text>
          <div className='ProjectContributions__HeatMap'>
            <HeatMap
              startDate={shiftDate(today, -10 * 30)}
              endDate={today}
              onCellClick={() => {
                trackEvent(ANALYTICS_EVENT_KEYS.home.activityCellClick);
              }}
              data={Object.keys(
                projectContributionsStore.data?.activity_map ?? {},
              ).map((k) => [
                new Date(k),
                projectContributionsStore.data?.activity_map[k],
              ])}
            />
          </div>
        </Grid>
      </Grid>
    </ErrorBoundary>
  );
}
export default React.memo(ProjectContributions);