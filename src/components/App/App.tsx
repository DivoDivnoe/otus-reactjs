import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Field } from '@/components/Field';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Bar } from '@/components/Bar/Bar';
import { StartPopup } from '@/components/StartPopup/';
import useUserData from '@/hooks/useUserData';
import useGameLogic from '@/hooks/useGameLogic';
import { BoardSize, SpeedType, FillType } from '@/constants';
export interface AppProps {
  size?: BoardSize;
  speed?: SpeedType;
  fill?: FillType;
}

const Title = styled.h1`
  color: #ffffff;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App: FC<AppProps> = (props) => {
  const {
    size,
    speed,
    fill,
    sizes,
    speedTypes,
    fillTypes,
    changeSize,
    changeSpeed,
    changeFill,
    play,
    pause,
    isPlaying,
    model,
    clickHandler,
    clear,
  } = useGameLogic(props);
  const { user, setUser } = useUserData();

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
          changeSizeHandler={changeSize}
          changeSpeedHandler={changeSpeed}
          changeFillType={changeFill}
          play={play}
          pause={pause}
          clear={clear}
        />
      </Wrapper>
      {!user && <StartPopup submitHandler={setUser} />}
    </ErrorBoundary>
  );
};

export default App;
