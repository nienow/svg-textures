import {writable} from 'svelte/store';
import type {Gradient} from "../model/settings.ts";


export const createGradientStore = (initialGradient?: Gradient) => {
  const gradient = writable<Gradient>(initialGradient || {rotation: 0, colors: ['#000'], opacity: 1});

  const removeColor = (index: number) => {
    gradient.update((gradient) => {
      gradient.colors.splice(index, 1);
      return gradient;
    });
  };

  const modifyColor = (index: number, hex: string) => {
    gradient.update((gradient) => {
      gradient.colors[index] = hex;
      return gradient;
    });
  };

  const addColor = () => {
    gradient.update((gradient) => {
      gradient.colors.push('#000000');
      return gradient;
    });
  };

  const setRotation = (rotation: number) => {
    gradient.update((gradient) => {
      gradient.rotation = rotation;
      return gradient;
    });
  };

  const setOpacity = (opacity: number) => {
    gradient.update((gradient) => {
      gradient.opacity = opacity;
      return gradient;
    });
  };

  return {
    gradient,
    removeColor,
    addColor,
    modifyColor,
    setRotation,
    setOpacity
  };
};
