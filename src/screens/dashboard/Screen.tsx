import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScreenType} from './types';
import {useStyles} from './styles';
import CatSummaryCard from './SummaryCard';
import HaulTruckSvg from 'assets/icons/maintenance.svg';
import useCatTheme from '../../hooks/useCatTheme';
import ValuesRow from './ValuesRow';
import {numberWithCommas, unitTranslateKey} from '../../utils/units';
import {units} from 'minestar-units';
import CatScreen from '../../components/screen';
import {View} from 'react-native';
import CatText from '../../components/text';
import CatSwitch from '../../components/switch';
import CatActiveItemsSection from './ActiveItemsSection';
import CatAccordion from '../../components/accordion';

const DashboardScreen: React.FC<ScreenType> = () => {
  const {t} = useTranslation();
  const [isLoad, setIsLoad] = useState(false);
  const {colors} = useCatTheme();
  const styles = useStyles();

  // TODO: Retrieve from Store / API
  const siteName = 'Rasmussen Valley Clone';
  const productionSummary = {total: 20000, project: 90000, target: 120000};
  const unit = units.TONNE;

  const getWorkAreaJSX = (attentionRequired = false) => {
    return (
      <CatSummaryCard
        hasError={attentionRequired}
        title={{
          icon: HaulTruckSvg,
          iconColor: colors.error,
          children: 'Truck 01',
        }}
        row1={{
          values: [
            {
              label:
                t('cat.production_secondary_total') +
                ' ' +
                t(unitTranslateKey(unit)),
              children: numberWithCommas(123456),
              isPrimary: true,
            },
          ],
        }}
        row2={{
          values: [
            {label: 'Proj. Tonnes', children: numberWithCommas(1000)},
            {label: 'Target', children: numberWithCommas(1000), isDown: true},
          ],
        }}
      />
    );
  };

  const firstRowJSX = () => (
    <ValuesRow
      style={styles.productionRow}
      values={[
        {
          label: 'Total Tonnes',
          children: numberWithCommas(productionSummary.total),
          isPrimary: true,
        },
        {
          label: 'Proj. Tonnes',
          children: numberWithCommas(productionSummary.total),
        },
        {
          label: 'Target',
          children: numberWithCommas(productionSummary.total),
        },
      ]}
    />
  );

  return (
    <CatScreen title={t('summary_title')}>
      <View style={styles.siteNameContainer}>
        <CatText variant={'titleMedium'}>{siteName}</CatText>
        <CatSwitch
          label={t(isLoad ? 'cat.production_loads' : 'cat.production_dumps')}
          value={isLoad}
          onValueChange={val => setIsLoad(val)}
        />
      </View>
      <View style={styles.productionContainer}>
        {firstRowJSX()}
        <CatAccordion>{firstRowJSX()}</CatAccordion>
      </View>
      <CatText style={styles.activeWorkTitle} variant={'headlineSmall'}>
        {t('summary_active_work_title', {num: 6})}
      </CatText>
      <CatActiveItemsSection title={t('summary_attention_required')}>
        <>
          {[...Array(10)].map((val, i) => (
            <View style={styles.activeProductionItem} key={i}>
              {getWorkAreaJSX(true)}
            </View>
          ))}
        </>
      </CatActiveItemsSection>
      <CatActiveItemsSection title={t('summary_active_work_areas')}>
        <>
          {[...Array(10)].map((val, i) => (
            <View style={styles.activeProductionItem} key={i}>
              {getWorkAreaJSX()}
            </View>
          ))}
        </>
      </CatActiveItemsSection>
    </CatScreen>
  );
};

export default DashboardScreen;
