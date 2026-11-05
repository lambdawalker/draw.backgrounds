import { createCanvas, Path2D } from "@napi-rs/canvas";
import { drawState } from "./countries/us/index.js";
import { H, W } from "./geometry.js";

function pointPath(points, closed) {
  const path = new Path2D();
  path.moveTo(...points[0]);
  for (let i = 1; i < points.length; i++) {
    const [x, y] = points[i];
    path.lineTo(x, y);
  }
  if (closed) path.closePath();
  return path;
}

function paintCommands(ctx, commands) {
  if (Array.isArray(commands)) {
    for (const command of commands) paintCommands(ctx, command);
  } else {
    commands.paint(ctx);
  }
}

function linearPaint(ctx, paint, bounds) {
  if (typeof paint === "string") return paint;
  const [left, top, right, bottom] = bounds;
  const w = right - left;
  const h = bottom - top;
  // SVG objectBoundingBox gradients do not apply to zero-area geometry.
  if (!w || !h) return null;
  const [x1, y1, x2, y2] = paint.coordinates;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const nx = dx / w;
  const ny = dy / h;
  const scale = (dx * dx + dy * dy) / (nx * nx + ny * ny);
  const x = left + w * x1;
  const y = top + h * y1;
  const gradient = ctx.createLinearGradient(
    x,
    y,
    x + nx * scale,
    y + ny * scale,
  );
  for (const [offset, color] of paint.stops)
    gradient.addColorStop(offset / 100, color);
  return gradient;
}

function shape(
  makePath,
  { fill = "none", stroke = "none", width = 1, opacity = 1, cap = "butt" },
) {
  return {
    makePath,
    paint(ctx, opacityMultiplier = 1) {
      const path = makePath();
      ctx.globalAlpha = Number(opacity) * opacityMultiplier;
      if (fill !== "none") {
        const style = linearPaint(
          ctx,
          fill,
          typeof fill === "string" ? null : path.getBounds(),
        );
        if (style) {
          ctx.fillStyle = style;
          ctx.fill(path);
        }
      }
      if (stroke !== "none") {
        const style = linearPaint(
          ctx,
          stroke,
          typeof stroke === "string" ? null : path.getBounds(),
        );
        if (style) {
          ctx.strokeStyle = style;
          ctx.lineWidth = Number(width);
          ctx.lineJoin = "round";
          ctx.lineCap = cap;
          ctx.stroke(path);
        }
      }
    },
  };
}

class CanvasTarget {
  constructor(random, width, height) {
    this.random = random;
    this.canvas = createCanvas(width, height);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.scale(width / W, height / H);
  }

  add(commands) {
    paintCommands(this.ctx, commands);
  }

  path(d, stroke, width, opacity, fill) {
    return shape(() => new Path2D(d), {
      fill,
      stroke,
      width,
      opacity,
      cap: "round",
    });
  }

  line(points, stroke, width, opacity) {
    return shape(() => pointPath(points, false), { stroke, width, opacity });
  }

  polygon(points, fill, opacity) {
    return shape(() => pointPath(points, true), { fill, opacity });
  }

  rect(x, y, w, h, fill, opacity = 1) {
    return {
      paint(ctx) {
        ctx.globalAlpha = opacity;
        ctx.fillStyle = linearPaint(ctx, fill, [x, y, x + w, y + h]);
        ctx.fillRect(x, y, w, h);
      },
    };
  }

  ellipse(x, y, rx, ry, fill, opacity) {
    return this.ellipseShape(x, y, rx, ry, { fill, opacity });
  }

  outlinedEllipse(x, y, rx, ry, stroke, width, opacity) {
    return this.ellipseShape(x, y, rx, ry, { stroke, width, opacity });
  }

  ellipseShape(x, y, rx, ry, style) {
    return shape(() => {
      const path = new Path2D();
      path.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      return path;
    }, style);
  }

  gradient(stops, x1 = "0%", y1 = "0%", x2 = "100%", y2 = "100%") {
    return {
      stops,
      coordinates: [x1, y1, x2, y2].map((value) => parseFloat(value) / 100),
    };
  }

  glow(x, y, rx, ry, color, opacity = 0.3) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(rx, ry);
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, `${color}00`);
    ctx.globalAlpha = opacity;
    ctx.fillStyle = gradient;
    ctx.fillRect(-1, -1, 2, 2);
    ctx.restore();
  }

  openGroup(transform) {
    return {
      paint(ctx) {
        ctx.save();
        for (const [, name, args] of transform.matchAll(
          /(translate|scale|rotate)\(([^)]+)\)/g,
        )) {
          const [x, y] = args.split(/\s+/).map(Number);
          if (name === "translate") ctx.translate(x, y ?? 0);
          else if (name === "scale") ctx.scale(x, y ?? x);
          else ctx.rotate((x * Math.PI) / 180);
        }
      },
    };
  }

  closeGroup() {
    return { paint: (ctx) => ctx.restore() };
  }

  withOpacity(command, opacity) {
    // The current US design uses this on a single filled ridge polygon.
    return { paint: (ctx) => command.paint(ctx, opacity) };
  }

  clip(clipShape, content) {
    const ctx = this.ctx;
    ctx.save();
    ctx.clip(clipShape.makePath());
    this.add(content);
    ctx.restore();
  }

  verticalFade(content) {
    const layer = createCanvas(this.canvas.width, this.canvas.height);
    const ctx = layer.getContext("2d");
    ctx.scale(layer.width / W, layer.height / H);
    paintCommands(ctx, content);
    const fade = ctx.createLinearGradient(0, 0, 0, H);
    for (const [offset, alpha] of [
      [0, 0.12],
      [0.2, 1],
      [0.82, 1],
      [1, 0.1],
    ])
      fade.addColorStop(offset, `rgba(255,255,255,${alpha})`);
    ctx.globalCompositeOperation = "destination-in";
    ctx.globalAlpha = 1;
    ctx.fillStyle = fade;
    ctx.fillRect(0, 0, W, H);
    this.ctx.globalAlpha = 1;
    this.ctx.drawImage(layer, 0, 0, W, H);
  }
}

/** Draw a US background directly to a Node Canvas 2D surface. */
export function renderCanvas(state, options = {}) {
  return drawState(
    state,
    options,
    (random, width, height) => new CanvasTarget(random, width, height),
  ).canvas;
}
