const { createElement } = wp.element;
const { registerBlockType } = wp.blocks;
const { getColorClassName } = wp.blockEditor;
import classnames from "classnames";

import edit from "./edit";

registerBlockType("matiere-noire/svg-icons", {
  title: "Icones SVG",
  icon: "carrot",
  supports: { align: true },
  attributes: {
    icon: {
      type: "string",
      default: "icon-check"
    },
    size: {
      type: "string",
      default: "20"
    },
    backgroundColor: {
      type: "string"
    },
    iconColor: {
      type: "string"
    },
    customBackgroundColor: {
      type: "string"
    },
    customIconColor: {
      type: "string"
    }
  },
  category: "common",
  edit,

  save: ({ attributes, className }) => {
    const {
      iconColor,
      backgroundColor,
      customIconColor,
      customBackgroundColor
    } = attributes;
    const iconClass = getColorClassName("color", iconColor);
    const backgroundClass = getColorClassName(
      "background-color",
      backgroundColor
    );

    const iconStyle = {
      backgroundColor: backgroundClass ? undefined : customBackgroundColor,
      color: iconClass ? undefined : customIconColor
    };
    return (
      <svg
        className={classnames("icon", className, {
          "has-background": backgroundClass,
          [backgroundClass]: backgroundClass,
          "has-text-color": iconClass,
          [iconClass]: iconClass
        })}
        style={iconStyle}
        width={attributes.size}
        height={attributes.size}
      >
        <use href={`#${attributes.icon}`} />
      </svg>
    );
  }
});
