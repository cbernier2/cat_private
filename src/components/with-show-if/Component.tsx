import React, {ComponentType, ReactNode} from 'react';
import {WithShowIfType} from './types';

export const withShowIf = <P extends object>(
  Component: ComponentType<P>,
  defaultReactNode?: ReactNode,
) => {
  const defaultToShow = defaultReactNode || null;
  return class WithShowIf extends React.Component<P & WithShowIfType> {
    public render() {
      const {showIf, ...rest} = this.props;
      return showIf !== false ? <Component {...(rest as P)} /> : defaultToShow;
    }
  };
};
