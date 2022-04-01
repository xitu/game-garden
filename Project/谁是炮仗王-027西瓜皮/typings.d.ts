declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '@mojs/core';
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
