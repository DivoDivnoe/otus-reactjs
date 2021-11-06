import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Field } from '@/components/Field';
import { Bar } from '@/components/Bar';
import { Model } from '@/modules/game/model';
import { StartGameType } from '@/modules/game/useGameLogicRedux';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export interface GameProps {
  model?: Model;
}

export const Game: FC<StartGameType> = (props) => {
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
  } = props;

  return (
    <Wrapper>
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
  );
};
