import { SvgIcon } from '@mui/material';

interface Props {
  size?: string;
  color?: string;
}

export const FeatureIconExport: React.FC<Props> = ({ size='3em', color='#fff' }) => {
  return (
    <SvgIcon sx={{fontSize: size}} >
      <svg
        width='800px'
        height='800px'
        viewBox='0 0 48 48'
        id='b'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <style>
            {
              `.c{fill:none;stroke:${color};stroke-linecap:round;stroke-linejoin:round;}`
            }
          </style>
        </defs>
        <path
          className='c'
          d='m15.675,14.75h18.5c4.0842,0,7.4,3.3158,7.4,7.4v20.35h-18.5c-4.0842,0-7.4-3.3158-7.4-7.4V14.75h0Z'
        />
        <line className='c' x1={15.675} y1={28.625} x2={33.4114} y2={28.625} />
        <polyline
          className='c'
          points='28.6689 33.3674 33.4114 28.625 28.6689 23.8826'
        />
        <path
          className='c'
          d='m8.849,31.3272c-1.4891-1.3537-2.424-3.3063-2.424-5.4772V5.5h18.5c2.2828,0,4.3242,1.0337,5.6816,2.6585'
        />
        <path
          className='c'
          d='m13.6428,36.1011c-1.587-1.3572-2.5928-3.3742-2.5928-5.6261V10.125h18.5c2.0435,0,3.8935.8283,5.2326,2.1674'
        />
        <line className='c' x1={38.9829} y1={16.5348} x2={30.6066} y2={8.1585} />
        <line className='c' x1={18.46} y1={40.915} x2={8.8601} y2={31.315} />
      </svg>
    </SvgIcon>
  );
}
