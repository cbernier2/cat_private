import {Material} from './types/cat/material';
import {CommonConstants} from './types/cat/common';

export const findMaterials = (materials: Material[], ids: string[]) => {
  if (ids && ids.length) {
    return materials.filter(material => ids.includes(material.id)) ?? [];
  }
  return materials;
};

export const findMaterial = (materials: Material[], id: string | undefined) =>
  materials.find(
    material => (material.id ?? CommonConstants.UNDEFINED_UUID) === id,
  );
