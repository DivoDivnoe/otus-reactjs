import React, { PureComponent, ComponentClass, ComponentType } from 'react';
import { PopupProps, FormProps } from '@/components/StartPopup/StartPopup';

interface FormStateType {
  name: string;
}

const withSignInDataHOC = (
  Component: ComponentType<FormProps>
): ComponentClass<PopupProps> => {
  class WithSignInData extends PureComponent<PopupProps, FormStateType> {
    state = {
      name: '',
    };

    render() {
      return (
        <Component
          {...this.props}
          name={this.state.name}
          onChange={this._onChange}
          onSubmit={this._onSubmit}
        />
      );
    }

    _onSubmit = (evt: React.FormEvent): void => {
      evt.preventDefault();

      this.props.submitHandler(this.state.name.trim());
      this._resetState();
    };

    _onChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
      this.setState({ name: evt.target.value });
    };

    _resetState() {
      this.setState({ name: '' });
    }
  }

  const displayName = Component.displayName || Component.name || 'Component';
  Component.displayName = `withSignInData${displayName}`;

  return WithSignInData;
};

export default withSignInDataHOC;
