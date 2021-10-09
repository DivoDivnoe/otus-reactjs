import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Field } from '@/components/Field';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Bar } from '@/components/Bar/Bar';
import { StartPopup } from '@/components/StartPopup/';
import withGameLogicHOC, {
  LogicProps,
  WithGameProps,
} from '@/hocs/withGameLogicHOC';
import withUserDataHOC, { WithUserProps } from '@/hocs/withUserDataHOC';

export interface AppLogicAndUserProps extends WithUserProps, LogicProps {}
export interface AppProps extends WithGameProps, WithUserProps {}

const Title = styled.h1`
  color: #ffffff;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const App: FC<AppProps> = (props) => {
  const {
    size,
    speed,
    fill,
    sizes,
    speedTypes,
    fillTypes,
    isPlaying,
    model,
    clickHandler,
    changeSizeHandler,
    changeSpeedHandler,
    changeFillType,
    play,
    pause,
    clear,
    user,
    setUser,
  } = props;

  return (
    <ErrorBoundary>
      <Wrapper>
        {user && <Title>Hello, {user}.</Title>}
        <Field size={size} model={model} clickHandler={clickHandler} />
        <Bar
          sizes={sizes}
          speedTypes={speedTypes}
          fillTypes={fillTypes}
          size={size}
          speed={speed}
          fill={fill}
          isPlaying={isPlaying}
          changeSizeHandler={changeSizeHandler}
          changeSpeedHandler={changeSpeedHandler}
          changeFillType={changeFillType}
          play={play}
          pause={pause}
          clear={clear}
        />
      </Wrapper>
      {!user && <StartPopup submitHandler={setUser} />}
    </ErrorBoundary>
  );
};

const AppWithGameLogic = withGameLogicHOC<AppLogicAndUserProps>(App);
const AppWithGameLogicAndUserData =
  withUserDataHOC<LogicProps>(AppWithGameLogic);
export default AppWithGameLogicAndUserData;
