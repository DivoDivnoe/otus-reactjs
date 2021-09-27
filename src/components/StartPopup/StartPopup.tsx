import React, { FC } from 'react';
import styled from '@emotion/styled';
import Button from '@/components/Button/Button';
import withSignInDataHOC from '@/hocs/withSignInDataHOC';

export interface PopupProps {
  submitHandler: (name: string) => void;
}

export interface FormProps {
  name: string;
  onChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (evt: React.FormEvent) => void;
}

const PopupWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(8, 0, 18, 0.85);
`;

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

const Form: FC<FormProps> = ({ name, onSubmit, onChange }) => {
  return (
    <FormItem data-testid='start-form' onSubmit={onSubmit}>
      <InputItem
        data-testid='name-input'
        value={name}
        placeholder={'Enter Your Name:'}
        onChange={onChange}
        required
      />
      <Button>Start</Button>
    </FormItem>
  );
};

const FormWithSignInData = withSignInDataHOC(Form);

const StartPopup: FC<PopupProps> = (props) => {
  const { submitHandler } = props;

  return (
    <PopupWrapper data-testid='start-popup'>
      <PopupItem>
        <FormWithSignInData submitHandler={submitHandler} />
      </PopupItem>
    </PopupWrapper>
  );
};

export default StartPopup;
