import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textWithIconContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textWithIcon: {
    marginLeft: 4,
  },
  siteNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
  },
  productionContainer: {
    margin: 16,
  },
  activeWorkTitle: {
    marginHorizontal: 16,
  },
  productionRow: {
    marginBottom: 16,
  },
  textWithLabelContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  textWithLabelLabel: {
    textTransform: 'uppercase',
  },
  textWithLabelDownArrow: {
    position: 'absolute',
    bottom: -4,
    left: -20,
  },
  textWithLabelText: {
    fontWeight: 'bold',
  },
  valuesRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardContainer: {
    width: 220,
    padding: 16,
    borderRadius: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContainerError: {
    borderWidth: 1,
  },
  cardTitle: {
    marginBottom: 24,
  },
  cardRowsSpacer: {
    height: 8,
  },
  activeProductionItemsHeader: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  activeProductionItem: {
    margin: 6,
  },
  accordionHandle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 32,
  },
  accordionDivider: {
    height: 1,
  },
});

export default styles;
