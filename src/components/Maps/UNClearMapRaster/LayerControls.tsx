import React from "react";
import { LayerControl } from "./types";
import {
  CONTROL_PANEL_STYLE,
  CONTROL_TITLE_STYLE,
  CONTROL_ITEM_STYLE,
  CONTROL_LABEL_STYLE,
  CONTROL_CHECKBOX_STYLE,
} from "./constants";

interface LayerControlsProps {
  controls: LayerControl[];
  onToggle: (id: string) => void;
}

export const LayerControls: React.FC<LayerControlsProps> = ({
  controls,
  onToggle,
}) => {
  return (
    <div style={CONTROL_PANEL_STYLE}>
      <h3 style={CONTROL_TITLE_STYLE}>Layer Controls</h3>
      {controls.map((control) => (
        <div key={control.id} style={CONTROL_ITEM_STYLE}>
          <label style={CONTROL_LABEL_STYLE}>
            <input
              type="checkbox"
              checked={control.enabled}
              onChange={() => onToggle(control.id)}
              style={CONTROL_CHECKBOX_STYLE}
            />
            {control.label}
          </label>
        </div>
      ))}
    </div>
  );
};
