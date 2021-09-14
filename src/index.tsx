import React from 'react';
import { render } from 'react-dom';

import App from '@/components/App/App';
import 'normalize.css';
import '@/style.css';

render(<App />, document.querySelector('#root'));
