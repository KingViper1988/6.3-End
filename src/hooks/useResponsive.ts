
import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Hook dùng để kiểm tra xem thiết bị hiện tại có phải là di động hay không.
 * Ngưỡng mặc định là 768px (MD breakpoint của Tailwind).
 */
export const useResponsive = (breakpoint: number = 768) => {
  let desktopSiteMode = false;
  let resolvedInterfaceMode: 'pc' | 'mobile' = 'pc';
  try {
    const themeContext = useTheme();
    desktopSiteMode = themeContext.desktopSiteMode;
    resolvedInterfaceMode = themeContext.resolvedInterfaceMode;
  } catch (e) {
    // Falls back if called outside ThemeProvider
  }

  const getLogicalWidth = () => {
    if (typeof window === 'undefined') return 0;
    if (desktopSiteMode) return 1280;
    const physicalWidth = window.innerWidth;
    
    // Nếu chế độ giao diện được thiết lập là 'pc',
    // ta hướng tới việc hiển thị giao diện PC đồng nhất (không sử dụng giao diện di động rút gọn).
    // Do đó, trả về độ rộng tối thiểu 1280px để luôn vượt qua breakpoint di động (768px).
    if (resolvedInterfaceMode === 'pc') {
      return 1280;
    }
    
    return physicalWidth;
  };

  const [width, setWidth] = useState<number>(getLogicalWidth());

  useEffect(() => {
    const handleResize = () => {
      setWidth(getLogicalWidth());
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // ensure it runs on mount and option updates
    return () => window.removeEventListener('resize', handleResize);
  }, [desktopSiteMode, resolvedInterfaceMode]);

  const isMobile = width < breakpoint;

  return { 
    isMobile, 
    width 
  };
};
