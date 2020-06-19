const PRODUTOS = '_PRODUTOS';

export function ErroValidacao(erros) {
    this.erros = erros;
}

export default class ProdutoService {

    salvar = (produto) => {
        // Validar o produto e obter lista de produtos
        this.validar(produto);
        let produtos = this.obterProdutos();
        produto.sku = produto.sku.toUpperCase();
        this.garantirSkuUnico(produtos, produto);

        // Adicionar produto e persistir no storage do navegador
        produtos.push(produto);
        localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
    };

    alterar = (produto) => {
        // Validar o produto e obter lista de produtos
        this.validar(produto);
        produto.sku = produto.sku.toUpperCase();

        // Obter lista de produtos e o índice do produto que será alterado
        let produtos = this.obterProdutos();
        let indiceProduto = this.obterIndiceProduto(produto.sku);

        // Adicionar produto e persistir no storage do navegador
        produtos[indiceProduto] = produto;
        localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
    };

    apagar = (skuProduto) => {
        // Encontrar produto na lista
        let produtos = this.obterProdutos();
        let indiceProduto = this.obterIndiceProduto(produtos, skuProduto);

        // Remover produto da lista
        produtos.splice(indiceProduto, 1);
        localStorage.setItem(PRODUTOS, JSON.stringify(produtos));

        // Retornar lista atualizada
        return produtos;
    };

    obterProdutos = () => {
        // Recuperar ou inicializar lista de produtos
        let produtos = localStorage.getItem(PRODUTOS);
        return produtos ? JSON.parse(produtos) : [];
    };

    obterProduto = (skuProduto) => {
        let produtos = this.obterProdutos();
        let indiceProduto = this.obterIndiceProduto(produtos, skuProduto);
        return produtos[indiceProduto];
    };

    obterIndiceProduto = (produtos, skuProduto) => {
        for (let i=0 ; i<produtos.length ; i++) {
            if (produtos[i].sku === skuProduto) {
                return i;
            }
        }

        throw new ErroValidacao(["Produto não encontrado!"]);
    }

    validar = (produto) => {
        let errosValidacao = [];

        if (!produto.nome) {
            errosValidacao.push("Por favor, informe o nome do produto!");
        }

        if (!produto.sku) {
            errosValidacao.push("Por favor, informe o identificador SKU do produto!");
        } else if (produto.sku.length !== 8) {
            errosValidacao.push("O identificador SKU do produto deve ter 8 dígitos!");
        }

        if (!produto.preco) {
            errosValidacao.push("Por favor, informe o preço do produto!");
        } else if(produto.preco <= 0) {
            errosValidacao.push("O preço do produto deve ser superior a zero!");
        }

        if (!produto.fornecedor) {
            errosValidacao.push("Por favor, informe o fornecedor do produto!");
        }

        if (!produto.descricao) {
            errosValidacao.push("Por favor, informe a descrição do produto!");
        }

        if (errosValidacao.length > 0) {
            throw new ErroValidacao(errosValidacao);
        }
    };

    garantirSkuUnico(produtos, produto) {
        for (let prd of produtos) {
            if (prd.sku === produto.sku) {
                throw new ErroValidacao(["O SKU informado pertence a outro produto!"]);
            }
        }
    }

};