
import { useState } from 'react';
import './App.css';

// ==========================================
// PRODUTOS DA LOJA
// ==========================================

const produtos = [
  {
    id: 1,
    nome: 'Natura Homem Neo',
    marca: 'Natura',
    linha: 'Natura Homem',
    precoOriginal: 249.90,
    preco: 199.90,
    categoria: 'Masculino',
    emoji: '🖤',
    imagem: '/imagens/homem-neo.jpg',
    descricao: 'Uma fragrância masculina moderna e marcante.'
  },
  {
    id: 2,
    nome: 'Natura Homem Aromáticos',
    marca: 'Natura',
    linha: 'Natura Homem',
    precoOriginal: 249.90,
    preco: 199.90,
    categoria: 'Masculino',
    emoji: '🌿',
    imagem: '/imagens/homem-aromaticos.jpg',
    descricao: 'Uma fragrância com personalidade e frescor.'
  },
  {
    id: 3,
    nome: 'Natura Homem Sagaz',
    marca: 'Natura',
    linha: 'Natura Homem',
    precoOriginal: 249.90,
    preco: 199.90,
    categoria: 'Masculino',
    emoji: '⚡',
    imagem: '/imagens/homem-sagaz.jpg',
    descricao: 'Uma fragrância para marcar presença.'
  },
  {
    id: 4,
    nome: 'Essencial Sentir',
    marca: 'Natura',
    linha: 'Essencial Masculino',
    precoOriginal: 249.90,
    preco: 199.90,
    categoria: 'Masculino',
    emoji: '💎',
    imagem: '/imagens/essencial-sentir-masculino.jpg',
    descricao: 'Sofisticação e personalidade em uma fragrância.'
  },
  {
    id: 5,
    nome: 'Essencial Palo Santo',
    marca: 'Natura',
    linha: 'Essencial Masculino',
    precoOriginal: 249.90,
    preco: 199.90,
    categoria: 'Masculino',
    emoji: '🌳',
    imagem: '/imagens/essencial-palo-santo.jpg',
    descricao: 'Uma fragrância sofisticada e envolvente.'
  },
  {
    id: 6,
    nome: 'Essencial Oud',
    marca: 'Natura',
    linha: 'Essencial Masculino',
    precoOriginal: 249.90,
    preco: 199.90,
    categoria: 'Masculino',
    emoji: '🖤',
    imagem: '/imagens/essencial-oud-masculino.jpg',
    descricao: 'Uma fragrância intensa e sofisticada.'
  },
  {
    id: 7,
    nome: 'Essencial Feminino',
    marca: 'Natura',
    linha: 'Essencial Feminino',
    precoOriginal: 249.90,
    preco: 199.90,
    categoria: 'Feminino',
    emoji: '🌸',
    imagem: '/imagens/essencial-feminino.jpg',
    descricao: 'Elegância e sofisticação para momentos especiais.'
  },
  {
    id: 8,
    nome: 'Essencial Exclusivo Floral',
    marca: 'Natura',
    linha: 'Essencial Feminino',
    precoOriginal: 249.90,
    preco: 199.90,
    categoria: 'Feminino',
    emoji: '🌷',
    imagem: '/imagens/essencial-exclusivo-floral.jpg',
    descricao: 'Uma fragrância floral e elegante.'
  },
  {
    id: 9,
    nome: 'Essencial Desejos',
    marca: 'Natura',
    linha: 'Essencial Feminino',
    precoOriginal: 249.90,
    preco: 199.90,
    categoria: 'Feminino',
    emoji: '💗',
    imagem: '/imagens/essencial-desejos.jpg',
    descricao: 'Uma fragrância envolvente e sofisticada.'
  }
];

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  // FORMATAR PREÇOS
  function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  // ADICIONAR PRODUTO AO CARRINHO
  function adicionarAoCarrinho(produto) {
    setCarrinho((carrinhoAtual) => {
      const produtoExistente = carrinhoAtual.find(
        (item) => item.id === produto.id
      );

      if (produtoExistente) {
        return carrinhoAtual.map((item) =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [
        ...carrinhoAtual,
        { ...produto, quantidade: 1 }
      ];
    });
  }

  // REMOVER PRODUTO DO CARRINHO
  function removerDoCarrinho(id) {
    setCarrinho((carrinhoAtual) =>
      carrinhoAtual.filter((item) => item.id !== id)
    );
  }

  // ALTERAR CATEGORIA
  function selecionarCategoria(categoria) {
    setCategoriaSelecionada(categoria);
  }

  // QUANTIDADE DE PRODUTOS NO CARRINHO
  const quantidadeCarrinho = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  // VALOR TOTAL DA COMPRA
  const totalCarrinho = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  // FILTRAR PRODUTOS
  const produtosFiltrados = produtos.filter((produto) => {
    const termo = busca.trim().toLowerCase();

    const correspondeBusca =
      produto.nome.toLowerCase().includes(termo) ||
      produto.marca.toLowerCase().includes(termo) ||
      produto.linha.toLowerCase().includes(termo);

    const correspondeCategoria =
      categoriaSelecionada === 'Todos' ||
      produto.categoria === categoriaSelecionada;

    return correspondeBusca && correspondeCategoria;
  });

  // FINALIZAR COMPRA PELO WHATSAPP
  function finalizarCompra() {
    if (carrinho.length === 0) {
      alert('Sua sacola está vazia!');
      return;
    }

    const numeroWhatsApp = '5588981680487';

    const itensPedido = carrinho.map((item) => {
      return (
        `• ${item.nome}\n` +
        `Quantidade: ${item.quantidade}\n` +
        `Valor: ${formatarPreco(item.preco * item.quantidade)}`
      );
    });

    const mensagem =
      `Olá! Gostaria de fazer um pedido na Ana Paula Perfumes.\n\n` +
      `MEU PEDIDO:\n\n${itensPedido.join('\n\n')}\n\n` +
      `TOTAL: ${formatarPreco(totalCarrinho)}\n\n` +
      `Aguardo a confirmação do pedido!`;

    const link =
      `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, '_blank', 'noopener,noreferrer');
  }

  // ==========================================
  // ESTRUTURA VISUAL
  // ==========================================

  return (
    <div className="store">

      {/* CABEÇALHO */}

      <header className="header">

        <div className="logo">
          <h1>
            ANA PAULA <span>PERFUMES</span>
          </h1>

          <p>Perfume é a sua essência.</p>
        </div>

        <form
          className="search"
          onSubmit={(e) => {
            e.preventDefault();
            document.getElementById('produtos')?.scrollIntoView({
              behavior: 'smooth'
            });
          }}
        >
          <input
            type="search"
            placeholder="Pesquise seu perfume favorito..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />

          <button type="submit">
            Buscar
          </button>
        </form>

        <div className="header-actions">
          <a href="#produtos">
            Produtos
          </a>

          <a href="#carrinho">
            🛍️ Carrinho ({quantidadeCarrinho})
          </a>
        </div>

      </header>

      {/* MENU DE NAVEGAÇÃO */}

      <nav className="menu">

        <a href="#inicio">
          Início
        </a>

        <a
          href="#produtos"
          onClick={() => selecionarCategoria('Todos')}
        >
          Todos os perfumes
        </a>

        <a
          href="#produtos"
          onClick={() => selecionarCategoria('Feminino')}
        >
          Femininos
        </a>

        <a
          href="#produtos"
          onClick={() => selecionarCategoria('Masculino')}
        >
          Masculinos
        </a>

        <a
          href="#produtos"
          onClick={() => selecionarCategoria('Todos')}
        >
          Ver todos
        </a>

      </nav>

      <main>

        {/* BANNER PRINCIPAL */}

        <section className="hero" id="inicio">

          <div className="hero-content">

            <span className="tag">
              ANA PAULA PERFUMES
            </span>

            <h2>
              Uma fragrância especial transforma momentos.
            </h2>

            <p>
              Descubra perfumes que combinam com sua personalidade,
              seu estilo e sua essência.
            </p>

            <a href="#produtos" className="btn-primary">
              Explorar perfumes
            </a>

          </div>

        </section>

        {/* CATEGORIAS */}

        <section className="categories">

          <h2>
            Encontre sua essência
          </h2>

          <div className="category-grid">

            <button
              type="button"
              className="category-card"
              onClick={() => selecionarCategoria('Feminino')}
            >
              <span>🌸</span>
              <h3>Femininos</h3>
            </button>

            <button
              type="button"
              className="category-card"
              onClick={() => selecionarCategoria('Masculino')}
            >
              <span>🖤</span>
              <h3>Masculinos</h3>
            </button>

            <button
              type="button"
              className="category-card"
              onClick={() => selecionarCategoria('Todos')}
            >
              <span>✨</span>
              <h3>Todos os perfumes</h3>
            </button>

            <button
              type="button"
              className="category-card"
              onClick={() => {
                setBusca('');
                selecionarCategoria('Todos');
              }}
            >
              <span>🎁</span>
              <h3>Ver novidades</h3>
            </button>

          </div>

        </section>

        {/* VITRINE DE PRODUTOS */}

        <section className="products" id="produtos">

          <div className="section-heading">

            <div>
              <h2>Nossos perfumes</h2>

              <p>
                Encontre a fragrância perfeita para você.
              </p>
            </div>

            <span>
              {produtosFiltrados.length} produtos
            </span>

          </div>

          {/* FILTROS */}

          <div className="filters">

            <button
              type="button"
              className={categoriaSelecionada === 'Todos' ? 'active' : ''}
              onClick={() => selecionarCategoria('Todos')}
            >
              Todos
            </button>

            <button
              type="button"
              className={categoriaSelecionada === 'Feminino' ? 'active' : ''}
              onClick={() => selecionarCategoria('Feminino')}
            >
              Femininos
            </button>

            <button
              type="button"
              className={categoriaSelecionada === 'Masculino' ? 'active' : ''}
              onClick={() => selecionarCategoria('Masculino')}
            >
              Masculinos
            </button>

          </div>

          {/* CARDS DOS PRODUTOS */}

          <div className="product-grid">

            {produtosFiltrados.map((produto) => (

              <article
                className="product-card"
                key={produto.id}
              >

                <div className="product-image">

                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    loading="lazy"
                  />

                </div>

                <span className="product-tag">
                  {produto.categoria}
                </span>

                <h3>
                  {produto.nome}
                </h3>

                <p className="product-brand">
                  {produto.marca}
                </p>

                <p>
                  {produto.descricao}
                </p>

                <div className="product-prices">

                  <span className="old-price">
                    {formatarPreco(produto.precoOriginal)}
                  </span>

                  <strong className="current-price">
                    {formatarPreco(produto.preco)}
                  </strong>

                  <span className="discount">
                    {Math.round(
                      (1 - produto.preco / produto.precoOriginal) * 100
                    )}% OFF
                  </span>

                </div>

                <button
                  type="button"
                  onClick={() => adicionarAoCarrinho(produto)}
                >
                  Adicionar ao carrinho
                </button>

              </article>

            ))}

            {produtosFiltrados.length === 0 && (
              <p>
                Nenhum perfume encontrado.
              </p>
            )}

          </div>

        </section>

        {/* CARRINHO DE COMPRAS */}

        <section className="cart-section" id="carrinho">

          <h2>
            Minha sacola
          </h2>

          <p>
            Confira os perfumes que você selecionou.
          </p>

          {carrinho.length === 0 ? (

            <div className="empty-cart">

              <span>🛍️</span>

              <h3>
                Sua sacola está vazia
              </h3>

              <p>
                Escolha seus perfumes favoritos!
              </p>

            </div>

          ) : (

            <>

              {carrinho.map((item) => (

                <div className="cart-item" key={item.id}>

                  <span>
                    {item.emoji}
                  </span>

                  <div className="cart-info">

                    <h3>
                      {item.nome}
                    </h3>

                    <p>
                      {item.marca}
                    </p>

                    <p>
                      Quantidade: {item.quantidade}
                    </p>

                    <strong>
                      {formatarPreco(item.preco * item.quantidade)}
                    </strong>

                  </div>

                  <button
                    type="button"
                    onClick={() => removerDoCarrinho(item.id)}
                  >
                    Remover
                  </button>

                </div>

              ))}

              <div className="cart-summary">

                <h3>
                  Total: {formatarPreco(totalCarrinho)}
                </h3>

                <button
                  type="button"
                  onClick={finalizarCompra}
                >
                  Finalizar pedido pelo WhatsApp
                </button>

              </div>

            </>

          )}

        </section>

        {/* NEWSLETTER */}

        <section className="newsletter">

          <h2>
            Receba novidades e ofertas especiais
          </h2>

          <p>
            Fique por dentro dos lançamentos e descubra novas fragrâncias.
          </p>

          <div>

            <input
              type="email"
              placeholder="Digite seu melhor e-mail"
            />

            <button type="button">
              Inscrever-se
            </button>

          </div>

        </section>

      </main>

      {/* RODAPÉ */}

      <footer className="footer">

        <div>

          <h2>
            ANA PAULA <span>PERFUMES</span>
          </h2>

          <p>
            Perfume é a sua essência.
          </p>

          <p>
            Encontre fragrâncias que combinam com você.
          </p>

        </div>

        <div>

          <h3>
            Navegação
          </h3>

          <a href="#inicio">
            Início
          </a>

          <a href="#produtos">
            Perfumes
          </a>

          <a href="#carrinho">
            Minha sacola
          </a>

        </div>

        <div>

          <h3>
            Categorias
          </h3>

          <a
            href="#produtos"
            onClick={() => selecionarCategoria('Feminino')}
          >
            Femininos
          </a>

          <a
            href="#produtos"
            onClick={() => selecionarCategoria('Masculino')}
          >
            Masculinos
          </a>

        </div>

        <div>

          <h3>
            Atendimento
          </h3>

          <a href="#carrinho">
            Fale conosco
          </a>

          <a href="#">
            Instagram
          </a>

          <a href="#">
            Política de privacidade
          </a>

        </div>

        <p className="copyright">
          © 2026 Ana Paula Perfumes. Todos os direitos reservados.
        </p>

      </footer>

    </div>
  );
}

export default App;
