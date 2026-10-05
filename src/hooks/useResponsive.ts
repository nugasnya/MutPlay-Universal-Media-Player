import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width } = useWindowDimensions();
  return { width, isDesktop: width >= 800, isTablet: width >= 600 && width < 800 };
}
