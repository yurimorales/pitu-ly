import {Request,Response} from 'express';
import {Link} from '../models/link';
import linksRepository from '../models/linksRepository';

const links: Link[] = [];

function generateRandomCode() {

    let text = '';
    const possible = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (let i=0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    return text;
}

async function postLink(req: Request, res: Response) {
    
    const link = req.body as Link; // request do tipo entidade 'Link'

    link.code = generateRandomCode();
    link.hits = 0;

    const result = await linksRepository.add(link); // Salva no banco
    link.id = result.id;

    if (!result.id) {
        return res.sendStatus(400);
    } 

    // Retorna pro front-end do usuário, o link gerado
    // 201: codigo http de criado com sucesso
    res.status(201).json(link);

}

async function getLinkStats(req: Request, res: Response) {

    const code = req.params.code as string;
    const link = await linksRepository.findByCode(code);

    if (!link) {
        res.sendStatus(404); // não encontrado
    } else {
        res.json(link); // retorna o link como um json
    }

}

async function getLinks(req: Request, res: Response) {

    const links = await linksRepository.findAll();

    if (!links) {
        res.sendStatus(404); // nenhum link encontrado
    } else {
        res.json(links); // retorna o n links como um json
    }

}

async function hitLink(req: Request, res: Response) {
    
    const code = req.params.code as string;
    const link = await linksRepository.hit(code);

    if (!link) {
        res.sendStatus(404); // não encontrado
    } else {
        res.json(link); // retorna o link no índice encontrado
    }
}

export default {
    getLinks,
    getLinkStats,
    postLink,
    hitLink
}
