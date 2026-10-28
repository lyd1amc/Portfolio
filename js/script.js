// ===== 1. MENU HAMBÚRGUER =====
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

// Abre ou fecha o menu e avisa os leitores de tela (aria)
function alternarMenu(abrir) {
  menu.classList.toggle("aberto", abrir);
  btnMenu.setAttribute("aria-expanded", abrir);
  btnMenu.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
}

btnMenu.addEventListener("click", () => {
  alternarMenu(!menu.classList.contains("aberto"));
});

// Fecha o menu ao clicar em um link
menu.addEventListener("click", (evento) => {
  if (evento.target.tagName === "A") alternarMenu(false);
});

// Fecha o menu com a tecla Esc
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && menu.classList.contains("aberto")) {
    alternarMenu(false);
    btnMenu.focus();
  }
});

// ===== 2. SAUDAÇÃO DINÂMICA =====
// Muda conforme a hora do computador de quem visita
const saudacao = document.getElementById("saudacao");
const hora = new Date().getHours();
let texto;

if (hora < 12) {
  texto = "Bom dia";
} else if (hora < 18) {
  texto = "Boa tarde";
} else {
  texto = "Boa noite";
}

saudacao.textContent = texto + ", Lydia aqui!";

// ===== 3. MODO CLARO / ESCURO =====
const btnTema = document.getElementById("btn-tema");

function aplicarTema(escuro) {
  document.documentElement.classList.toggle("escuro", escuro);
  btnTema.setAttribute("aria-pressed", escuro);
  btnTema.textContent = escuro ? "☀" : "☾";
}

// Lê a escolha salva; se não houver, usa a preferência do aparelho
let temaSalvo = null;
try {
  temaSalvo = localStorage.getItem("tema");
} catch (erro) {
  // Se o navegador bloquear o armazenamento, o site continua funcionando
}
const aparelhoEscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
aplicarTema(temaSalvo ? temaSalvo === "escuro" : aparelhoEscuro);

btnTema.addEventListener("click", () => {
  const virarEscuro = !document.documentElement.classList.contains("escuro");
  aplicarTema(virarEscuro);
  try {
    localStorage.setItem("tema", virarEscuro ? "escuro" : "claro");
  } catch (erro) {
    // Sem problema: só não vai lembrar da escolha
  }
});

// ===== 4. ANO AUTOMÁTICO NO RODAPÉ =====
document.getElementById("ano").textContent = new Date().getFullYear();
