import {Pattern} from './types';

export const getPatternId = (
  background: string,
  pattern: Pattern = 'none',
  foreground?: string,
) => {
  const defaultName = 'FLAT';
  const name = pattern === 'none' ? defaultName : pattern.toUpperCase();

  let id = `${background}-${name}`;
  if (foreground && name !== defaultName) {
    id = `${id}-${foreground}`;
  }

  return id;
};
