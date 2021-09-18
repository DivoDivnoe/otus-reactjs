import React, { FC } from 'react';
import styled from '@emotion/styled';
import { BoardSize, SpeedType, FillType, Controls } from '@/constants';
import Button from '@/components/Button/Button';
import { BoardSizeValue, BoardFillPercentage } from '@/configs';

interface BarProps {
  sizes: BoardSize[];
  speedTypes: SpeedType[];
  fillTypes: FillType[];
  changeSizeHandler: (size: BoardSize) => void;
  changeSpeedHandler: (speedType: SpeedType) => void;
  changeFillType: (fill: FillType) => void;
  [Controls.PLAY]: () => void;
  [Controls.PAUSE]: () => void;
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
  color: blue;
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
  width: 680px;
  padding: 10px 15px;
  border-radius: 0 0 10px 10px;
  background-color: white;
`;

const Bar: FC<BarProps> = (props) => {
  const {
    sizes,
    speedTypes,
    fillTypes,
    changeSizeHandler,
    changeSpeedHandler,
    changeFillType,
  } = props;

  const sizeButtons = sizes.map((sizeType) => {
    const { width, height } = BoardSizeValue[sizeType];
    const text = `Size: ${width}x${height}`;

    return (
      <Button
        key={`size-${sizeType}`}
        isActive={false}
        clickHandler={() => changeSizeHandler(sizeType)}
      >
        {text}
      </Button>
    );
  });

  const speedButtons = speedTypes.map((speedType) => {
    return (
      <Button
        key={`speed-${speedType}`}
        isActive={false}
        clickHandler={() => changeSpeedHandler(speedType)}
      >
        {speedType}
      </Button>
    );
  });

  const fillButtons = fillTypes.map((fillType) => {
    const percentage = BoardFillPercentage[fillType];
    const text = `${percentage * 100}%`;

    return (
      <Button
        key={`fill-${fillType}`}
        isActive={false}
        clickHandler={() => changeFillType(fillType)}
      >
        {text}
      </Button>
    );
  });

  const controlsButtons = [Controls.PLAY, Controls.PAUSE, Controls.CLEAR].map(
    (controlType) => {
      return (
        <Button
          key={`control-${controlType}`}
          isActive={false}
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
    { title: 'Fill Percentage: ', buttons: fillButtons },
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

export default Bar;
