// script.js - Projeto Campo Sustentável

// ==================== ACESSIBILIDADE ====================
let tamanhoFonte = 18; // tamanho base em px

function aplicarFonte() {
    document.body.style.fontSize = tamanhoFonte + 'px';
}

document.getElementById('aumentarFonte').addEventListener('click', function() {
    if (tamanhoFonte < 28) {
        tamanhoFonte += 2;
        aplicarFonte();
    }
});

document.getElementById('diminuirFonte').addEventListener('click', function() {
    if (tamanhoFonte > 12) {
        tamanhoFonte -= 2;
        aplicarFonte();
    }
});

// Alto contraste
let contrasteAtivo = false;
document.getElementById('altoContraste').addEventListener('click', function() {
    if (contrasteAtivo) {
        document.body.classList.remove('contraste');
        contrasteAtivo = false;
    } else {
        document.body.classList.add('contraste');
        contrasteAtivo = true;
    }
});

// ==================== QUIZ ====================
// Banco de perguntas sobre agricultura sustentável
const perguntas = [
    {
        pergunta: "O que é agricultura sustentável?",
        alternativas: [
            "Produzir sem se preocupar com o meio ambiente",
            "Produzir alimentos preservando os recursos naturais para o futuro",
            "Usar apenas agrotóxicos",
            "Desmatar para plantar mais"
        ],
        correta: 1
    },
    {
        pergunta: "Qual prática ajuda a preservar nascentes?",
        alternativas: [
            "Plantar árvores ao redor",
            "Jogar lixo próximo à nascente",
            "Usar produtos químicos sem controle",
            "Desmatar a mata ciliar"
        ],
        correta: 0
    },
    {
        pergunta: "Qual método de irrigação economiza mais água?",
        alternativas: [
            "Irrigação por sulco",
            "Aspersão tradicional",
            "Gotejamento",
            "Inundação"
        ],
        correta: 2
    },
    {
        pergunta: "Qual a importância da agricultura familiar?",
        alternativas: [
            "Só produz para grandes indústrias",
            "Ela não tem importância",
            "Garante comida fresca, fixa o homem no campo e preserva o meio ambiente",
            "Destrói a biodiversidade"
        ],
        correta: 2
    }
];

let perguntaAtual = 0;
let pontuacao = 0;
let quizFinalizado = false;

function carregarPergunta() {
    if (perguntaAtual < perguntas.length) {
        const p = perguntas[perguntaAtual];
        document.getElementById('pergunta').innerHTML = p.pergunta;
        let htmlAlternativas = '';
        for (let i = 0; i < p.alternativas.length; i++) {
            htmlAlternativas += `<button class="alternativa-btn" data-index="${i}">${String.fromCharCode(65+i)} - ${p.alternativas[i]}</button>`;
        }
        document.getElementById('alternativas').innerHTML = htmlAlternativas;
        document.getElementById('resultadoQuiz').innerHTML = '';
        document.getElementById('proximoBtn').style.display = 'block';
        
        // Adicionar eventos aos botões de alternativa
        document.querySelectorAll('.alternativa-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (!quizFinalizado) {
                    const escolha = parseInt(this.getAttribute('data-index'));
                    if (escolha === perguntas[perguntaAtual].correta) {
                        pontuacao++;
                        document.getElementById('resultadoQuiz').innerHTML = "✅ Correta!";
                    } else {
                        document.getElementById('resultadoQuiz').innerHTML = "❌ Errada! A resposta correta é: " + perguntas[perguntaAtual].alternativas[perguntas[perguntaAtual].correta];
                    }
                    // Desabilitar botões após resposta
                    document.querySelectorAll('.alternativa-btn').forEach(b => b.disabled = true);
                    quizFinalizado = true;
                }
            });
        });
    } else {
        // Fim do quiz
        document.getElementById('pergunta').innerHTML = "Quiz finalizado!";
        document.getElementById('alternativas').innerHTML = "";
        document.getElementById('resultadoQuiz').innerHTML = `Você acertou ${pontuacao} de ${perguntas.length} perguntas. Parabéns! 🌱`;
        document.getElementById('proximoBtn').style.display = 'none';
    }
}

document.getElementById('proximoBtn').addEventListener('click', function() {
    if (quizFinalizado || perguntaAtual === perguntas.length) {
        perguntaAtual++;
        quizFinalizado = false;
        carregarPergunta();
    } else {
        alert("Responda a pergunta atual primeiro!");
    }
});

// Iniciar quiz
carregarPergunta();

// ==================== SIMULADOR DE ECONOMIA DE ÁGUA ====================
// Cálculo simples baseado no método
function calcularAguaEconomizada(area, metodo) {
    // litros por m² por ano (valores educativos)
    const consumoPorMetodo = {
        sulco: 1200,      // menos eficiente
        aspersao: 800,
        gotejamento: 400  // mais eficiente
    };
    const consumoAtual = consumoPorMetodo[metodo];
    const consumoIdeal = consumoPorMetodo.gotejamento;
    const economiaPorM2 = consumoAtual - consumoIdeal;
    const economiaTotal = economiaPorM2 * area;
    return economiaTotal > 0 ? economiaTotal : 0;
}

document.getElementById('calcularEconomia').addEventListener('click', function() {
    const area = parseFloat(document.getElementById('area').value);
    const metodo = document.getElementById('metodo').value;
    
    if (isNaN(area) || area <= 0) {
        document.getElementById('resultadoEconomia').innerHTML = "⚠️ Por favor, insira uma área válida (em m²).";
        return;
    }
    
    const economia = calcularAguaEconomizada(area, metodo);
    if (economia > 0) {
        document.getElementById('resultadoEconomia').innerHTML = `💧 Você pode economizar até ${Math.round(economia)} litros de água por ano adotando irrigação por gotejamento!`;
    } else {
        document.getElementById('resultadoEconomia').innerHTML = `✅ Seu método já é o mais eficiente (gotejamento)! Continue assim.`;
    }
});
