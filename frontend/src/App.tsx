import './App.css';
import Toolbar from './Components/UI/Toolbar/Toolbar.tsx';
import Messages from './Containers/Messages/Messages.tsx';

const App = () => {
  return <>
    <Toolbar/>

    <div className="container m-5">
      <Messages/>
    </div>
  </>;
};

export default App;