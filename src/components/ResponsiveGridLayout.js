// @flow
import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-resizable/css/styles.css";
import "./ResponsiveGridLayout.css";

export type LayoutType = {
  id: string,
  x: number,
  y: number,
  width: number,
  height: number
};

type GridLayoutType = {
  i: string,
  x: number,
  y: number,
  w: number,
  h: number
};

type ResponsiveGridLayoutPropsType = {
  layout?: Array<LayoutType>,
  onLayoutChange?: (Array<LayoutType>) => void,
  margin?: Array<number> | number,
  isDraggable?: boolean,
  columnWidth?: number,
  children: any
};

const ResponsiveGridLayoutProvider = WidthProvider(Responsive);

class ResponsiveGridLayout extends React.PureComponent<
  ResponsiveGridLayoutPropsType
> {
  layout = null;

  onLayoutChange = (currentLayout: Array<GridLayoutType>) => {
    if (this.layout === null) {
      this.layout = currentLayout;
      return;
    }
    const { onLayoutChange } = this.props;
    const changes = currentLayout.filter(changed => {
      const old = this.layout.find(elem => elem.i === changed.i);
      return (
        old &&
        (changed.x !== old.x ||
          changed.y !== old.y ||
          changed.w !== old.w ||
          changed.h !== old.h)
      );
    });
    this.layout = currentLayout;
    if (changes.length && onLayoutChange)
      onLayoutChange(
        changes.map(({ i: id, x, y, w: width, h: height }) => ({
          id,
          x,
          y,
          width,
          height
        }))
      );
  };

  render() {
    const {
      layout,
      children,
      margin,
      isDraggable,
      columnWidth,
      onLayoutChange,
      ...props
    } = this.props;
    return isDraggable !== false ? (
      <ResponsiveGridLayoutProvider
        className="responsive-grid-layout"
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        onLayoutChange={this.onLayoutChange}
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
  }
}

export default ResponsiveGridLayout;
