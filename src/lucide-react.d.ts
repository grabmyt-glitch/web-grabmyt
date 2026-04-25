declare module 'lucide-react' {
  import * as React from 'react';

  interface IconProps extends React.SVGAttributes<SVGSVGElement> {
    size?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  export const Moon: React.FC<IconProps>;
  export const SunMedium: React.FC<IconProps>;
  export const Menu: React.FC<IconProps>;
  export const X: React.FC<IconProps>;
  export const ChevronDown: React.FC<IconProps>;
  export const Star: React.FC<IconProps>;
  export const ArrowRight: React.FC<IconProps>;
  export const Clock: React.FC<IconProps>;
  export const MapPin: React.FC<IconProps>;
  export const TrendingUp: React.FC<IconProps>;
  export const MessageSquare: React.FC<IconProps>;
  export const Send: React.FC<IconProps>;
}
