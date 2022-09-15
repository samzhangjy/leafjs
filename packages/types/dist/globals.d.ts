import type * as CSS from 'csstype';
import type { GlobalAttributes } from './globalAttributes';

type EventHandler<T extends Event> = (e: T) => void;

type EventListeners = {
  // Animation events
  animationEnd: EventHandler<AnimationEvent>;
  animationIteration: EventHandler<AnimationEvent>;
  animationStart: EventHandler<AnimationEvent>;
  // Clipboard events
  onCopy: EventHandler<ClipboardEvent>;
  onCut: EventHandler<ClipboardEvent>;
  onPaste: EventHandler<ClipboardEvent>;
  // Drag events
  onDrag: EventHandler<DragEvent>;
  onDragEnd: EventHandler<DragEvent>;
  onDragEnter: EventHandler<DragEvent>;
  onDragLeave: EventHandler<DragEvent>;
  onDragOver: EventHandler<DragEvent>;
  onDragStart: EventHandler<DragEvent>;
  onDrop: EventHandler<DragEvent>;
  // Mouse events
  onClick: EventHandler<MouseEvent>;
  onContextMenu: EventHandler<MouseEvent>;
  onDBClick: EventHandler<MouseEvent>;
  onMouseDown: EventHandler<MouseEvent>;
  onMouseEnter: EventHandler<MouseEvent>;
  onMouseLeave: EventHandler<MouseEvent>;
  onMouseMove: EventHandler<MouseEvent>;
  onMouseOut: EventHandler<MouseEvent>;
  onMouseOver: EventHandler<MouseEvent>;
  onMouseUp: EventHandler<MouseEvent>;
  // Keyboard events
  onKeyDown: EventHandler<KeyboardEvent>;
  onKeyPreess: EventHandler<KeyboardEvent>;
  onKeyUp: EventHandler<KeyboardEvent>;
  // Focus events
  onBlur: EventHandler<FocusEvent>;
  onFocus: EventHandler<FocusEvent>;
  onFocusIn: EventHandler<FocusEvent>;
  onFocusOut: EventHandler<FocusEvent>;
  // Hash change events
  onHashChange: EventHandler<HashChangeEvent>;
  // Input events
  onInput: EventHandler<InputEvent>;
  onChange: EventHandler<InputEvent>;
  // Page transition events
  pageHide: EventHandler<PageTransitionEvent>;
  pageShow: EventHandler<PageTransitionEvent>;
  // Pop state events
  popState: EventHandler<PopStateEvent>;
  // Progress events
  onError: EventHandler<ProgressEvent>;
  onLoadStart: EventHandler<ProgressEvent>;
  // Storage events
  storage: EventHandler<StorageEvent>;
  // Touch events
  onTouchCancel: EventHandler<TouchEvent>;
  onTouchEnd: EventHandler<TouchEvent>;
  onTouchMove: EventHandler<TouchEvent>;
  onTouchStart: EventHandler<TouchEvent>;
  // Transition events
  transitionEnd: EventHandler<TransitionEvent>;
  // UI events
  abort: EventHandler<UIEvent>;
  beforeUnload: EventHandler<UIEvent>;
  error: EventHandler<UIEvent>;
  load: EventHandler<UIEvent>;
  resize: EventHandler<UIEvent>;
  scroll: EventHandler<UIEvent>;
  select: EventHandler<UIEvent>;
  unload: EventHandler<UIEvent>;
  // Wheel events
  onWheel: EventHandler<WheelEvent>;
};

type CSSAttributes = {
  style: CSS.Properties;
};

type IntrinsicElement = Partial<GlobalAttributes> &
  Partial<EventListeners> &
  Partial<CSSAttributes> & { [key: string]: any };

export type Element<T extends string[]> = Partial<{ [key in T[number]]: string }> & IntrinsicElement;
