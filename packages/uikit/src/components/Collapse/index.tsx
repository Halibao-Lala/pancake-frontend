import { useLayoutEffect, useRef } from "react";
import { styled } from "styled-components";
import { Box, BoxProps } from "../Box";
import { ChevronDownIcon } from "../Svg";

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(0deg);
  transition: transform 0.25s ease;
  cursor: pointer;
  &.open {
    transform: rotate(180deg);
  }
`;

const Container = styled(Box)<BoxProps>`
  overflow: hidden;
  display: flex;
  width: 100%;
  flex-direction: column;
  will-change: height;
  transition: height 0.25s ease-in-out;
`;

interface CollapseProps extends Omit<BoxProps, "title" | "content"> {
  title?: React.ReactNode;
  content?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  recalculateDep?: boolean;
}

export const Collapse: React.FC<CollapseProps> = ({
  title,
  content,
  isOpen,
  onToggle,
  recalculateDep = false,
  ...props
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    onToggle?.();
  };

  useLayoutEffect(() => {
    if (!contentRef.current || !titleRef.current || !wrapperRef.current) return;
    const contentHeight = contentRef.current.scrollHeight;
    const titleHeight = titleRef.current.scrollHeight;

    wrapperRef.current.style.height = `${isOpen ? titleHeight + contentHeight : titleHeight}px`;
  }, [isOpen, recalculateDep]);

  return (
    <Container ref={wrapperRef} {...props}>
      <TitleWrapper ref={titleRef} onClick={handleToggle}>
        {title}
        <IconWrapper className={isOpen ? "open" : undefined}>
          <ChevronDownIcon color="textSubtle" width="24px" />
        </IconWrapper>
      </TitleWrapper>
      <div ref={contentRef}>{content}</div>
    </Container>
  );
};
