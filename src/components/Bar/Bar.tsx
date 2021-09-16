import React, { FC } from 'react';
import styled from '@emotion/styled';
import { BoardSize, SpeedType, FillType } from '@/constants';
import Button from '@/components/Button/Button';
import { BoardSizeValue, SpeedValue, BoardFillPercentage } from '@/configs';

interface BarProps {
  sizes: BoardSize[];
  speedTypes: SpeedType[];
  fillTypes: FillType[];
  changeSizeHandler: (size: BoardSize) => void;
  changeSpeedHandler: (speedType: SpeedType) => void;
  changeFillType: (fill: FillType) => void;
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

/* ${BarRowItem}:not(:last-child) {
    margin-bottom: 10px;
  } */

const Bar: FC<BarProps> = (props) => {
  const {
    sizes,
    speedTypes,
    fillTypes,
    changeSizeHandler,
    changeSpeedHandler,
    changeFillType,
  } = props;

  return (
    <BarItem>
      <BarRowItem>
        <BarRowTitle>Board Size: </BarRowTitle>
        <ButtonsWrapper>
          {sizes.map((sizeType) => {
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
          })}
        </ButtonsWrapper>
      </BarRowItem>
      <BarRowItem>
        <BarRowTitle>Sim Speed: </BarRowTitle>
        <ButtonsWrapper>
          {speedTypes.map((speedType) => {
            return (
              <Button
                key={`speed-${speedType}`}
                isActive={false}
                clickHandler={() => changeSpeedHandler(speedType)}
              >
                {speedType}
              </Button>
            );
          })}
        </ButtonsWrapper>
      </BarRowItem>
      <BarRowItem>
        <BarRowTitle>Fill Percentage: </BarRowTitle>
        <ButtonsWrapper>
          {fillTypes.map((fillType) => {
            const percentage = BoardFillPercentage[fillType];
            const text = `${percentage}%`;

            return (
              <Button
                key={`fill-${fillType}`}
                isActive={false}
                clickHandler={() => changeFillType(fillType)}
              >
                {text}
              </Button>
            );
          })}
        </ButtonsWrapper>
      </BarRowItem>
    </BarItem>
  );
};

export default Bar;
