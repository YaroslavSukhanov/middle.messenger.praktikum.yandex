import { BlockClass } from '../core/Block.ts';
import { PathRouter } from '../core/routing/PathRouter.ts';
import { router } from '../router.ts';

type WithRouterProps = { router: PathRouter }

export function withRouter<P extends WithRouterProps>(WrappedBlock: BlockClass<P>) {
  // @ts-expect-error No base constructor has the specified number of type arguments
  return class extends WrappedBlock<P> {
    public static componentName = WrappedBlock.componentName || WrappedBlock.name;

    constructor(props: P) {
      super({ ...props, router });
    }
  } as BlockClass<Omit<P, 'router'>>;
}
