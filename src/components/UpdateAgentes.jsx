import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FormularioRegistro from './FormularioRegistro';

function App() {
  return (
    <Router>
      <Switch>
        {/* Ruta para crear un nuevo registro */}
        <Route path="/create" exact>
          <FormularioRegistro apiUrl="https://tu-api.com/registros" />
        </Route>

        {/* Ruta para editar un registro existente */}
        <Route path="/edit/:id" exact>
          <FormularioRegistro apiUrl="https://tu-api.com/registros" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
