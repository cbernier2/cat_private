import {patterns} from './patterns';

export type Pattern = keyof typeof patterns;

export interface PatternType {
  background: string;
  foreground?: string | null;
  pattern?: Pattern | null;
}

export interface FlatType {
  id: string;
  fill: string;
}

export interface CirclesType {
  background: string;
  complement: boolean;
  id: string;
  fill: string;
  radius: number;
  size: number;
  stroke: string;
  strokeWidth: number;
}

export interface LinesType {
  background: string;
  id: string;
  paths: string[];
  shapeRendering: string;
  size: number;
  stroke: string;
  strokeWidth: number;
}

export interface PathsType {
  background: string;
  fill: string;
  height: number;
  id: string;
  path: string;
  shapeRendering: string;
  size: number;
  stroke: string;
  strokeWidth: number;
  width: number;
}
