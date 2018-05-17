// @flow
import React, { Fragment } from "react";

type HandwritingType = {
  children: string,
  color: string,
  fontFamily: string,
  fontSize: string,
  speed: number,
  loop: boolean,
  fill: boolean
};

class Handwriting extends React.Component<HandwritingType> {
  static defaultProps = {
    color: "#495057", // var(--text-color)
    fontFamily: "Kurale, sans-serif", // var(--font-interface)
    fontSize: "50px",
    speed: 7,
    loop: true,
    fill: true
  };

  componentDidMount() {
    const { fontSize, fontFamily, color } = this.props;
    const { text, canvas } = this.refs;
    const { clientWidth, clientHeight } = text;

    canvas.width = clientWidth;
    canvas.height = clientHeight;
    text.parentNode.removeChild(text);

    const ctx = canvas.getContext("2d");
    ctx.font = `${fontSize} ${fontFamily}`;
    ctx.lineWidth = 1;
    ctx.lineJoin = "round"; // to avoid spikes we can join each line with a round joint
    ctx.strokeStyle = ctx.fillStyle = color;

    this.updateCanvas(
      ctx,
      clientWidth,
      clientHeight,
      clientWidth * 0.02,
      0,
      220
    );
  }

  updateCanvas(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    x: number,
    i: number,
    dashOffset: number
  ) {
    const { children, speed, loop, fill } = this.props;
    const textVertPos = height * 0.675;

    // clear canvas for each frame
    ctx.clearRect(x, 0, width - x, height);

    // calculate and set current line-dash for this char
    ctx.setLineDash([220 - dashOffset, dashOffset - speed]);

    // reduce length of off-dash
    dashOffset -= speed;

    // draw char to canvas with current dash-length
    ctx.strokeText(children[i], x, textVertPos);

    // char done? no, the loop
    if (dashOffset > 0)
      requestAnimationFrame(
        this.updateCanvas.bind(this, ctx, width, height, x, i, dashOffset)
      );
    else {
      // ok, outline done, lets fill its interior before next
      if (fill) ctx.fillText(children[i], x, textVertPos);

      // reset line-dash length
      dashOffset = 220;

      // get x position to next char by measuring what we have drawn
      x += ctx.measureText(children[i++]).width;

      // if we still have chars left, loop animation again for this char
      if (i < children.length)
        requestAnimationFrame(
          this.updateCanvas.bind(this, ctx, width, height, x, i, dashOffset)
        );
      else if (loop)
        // else repeat animation if requested
        setTimeout(
          this.updateCanvas.bind(
            this,
            ctx,
            width,
            height,
            width * 0.02,
            0,
            220
          ),
          500
        );
    }
  }

  render() {
    const { children, fontSize, fontFamily } = this.props;
    return (
      <Fragment>
        <canvas ref="canvas" width={0} height={0} />
        <span
          ref="text"
          style={{
            fontSize,
            fontFamily,
            fontWeight: 900,
            visibility: "hidden",
            whiteSpace: "nowrap",
            display: "inline-block"
          }}
        >
          {children}
        </span>
      </Fragment>
    );
  }
}

export default Handwriting;
