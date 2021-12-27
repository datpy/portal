import React from "react";

import classes from "./ResizablePanel.module.css";

const MIN_WIDTH = 50;

interface ResizeablePanelProps {
  left: React.ReactElement;
  right: React.ReactElement;
  className?: string;
};

interface LeftPaneProps {
  leftWidth: number | undefined;
  setLeftWidth: (value: number) => void;
  className?: string;
};

const LeftPane: React.FunctionComponent<LeftPaneProps> =
  ({setLeftWidth, leftWidth, className, children}) => {

  const leftRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    if (leftRef.current) {
      // If width is not yet define, set it to current width.
      if (!leftWidth) {
        setLeftWidth(leftRef.current?.clientWidth);
        return;
      }

      leftRef.current.style.width = `${leftWidth}px`;
    }
  }, [leftRef, leftWidth, setLeftWidth]);

  return <div className={className} ref={leftRef}>{children}</div>;
};

const ResizablePanel : React.FunctionComponent<ResizeablePanelProps> = (props) => {
  const [leftWidth, setLeftWidth] =
    React.useState<number | undefined>(undefined);
  const [separatorXPosition, setSeparatorXPosition] =
    React.useState<number | undefined>(undefined);
  const [dragging, setDragging] = React.useState(false);
  const resizablePaneRef = React.createRef<HTMLDivElement>();

  const onMouseDown = (e: React.MouseEvent) => {
    setSeparatorXPosition(e.clientX);
    setDragging(true);
  };

  // Touch screen.
  const onTouchStart = (e: React.TouchEvent) => {
    setSeparatorXPosition(e.touches[0].clientX);
    setDragging(true);
  };

  const onMove = (clientX: number) => {
    if (dragging && leftWidth && separatorXPosition) {
      const newLeftWidth = leftWidth + clientX - separatorXPosition;
      setSeparatorXPosition(clientX);
      // Avoid left pane to be taken off the screen.
      if (newLeftWidth < MIN_WIDTH) {
        setLeftWidth(MIN_WIDTH);
        return;
      }
      // Avoid right pane to be taken off the screen.
      if (resizablePaneRef.current) {
        const splitPaneWidth = resizablePaneRef.current.clientWidth;

        if (newLeftWidth > splitPaneWidth - MIN_WIDTH) {
          setLeftWidth(splitPaneWidth - MIN_WIDTH);
          return;
        }
      }
      setLeftWidth(newLeftWidth);
    }
  };
  const onMouseMove = (e: MouseEvent) => {
    e.preventDefault();
    onMove(e.clientX);
  };
  const onTouchMove = (e: TouchEvent) => {
    onMove(e.touches[0].clientX);
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  React.useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
     document.removeEventListener('mousemove', onMouseMove);
     document.removeEventListener('touchmove', onTouchMove);
     document.removeEventListener("mouseup", onMouseUp);
    };
  });

  return (
    <div ref={resizablePaneRef} className={`${props.className} flex flex-row`}>
      <LeftPane
        leftWidth={leftWidth}
        setLeftWidth={setLeftWidth}
        className="min-h-full w-1/2"
      >
        {props.left}
      </LeftPane>
      <div
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        onTouchEnd={onMouseUp}
        className="divider-hitbox self-stretch cursor-col-resize flex
                   items-center py-0 px-2"
      >
        <div className={classes.divider}>
          <div className={classes["divider-indicator"]}>
          </div>
        </div>
      </div>
      <div className="min-h-full flex-grow">
        {props.right}
      </div>
    </div>
  );
};

export default ResizablePanel;
