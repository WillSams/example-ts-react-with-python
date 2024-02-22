import React from 'react';
import { Image } from 'react-bootstrap';

const Loading = ({ width = 99, height = 99 }) => {
  return <Image width={width} height={height} src="/img/loading.gif" />;
};

export default Loading;
