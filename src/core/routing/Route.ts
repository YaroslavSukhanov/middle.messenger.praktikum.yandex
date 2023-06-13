// import * as isEqual from '../../utils/isEqual.ts';
// import { renderDom } from '../../utils/renderDom.ts';
//
// export default class Route {
//   private pathname: string;
//
//   private blockClass: Record<string, any> | null;
//
//   private block: Record<string, any> | null;
//
//   private props: Record<string, unknown>;
//
//   constructor(pathname, view, props) {
//     this.pathname = pathname;
//     this.blockClass = view;
//     this.block = null;
//     this.props = props;
//   }
//
//   navigate(pathname) {
//     if (this.match(pathname)) {
//       this._pathname = pathname;
//       this.render();
//     }
//   }
//
//   leave() {
//     if (this._block) {
//       this._block.hide();
//     }
//   }
//
//   match(pathname) {
//     return isEqual(pathname, this._pathname);
//   }
//
//   render() {
//     if (!this._block) {
//       this._block = new this._blockClass();
//       renderDom(this._props.rootQuery, this._block);
//       return;
//     }
//
//     this._block.show();
//   }
// }
