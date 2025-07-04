import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useDeviceType() {
  const [deviceType, setDeviceType] = React.useState<{
    isMobile: boolean | undefined;
    supportsAnimations: boolean | undefined;
  }>({
    isMobile: undefined,
    supportsAnimations: undefined
  });

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    const onChange = () => {
      const mobileStatus = window.innerWidth < MOBILE_BREAKPOINT;
      setDeviceType({
        isMobile: mobileStatus,
        supportsAnimations: !mobileStatus // Animations disabled on mobile
      });
    };

    mql.addEventListener("change", onChange);
    onChange(); // Set initial value
    
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return {
    isMobile: !!deviceType.isMobile,
    supportsAnimations: !!deviceType.supportsAnimations
  };
}