import { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import { AnimatePresence, LazyMotion } from "framer-motion";
import React, { createContext, useCallback, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { createPortal } from "react-dom";
import { BoxProps } from "../../components/Box";
import { Overlay } from "../../components/Overlay";
import { animationHandler, animationMap, animationVariants } from "../../util/animationToolkit";
import getPortalRoot from "../../util/getPortalRoot";
import { StyledModalWrapper } from "./ModalContext";

const DomMax = () => import("./motionDomMax").then((mod) => mod.default);
const DomAnimation = () => import("./motionDomAnimation").then((mod) => mod.default);

export interface ModalV2Props {
  isOpen?: boolean;
  onDismiss?: () => void;
  closeOnOverlayClick?: boolean;
  children?: React.ReactNode;
}

export const ModalV2Context = createContext<{
  onDismiss?: () => void;
}>({});

export type UseModalV2Props = ReturnType<typeof useModalV2>;
export function useModalV2() {
  const [isOpen, setIsOpen] = useState(false);

  const onDismiss = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback(() => setIsOpen(true), []);

  return useMemo(
    () => ({
      onDismiss,
      onOpen,
      isOpen,
      setIsOpen,
    }),
    [onDismiss, onOpen, isOpen]
  );
}

export function ModalV2({
  isOpen,
  onDismiss,
  closeOnOverlayClick,
  children,
  disableOutsidePointerEvents = false,
  ...props
}: ModalV2Props & BoxProps & { disableOutsidePointerEvents?: boolean }) {
  const animationRef = useRef<HTMLDivElement>(null);

  const handleOverlayDismiss = useCallback(
    (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      if (closeOnOverlayClick) {
        onDismiss?.();
      }
    },
    [closeOnOverlayClick, onDismiss]
  );

  const handleAnimationStart = useCallback(() => {
    animationHandler(animationRef.current);
  }, [animationRef]);

  const portal = getPortalRoot();

  const providerValue = useMemo(() => ({ onDismiss }), [onDismiss]);

  if (portal) {
    return createPortal(
      <ModalV2Context.Provider value={providerValue}>
        <LazyMotion features={isMobile ? DomMax : DomAnimation}>
          <AnimatePresence>
            {isOpen && (
              <DismissableLayer
                role="dialog"
                disableOutsidePointerEvents={disableOutsidePointerEvents}
                onEscapeKeyDown={handleOverlayDismiss}
              >
                <StyledModalWrapper
                  ref={animationRef}
                  // @ts-ignore
                  onAnimationStart={handleAnimationStart}
                  {...animationMap}
                  variants={animationVariants}
                  transition={{ duration: 0.3 }}
                  {...props}
                >
                  <Overlay onClick={handleOverlayDismiss} />
                  {children}
                </StyledModalWrapper>
              </DismissableLayer>
            )}
          </AnimatePresence>
        </LazyMotion>
      </ModalV2Context.Provider>,
      portal
    );
  }

  return null;
}
