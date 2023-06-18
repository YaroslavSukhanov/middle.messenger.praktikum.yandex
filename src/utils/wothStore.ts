import { Block } from '../core/Block.ts';
import { Store } from '../core/Store.ts';
import { AppState } from '../types/appTypes.ts';

type WithStateProps = { store: Store<AppState> };

export function withStore<P extends WithStateProps>(WrappedBlock: Block<P>) {
  // @ts-expect-error No base constructor has the specified
  return class extends WrappedBlock<P> {
    constructor(props: P) {
      super({ ...props, store: window.store });
    }

    __onChangeStoreCallback = () => {
      // @ts-expect-error this is not typed
      this.setProps({ ...this.props, store: window.store });
    };

    componentDidMount(props: P) {
      super.componentDidMount(props);
      window.store.on('changed', this.__onChangeStoreCallback);
    }

    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off('changed', this.__onChangeStoreCallback);
    }
  } as Block<Omit<P, 'store'>>;
}
