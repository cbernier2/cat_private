import {Pattern, PatternType} from './types';

export const getPatternId = (
  background: string,
  pattern: Pattern | null = 'none',
  foreground?: string | null,
) => {
  const defaultName = 'FLAT';
  const name = pattern === 'none' || pattern === null ? defaultName : pattern;

  let id = `${background}-${name}`;
  if (foreground && name !== defaultName) {
    id = `${id}-${foreground}`;
  }

  return id;
};

export const getPatternFromId = (id: string): PatternType => {
  const [background, pattern = 'none', foreground] = id.split('-');

  return {background, foreground, pattern: pattern as Pattern};
};
