import { useWindowDimensions } from 'react-native';

type BreakpointValues<T> = {
  base?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
};

const defaultBreakpoints: Record<keyof BreakpointValues<any>, number> = {
  base: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1200,
};

function isBreakpointValues<T>(values: T | BreakpointValues<T>): values is BreakpointValues<T> {
  return values !== null && typeof values === 'object' && 'base' in values;
}

export function getBreakPointValue<T>(values: T | BreakpointValues<T>, width: number): T {
  if (!isBreakpointValues(values)) {
    return values;
  }

  let result: T | undefined;
  const breakpointKeys = Object.keys(defaultBreakpoints) as (keyof BreakpointValues<T>)[];
  for (const key of breakpointKeys) {
    if (width >= defaultBreakpoints[key] && values[key] !== undefined) {
      result = values[key];
    }
  }
  return result as T;
}

export function useBreakpointValue<T>(values: T | BreakpointValues<T>): T {
  const { width } = useWindowDimensions();
  return getBreakPointValue(values, width);
}
