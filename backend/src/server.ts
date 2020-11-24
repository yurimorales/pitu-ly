import app from './app';
import database from './database';

// OBS:
// na primeira vez, é preciso, por {force: true}, pra forçar criação dos schemas, depois, dá pra deixar {force: false}, ou retirar.
// PS: NÃO deixar assim em produção, pois apaga os dados e schemas criados, e logo em seguida recria os schemas...
database.sync({force: false});
console.log('MySQL database running at port 3306');

app.listen(3000); // Escuta o server na porta 3000
console.log('Server running at port 3000');
