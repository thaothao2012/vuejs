import Counter from './components/Counter';
import DrawCircle from './components/DrawCircle';
import Exel from './components/Exel';

const routes = [
    { path: '/counter', component: Counter, name: 'counter' },
    { path: '/circle', component: DrawCircle },
    { path: '/exel', component: Exel }
  ]

  export default routes;
