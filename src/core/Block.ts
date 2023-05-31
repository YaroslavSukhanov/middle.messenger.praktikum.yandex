import { nanoid } from 'nanoid';
import { EventBus } from './EventBus.ts';

// Нельзя создавать экземпляр данного класса
class Block<P extends Record<string, any> = any> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  public id = nanoid(6);

  protected props: P;

  // eslint-disable-next-line no-use-before-define
  public children: Record<string, Block | Block[]>;

  private eventBus: () => EventBus;

  private element: HTMLElement | null = null;

  constructor(propsWithChildren: P) {
    const eventBus = new EventBus();

    const { props, children } = this.getChildrenAndProps(propsWithChildren);

    this.children = children;
    this.props = this.makePropsProxy(props);

    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  // eslint-disable-next-line class-methods-use-this
  private getChildrenAndProps(childrenAndProps: P):
    { props: P, children: Record<string, Block | Block[]> } {
    const props: Record<string, unknown> = {};
    const children: Record<string, Block | Block[]> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0 && value.every((v) => v instanceof Block)) {
        children[key as string] = value;
      } else if (value instanceof Block) {
        children[key as string] = value;
      } else {
        props[key] = value;
      }
    });

    return { props: props as P, children };
  }

  private addEvents() {
    const { events = {} } = this.props as P & { events: Record<string, () => void> };

    Object.keys(events).forEach((eventName) => {
      this.element?.addEventListener(eventName, events[eventName]);
    });
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.innerInit.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this.innerComponentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this.innerComponentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.innerRender.bind(this));
  }

  private innerInit() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  // eslint-disable-next-line class-methods-use-this
  protected init() {
  }

  private innerComponentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {
  }

  public dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => ch.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private innerComponentDidUpdate(oldProps: P, newProps: P) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  // eslint-disable-next-line no-unused-vars
  protected componentDidUpdate(oldProps: P, newProps: P) {
    return true;
  }

  public setProps = (nextProps: Partial<P>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  public getElement() {
    return this.element;
  }

  private innerRender() {
    const fragment = this.render();

    const newElement = fragment.firstElementChild as HTMLElement;

    if (this.element && newElement) {
      this.element.replaceWith(newElement);
    }

    this.element = newElement;

    this.addEvents();
  }

  // eslint-disable-next-line no-unused-vars
  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`);
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    };

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return temp.content;
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  getContent() {
    return this.element;
  }

  private makePropsProxy(props: P) {
    // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
    const self = this;

    return new Proxy(props, {

      get(target: P, prop: string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target: P, prop: string, value) {
        const oldTarget = { ...target };

        target[prop as keyof P] = value;

        // Запускаем обновление компоненты
        // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },

      deleteProperty() {
        return false;
      },

    });
  }
}

export default Block;
