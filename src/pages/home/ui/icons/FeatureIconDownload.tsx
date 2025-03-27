import { SvgIcon } from '@mui/material';

interface Props {
  size?: string;
  color?: string;
}

export const FeatureIconDownload: React.FC<Props> = ({ size='3em', color='#fff' }) => {
  return (
    <SvgIcon sx={{fontSize: size}} >
      <svg
        width='800px'
        height='800px'
        viewBox='0 0 48 48'
        id='Layer_2'
        data-name='Layer 2'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <style>
            {
              `.cls-download-1{fill:none;stroke:${color};stroke-linecap:round;stroke-linejoin:round;}`
            }
          </style>
        </defs>
        <path
          className='cls-download-1'
          d='M17,4.5H31V18.26h8.72l-7.85,8.1L24,34.46l-7.86-8.1-7.85-8.1H17ZM7.94,38.65H40.06V43.5H7.94Z'
        />
      </svg>
    </SvgIcon>
  );
}
