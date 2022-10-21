import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import CatScreen from '../../components/screen';
import {ScreenType} from './types';
import CatText from '../../components/text';
import {View} from 'react-native';
import styles from './styles';
import CatSwitch from '../../components/switch';
import ValuesRow from './ValuesRow';
import CatSummaryCard from './SummaryCard';
import HaulTruckSvg from 'assets/icons/maintenance.svg';
import useCatTheme from '../../hooks/useCatTheme';
import CatActiveItemsSection from './ActiveItemsSection';
import CatAccordion from './Accordion';

const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const DashboardScreen: React.FC<ScreenType> = () => {
  const {t} = useTranslation();
  const [isLoad, setIsLoad] = useState(false);
  const {colors} = useCatTheme();

  // TODO: Retrieve from Store / API
  const siteName = 'Rasmussen Valley Clone';
  const productionSummary = {total: 20000, project: 90000, target: 120000};

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
              label: 'Total Tonnes',
              children: numberWithCommas(123456),
              isPrimary: true,
            },
          ],
        }}
        row2={{
          values: [
            {label: 'ProJ. Tonnes', children: numberWithCommas(1000)},
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
