export const createComponentReducer = <TState>(
  componentName: string,
  initialState: TState,
  actionHandlers: Record<string, (state: TState, action: any) => TState>,
) => {
  actionHandlers[`LOAD_${componentName}`] = (state, action) => ({
    ...state,
    loading: true,
  });

  actionHandlers[`LOAD_${componentName}_SUCCESS`] = (state, action) => ({
    ...state,
    loading: false,
  });

  actionHandlers[`UNLOAD_${componentName}`] = (state, action) => ({
    ...initialState,
    loading: true,
  });

  return (
    state: TState = {
      ...initialState,
      componentLoading: true,
    },
    action: any,
  ) => {
    const effect = actionHandlers[action.type];

    if (effect) return effect(state, action);
    else return state;
  };
};
