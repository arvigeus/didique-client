// @flow
import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-resizable/css/styles.css";
import "./ResponsiveGridLayout.css";

type ResponsiveGridLayoutPropsType = {
  children: any
};

const ResponsiveGridLayoutProvider = WidthProvider(Responsive);

const ResponsiveGridLayout = ({
  children,
  ...props
}: ResponsiveGridLayoutPropsType) => (
  <ResponsiveGridLayoutProvider
    className="responsive-grid-layout"
    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
    {...props}
  >
    {children}
  </ResponsiveGridLayoutProvider>
);

export default ResponsiveGridLayout;
