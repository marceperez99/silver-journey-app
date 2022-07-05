/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Svg, { SvgProps, Ellipse, Circle, Path } from 'react-native-svg';

function VoidSVG(props: SvgProps) {
  return (
    <Svg
      data-name="Layer 1"
      width="100%"
      height="100%"
      viewBox="0 0 798 835"
      {...props}
    >
      <Ellipse cx={308.5} cy={780} fill="#3f3d56" rx={308.5} ry={54.5} />
      <Circle cx={496} cy={301.5} r={301.5} fill="#3f3d56" />
      <Circle cx={496} cy={301.5} r={248.9} opacity={0.1} />
      <Circle cx={496} cy={301.5} r={204} opacity={0.1} />
      <Circle cx={496} cy={301.5} r={146.3} opacity={0.1} />
      <Path
        fill="#d0cde1"
        d="M197 328s-24 67-13 91 27 46 27 46-6-132-14-137Z"
      />
      <Path d="M197 328s-24 67-13 91 27 46 27 46-6-132-14-137Z" opacity={0.1} />
      <Path
        fill="#2f2e41"
        d="m214 483-3 18v5a981 981 0 0 1-10 85c1 0-28 37-16 95l3 59s28 1 28-8l-2-17c0-5 4-5 2-8l-3-4s4-4 3-5 8-63 8-63 10-10 10-15v-5l4-12 24-55 10 39 10 55s6 50 16 70l19 61c0-2 30-6 29-14l-18-119 4-164Z"
      />
      <Path
        fill="#2f2e41"
        d="M190 740s-24 47-8 49 22 1 29-6l18-13a23 23 0 0 0 11-22c0-4-2-7-6-8-10-1-23-10-23-10Zm131 34s-24 47-8 49 22 2 29-6l18-12a23 23 0 0 0 11-22c-1-5-2-8-6-9-11 0-23-10-23-10Z"
      />
      <Circle cx={295.9} cy={215.4} r={36.9} fill="#ffb8b8" />
      <Path fill="#ffb8b8" d="M272 228s-26 48-28 48l47 16 16-51Z" />
      <Path
        fill="#d0cde1"
        d="M313 281s-53-29-58-28-62 50-61 70 8 53 8 53 3 93 8 94-1 17 1 17 123 0 124-3-22-203-22-203Z"
      />
      <Path fill="#ffb8b8" d="M342 489s17 51 3 49-21-44-21-44Z" />
      <Path
        fill="#d0cde1"
        d="M297 278s-32 7-27 50 15 88 15 88l32 71 4 14 24-7-18-101s-6-109-14-113a34 34 0 0 0-16-2Z"
      />
      <Path d="m278 415 40 72-34-76-6 4z" opacity={0.1} />
      <Path
        fill="#2f2e41"
        d="M333 205v-3l5 1a6 6 0 0 0-2-4l6-1a64 64 0 0 0-43-26c-13-2-28 0-36 10-5 5-7 11-9 17-4 11-5 24 3 33 7 9 20 11 32 12 4 1 9 1 12-1a30 30 0 0 0-1-13 9 9 0 0 1-1-4c0-3 5-4 9-4s7 1 10-1l1-7c1-7 14-8 14-9Z"
      />
      <Circle cx={559} cy={744.5} r={43} fill="#00bfa6" />
      <Circle cx={54} cy={729.5} r={43} fill="#00bfa6" />
      <Circle cx={54} cy={672.5} r={31} fill="#00bfa6" />
      <Circle cx={54} cy={624.5} r={22} fill="#00bfa6" />
    </Svg>
  );
}

export default VoidSVG;
