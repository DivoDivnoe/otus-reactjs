import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Button } from '@/components/Button';

export interface StartPopupProps {
  /**
   * user name input value
   */
  currentName: string;
  /**
   * dispatches signin action
   */
  signin: () => void;
  /**
   * changes user name input value
   */
  setName: (name: string) => void;
  /**
   * resets user name input value
   */
  resetName: () => void;
}

const PopupItem = styled.div`
  position: fixed;
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

export const StartPopup: FC<StartPopupProps> = (props) => {
  const { currentName, setName, signin, resetName } = props;

  const onChangeValue = (evt: React.ChangeEvent): void => {
    evt.preventDefault();

    const target = evt.target as HTMLInputElement;
    setName(target.value);
  };

  const onSubmit = (evt: React.FormEvent): void => {
    evt.preventDefault();

    signin();
    resetName();
  };

  return (
    <PopupItem data-testid='start-popup'>
      <FormItem data-testid='start-form' onSubmit={onSubmit}>
        <InputItem
          data-testid='name-input'
          value={currentName}
          placeholder={'Enter Your Name:'}
          onChange={onChangeValue}
          required
        />
        <Button>Start</Button>
      </FormItem>
    </PopupItem>
  );
};
