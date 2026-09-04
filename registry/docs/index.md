# Raster components

74 components in 9 categories. Each page lists install paths, a React example, props, keyboard, and accessibility notes. Version 0.3.0.

## Actions

- [Button](button.md): Solid ink primary and 1px ghost. 40px tall; 36px small.
- [Button group](button-group.md): Joined ghost buttons with a 1px rule between.
- [Text link](link.md): Text link with a hairline underline. In-copy variant is inset 1px.
- [Dropdown menu](dropdown-menu.md): Action menu with menuitem roles and arrow-key movement.
- [Toggle](toggle.md): Pressable control. Pressed fills ink. State is aria-pressed.
- [Toggle group](toggle-group.md): Joined toggles, one pressed, 1px between.
- [Context menu](context-menu.md): Menu at the pointer on right-click, or on Shift+F10 from the keyboard. Escape and outside click close it.
- [Menubar](menubar.md): Row of dropdowns in a 1px strip.
- [Command](command.md): Command palette in a native dialog. Filter, arrows, enter.
- [Theme toggle](theme-toggle.md): Icon that swaps moon and sun with the color scheme. Saved in localStorage.

## Forms

- [Input](input.md): Text field. 1px control border, 2px focus ring, 12px label above.
- [Label](label.md): 12px secondary label, set above the control.
- [Field](field.md): Label, control, and a hint or error stacked in one cell.
- [Input group](input-group.md): Addon and field share a 1px border.
- [Native select](native-select.md): Native select with Raster 1px chrome.
- [Radio](radio.md): Single-choice control. Selected dot is ink.
- [Checkbox](checkbox.md): Multi-choice. 16px box, 3px radius, ink fill when checked.
- [Switch](switch.md): 32×18 control. On fills ink; off is a 1px track. The thumb moves; the box stays 32px.
- [Slider](slider.md): 2px track, ink fill, 14px thumb on a 24px hit area.
- [Select](select.md): Closed trigger with a chevron. The menu overlays the page.
- [Textarea](textarea.md): Multiline field, vertical resize only.
- [One-time code](input-otp.md): One cell per character. Auto-advance, backspace, and paste.
- [Combobox](combobox.md): Text field with a filtered listbox.
- [Calendar](calendar.md): Month grid. Selected day is ink; today is a 1px outline. Weeks start Monday.
- [Date picker](date-picker.md): 1px trigger that opens a calendar overlay.
- [Form](form.md): Stacked fields with one primary action at the end.

## Navigation

- [Tabs](tabs.md): Text tabs in one row. Active tab has a 1px underline.
- [Breadcrumbs](breadcrumbs.md): Ancestor links, 40% slashes, current page at full ink.
- [Crumb bar](crumb-bar.md): Fixed 72px bar. Transparent at rest; scrolled state adds paper, a bottom 1px, and the trail.
- [Pagination](pagination.md): Square page controls. Current page is solid ink.
- [Stepper](stepper.md): Numbered dots joined by 1px lines. Done fills ink; active is outlined.
- [Navigation menu](navigation-menu.md): Horizontal links. The current page is full ink.
- [Sidebar](sidebar.md): 204-wide rail with a head, nav, and foot. 1px on all four sides.

## Feedback

- [Progress](progress.md): 4px bar. Percentage is set in the label.
- [Badge](badge.md): 11px badge. Outline, solid, and muted fills.
- [Alert](alert.md): 1px frame with an icon. Solid ink variant for critical.
- [Skeleton](skeleton.md): Divider-tone pulse. Animation stops when prefers-reduced-motion is on.
- [Empty](empty.md): Placeholder cell with a title, a sentence, and an optional action.
- [Spinner](spinner.md): 16px 1px ring. Animation stops when prefers-reduced-motion is on.
- [Tooltip](tooltip.md): Label on hover and keyboard focus; a real element that describes its trigger.
- [Toast](toast.md): Bottom-right status, aria-live polite. Stays four seconds or longer for longer text; pauses on hover; closes on demand.
- [Callout](callout.md): Note in running copy. 1px hairline, radius 0. No left bar.

## Surfaces

- [Dialog](dialog.md): Modal with a title, body, and two equal actions.
- [Card](card.md): Typography stack: label, title, and body. No outline.
- [Alert dialog](alert-dialog.md): Native dialog that must be answered. Escape and light dismiss are off.
- [Popover](popover.md): Native Popover API. Top layer, light dismiss.
- [Sheet](sheet.md): Native dialog docked to a screen edge, with the platform focus trap and backdrop.
- [Drawer](drawer.md): Native dialog from the bottom edge, with the platform focus trap and backdrop.
- [Hover card](hover-card.md): Preview panel on hover and keyboard focus.
- [Resizable](resizable.md): Two panes split by a draggable 1px handle. Arrows move it; value is in ARIA.

## Content

- [Mono chip](chip.md): Mono identifier with a 1px mixed border.
- [Table](table.md): Open grid, 1px row rules, last column right-aligned. Total rows use 2px rules.
- [Accordion](accordion.md): Native details rows on 1px rules. Shared name keeps one item open.
- [Avatar](avatar.md): 32px circle of initials, or a covering image. Broken images fall back. Rows overlap 8px.
- [Item](item.md): Flush row: title and description on the left, meta on the right.
- [Separator](separator.md): 1px rule, horizontal or vertical.
- [Scroll area](scroll-area.md): Overflow box with the scrollbar hidden and 20px feathers at the ends.
- [Collapsible](collapsible.md): Native details disclosure.
- [Kbd](kbd.md): Mono key cap with a 1px frame and a heavier bottom edge.
- [Carousel](carousel.md): Scroll-snap track. Buttons nudge one slide; ends feather.
- [Data table](data-table.md): Sortable table. Headers expose aria-sort.
- [Aspect ratio](aspect-ratio.md): Box that holds a ratio. Media fills it.
- [References](references.md): Inline citations, a numbered 1px list, and a cite box. Numerals hang in the gutter.

## Icons

- [Icons](icons.md): 16 viewBox marks, 1px currentColor, butt/miter. Shipped in the React package.

## Charts

- [Charts](chart.md): Line on a 204 field. 1px grid, ink marks. Series use solid, dashed, gray, or dotted. One optional spot color.
- [Bar chart](bar-chart.md): Vertical or horizontal. Thin ink bars, square ends. Stacks when series share a field.
- [Area chart](area-chart.md): Filled field under the first series. 1px grid, textured series, one optional spot color.
- [Scatter chart](scatter-chart.md): Marks on a 1px grid. Ink, or one optional spot color.
- [Donut or share](donut.md): Ring against its total, or a flush share strip. 1px stroke.
- [Histogram](histogram.md): Histogram. Adjacent bins, 1px between.
- [Small multiples](small-multiples.md): Repeated charts on the same axes. One 184 column per panel.

## Patterns

- [Inline form](inline-form.md): One field with the submit action inside. The button appears after the input validates.
- [Workflow card](workflow.md): Dashed 1px pipeline step. Drag handle, dashed chips, ghost add-step.
- [Assistant panel](assistant.md): Chat panel: user block, reply, suggestion card, input row.

## Also

- [Guide](guide.md): install, theming, layers, StyleX, CSS, CLI, registry, conventions
- [Tokens](tokens.md): every custom property, light and dark
- [Registry index](https://getraster.com/r/index.json): the shadcn-compatible registry
- [Props JSON](https://getraster.com/docs/props.json): every export and its props as data
