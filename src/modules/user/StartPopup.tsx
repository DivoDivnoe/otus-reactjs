import React, { FC } from 'react';
import { StartPopup } from '@/components/StartPopup';
import useAuth from '@/modules/user/useAuthRedux';

export const InteractiveStartPopup: FC = () => <StartPopup {...useAuth()} />;
