import React from 'react';

export type CatTabViewType = {
  pages: {[iconName: string]: React.ComponentType<unknown>};
};
