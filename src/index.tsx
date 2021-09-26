import React from 'react';
import { render } from 'react-dom';

import AppWithGameLogicAndUserData from '@/components/App/App';
import 'normalize.css';
import '@/style.css';

render(<AppWithGameLogicAndUserData />, document.querySelector('#root'));
