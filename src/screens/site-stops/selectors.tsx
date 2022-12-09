import React from 'react';
import {createSelector} from '@reduxjs/toolkit';
import {currentShiftSelector} from '../../redux/site/site-selectors';
import moment from 'moment';
import {SceneMap} from 'react-native-tab-view';
import {SiteStopsChart} from '../../components/graphs/site-stops/Component';

export const stopsScheduleSceneSelector = createSelector(
  currentShiftSelector,
  currentShift => {
    if (!currentShift) {
      return {routes: [], renderScene: SceneMap({})};
    }
    const currentMoment = moment(currentShift.startTime);
    currentMoment.set({minutes: 0});
    const endMoment = moment(currentShift.endTime);
    const pagesHours: Date[][] = [];
    let pageHours: Date[] = [];
    while (currentMoment < endMoment) {
      if (pageHours.length === 3) {
        pagesHours.push(pageHours);
        pageHours = [pageHours[pageHours.length - 1]];
      }
      pageHours.push(currentMoment.toDate());
      currentMoment.add({hour: 1});
    }
    if (pageHours.length > 1) {
      pagesHours.push(pageHours);
    }
    const pages: Parameters<typeof SceneMap>[0] = {};
    pagesHours.forEach((page, i) => {
      pages[i] = () => <SiteStopsChart steps={page} />;
    });
    const routes = pagesHours.map((page, i) => {
      return {key: i.toString(), value: page};
    });
    return {routes, renderScene: SceneMap(pages)};
  },
);
