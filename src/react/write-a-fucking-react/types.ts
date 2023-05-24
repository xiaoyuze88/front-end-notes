export type ReactElementChild = ReactElement | string | (ReactElement | string)[];

export interface ReactElement {
  $$typeOf: string;

  type: string;
  props?: {
    children: ReactElementChild | ReactElementChild[];
    [key: string]: any;
  };
}

export interface Fiber {
  
}