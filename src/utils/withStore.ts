import { BlockClass } from '../core/Block.ts';
import { Store } from '../core/Store.ts';
import { AppState } from '../types/appTypes.ts';

type WithStateProps = { store: Store<AppState> };

export function withStore<P extends WithStateProps>(WrappedBlock: BlockClass<P>) {
  return class extends WrappedBlock<P> {
    constructor(props: P) {
      super({ ...props, store: window.store });
    }

    private onChangeStoreCallback = () => {
      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, store: window.store });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.onChangeStoreCallback);
    }
  } as BlockClass<Omit<P, 'store'>>;
}
