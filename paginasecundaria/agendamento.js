const WHATSAPP_NUMBER = "5579998483685";

// FUNÇÃO PARA ABRIR O WHATSAPP

function abrirWhatsApp(mensagem) {
  const mensagemCodificada = encodeURIComponent(mensagem);

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemCodificada}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

function agendar(servico, preco) {
  return `Olá, quero agendar um horario
    
Corte: ${servico},
Preço Informado no site: ${preco}

Gostaria de agendar dia e horario disponivel`;
}

const botoesServicos = document.querySelectorAll(".service");

botoesServicos.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const servico = botao.dataset.service;
    const preco = botao.dataset.price;

    const mensagem = agendar(servico, preco);

    abrirWhatsApp(mensagem);
  });
});

const botoesWhatsApp = document.querySelectorAll("[data-whatsapp]");

botoesWhatsApp.forEach(function (botao) {
  botao.addEventListener("click", function (evento) {
    evento.preventDefault();

    const mensagem = botao.dataset.whatsapp;

    abrirWhatsApp(mensagem);
  });
});

function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(url, "_blank");
}
