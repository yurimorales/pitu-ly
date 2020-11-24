import app from './app';
import database from './database';

// OBS
// na primeira vez, é preciso, p/ force: true, pra forçar criação da tabela
// depois, dá pra deixar false, ou retirar.
// não deixar assim em produção, pois apaga todos os dados
// e  apaga a tabela e recria ela novamente sem dados
database.sync({force: false});
console.log('MySQL database running at port 3306');

app.listen(3000); // Escuta o server na porta 3000
console.log('Server running at port 3000');
