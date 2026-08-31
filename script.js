const WHATSAPP_NUMBER = "5579998483685";

// FUNÇÃO PARA ABRIR O WHATSAPP

function abrirWhatsApp(mensagem) {
  const mensagemCodificada = encodeURIComponent(mensagem);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemCodificada}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

// MENSAGEM DE AGENDAMENTO

function criarMensagemAgendamento(servico, preco) {
  return `Olá! Quero agendar um horário.

Serviço: ${servico}
Valor informado: ${preco}

Gostaria de marcar dia e horário disponíveis.`;
}

// BOTÕES "AGENDAR" DOS SERVIÇOS

const botoesServicos = document.querySelectorAll(".service");

botoesServicos.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const servico = botao.dataset.service;
    const preco = botao.dataset.price;

    const mensagem = criarMensagemAgendamento(servico, preco);

    abrirWhatsApp(mensagem);
  });
});

// BOTÕES GERAIS DO WHATSAPP

const botoesWhatsApp = document.querySelectorAll("[data-whatsapp]");

botoesWhatsApp.forEach(function (botao) {
  botao.addEventListener("click", function (evento) {
    evento.preventDefault();

    const mensagem = botao.dataset.whatsapp;

    abrirWhatsApp(mensagem);
  });
});

// MENU MOBILE

const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {
  menuToggle.addEventListener("click", function () {
    const menuAberto = menu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", menuAberto);
  });
}

// FECHAR MENU AO CLICAR EM UM LINK

const linksMenu = document.querySelectorAll(".menu a");

linksMenu.forEach(function (link) {
  link.addEventListener("click", function () {
    if (menu) {
      menu.classList.remove("open");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

// FECHAR MENU AO CLICAR FORA

document.addEventListener("click", function (evento) {
  if (!menu || !menuToggle) {
    return;
  }

  const clicouNoMenu = menu.contains(evento.target);
  const clicouNoBotao = menuToggle.contains(evento.target);

  if (!clicouNoMenu && !clicouNoBotao) {
    menu.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
  }
});

// ANIMAÇÃO AO APARECER NA TELA

const elementosAnimados = document.querySelectorAll(".reveal");

const observador = new IntersectionObserver(
  function (todosElementos) {
    todosElementos.forEach(function (elemento) {
      if (elemento.isIntersecting) {
        elemento.target.classList.add("visible");

        observador.unobserve(elemento.target);
      }
    });
  },

  {
    threshold: 0.12,
  },
);

elementosAnimados.forEach(function (aparecerElemento) {
  observador.observe(aparecerElemento);
});

// GALERIA

const itensGaleria = document.querySelectorAll(".gallery-item");

const modal = document.getElementById("modal");

const modalPhoto = document.getElementById("modalPhoto");

const modalTitle = document.getElementById("modalTitle");

const botaoFechar = document.getElementById("close");

itensGaleria.forEach(function (itens) {
  itens.addEventListener("click", function () {
    const nome = itens.dataset.name;

    const foto = itens.dataset.photo;

    modalTitle.textContent = nome;

    modalPhoto.innerHTML = "";

    const imagem = document.createElement("img");

    imagem.src = `assets/${foto}`;

    imagem.alt = nome;

    imagem.onerror = function () {
      modalPhoto.innerHTML = `
                <p>
                    Foto não encontrada.<br>
                    Adicione o arquivo:
                    <strong>assets/${foto}</strong>
                </p>
            `;
    };

    modalPhoto.appendChild(imagem);

    modal.classList.add("open");
  });
});

// FECHAR MODAL

if (botaoFechar) {
  botaoFechar.addEventListener("click", fecharModal);
}

const fundoModal = document.querySelector(".backdrop");

if (fundoModal) {
  fundoModal.addEventListener("click", fecharModal);
}

function fecharModal() {
  if (modal) {
    modal.classList.remove("open");
  }
}

// FECHAR MODAL COM ESC

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    fecharModal();
  }
});

// ANO AUTOMÁTICO DO RODAPÉ

const ano = document.getElementById("year");

if (ano) {
  ano.textContent = new Date().getFullYear();
}

// MENU ATIVO CONFORME A SEÇÃO

const secoes = document.querySelectorAll("main section[id]");

const links = document.querySelectorAll(".menu a");

const observadorMenu = new IntersectionObserver(
  function (todosElementos) {
    todosElementos.forEach(function (elemento) {
      if (elemento.isIntersecting) {
        links.forEach(function (link) {
          const href = link.getAttribute("href");

          link.classList.toggle("active", href === `#${elemento.target.id}`);
        });
      }
    });
  },

  {
    rootMargin: "-40% 0px -50% 0px",
  },
);

secoes.forEach(function (secao) {
  observadorMenu.observe(secao);
});
