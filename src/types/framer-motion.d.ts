// Temporary type shim — run `npm install` to get full framer-motion types.
// This allows TypeScript to compile until the package is properly installed.
declare module 'framer-motion' {
  import type { ComponentPropsWithoutRef, ElementType, ReactNode, Ref, CSSProperties } from 'react'

  type MotionValue<T = number> = {
    get: () => T
    set: (v: T) => void
    onChange: (cb: (v: T) => void) => () => void
  }

  type VariantLabels = string | string[]
  type TargetAndTransition = Record<string, unknown> & { transition?: Transition }
  type Transition = {
    type?: string
    duration?: number
    delay?: number
    ease?: string | number[] | readonly number[]
    stiffness?: number
    damping?: number
    staggerChildren?: number
    delayChildren?: number
    [key: string]: unknown
  }
  type Variants = Record<string, unknown>

  type MotionProps = {
    initial?: boolean | TargetAndTransition | VariantLabels
    animate?: boolean | TargetAndTransition | VariantLabels
    exit?: TargetAndTransition | VariantLabels
    variants?: Variants
    transition?: Transition
    whileHover?: TargetAndTransition | VariantLabels
    whileTap?: TargetAndTransition | VariantLabels
    whileFocus?: TargetAndTransition | VariantLabels
    whileInView?: TargetAndTransition | VariantLabels
    style?: CSSProperties & {
      x?: MotionValue<number> | string | number
      y?: MotionValue<number> | string | number
      rotateX?: MotionValue<number> | string | number
      rotateY?: MotionValue<number> | string | number
      transformStyle?: string
    } & Record<string, unknown>
    layoutId?: string
    layout?: boolean | string
    ref?: Ref<unknown>
    onMouseMove?: (e: React.MouseEvent<HTMLElement>) => void
    onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void
    className?: string
    children?: ReactNode
    [key: string]: unknown
  }

  type MotionComponent<T extends ElementType> = React.ForwardRefExoticComponent<
    ComponentPropsWithoutRef<T> & MotionProps
  >

  type Motion = {
    [K in keyof JSX.IntrinsicElements]: MotionComponent<K>
  }

  export const motion: Motion

  export function useInView(
    ref: React.RefObject<Element | null>,
    options?: { once?: boolean; margin?: string; amount?: number | 'some' | 'all' },
  ): boolean

  export function useMotionValue<T>(initial: T): MotionValue<T>
  export function useSpring(value: MotionValue<number>, config?: Transition): MotionValue<number>
  export function useTransform<I, O>(
    value: MotionValue<I>,
    inputRange: I[],
    outputRange: O[],
  ): MotionValue<O>
  export function useScroll(options?: {
    target?: React.RefObject<Element | null>
    offset?: string[]
  }): {
    scrollY: MotionValue<number>
    scrollYProgress: MotionValue<number>
    scrollX: MotionValue<number>
    scrollXProgress: MotionValue<number>
  }

  export const AnimatePresence: React.FC<{
    children?: ReactNode
    mode?: 'wait' | 'sync' | 'popLayout'
    initial?: boolean
    onExitComplete?: () => void
  }>
}
