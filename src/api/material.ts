import {Material} from './types/cat/material';

export const findMaterials = (materials: Material[], ids: string[]) => {
  if (ids && ids.length) {
    return materials.filter(material => ids.includes(material.id)) ?? [];
  }
  return materials;
};

export const findMaterial = (materials: Material[], id: string | undefined) =>
  materials.find(material => material.id === id);
