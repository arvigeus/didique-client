// @flow
import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-resizable/css/styles.css";

type ResponsiveGridLayoutPropsType = {
  children: any
};

const ResponsiveGridLayoutProvider = WidthProvider(Responsive);

const ResponsiveGridLayout = ({
  children,
  ...props
}: ResponsiveGridLayoutPropsType) => (
  <ResponsiveGridLayoutProvider
    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
    {...props}
  >
    {children}
  </ResponsiveGridLayoutProvider>
);

export default ResponsiveGridLayout;
