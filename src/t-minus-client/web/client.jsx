import Layout from './components/Layout';
import { render as Render } from 'react-dom';

const appEl = document.getElementById('app');
Render(
  <Layout/>
  , appEl
);
