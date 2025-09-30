import React from 'react';
import { Drawer as AntdDrawer, DrawerProps } from 'antd';
import { SCREEN_SIZES } from '@/src/utils/constants';
import { useWindowSize } from '@/src/app/api/hooks/useWindowSize';

type Props = DrawerProps & {
  children: React.ReactNode;
};

const Drawer = (props: Props) => {
  const { width } = useWindowSize();

  return width >= SCREEN_SIZES.medium ? (
    <AntdDrawer {...props} placement="right" width={400}>
      <div>{props.children}</div>
    </AntdDrawer>
  ) : (
    <AntdDrawer {...props} placement="right" width={320} closeIcon={null}>
      <div>{props.children}</div>
    </AntdDrawer>
  );
};

export default Drawer;
