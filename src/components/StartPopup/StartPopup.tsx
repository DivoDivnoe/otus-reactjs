import React, { Component, ReactNode } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/Button/Button';

export interface PopupProps {
  isVisible: boolean;
  submitHandler: (name: string) => void;
}

export interface PopupState {
  name: string;
}

const PopupWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(8, 0, 18, 0.85);
`;

const PopupItem = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 30px;
  border-radius: 7px;
  background-color: #021a60;
  transform: translate(-50%, -50%);
`;

const FormItem = styled.form`
  display: flex;
  flex-direction: column;
  width: 240px;
`;

const InputItem = styled.input`
  padding: 6px 10px 4px 10px;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;
  border: 2px solid #058aba;
  border-radius: 3px;
  background-color: transparent;
  box-shadow: inset 1px 1px 3px rgb(0 0 0 / 30%), 1px 1px 0 rgb(0 0 0 / 10%);
`;

class StartPopup extends Component<PopupProps, PopupState> {
  state = {
    name: '',
  };

  render(): ReactNode {
    const { isVisible } = this.props;

    return (
      isVisible && (
        <PopupWrapper>
          <PopupItem>
            <FormItem data-testid='start-form' onSubmit={this._onSubmit}>
              <InputItem
                data-testid='name-input'
                value={this.state.name}
                placeholder={'Enter Your Name:'}
                onChange={this._onChange}
                required
              />
              <Button>Start</Button>
            </FormItem>
          </PopupItem>
        </PopupWrapper>
      )
    );
  }

  _onSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();

    this.props.submitHandler(this.state.name);
  };

  _onChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ name: evt.target.value.trim() });
  };
}

export default StartPopup;
