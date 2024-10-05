/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the Creative Commons Attribution-ShareAlike 2.5 Generic License.
 *--------------------------------------------------------------------------------------------*/
const util = require("../utils");
/**
 * This file is mainly compiled from https://developer.mozilla.org/en-US/docs/Web/CSS with some additions from the following sources
 *  - https://msdn.microsoft.com/en-us/library/dn433242(v=vs.85).aspx
 *  - https://www.w3.org/
 *  - https://drafts.csswg.org/
 */

//@ts-check

function extractFirstSentence(content) {
	const match = content.match(/\{\{CSSRef\}\}[^\n\r]*[\r\n]*([^\r\n]*)/);
	if (match) {
		let desc = match[1].trim();
		// replace all markdown links with the link text
		desc = desc.replace(/\[([^\]]*)\]\([^\)]*\)/g, "$1");
		// replace all markdown bold with the text
		desc = desc.replace(/\*\*([^\*]*)\*\*/g, "$1");
		//replace all markdown underline with the text
		desc = desc.replace(/_([^_]*)_/g, "$1");
		// replace {{ cssxref("value") }} with the value
		desc = desc.replace(/\{\{\s*cssxref\("([^"]*)"\)\s*\}\}/g, "$1");
		// replace {{ Glossary("key", "value") }} with the value
		desc = desc.replace(
			/\{\{\s*Glossary\("([^"]*)",\s*"([^"]*)"\)\s*\}\}/gi,
			"$2",
		);
		// replace {{ Glossary("value") }} with the value
		desc = desc.replace(/\{\{\s*Glossary\("([^"]*)"\)\s*\}\}/gi, "$1");
		// replace `value` with the value
		desc = desc.replace(/`([^`]*)`/g, "$1");
		return desc;
	}
	return undefined;
}

async function fetchDocFromMDN(prop, atRuleName) {
	let pathSegment = atRuleName ? `${atRuleName}/${prop}` : prop;
	const url = `https://raw.githubusercontent.com/mdn/content/main/files/en-us/web/css/${pathSegment}/index.md`;
	try {
		return extractFirstSentence(await util.download(url));
	} catch (e) {}
	return undefined;
}

module.exports = {
	fetchDocFromMDN,
	propertyDescriptions: {
		"-ms-ime-align": `Aligns the Input Method Editor (IME) candidate window box relative to the element on which the IME composition is active.`,
		"-moz-binding": `The -moz-binding CSS property is used by Mozilla-based applications to attach an XBL binding to a DOM element.`,
		"-moz-context-properties": `If you reference an SVG image in a webpage (such as with the <img> element or as a background image), the SVG image can coordinate with the embedding element (its context) to have the image adopt property values set on the embedding element. To do this the embedding element needs to list the properties that are to be made available to the image by listing them as values of the -moz-context-properties property, and the image needs to opt in to using those properties by using values such as the context-fill value.\n\nThis feature is available since Firefox 55, but is only currently supported with SVG images loaded via chrome:// or resource:// URLs. To experiment with the feature in SVG on the Web it is necessary to set the svg.context-properties.content.enabled pref to true.`,
		"-moz-float-edge": `The non-standard -moz-float-edge CSS property specifies whether the height and width properties of the element include the margin, border, or padding thickness.`,
		"-moz-force-broken-image-icon": `The -moz-force-broken-image-icon extended CSS property can be used to force the broken image icon to be shown even when a broken image has an alt attribute.`,
		"-moz-image-region": `For certain XUL elements and pseudo-elements that use an image from the list-style-image property, this property specifies a region of the image that is used in place of the whole image. This allows elements to use different pieces of the same image to improve performance.`,
		"-moz-orient": `The -moz-orient CSS property specifies the orientation of the element to which it's applied.`,
		"-moz-outline-radius": `In Mozilla applications like Firefox, the -moz-outline-radius CSS property can be used to give an element's outline rounded corners.`,
		"-moz-outline-radius-bottomleft": `In Mozilla applications, the -moz-outline-radius-bottomleft CSS property can be used to round the bottom-left corner of an element's outline.`,
		"-moz-outline-radius-bottomright": `In Mozilla applications, the -moz-outline-radius-bottomright CSS property can be used to round the bottom-right corner of an element's outline.`,
		"-moz-outline-radius-topleft": `In Mozilla applications, the -moz-outline-radius-topleft CSS property can be used to round the top-left corner of an element's outline.`,
		"-moz-outline-radius-topright": `In Mozilla applications, the -moz-outline-radius-topright CSS property can be used to round the top-right corner of an element's outline.`,
		"-moz-stack-sizing": `-moz-stack-sizing is an extended CSS property. Normally, a stack will change its size so that all of its child elements are completely visible. For example, moving a child of the stack far to the right will widen the stack so the child remains visible.`,
		"-moz-text-blink": `The -moz-text-blink non-standard Mozilla CSS extension specifies the blink mode.`,
		"-moz-user-input": `In Mozilla applications, -moz-user-input determines if an element will accept user input.`,
		"-moz-user-modify": `The -moz-user-modify property has no effect. It was originally planned to determine whether or not the content of an element can be edited by a user.`,
		"-moz-window-dragging": `The -moz-window-dragging CSS property specifies whether a window is draggable or not. It only works in Chrome code, and only on Mac OS X.`,
		"-moz-window-shadow": `The -moz-window-shadow CSS property specifies whether a window will have a shadow. It only works on Mac OS X.`,
		"-webkit-border-before": `The -webkit-border-before CSS property is a shorthand property for setting the individual logical block start border property values in a single place in the style sheet.`,
		"-webkit-border-before-color": `The -webkit-border-before-color CSS property sets the color of the individual logical block start border in a single place in the style sheet.`,
		"-webkit-border-before-style": `The -webkit-border-before-style CSS property sets the style of the individual logical block start border in a single place in the style sheet.`,
		"-webkit-border-before-width": `The -webkit-border-before-width CSS property sets the width of the individual logical block start border in a single place in the style sheet.`,
		"-webkit-line-clamp": `The -webkit-line-clamp CSS property allows limiting of the contents of a block container to the specified number of lines.`,
		"-webkit-mask": `The mask CSS property alters the visibility of an element by either partially or fully hiding it. This is accomplished by either masking or clipping the image at specific points.`,
		"-webkit-mask-attachment": `If a -webkit-mask-image is specified, -webkit-mask-attachment determines whether the mask image's position is fixed within the viewport, or scrolls along with its containing block.`,
		"-webkit-mask-composite": `The -webkit-mask-composite property specifies the manner in which multiple mask images applied to the same element are composited with one another. Mask images are composited in the opposite order that they are declared with the -webkit-mask-image property.`,
		"-webkit-mask-position": `The mask-position CSS property sets the initial position, relative to the mask position layer defined by mask-origin, for each defined mask image.`,
		"-webkit-mask-position-x": `The -webkit-mask-position-x CSS property sets the initial horizontal position of a mask image.`,
		"-webkit-mask-position-y": `The -webkit-mask-position-y CSS property sets the initial vertical position of a mask image.`,
		"-webkit-mask-repeat-x": `The -webkit-mask-repeat-x property specifies whether and how a mask image is repeated (tiled) horizontally.`,
		"-webkit-mask-repeat-y": `The -webkit-mask-repeat-y property specifies whether and how a mask image is repeated (tiled) vertically.`,
		"aspect-ratio": `The aspect-ratio   CSS property sets a preferred aspect ratio for the box, which will be used in the calculation of auto sizes and some other layout functions.`,
		"appearance": `Changes the appearance of buttons and other controls to resemble native controls.`,
		"azimuth": `In combination with elevation, the azimuth CSS property enables different audio sources to be positioned spatially for aural presentation. This is important in that it provides a natural way to tell several voices apart, as each can be positioned to originate at a different location on the sound stage. Stereo output produce a lateral sound stage, while binaural headphones and multi-speaker setups allow for a fully three-dimensional stage.`,
		"backdrop-filter": `The backdrop-filter CSS property lets you apply graphical effects such as blurring or color shifting to the area behind an element. Because it applies to everything behind the element, to see the effect you must make the element or its background at least partially transparent.`,
		"border-block":
			"The border-block CSS property is a shorthand property for setting the individual logical block border property values in a single place in the style sheet.",
		"border-block-color": `The border-block-color CSS property defines the color of the logical block borders of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-color and border-bottom-color, or border-right-color and border-left-color property depending on the values defined for writing-mode, direction, and text-orientation.`,
		"border-block-style": `The border-block-style CSS property defines the style of the logical block borders of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-style and border-bottom-style, or border-left-style and border-right-style properties depending on the values defined for writing-mode, direction, and text-orientation.`,
		"border-block-width": `The border-block-width CSS property defines the width of the logical block borders of an element, which maps to a physical border width depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-width and border-bottom-width, or border-left-width, and border-right-width property depending on the values defined for writing-mode, direction, and text-orientation.`,
		"border-end-end-radius": `The border-end-end-radius CSS property defines a logical border radius on an element, which maps to a physical border radius that depends on on the element's writing-mode, direction, and text-orientation.`,
		"border-end-start-radius": `The border-end-start-radius CSS property defines a logical border radius on an element, which maps to a physical border radius depending on the element's writing-mode, direction, and text-orientation.`,
		"border-inline": `The border-inline CSS property is a shorthand property for setting the individual logical inline border property values in a single place in the style sheet.`,
		"border-inline-color": `The border-inline-color CSS property defines the color of the logical inline borders of an element, which maps to a physical border color depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-color and border-bottom-color, or border-right-color and border-left-color property depending on the values defined for writing-mode, direction, and text-orientation.`,
		"border-inline-style": `The border-inline-style CSS property defines the style of the logical inline borders of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-style and border-bottom-style, or border-left-style and border-right-style properties depending on the values defined for writing-mode, direction, and text-orientation.`,
		"border-inline-width": `The border-inline-width CSS property defines the width of the logical inline borders of an element, which maps to a physical border width depending on the element's writing mode, directionality, and text orientation. It corresponds to the border-top-width and border-bottom-width, or border-left-width, and border-right-width property depending on the values defined for writing-mode, direction, and text-orientation.`,
		"border-start-end-radius": `The border-start-end-radius CSS property defines a logical border radius on an element, which maps to a physical border radius depending on the element's writing-mode, direction, and text-orientation.`,
		"border-start-start-radius": `The border-start-start-radius CSS property defines a logical border radius on an element, which maps to a physical border radius that depends on the element's writing-mode, direction, and text-orientation.`,
		"box-align": `The box-align CSS property specifies how an element aligns its contents across its layout in a perpendicular direction. The effect of the property is only visible if there is extra space in the box.`,
		"box-direction": `The box-direction CSS property specifies whether a box lays out its contents normally (from the top or left edge), or in reverse (from the bottom or right edge).`,
		"box-flex": `The -moz-box-flex and -webkit-box-flex CSS properties specify how a -moz-box or -webkit-box grows to fill the box that contains it, in the direction of the containing box's layout.`,
		"box-flex-group": `The box-flex-group CSS property assigns the flexbox's child elements to a flex group.`,
		"box-lines": `The box-lines CSS property determines whether the box may have a single or multiple lines (rows for horizontally oriented boxes, columns for vertically oriented boxes).`,
		"box-ordinal-group": `The box-ordinal-group CSS property assigns the flexbox's child elements to an ordinal group.`,
		"box-orient": `The box-orient CSS property specifies whether an element lays out its contents horizontally or vertically.`,
		"box-pack": `The -moz-box-pack and -webkit-box-pack CSS properties specify how a -moz-box or -webkit-box packs its contents in the direction of its layout. The effect of this is only visible if there is extra space in the box.`,
		"color-adjust": `The color-adjust property is a non-standard CSS extension that can be used to force printing of background colors and images in browsers based on the WebKit engine.`,
		"counter-set": `The counter-set CSS property sets a CSS counter to a given value. It manipulates the value of existing counters, and will only create new counters if there isn't already a counter of the given name on the element.`,
		"font-optical-sizing":
			"The font-optical-sizing CSS property allows developers to control whether browsers render text with slightly differing visual representations to optimize viewing at different sizes, or not. This only works for fonts that have an optical size variation axis.",
		"font-variation-settings": `The font-variation-settings CSS property provides low-level control over OpenType or TrueType font variations, by specifying the four letter axis names of the features you want to vary, along with their variation values.`,
		"gap": `The gap CSS property is a shorthand property for row-gap and column-gap specifying the gutters between grid rows and columns.`,
		"row-gap": `The row-gap CSS property specifies the gutter between grid rows.`,
		"hanging-punctuation": `The hanging-punctuation CSS property specifies whether a punctuation mark should hang at the start or end of a line of text. Hanging punctuation may be placed outside the line box.`,
		"image-resolution": `The image-resolution property specifies the intrinsic resolution of all raster images used in or on the element. It affects both content images (e.g. replaced elements and generated content) and decorative images (such as background-image). The intrinsic resolution of an image is used to determine the image’s intrinsic dimensions.`,
		"initial-letter": `The initial-letter CSS property specifies styling for dropped, raised, and sunken initial letters.`,
		"initial-letter-align": `The initial-letter-align CSS property specifies the alignment of initial letters within a paragraph.`,
		"inset": `The inset CSS property defines the logical block and inline start and end offsets of an element, which map to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the top and bottom, or right and left properties depending on the values defined for writing-mode, direction, and text-orientation.`,
		"inset-block": `The inset-block CSS property defines the logical block start and end offsets of an element, which maps to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the top and bottom, or right and left properties depending on the values defined for writing-mode, direction, and text-orientation.`,
		"inset-block-start": `The inset-block-start CSS property defines the logical block start offset of an element, which maps to a physical offset depending on the element's writing mode, directionality, and text orientation. It corresponds to the top, right, bottom, or left property depending on the values defined for writing-mode, direction, and text-orientation.`,
		"inset-block-end": `The inset-block-end CSS property defines the logical block end offset of an element, which maps to a physical offset depending on the element's writing mode, directionality, and text orientation. It corresponds to the top, right, bottom, or left property depending on the values defined for writing-mode, direction, and text-orientation.`,
		"inset-inline": `The inset-inline CSS property defines the logical block start and end offsets of an element, which maps to physical offsets depending on the element's writing mode, directionality, and text orientation. It corresponds to the top and bottom, or right and left properties depending on the values defined for writing-mode, direction, and text-orientation.`,
		"inset-inline-start": `The inset-inline-start CSS property defines the logical inline start inset of an element, which maps to a physical offset depending on the element's writing mode, directionality, and text orientation. It corresponds to the top, right, bottom, or left property depending on the values defined for writing-mode, direction, and text-orientation.`,
		"inset-inline-end": `The inset-inline-end CSS property defines the logical inline end inset of an element, which maps to a physical inset depending on the element's writing mode, directionality, and text orientation. It corresponds to the top, right, bottom, or left property depending on the values defined for writing-mode, direction, and text-orientation.`,
		"line-clamp": `The line-clamp property allows limiting the contents of a block container to the specified number of lines; remaining content is fragmented away and neither rendered nor measured. Optionally, it also allows inserting content into the last line box to indicate the continuity of truncated/interrupted content.`,
		"line-height-step": `The line-height-step CSS property defines the step units for line box heights. When the step unit is positive, line box heights are rounded up to the closest multiple of the unit. Negative values are invalid.`,
		"margin-block": `The margin-block CSS property defines the logical block start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation.`,
		"margin-inline": `The margin-inline CSS property defines the logical inline start and end margins of an element, which maps to physical margins depending on the element's writing mode, directionality, and text orientation.`,
		"margin-trim": `The margin-trim property allows the container to trim the margins of its children where they adjoin the container’s edges.`,
		"mask": `The mask CSS property alters the visibility of an element by either partially or fully hiding it. This is accomplished by either masking or clipping the image at specific points.`,
		"mask-border": `The mask-border CSS property lets you create a mask along the edge of an element's border.\n\nThis property is a shorthand for mask-border-source, mask-border-slice, mask-border-width, mask-border-outset, mask-border-repeat, and mask-border-mode. As with all shorthand properties, any omitted sub-values will be set to their initial value.`,
		"mask-border-mode": `The mask-border-mode CSS property specifies the blending mode used in a mask border.`,
		"mask-border-outset": `The mask-border-outset CSS property specifies the distance by which an element's mask border is set out from its border box.`,
		"mask-border-repeat": `The mask-border-repeat CSS property defines how the edge regions of a source image are adjusted to fit the dimensions of an element's mask border.`,
		"mask-border-slice": `The mask-border-slice CSS property divides the image specified by mask-border-source into regions. These regions are used to form the components of an element's mask border.`,
		"mask-border-source": `The mask-border-source CSS property specifies the source image used to create an element's mask border.\n\nThe mask-border-slice property is used to divide the source image into regions, which are then dynamically applied to the final mask border.`,
		"mask-border-width": `The mask-border-width CSS property specifies the width of an element's mask border.`,
		"mask-clip": `The mask-clip CSS property determines the area, which is affected by a mask. The painted content of an element must be restricted to this area.`,
		"mask-composite": `The mask-composite CSS property represents a compositing operation used on the current mask layer with the mask layers below it.`,
		"max-lines": `The max-lines property forces a break after a set number of lines`,
		"offset": `The offset CSS property is a shorthand property for animating an element along a defined path.`,
		"offset-anchor": `Defines an anchor point of the box positioned along the path. The anchor point specifies the point of the box which is to be considered as the point that is moved along the path.`,
		"offset-distance": `The offset-distance CSS property specifies a position along an offset-path.`,
		"offset-path": `The offset-path CSS property specifies the offset path where the element gets positioned. The exact element’s position on the offset path is determined by the offset-distance property. An offset path is either a specified path with one or multiple sub-paths or the geometry of a not-styled basic shape. Each shape or path must define an initial position for the computed value of "0" for offset-distance and an initial direction which specifies the rotation of the object to the initial position.\n\nIn this specification, a direction (or rotation) of 0 degrees is equivalent to the direction of the positive x-axis in the object’s local coordinate system. In other words, a rotation of 0 degree points to the right side of the UA if the object and its ancestors have no transformation applied.`,
		"offset-position": `Specifies the initial position of the offset path. If position is specified with static, offset-position would be ignored.`,
		"offset-rotate": `The offset-rotate CSS property defines the direction of the element while positioning along the offset path.`,
		"overflow-anchor":
			"The overflow-anchor CSS property provides a way to opt out browser scroll anchoring behavior which adjusts scroll position to minimize content shifts.",
		"overflow-block":
			"The overflow-block CSS media feature can be used to test how the output device handles content that overflows the initial containing block along the block axis.",
		"overflow-inline":
			"The overflow-inline CSS media feature can be used to test how the output device handles content that overflows the initial containing block along the inline axis.",
		"overflow-clip-box": `The overflow-clip-box CSS property specifies relative to which box the clipping happens when there is an overflow. It is short hand for the overflow-clip-box-inline and overflow-clip-box-block properties.`,
		"overscroll-behavior": `The overscroll-behavior CSS property is shorthand for the overscroll-behavior-x and overscroll-behavior-y properties, which allow you to control the browser's scroll overflow behavior — what happens when the boundary of a scrolling area is reached.`,
		"overscroll-behavior-block":
			"The overscroll-behavior-block CSS property sets the browser's behavior when the block direction boundary of a scrolling area is reached.",
		"overscroll-behavior-inline":
			"The overscroll-behavior-inline CSS property sets the browser's behavior when the inline direction boundary of a scrolling area is reached.",
		"overscroll-behavior-x": `The overscroll-behavior-x CSS property is allows you to control the browser's scroll overflow behavior — what happens when the boundary of a scrolling area is reached — in the x axis direction.`,
		"overscroll-behavior-y": `The overscroll-behavior-y CSS property is allows you to control the browser's scroll overflow behavior — what happens when the boundary of a scrolling area is reached — in the y axis direction.`,
		"padding-block": `The padding-block CSS property defines the logical block start and end padding of an element, which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation.`,
		"padding-inline": `The padding-inline CSS property defines the logical inline start and end padding of an element, which maps to physical padding properties depending on the element's writing mode, directionality, and text orientation.`,
		"place-content": `The place-content CSS shorthand property sets both the align-content and justify-content properties.`,
		"place-items":
			"The CSS place-items shorthand property sets both the align-items and justify-items properties. The first value is the align-items property value, the second the justify-items one. If the second value is not present, the first value is also used for it.",
		"place-self": `The place-self CSS property is a shorthand property sets both the align-self and justify-self properties. The first value is the align-self property value, the second the justify-self one. If the second value is not present, the first value is also used for it.`,
		"position": `The position CSS property sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements.`,
		"rotate": `The rotate CSS property allows you to specify rotation transforms individually and independently of the transform property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the transform value.`,
		"ruby-merge": `This property controls how ruby annotation boxes should be rendered when there are more than one in a ruby container box: whether each pair should be kept separate, the annotations should be collapsed and rendered as a group, or the separation should be determined based on the space available.`,
		"scale": `The scale CSS property allows you to specify scale transforms individually and independently of the transform property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the transform value.`,
		"scrollbar-color": `The scrollbar-color CSS property sets the color of the scrollbar track and thumb.`,
		"scrollbar-width": `The scrollbar-width property allows the author to set the maximum thickness of an element’s scrollbars when they are shown. `,
		"scroll-margin": `The scroll-margin property is a shorthand property which sets all of the scroll-margin longhands, assigning values much like the margin property does for the margin-* longhands.`,
		"scroll-margin-block": `The scroll-margin-block property is a shorthand property which sets the scroll-margin longhands in the block dimension.`,
		"scroll-margin-block-start": `The scroll-margin-block-start property defines the margin of the scroll snap area at the start of the block dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.`,
		"scroll-margin-block-end": `The scroll-margin-block-end property defines the margin of the scroll snap area at the end of the block dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.`,
		"scroll-margin-bottom": `The scroll-margin-bottom property defines the bottom margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.`,
		"scroll-margin-inline": `The scroll-margin-inline property is a shorthand property which sets the scroll-margin longhands in the inline dimension.`,
		"scroll-margin-inline-start": `The scroll-margin-inline-start property defines the margin of the scroll snap area at the start of the inline dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.`,
		"scroll-margin-inline-end": `The scroll-margin-inline-end property defines the margin of the scroll snap area at the end of the inline dimension that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.`,
		"scroll-margin-left": `The scroll-margin-left property defines the left margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.`,
		"scroll-margin-right": `The scroll-margin-right property defines the right margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.`,
		"scroll-margin-top": `The scroll-margin-top property defines the top margin of the scroll snap area that is used for snapping this box to the snapport. The scroll snap area is determined by taking the transformed border box, finding its rectangular bounding box (axis-aligned in the scroll container’s coordinate space), then adding the specified outsets.`,
		"scroll-padding": `The scroll-padding property is a shorthand property which sets all of the scroll-padding longhands, assigning values much like the padding property does for the padding-* longhands.`,
		"scroll-padding-block": `The scroll-padding-block property is a shorthand property which sets the scroll-padding longhands for the block dimension.`,
		"scroll-padding-block-start": `The scroll-padding-block-start property defines offsets for the start edge in the block dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.`,
		"scroll-padding-block-end": `The scroll-padding-block-end property defines offsets for the end edge in the block dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.`,
		"scroll-padding-bottom": `The scroll-padding-bottom property defines offsets for the bottom of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.`,
		"scroll-padding-inline": `The scroll-padding-inline property is a shorthand property which sets the scroll-padding longhands for the inline dimension.`,
		"scroll-padding-inline-start": `The scroll-padding-inline-start property defines offsets for the start edge in the inline dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.`,
		"scroll-padding-inline-end": `The scroll-padding-inline-end property defines offsets for the end edge in the inline dimension of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.`,
		"scroll-padding-left": `The scroll-padding-left property defines offsets for the left of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.`,
		"scroll-padding-right": `The scroll-padding-right property defines offsets for the right of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.`,
		"scroll-padding-top": `The scroll-padding-top property defines offsets for the top of the optimal viewing region of the scrollport: the region used as the target region for placing things in view of the user. This allows the author to exclude regions of the scrollport that are obscured by other content (such as fixed-positioned toolbars or sidebars) or simply to put more breathing room between a targeted element and the edges of the scrollport.`,
		"scroll-snap-align": `The scroll-snap-align property specifies the box’s snap position as an alignment of its snap area (as the alignment subject) within its snap container’s snapport (as the alignment container). The two values specify the snapping alignment in the block axis and inline axis, respectively. If only one value is specified, the second value defaults to the same value.`,
		"scroll-snap-stop": `The scroll-snap-stop CSS property defines whether the scroll container is allowed to "pass over" possible snap positions.`,
		"scroll-snap-type-x": `The scroll-snap-type-x CSS property defines how strictly snap points are enforced on the horizontal axis of the scroll container in case there is one.\n\nSpecifying any precise animations or physics used to enforce those snap points is not covered by this property but instead left up to the user agent.`,
		"scroll-snap-type-y": `The scroll-snap-type-y CSS property defines how strictly snap points are enforced on the vertical axis of the scroll container in case there is one.\n\nSpecifying any precise animations or physics used to enforce those snap points is not covered by this property but instead left up to the user agent.`,
		"text-combine-upright": `The text-combine-upright CSS property specifies the combination of multiple characters into the space of a single character. If the combined text is wider than 1em, the user agent must fit the contents within 1em. The resulting composition is treated as a single upright glyph for layout and decoration. This property only has an effect in vertical writing modes.\n\nThis is used to produce an effect that is known as tate-chū-yoko (縦中横) in Japanese, or as 直書橫向 in Chinese.`,
		"text-decoration-skip": `The text-decoration-skip CSS property specifies what parts of the element’s content any text decoration affecting the element must skip over. It controls all text decoration lines drawn by the element and also any text decoration lines drawn by its ancestors.`,
		"text-decoration-skip-ink": `The text-decoration-skip-ink CSS property specifies how overlines and underlines are drawn when they pass over glyph ascenders and descenders.`,
		"text-decoration-thickness": `The text-decoration-thickness CSS property sets the thickness, or width, of the decoration line that is used on text in an element, such as a line-through, underline, or overline.`,
		"text-emphasis": `The text-emphasis CSS property is a shorthand property for setting text-emphasis-style and text-emphasis-color in one declaration. This property will apply the specified emphasis mark to each character of the element's text, except separator characters, like spaces,  and control characters.`,
		"text-emphasis-color": `The text-emphasis-color CSS property defines the color used to draw emphasis marks on text being rendered in the HTML document. This value can also be set and reset using the text-emphasis shorthand.`,
		"text-emphasis-position": `The text-emphasis-position CSS property describes where emphasis marks are drawn at. The effect of emphasis marks on the line height is the same as for ruby text: if there isn't enough place, the line height is increased.`,
		"text-emphasis-style": `The text-emphasis-style CSS property defines the type of emphasis used. It can also be set, and reset, using the text-emphasis shorthand.`,
		"text-underline-offset": `The text-underline-offset CSS property sets the offset distance of an underline text decoration line (applied using text-decoration) from its original position.`,
		"text-size-adjust": `The text-size-adjust CSS property controls the text inflation algorithm used on some smartphones and tablets. Other browsers will ignore this property.`,
		"transform-box": `The transform-box CSS property defines the layout box to which the transform and transform-origin properties relate.`,
		"translate": `The translate CSS property allows you to specify translation transforms individually and independently of the transform property. This maps better to typical user interface usage, and saves having to remember the exact order of transform functions to specify in the transform value.`,
		"speak-as": `The speak-as descriptor specifies how a counter symbol constructed with a given @counter-style will be represented in the spoken form. For example, an author can specify a counter symbol to be either spoken as its numerical value or just represented with an audio cue.`,
		"viewport-fit": `The border-block-style CSS property defines the style of the logical block borders of an element, which maps to a physical border style depending on the element's writing mode, directionality, and text orientation.`,
		"font-display": `The font-display descriptor determines how a font face is displayed based on whether and when it is downloaded and ready to use.`,
		"bleed": `The bleed CSS at-rule descriptor, used with the @page at-rule, specifies the extent of the page bleed area outside the page box. This property only has effect if crop marks are enabled using the marks property.`,
		"marks": `The marks CSS at-rule descriptor, used with the @page at-rule, adds crop and/or cross marks to the presentation of the document. Crop marks indicate where the page should be cut. Cross marks are used to align sheets.`,
		"max-zoom": `The max-zoom CSS descriptor sets the maximum zoom factor of a document defined by the @viewport at-rule. The browser will not zoom in any further than this, whether automatically or at the user's request.\n\nA zoom factor of 1.0 or 100% corresponds to no zooming. Larger values are zoomed in. Smaller values are zoomed out.`,
		"min-zoom": `The min-zoom CSS descriptor sets the minimum zoom factor of a document defined by the @viewport at-rule. The browser will not zoom out any further than this, whether automatically or at the user's request.\n\nA zoom factor of 1.0 or 100% corresponds to no zooming. Larger values are zoomed in. Smaller values are zoomed out.`,
		"orientation": `The orientation CSS @media media feature can be used to apply styles based on the orientation of the viewport (or the page box, for paged media).`,
		"user-zoom": `The user-zoom CSS descriptor controls whether or not the user can change the zoom factor of a document defined by @viewport.`,
		"size": "The size CSS at-rule descriptor, used with the @page at-rule, defines the size and orientation of the box which is used to represent a page. Most of the time, this size corresponds to the target size of the printed page if applicable.",
		"align-tracks":
			"The align-tracks CSS property sets the alignment in the masonry axis for grid containers that have masonry in their block axis.",
		"font-smooth":
			"The font-smooth CSS property controls the application of anti-aliasing when fonts are rendered.",
		"justify-tracks":
			"The justify-tracks CSS property sets the alignment in the masonry axis for grid containers that have masonry in their inline axis",
		"masonry-auto-flow":
			"The masonry-auto-flow CSS property modifies how items are placed when using masonry in CSS Grid Layout.",
		"math-style":
			"The math-style property indicates whether MathML equations should render with normal or compact height.",
		"scrollbar-gutter":
			"The scrollbar-gutter CSS property allows authors to reserve space for the scrollbar, preventing unwanted layout changes as the content grows while also avoiding unnecessary visuals when scrolling isn't needed.",
		"syntax":
			"Specifies the syntax of the custom property registration represented by the @property rule, controlling how the property’s value is parsed at computed value time.",
		"inherits":
			"Specifies the inherit flag of the custom property registration represented by the @property rule, controlling whether or not the property inherits by default.",
		"initial-value":
			"Specifies the initial value of the custom property registration represented by the @property rule, controlling the property’s initial value.",
		"content-visibility":
			"Controls whether or not an element renders its contents at all, along with forcing a strong set of containments, allowing user agents to potentially omit large swathes of layout and rendering work until it becomes needed.",
		"forced-color-adjust":
			"Allows authors to opt certain elements out of forced colors mode. This then restores the control of those values to CSS",
		"color-scheme":
			"The color-scheme CSS property allows an element to indicate which color schemes it can comfortably be rendered in.",
		"overflow-clip-margin":
			"The overflow-clip-margin CSS property determines how far outside its bounds an element with overflow: clip may be painted before being clipped.",
		"accent-color": "Sets the color of the elements accent",
		"ascent-override": "Describes the ascent metric of a font.",
		"descent-override": "Describes the descent metric of a font.",
		"line-gap-override": "Describes the line-gap metric of a font.",
		"size-adjust": "A multiplier for glyph outlines and metrics of a font.",
		"hyphenate-character":
			"A hyphenate character used at the end of a line.",
		"input-security":
			"Enables or disables the obscuring a sensitive test input.",
		"animation-timeline":
			"Specifies the names of one or more @scroll-timeline at-rules to describe the element's scroll animations.",
		"print-color-adjust":
			"Defines what optimization the user agent is allowed to do when adjusting the appearance for an output device.",
		"white-space": `Specifies how whitespace is handled in an element.`,
		"animation-composition":
			"The composite operation to use when multiple animations affect the same property.",
		"caret": "Shorthand for setting caret-color and caret-shape.",
		"caret-shape":
			"Specifies the desired shape of the text insertion caret.",
		"contain-intrinsic-size":
			"Size of an element when the element is subject to size containment.",
		"contain-intrinsic-block-size":
			"Block size of an element when the element is subject to size containment.",
		"contain-intrinsic-height":
			"Height of an element when the element is subject to size containment.",
		"contain-intrinsic-inline-size":
			"Inline size of an element when the element is subject to size containment.",
		"contain-intrinsic-width":
			"Width of an element when the element is subject to size containment.",
		"math-depth":
			'Describe a notion of "depth" for each element of a mathematical formula, with respect to the top-level container of that formula.',
		"math-shift":
			"Used for positioning superscript during the layout of MathML scripted elements.",
		"scroll-timeline":
			"Defines a name that can be used to identify the source element of a scroll timeline, along with the scrollbar axis that should provide the timeline.",
		"scroll-timeline-axis":
			"Specifies the scrollbar that will be used to provide the timeline for a scroll-timeline animation",
		"scroll-timeline-name":
			"Defines a name that can be used to identify an element as the source of a scroll-timeline.",
		"animation-range": `The animation-range CSS shorthand property is used to set the start and end of an animation's attachment range along its timeline, i.e. where along the timeline an animation will start and end.`,
		"animation-range-end": `The animation-range-end CSS property is used to set the end of an animation's attachment range along its timeline, i.e. where along the timeline an animation will end.`,
		"animation-range-start": `The animation-range-start CSS property is used to set the start of an animation's attachment range along its timeline, i.e. where along the timeline an animation will start.`,
		"container": `The container shorthand CSS property establishes the element as a query container and specifies the name or name for the containment context used in a container query.`,
		"container-name": `The container-name CSS property specifies a list of query container names used by the @container at-rule in a container query.`,
		"container-type": `The container-type CSS property is used to define the type of containment used in a container query.`,
		"font-palette": `The font-palette CSS property allows specifying one of the many palettes contained in a font that a user agent should use for the font. Users can also override the values in a palette or create a new palette by using the @font-palette-values at-rule.`,
		"font-synthesis-small-caps": `The font-synthesis-small-caps CSS property lets you specify whether or not the browser may synthesize small-caps typeface when it is missing in a font family. Small-caps glyphs typically use the form of uppercase letters but are reduced to the size of lowercase letters.`,
		"font-synthesis-style": `The font-synthesis-style CSS property lets you specify whether or not the browser may synthesize the oblique typeface when it is missing in a font family.`,
		"font-synthesis-weight": `The font-synthesis-weight CSS property lets you specify whether or not the browser may synthesize the bold typeface when it is missing in a font family.`,
		"font-variant-emoji": `The font-variant-emoji CSS property specifies the default presentation style for displaying emojis.`,
		"hyphenate-limit-chars": `The hyphenate-limit-chars CSS property specifies the minimum word length to allow hyphenation of words as well as the minimum number of characters before and after the hyphen.`,
		"page": `The page CSS property is used to specify the named page, a specific type of page defined by the @page at-rule.`,
		"text-wrap": `The text-wrap CSS property controls how text inside an element is wrapped.`,
		"timeline-scope": `The timeline-scope CSS property modifies the scope of a named animation timeline.`,
		"view-timeline": `The view-timeline CSS shorthand property is used to define a named view progress timeline, which is progressed through based on the change in visibility of an element (known as the subject) inside a scrollable element (scroller). view-timeline is set on the subject.`,
		"view-timeline-axis": `The view-timeline-axis CSS property is used to specify the scrollbar direction that will be used to provide the timeline for a named view progress timeline animation, which is progressed through based on the change in visibility of an element (known as the subject) inside a scrollable element (scroller). view-timeline-axis is set on the subject. See CSS scroll-driven animations for more details.`,
		"view-timeline-name": `The view-timeline-name CSS property is used to define the name of a named view progress timeline, which is progressed through based on the change in visibility of an element (known as the subject) inside a scrollable element (scroller). view-timeline is set on the subject.`,
		"view-transition-name": `The view-transition-name CSS property provides the selected element with a distinct identifying name (a custom-ident) and causes it to participate in a separate view transition from the root view transition — or no view transition if the none value is specified.`,
		"white-space-collapse": `The white-space-collapse CSS property controls how white space inside an element is collapsed.`,
		"view-timeline-inset": `The view-timeline-inset CSS property is used to specify one or two values representing an adjustment to the position of the scrollport (see Scroll container for more details) in which the subject element of a named view progress timeline animation is deemed to be visible. Put another way, this allows you to specify start and/or end inset (or outset) values that offset the position of the timeline.`,
		"base-palette": `The base-palette CSS descriptor is used to specify the name or index of a pre-defined palette to be used for creating a new palette. If the specified base-palette does not exist, then the palette defined at index 0 will be used.`,
		"override-colors": `The override-colors CSS descriptor is used to override colors in the chosen base-palette for a color font.`,
		"page-orientation": `The page-orientation CSS descriptor for the @page at-rule controls the rotation of a printed page. It handles the flow of content across pages when the orientation of a page is changed. This behavior differs from the size descriptor in that a user can define the direction in which to rotate the page.`,
		"font-synthesis-position": `The font-synthesis-position CSS property lets you specify whether or not a browser may synthesize the subscript and superscript "position" typefaces when they are missing in a font family, while using font-variant-position to set the positions.`,
		"overlay": `The overlay CSS property specifies whether an element appearing in the top layer (for example, a shown popover or modal {{htmlelement("dialog")}} element) is actually rendered in the top layer. This property is only relevant within a list of transition-property values, and only if allow-discrete is set as the transition-behavior.`,
		"transition-behavior": `The transition-behavior CSS property specifies whether transitions will be started for properties whose animation behavior is discrete.`,
		"anchor-name": `The anchor-name property declares that an element is an anchor element, and gives it a list of anchor names to be targeted by.`,
		"anchor-scope": `This property scopes the specified anchor names, and lookups for these anchor names, to this element’s subtree`,
		"field-sizing": `The field-sizing CSS property enables you to control the sizing behavior of elements that are given a default preferred size, such as form control elements. This property enables you to override the default sizing behavior, allowing form controls to adjust in size to fit their contents.`,
		"inset-area": `Most common use-cases of anchor positioning only need to worry about the edges of the positioned element’s containing block, and the edges of the default anchor element. These lines can be thought of as defining a 3x3 grid; inset-area lets you easily set up the positioned element’s inset properties by specifying what area of this inset-area grid you want the positioned element to be in`,
		"position-anchor": `The position-anchor property defines the default anchor specifier for all anchor functions on the element, allowing multiple elements to use the same set of anchor functions (and position options lists!) while changing which anchor element each is referring to.`,
		"position-try": `This shorthand sets both position-try-options and position-try-order. If <'position-try-order'> is omitted, it’s set to the property’s initial value.`,
		"position-try-options": `This property provides a list of alternate positioning styles to try when the absolutely positioned box overflows its inset-modified containing block. This position options list is initially empty.`,
		"position-try-order": `This property specifies the order in which the position options list will be tried.`,
		"position-visibility": `There are times when an element’s anchors are not appropriate for positioning the element with, and it would be better to simply not display the element at all. position-visibility provides several conditions where this could be the case.`,
		"text-wrap-mode": `The text-wrap-mode CSS property controls whether the text inside an element is wrapped. The different values provide alternate ways of wrapping the content of a block element. It can also be set, and reset, using the {{CSSXRef("text-wrap")}} shorthand.`,
		"text-wrap-style": `The text-wrap-style CSS property controls how text inside an element is wrapped. The different values provide alternate ways of wrapping the content of a block element. It can also be set, and reset, using the {{CSSXRef("text-wrap")}} shorthand.`,
		"text-spacing-trim": `The text-spacing-trim CSS property controls the internal spacing set on Chinese/Japanese/Korean (CJK) punctuation characters between adjacent characters (kerning) and at the start or end of text lines.`,
	},
	pseudoSelectorDescriptions: {
		":defined":
			"The :defined CSS pseudo-class represents any element that has been defined. This includes any standard element built in to the browser, and custom elements that have been successfully defined (i.e. with the CustomElementRegistry.define() method).",
		":dir": "The :dir() CSS pseudo-class matches elements based on the directionality of the text contained in them.",
		":focus-visible":
			"The :focus-visible pseudo-class applies while an element matches the :focus pseudo-class and the UA determines via heuristics that the focus should be made evident on the element.",
		":focus-within":
			"The :focus-within pseudo-class applies to any element for which the :focus pseudo class applies as well as to an element whose descendant in the flat tree (including non-element nodes, such as text nodes) matches the conditions for matching :focus.",
		":placeholder-shown":
			"The :placeholder-shown CSS pseudo-class represents any <input> or <textarea> element that is currently displaying placeholder text.",
		":has": ":The :has() CSS pseudo-class represents an element if any of the selectors passed as parameters (relative to the :scope of the given element), match at least one element.",
		":blank":
			"The :blank CSS pseudo-class selects empty user input elements (eg. <input> or <textarea>).",
		":is": "The :is() CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list. This is useful for writing large selectors in a more compact form.",
		":where":
			"The :where() CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list.",
		":current":
			"The :current CSS pseudo-class selector is a time-dimensional pseudo-class that represents the element, or an ancestor of the element, that is currently being displayed",
		":local-link":
			"The :local-link CSS pseudo-class represents an link to the same document",
		":nth-col":
			"The :nth-col() CSS pseudo-class is designed for tables and grids. It accepts the An+B notation such as used with the :nth-child selector, using this to target every nth column. ",
		":nth-last-col":
			"The :nth-last-col() CSS pseudo-class is designed for tables and grids. It accepts the An+B notation such as used with the :nth-child selector, using this to target every nth column before it, therefore counting back from the end of the set of columns.",
		":paused":
			"The :paused CSS pseudo-class selector is a resource state pseudo-class that will match an audio, video, or similar resource that is capable of being “played” or “paused”, when that element is “paused”.",
		":playing":
			"The :playing CSS pseudo-class selector is a resource state pseudo-class that will match an audio, video, or similar resource that is capable of being “played” or “paused”, when that element is “playing”. ",
		":target-within":
			"The :target-within CSS pseudo-class represents an element that is a target element or contains an element that is a target. A target element is a unique element with an id matching the URL's fragment.",
		":user-invalid":
			"The :user-invalid CSS pseudo-class represents any validated form element whose value isn't valid based on their validation constraints, after the user has interacted with it.",
		":picture-in-picture":
			"The :picture-in-picture CSS pseudo-class matches the element which is currently in picture-in-picture mode.",
		":user-valid":
			"The :user-valid CSS pseudo-class represents any validated form element whose value validates correctly based on its validation constraints. However, unlike :valid it only matches once the user has interacted with it.",
	},
	pseudoElementDescriptions: {
		"::-moz-range-progress":
			'The ::-moz-range-progress CSS pseudo-element is a Mozilla extension that represents the lower portion of the track (i.e., groove) in which the indicator slides in an <input> of type="range". This portion corresponds to values lower than the value currently selected by the thumb (i.e., virtual knob).',
		"::-moz-range-thumb": `The ::-moz-range-thumb CSS pseudo-element is a Mozilla extension that represents the thumb (i.e., virtual knob) of an <input> of type="range". The user can move the thumb along the input's track to alter its numerical value.`,
		"::-moz-range-track":
			'The ::-moz-range-track CSS pseudo-element is a Mozilla extension that represents the track (i.e., groove) in which the indicator slides in an <input> of type="range".',
		"::-webkit-progress-inner-value":
			"The ::-webkit-progress-value CSS pseudo-element represents the filled-in portion of the bar of a <progress> element. It is a child of the ::-webkit-progress-bar pseudo-element.\n\nIn order to let ::-webkit-progress-value take effect, -webkit-appearance needs to be set to none on the <progress> element.",
		"::grammar-error":
			"The ::grammar-error CSS pseudo-element represents a text segment which the user agent has flagged as grammatically incorrect.",
		"::placeholder":
			"The ::placeholder CSS pseudo-element represents the placeholder text of a form element.",
		"::spelling-error":
			"The ::spelling-error CSS pseudo-element represents a text segment which the user agent has flagged as incorrectly spelled.",
		"::slotted":
			"The :slotted() CSS pseudo-element represents any element that has been placed into a slot inside an HTML template.",
		"::part":
			"The ::part CSS pseudo-element represents any element within a shadow tree that has a matching part attribute.",
		"::marker":
			"The ::marker CSS pseudo-element selects the marker box of a list item, which typically contains a bullet or number. It works on any element or pseudo-element set to display: list-item, such as the <li> and <summary> elements.",
		"::target-text":
			"The ::target-text CSS pseudo-element represents the text that has been scrolled to if the browser supports scroll-to-text fragments. It allows authors to choose how to highlight that section of text.",
		"::view-transition": `The ::view-transition CSS pseudo-element represents the root of the view transitions overlay, which contains all view transitions and sits over the top of all other page content.`,
		"::view-transition-group": `The ::view-transition-group CSS pseudo-element represents a single view transition group.`,
		"::view-transition-image-pair": `The ::view-transition-image-pair CSS pseudo-element represents a container for a view transition's "old" and "new" view states — before and after the transition.`,
		"::view-transition-new": `The ::view-transition-new CSS pseudo-element represents the "new" view state of a view transition — a live representation of the new view, after the transition.`,
		"::view-transition-old": `The ::view-transition-old CSS pseudo-element represents the "old" view state of a view transition — a static screenshot of the old view, before the transition.`,
	},
};
