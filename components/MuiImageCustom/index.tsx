import React from 'react';
import { Image } from 'antd';

interface MuiImageCustomProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
}

const MuiImageCustom: React.FC<MuiImageCustomProps> = (props) => {
  return (
    <Image
      src={props.src}
      alt={props.alt || "Image"}
      width={props.width || '100%'}
      height={props.height || 'auto'}
      preview={false}
      style={{ objectFit: 'contain' }}
    />
  );
};

export default MuiImageCustom;
