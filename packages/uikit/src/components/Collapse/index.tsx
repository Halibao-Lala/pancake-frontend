import { useLayoutEffect, useRef } from "react";
import { styled } from "styled-components";
import { ChevronDownIcon } from "../Svg";

const PADDING = 0;

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

const Container = styled.div`
  overflow: hidden;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: ${PADDING}px;
  will-change: height;
  transition: height 0.25s ease-in-out;
`;

interface CollapseProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
  recalculateDep?: boolean;
}

export const Collapse: React.FC<CollapseProps> = ({ title, content, isOpen, onToggle, recalculateDep = false }) => {
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

    wrapperRef.current.style.height = `${
      isOpen ? titleHeight + contentHeight + PADDING * 2 : titleHeight + PADDING * 2
    }px`;
  }, [isOpen, recalculateDep]);

  return (
    <Container ref={wrapperRef}>
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
