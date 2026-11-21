import React from "react";
import { Img, staticFile } from "remotion";
import { COLORS, RADIUS, SHADOW } from "../../theme";

type Props = {
  src: string; // file in public/logos
  size: number;
  plate?: boolean; // white plate around the icon (for busy / coloured backgrounds, or transparent PNGs)
  shadow?: string;
  style?: React.CSSProperties;
};

/** Logos are never distorted: square, object-fit contain, only rounded by the tile. */
export const LogoTile: React.FC<Props> = ({ src, size, plate, shadow = SHADOW.soft, style }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: RADIUS.logo,
      background: plate ? COLORS.white : "transparent",
      padding: plate ? size * 0.08 : 0,
      boxShadow: shadow,
      overflow: "hidden",
      boxSizing: "border-box",
      ...style,
    }}
  >
    <Img src={staticFile(`logos/${src}`)} style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: plate ? RADIUS.logo : 0, display: "block" }} />
  </div>
);
