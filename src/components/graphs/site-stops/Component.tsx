import React, {useMemo} from 'react';
import Svg, {Defs} from 'react-native-svg';
import {useTranslation} from 'react-i18next';
import * as scale from 'd3-scale';
import moment from 'moment';

import useCatSelector from '../../../hooks/useCatSelector';
import {
  shiftEndTimeSelector,
  shiftStartTimeSelector,
  stopReasonTypesSelector,
} from '../../../redux/site/site-selectors';
import {TimelineWithReasonType} from '../../../api/types/cat/production';

import {NowMarker} from '../common/now-marker/Component';
import {Block} from '../equipment-stops/blocks/types';
import {filterBlock, toBlockData} from '../equipment-stops/blocks/functions';
import {Pattern} from '../pattern/Component';
import {getPatternFromId} from '../pattern/functions';

import {Grid} from './grid/Component';
import {SiteWideStops} from './siteWideStops/Component';
import {EquipmentStops} from './equipmentStops/Component';

import {rowHeight, timeLabelsHeight} from './config';
import {SiteStopsChartType} from './types';

export const SiteStopsChart = (props: SiteStopsChartType) => {
  const {
    equipments,
    filters,
    siteStops,
    withSiteStopsRow = true,
    onSelect,
  } = props;

  const {i18n} = useTranslation();
  const endTime = useCatSelector(shiftEndTimeSelector);
  const startTime = useCatSelector(shiftStartTimeSelector);
  const stopReasons = useCatSelector(stopReasonTypesSelector);

  const now = moment().valueOf();

  const {stops, background, stopPatterns} = useMemo((): {
    stops: Block[];
    background: Block[];
    stopPatterns: Set<string>;
  } => {
    const catTranslations = i18n.getDataByLanguage(i18n.resolvedLanguage)
      ?.translation.cat;

    const siteRow: Block[] = siteStops
      .map(tl => toBlockData(tl, 'SW', catTranslations, 0, false))
      .sort((a, b) => a.start - b.start);

    const siteBG: Block[] = siteStops
      .map(tl => toBlockData(tl, 'BG', catTranslations, 0, false))
      .sort((a, b) => a.start - b.start);

    return {
      stops: siteRow,
      background: siteBG,
      stopPatterns: new Set([...siteRow, ...siteBG].flatMap(e => e.patternId)),
    };
  }, [i18n, siteStops]);

  const {equipmentStops, equipmentPatterns} = useMemo(() => {
    const catTranslations = i18n.getDataByLanguage(i18n.resolvedLanguage)
      ?.translation.cat;

    const es = equipments.map(equipment => {
      const timelines: TimelineWithReasonType[] = [
        ...(equipment?.maintenanceTimeline ?? []),
        ...(equipment?.operationalDelayTimeline ?? []),
        ...(equipment?.standbyTimeline ?? []),
      ].map(tl => ({
        ...tl,
        reasonType: stopReasons.find(rt => tl.stopReasonTypeId === rt.id),
      }));

      const tls = timelines.map(tl =>
        toBlockData(tl, 'TL', catTranslations, now),
      );
      const obs = equipment.observations.map(ob =>
        toBlockData(ob, 'OB', catTranslations, now),
      );
      const entries = [...tls, ...obs]
        .filter(tl => filterBlock(tl, filters))
        .sort((a, b) => a.start - b.start);

      return {
        id: equipment.id,
        stops: entries,
      };
    });

    return {
      equipmentStops: es,
      equipmentPatterns: new Set(
        es.flatMap(e => e.stops).map(s => s.patternId),
      ),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [equipments, filters, i18n, stopReasons]);

  if (!endTime || !startTime) {
    return null;
  }

  const patterns = Array.from([...equipmentPatterns, ...stopPatterns]);
  const headerHeight = timeLabelsHeight + (withSiteStopsRow ? rowHeight : 0);
  const padding = 40;

  const width =
    moment.duration(moment(endTime).diff(moment(startTime))).asMinutes() * 3;
  const height = headerHeight + equipments.length * rowHeight;
  const totalWidth = width + padding;

  const y_scale = scale
    .scaleBand()
    .domain(equipments.map(e => e.id))
    .range([headerHeight, height]);

  const x_time = scale
    .scaleTime()
    .domain([startTime, endTime])
    .range([padding, width])
    .clamp(false);

  // const addObservation = () => console.log('Add Observation');
  // const addStop = () => console.log('Add Site Wide Stop');

  return (
    <Svg height={height} width={totalWidth}>
      <Defs>
        {patterns.map(patternId => (
          <Pattern key={patternId} {...getPatternFromId(patternId)} />
        ))}
      </Defs>
      <Grid equipments={equipments} x_scale={x_time} y_scale={y_scale} />
      <SiteWideStops
        onSelect={onSelect}
        background={false}
        display={withSiteStopsRow}
        equipmentId=""
        stops={stops}
        width={totalWidth}
        x_scale={x_time}
      />
      {equipmentStops.map((equipment, i) => (
        <EquipmentStops
          key={i}
          onSelect={onSelect}
          equipmentId={equipment.id}
          equipmentStops={equipment.stops}
          siteWideStops={background}
          width={totalWidth}
          x_scale={x_time}
          y_scale={y_scale}
        />
      ))}
      <NowMarker
        now={now}
        x_scale={x_time}
        y1={withSiteStopsRow ? timeLabelsHeight - 10 : 0}
        y2={height}
      />
    </Svg>
  );
};
