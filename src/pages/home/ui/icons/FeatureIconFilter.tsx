import { SvgIcon } from '@mui/material';

interface Props {
  size?: string;
  color?: string;
}

export const FeatureIconFilter: React.FC<Props> = ({ size='3em', color='#fff' }) => {
  return (
    <SvgIcon sx={{fontSize: size}} >
      <svg
        width='800px'
        height='800px'
        viewBox='0 0 1000 1000'
        data-name='Layer 2'
        id='Layer_2'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <style>
            {
              `.cls-filter-1{fill:none;stroke:${color};stroke-linecap:round;stroke-miterlimit:10;stroke-width:22px;}`
            }
          </style>
        </defs>
        <line className='cls-filter-1' x1={184.63} x2={312.9} y1={292.84} y2={292.84} />
        <line className='cls-filter-1' x1={541.67} x2={815.37} y1={292.84} y2={292.84} />
        <circle className='cls-filter-1' cx={427.04} cy={292.84} r={70.46} />
        <line className='cls-filter-1' x1={815.37} x2={687.1} y1={499.06} y2={499.06} />
        <line className='cls-filter-1' x1={458.33} x2={184.63} y1={499.06} y2={499.06} />
        <circle className='cls-filter-1' cx={572.96} cy={499.06} r={70.46} />
        <line className='cls-filter-1' x1={815.37} x2={597.03} y1={707.16} y2={707.16} />
        <line className='cls-filter-1' x1={368.26} x2={184.63} y1={707.16} y2={707.16} />
        <circle className='cls-filter-1' cx={482.89} cy={707.16} r={70.46} />
      </svg>
    </SvgIcon>
  );
}
