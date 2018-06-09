// @flow
import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-resizable/css/styles.css";
import "./ResponsiveGridLayout.css";

type ResponsiveGridLayoutPropsType = {
  children: any,
  margin?: Array<number> | number,
  simple?: boolean,
  columnWidth?: number
};

const ResponsiveGridLayoutProvider = WidthProvider(Responsive);

const ResponsiveGridLayout = ({
  children,
  margin,
  simple,
  columnWidth,
  ...props
}: ResponsiveGridLayoutPropsType) =>
  !simple ? (
    <ResponsiveGridLayoutProvider
      className="responsive-grid-layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      margin={margin}
      {...props}
    >
      {children}
    </ResponsiveGridLayoutProvider>
  ) : (
    <div
      className="responsive-grid-layout-simple"
      style={{
        gridGap: margin
          ? Array.isArray(margin)
            ? `${margin[0] || 0}px ${margin[1] || 0}px`
            : `${margin}px`
          : 0,
        gridTemplateColumns: `repeat(auto-fill, ${columnWidth || 0}px)`
      }}
    >
      {children}
    </div>
  );

export default ResponsiveGridLayout;
