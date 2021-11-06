import React, { FC } from 'react';
import useGameLogic from './useGameLogicRedux';
import { Game } from '@/components/Game';

export const InteractiveGame: FC = () => {
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
    updateModel,
  } = useGameLogic();

  return (
    <Game
      size={size}
      speed={speed}
      fill={fill}
      sizes={sizes}
      speedTypes={speedTypes}
      fillTypes={fillTypes}
      changeSize={changeSize}
      changeSpeed={changeSpeed}
      changeFill={changeFill}
      play={play}
      pause={pause}
      clear={clear}
      isPlaying={isPlaying}
      model={model}
      clickHandler={clickHandler}
      updateModel={updateModel}
    />
  );
};
