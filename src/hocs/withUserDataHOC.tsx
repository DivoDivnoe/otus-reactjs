import React, { PureComponent, ComponentClass, ComponentType } from 'react';

export interface State {
  user: string | null;
}

export interface WithUserProps {
  user: string | null;
  setUser: (name: string) => void;
}

const withUserDataHOC = <P extends object>( // eslint-disable-line
  Component: ComponentType<P & WithUserProps>
): ComponentClass<P> => {
  class WithUserData extends PureComponent<P, State> {
    state = { user: null };

    render() {
      return (
        <Component
          {...(this.props as P)}
          user={this.state.user}
          setUser={this._setUser}
        />
      );
    }

    _setUser = (name: string): void => {
      this.setState({ user: name });
    };
  }

  const displayName = Component.displayName || Component.name || 'Component';
  Component.displayName = `withUserData${displayName}`;

  return WithUserData;
};

export default withUserDataHOC;
