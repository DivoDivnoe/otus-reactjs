import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Controls } from '@/configs';
import { Button } from '@/components/Button';
import { BoardSize, BoardSizeValue } from '@/modules/game/size';
import { SpeedType } from '@/modules/game/speed';
import { FillType, BoardFillPercentage } from '@/modules/game/fill';

interface BarProps {
  /**
   * list of available sizes
   */
  sizes: BoardSize[];
  /**
   * list of available speedTypes
   */
  speedTypes: SpeedType[];
  /**
   * list of available fillTypes
   */
  fillTypes: FillType[];
  /**
   * bar current size
   */
  size: BoardSize;
  /**
   * bar current speed
   */
  speed: SpeedType;
  /**
   * bar current fill
   */
  fill: FillType;
  /**
   * play or pause button is active flag
   */
  isPlaying: boolean;
  /**
   * callback to fire when size changes
   */
  changeSizeHandler: (size: BoardSize) => void;
  /**
   * callback to fire when speed changes
   */
  changeSpeedHandler: (speedType: SpeedType) => void;
  /**
   * callback to fire when fillType changes
   */
  changeFillType: (fill: FillType) => void;
  /**
   * callback to fire when play button is clicked
   */
  [Controls.PLAY]: () => void;
  /**
   * callback to fire when pause button is clicked
   */
  [Controls.PAUSE]: () => void;
  /**
   * callback to fire when clear button is clicked
   */
  [Controls.CLEAR]: () => void;
}

const ButtonsWrapper = styled.div`
  display: flex;

  button {
    width: 140px;
  }

  button:not(:last-child) {
    margin-right: 10px;
  }

  button::first-letter {
    text-transform: uppercase;
  }
`;

const BarRowTitle = styled.span`
  font-size: 20px;
  line-height: 23px;
  font-family: Courier;
  color: #ffffff;
  text-align: left;
`;

const BarRowItem = styled.div`
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 10px;
  }
`;

const BarItem = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 632px;
  padding: 10px 15px;
  background-color: #021a60;
  border-radius: 0 0 10px 10px;
`;

export const Bar: FC<BarProps> = (props) => {
  const {
    sizes,
    speedTypes,
    fillTypes,
    size,
    speed,
    fill,
    isPlaying,
    changeSizeHandler,
    changeSpeedHandler,
    changeFillType,
  } = props;

  const sizeButtons = sizes.map((sizeType) => {
    const { width, height } = BoardSizeValue[sizeType];
    const text = `Size: ${width}x${height}`;
    const name = `size-${sizeType}`;

    return (
      <Button
        key={name}
        isActive={sizeType === size}
        isDisabled={sizeType === size}
        clickHandler={() => changeSizeHandler(sizeType)}
      >
        {text}
      </Button>
    );
  });

  const speedButtons = speedTypes.map((speedType) => {
    const name = `speed-${speedType}`;

    return (
      <Button
        key={name}
        isActive={speedType === speed}
        isDisabled={speedType === speed}
        clickHandler={() => changeSpeedHandler(speedType)}
      >
        {speedType}
      </Button>
    );
  });

  const fillButtons = fillTypes.map((fillType) => {
    const percentage = BoardFillPercentage[fillType];
    const text = `${percentage * 100}%`;
    const name = `fill-${fillType}`;

    return (
      <Button
        key={name}
        isActive={fillType === fill}
        clickHandler={() => changeFillType(fillType)}
      >
        {text}
      </Button>
    );
  });

  const controlsButtons = [Controls.PLAY, Controls.PAUSE, Controls.CLEAR].map(
    (controlType) => {
      const name = `control-${controlType}`;

      return (
        <Button
          key={name}
          isActive={
            false ||
            (controlType === Controls.PLAY && isPlaying) ||
            (controlType === Controls.PAUSE && !isPlaying)
          }
          isDisabled={
            false ||
            (controlType === Controls.PLAY && isPlaying) ||
            (controlType === Controls.PAUSE && !isPlaying)
          }
          clickHandler={() => props[controlType]()}
        >
          {controlType}
        </Button>
      );
    }
  );

  const compConfig = [
    { title: 'Board Size: ', buttons: sizeButtons },
    { title: 'Sim Speed: ', buttons: speedButtons },
    { title: 'Fill: ', buttons: fillButtons },
    { title: 'Controls: ', buttons: controlsButtons },
  ];

  return (
    <BarItem>
      {compConfig.map(({ title, buttons }) => {
        return (
          <BarRowItem key={title}>
            <BarRowTitle>{title}</BarRowTitle>
            <ButtonsWrapper>{buttons}</ButtonsWrapper>
          </BarRowItem>
        );
      })}
    </BarItem>
  );
};
