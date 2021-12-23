declare module "*.less" {
  const content: any;
  export default content;
}
declare module 'path-browserify'
declare module "*.css" {
  const content: any;
  export default content;
}
declare module 'less'
declare module 'monent'
declare module 'rxjs'

declare interface Window {
  axiosRequest: any;
  previewWindow: any;
  CanvasZoom: any;
}

// declare module 'react-color';
declare const BASE_URL: string;

declare const ENV_VAR: string;

declare interface WebpackServerExtendModule extends NodeModule {
  hot?: any;
}

declare interface NodeRequire extends NodeJS.Require {
  context: any;
}

declare interface ResponseData {
  code: number;
  data?: any;
  message: string;
}

declare interface Action {
  type: string | Symbol;
  data?: any;
  payload?: any
}

declare interface SideMenuItem {
  title: string;
  icon?: React.ReactElement;
  children?: SideMenuItem[];
  path?: string;
  selected: string;
  permission?: string
  target?: string
}

declare interface SideMenuItemList extends Array<SideMenuItem> { }
declare interface GobalsResponse extends Response {
  data?: any
}