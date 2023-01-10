import React from 'react';

import {HalfScreenModalType} from './types';
import {useStyles} from './styles';
import {Modal, Portal} from 'react-native-paper';

export const HalfScreenModal: React.FC<HalfScreenModalType> = ({
  ratio = 0.5,
  children,
  visible,
  onDismiss,
  contentStyle,
}) => {
  const styles = useStyles(ratio);

  return (
    <Portal>
      <Modal
        contentContainerStyle={[contentStyle, styles.contentContainer]}
        visible={visible}
        onDismiss={onDismiss}>
        {children}
      </Modal>
    </Portal>
  );
};
