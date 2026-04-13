// =====================================================================
// JUST BURGER - BASE DE TAREFAS EXTRAÍDA DAS PLANILHAS
// Fonte: Abas por dia da semana
// Turno DIA = Diná | Turno NOITE = Sandro
// =====================================================================

const TAREFAS_DB = {
  // ===== TURNO: DIA (Diná) =====
  "Dia": {
    "segunda-feira": [],  // Não há aba de segunda no turno Dia

    "terça-feira": [
      {
        card: "ALAN RICARDO - Ilha dia/Chapeiro",
        tarefas: [
          { tarefa: "Montagem da ilha quente", quantidade: null },
          { tarefa: "Cartão avaliação", quantidade: "200" },
        ]
      },
      {
        card: "ATENDIMENTO / DESPACHO",
        tarefas: [
          { tarefa: "Abrir a loja e verificar itens pausados - confirmar se chegou e despausar", quantidade: null },
          { tarefa: "Montar praça de despacho", quantidade: null },
          { tarefa: "Limpar as mesas", quantidade: null },
          { tarefa: "Embalar bebidas e sobremesas - conforme lista no final", quantidade: null },
          { tarefa: "Bala e cartão", quantidade: "300" },
        ]
      },
      {
        card: "SAMUEL - Ilha dia/Montador",
        tarefas: [
          { tarefa: "Montagem da ilha fria", quantidade: null },
          { tarefa: "Cartão avaliação", quantidade: "200" },
        ]
      },
      {
        card: "DINA",
        tarefas: [
          { tarefa: "Livre para supervisão", quantidade: null },
          { tarefa: "1ª coisa do dia confirmar com o atendimento a quantidade de motoboy", quantidade: null },
          { tarefa: "Entrega do material de limpeza, anotar tudo com datas e nomes", quantidade: null },
          { tarefa: "Fazer milkshakes conforme lista, das 10:00 às 11:00", quantidade: null },
          { tarefa: "Parar de 30 em 30 minutos para olhar como está saindo os lanches e frituras", quantidade: null },
          { tarefa: "Conferir validade dos pães e de todas as etiquetas", quantidade: null },
          { tarefa: "Conferir se a ilha está montada corretamente e no horário das 11:00", quantidade: null },
        ]
      },
      {
        card: "PABLO - Pré-preparo",
        tarefas: [
          { tarefa: "Pinks", quantidade: "25" },
          { tarefa: "Potinhos de bacon de 70g", quantidade: "120" },
          { tarefa: "Porções de franguito 300g", quantidade: "30" },
          { tarefa: "Potinhos de cheddar de 70g", quantidade: "120" },
        ]
      },
      {
        card: "JOÃO VICTOR - Pré-preparo",
        tarefas: [
          { tarefa: "Kilos de picles – fatiar no processador", quantidade: "50 kg" },
          { tarefa: "Kilos de cebola picadinha do melt no processador disco do vinagrete", quantidade: "8 kg" },
          { tarefa: "Kilos de cebola ROXA descascar", quantidade: "20 kg" },
        ]
      },
      {
        card: "MATEUS - Ilha 3/Montador",
        tarefas: [
          { tarefa: "Sachê de mayo de 30", quantidade: "2300" },
          { tarefa: "Sachê de mayo de 100", quantidade: "30" },
          { tarefa: "Sachê de cheddar de 100", quantidade: "50" },
          { tarefa: "Sachê de cheddar de 30", quantidade: "250" },
          { tarefa: "Sachê de just de 30", quantidade: "150" },
          { tarefa: "Frango Sassami chiken: Empanar e Pré fritar", quantidade: "8 kg" },
          { tarefa: "Tirar frango para descongelar no fim do dia - deixar fora", quantidade: null },
        ]
      },
      {
        card: "GABRIEL KHALYL",
        tarefas: [
          { tarefa: "Hamburguer até as 10:00", quantidade: null },
          { tarefa: "Separação e carregamento itens lista para a loja ABC até 11:00", quantidade: null },
          { tarefa: "Separação itens lista para a loja Guarulhos", quantidade: null },
          { tarefa: "Almoço 12:30 às 13:30", quantidade: null },
          { tarefa: "Carregamento itens lista para a loja Guarulhos", quantidade: null },
          { tarefa: "Hamburguer até as 16:30", quantidade: null },
          { tarefa: "Limpeza máquina de hamburguer e máquina vácuo", quantidade: null },
        ]
      },
      {
        card: "Lohaine - Ilha dia/Fritadeira",
        tarefas: [
          { tarefa: "Saladas", quantidade: "6" },
          { tarefa: "Abastecimento da geladeira e freezer de batata", quantidade: null },
          { tarefa: "Área de trabalho e chão limpo e lixo recolhido", quantidade: null },
        ]
      },
    ],

    "quarta-feira": [
      {
        card: "ALAN RICARDO - Ilha dia/Chapeiro",
        tarefas: [
          { tarefa: "Montagem da ilha quente", quantidade: null },
          { tarefa: "Cartão avaliação", quantidade: "200" },
        ]
      },
      {
        card: "ATENDIMENTO / DESPACHO",
        tarefas: [
          { tarefa: "Abrir a loja e verificar itens pausados - confirmar se chegou e despausar", quantidade: null },
          { tarefa: "Montar praça de despacho", quantidade: null },
          { tarefa: "Limpar as mesas", quantidade: null },
          { tarefa: "Embalar bebidas e sobremesas - conforme lista no final", quantidade: null },
          { tarefa: "Bala e cartão", quantidade: "300" },
        ]
      },
      {
        card: "SAMUEL - Ilha dia/Montador",
        tarefas: [
          { tarefa: "Montagem da ilha fria", quantidade: null },
          { tarefa: "Cartão avaliação", quantidade: "200" },
        ]
      },
      {
        card: "DINA",
        tarefas: [
          { tarefa: "Rechear sobremesas", quantidade: "400" },
          { tarefa: "Livre para supervisão", quantidade: null },
        ]
      },
      {
        card: "PABLO - Pré-preparo",
        tarefas: [
          { tarefa: "Pinks", quantidade: "25" },
          { tarefa: "Porções de crinkles", quantidade: "100" },
          { tarefa: "Porções de supreme (12 unidades)", quantidade: "150" },
        ]
      },
      {
        card: "JOÃO VICTOR - Pré-preparo",
        tarefas: [
          { tarefa: "Bolinhas de coxinha rústica", quantidade: "500" },
        ]
      },
      {
        card: "MATEUS - Ilha 3/Montador",
        tarefas: [
          { tarefa: "Sachê de mayo de 30", quantidade: "2300" },
          { tarefa: "Sachê de mayo de 100", quantidade: "30" },
          { tarefa: "Sachê de cheddar de 100", quantidade: "50" },
          { tarefa: "Sachê de cheddar de 30", quantidade: "250" },
          { tarefa: "Sachê de just de 30", quantidade: "150" },
          { tarefa: "Frango Sassami chiken: Empanar e Pré fritar", quantidade: "8 kg" },
        ]
      },
      {
        card: "GABRIEL KHALYL",
        tarefas: [
          { tarefa: "Lavar as caixas de transferência de material para as lojas", quantidade: null },
          { tarefa: "Treinar ilha", quantidade: null },
          { tarefa: "Hamburguer após o almoço", quantidade: null },
        ]
      },
      {
        card: "Lohaine - Ilha dia/Fritadeira",
        tarefas: [
          { tarefa: "Saladas ceaser", quantidade: "6" },
          { tarefa: "Trocar o óleo da fritadeira (02)", quantidade: null },
          { tarefa: "Abastecimento da geladeira e freezer de batata", quantidade: null },
        ]
      },
    ],

    "quinta-feira": [
      {
        card: "ALAN RICARDO - Ilha dia/Chapeiro",
        tarefas: [
          { tarefa: "Montagem da ilha quente", quantidade: null },
          { tarefa: "Cartão avaliação", quantidade: "200" },
        ]
      },
      {
        card: "ATENDIMENTO / DESPACHO",
        tarefas: [
          { tarefa: "Abrir a loja e verificar itens pausados - confirmar se chegou e despausar", quantidade: null },
          { tarefa: "Montar praça de despacho", quantidade: null },
          { tarefa: "Limpar as mesas", quantidade: null },
          { tarefa: "Embalar bebidas e sobremesas - conforme lista no final", quantidade: null },
          { tarefa: "Bala e cartão", quantidade: "300" },
        ]
      },
      {
        card: "SAMUEL - Ilha dia/Montador",
        tarefas: [
          { tarefa: "Montagem da ilha fria", quantidade: null },
          { tarefa: "Cartão avaliação", quantidade: "200" },
        ]
      },
      {
        card: "DINA",
        tarefas: [
          { tarefa: "Livre para supervisão", quantidade: null },
        ]
      },
      {
        card: "PABLO - Pré-preparo",
        tarefas: [
          { tarefa: "Pinks", quantidade: "25" },
          { tarefa: "Porções de coxinha (12 unidades)", quantidade: "150" },
          { tarefa: "Porções de supreme (12 unidades)", quantidade: "150" },
        ]
      },
      {
        card: "JOÃO VICTOR - Pré-preparo",
        tarefas: [
          { tarefa: "Kilos de cebola picadinha do melt no processador disco do vinagrete", quantidade: "8 kg" },
          { tarefa: "Bolinhas de coxinha rústica", quantidade: "400" },
        ]
      },
      {
        card: "MATEUS - Ilha 3/Montador",
        tarefas: [
          { tarefa: "Sachê de mayo de 30", quantidade: "2300" },
          { tarefa: "Sachê de mayo de 100", quantidade: "30" },
          { tarefa: "Sachê de cheddar de 100", quantidade: "50" },
          { tarefa: "Sachê de cheddar de 30", quantidade: "250" },
          { tarefa: "Sachê de just de 30", quantidade: "150" },
        ]
      },
      {
        card: "GABRIEL KHALYL",
        tarefas: [
          { tarefa: "Hamburguer", quantidade: null },
          { tarefa: "Limpar câmaras e organizar estoque", quantidade: null },
        ]
      },
      {
        card: "Lohaine - Ilha dia/Fritadeira",
        tarefas: [
          { tarefa: "Salada ceaser", quantidade: "6" },
          { tarefa: "Abastecimento da geladeira e freezer de batata", quantidade: null },
        ]
      },
    ],

    "sexta-feira": [
      {
        card: "ALAN RICARDO - Ilha dia/Chapeiro",
        tarefas: [
          { tarefa: "Cartão avaliação", quantidade: "100" },
          { tarefa: "Montagem da ilha quente", quantidade: null },
        ]
      },
      {
        card: "ATENDIMENTO / DESPACHO",
        tarefas: [
          { tarefa: "Abrir a loja e verificar itens pausados - confirmar se chegou e despausar", quantidade: null },
          { tarefa: "Montar praça de despacho", quantidade: null },
          { tarefa: "Limpar as mesas", quantidade: null },
          { tarefa: "Embalar bebidas e sobremesas - conforme lista no final", quantidade: null },
          { tarefa: "Bala e cartão", quantidade: "100" },
        ]
      },
      {
        card: "SAMUEL - Ilha dia/Montador",
        tarefas: [
          { tarefa: "Montagem da ilha fria", quantidade: null },
          { tarefa: "Cartão avaliação", quantidade: "100" },
        ]
      },
      {
        card: "DINA",
        tarefas: [
          { tarefa: "Livre para supervisão", quantidade: null },
        ]
      },
      {
        card: "PABLO - Pré-preparo",
        tarefas: [
          { tarefa: "Pinks", quantidade: "25" },
          { tarefa: "Porções de coxinha (12 unidades)", quantidade: "150" },
          { tarefa: "Porções de franguito 300g", quantidade: "30" },
        ]
      },
      {
        card: "JOÃO VICTOR - Pré-preparo",
        tarefas: [
          { tarefa: "Bolinhas de coxinhas rústica", quantidade: "500" },
        ]
      },
      {
        card: "MATEUS - Ilha 3/Montador",
        tarefas: [
          { tarefa: "Pinks - abater estoque", quantidade: "20" },
          { tarefa: "Frango sassami just chiken limpar e cortar", quantidade: "8 kg" },
          { tarefa: "Bater Maionese e colocar na geladeira", quantidade: "150 kg" },
        ]
      },
      {
        card: "GABRIEL KHALYL",
        tarefas: [
          { tarefa: "Hamburguer", quantidade: null },
          { tarefa: "Separação e entrega para lojas", quantidade: null },
        ]
      },
      {
        card: "Lohaine - Ilha dia/Fritadeira",
        tarefas: [
          { tarefa: "Saladas ceaser", quantidade: "6" },
          { tarefa: "Abastecimento da geladeira e freezer de batata", quantidade: null },
        ]
      },
    ],

    "sábado": [
      {
        card: "ALAN RICARDO - Ilha dia/Chapeiro",
        tarefas: [
          { tarefa: "Cartão avaliação", quantidade: "100" },
          { tarefa: "Montagem da ilha quente", quantidade: null },
        ]
      },
      {
        card: "GABRIEL - Ilha dia/Montador",
        tarefas: [
          { tarefa: "Montagem da ilha fria", quantidade: null },
          { tarefa: "Cartão avaliação", quantidade: "100" },
        ]
      },
      {
        card: "DINA",
        tarefas: [
          { tarefa: "Livre para supervisão", quantidade: null },
        ]
      },
      {
        card: "RHUAN - Fritadeira",
        tarefas: [
          { tarefa: "Saladas ceaser", quantidade: "8" },
          { tarefa: "Filtrar óleo da fritadeira 2", quantidade: null },
          { tarefa: "Abastecimento da geladeira e freezer de batata", quantidade: null },
        ]
      },
      {
        card: "GABRIEL KHALYL",
        tarefas: [
          { tarefa: "Hamburguer", quantidade: null },
          { tarefa: "Separação e carregamento para lojas", quantidade: null },
        ]
      },
      {
        card: "PABLO - Pré-preparo",
        tarefas: [
          { tarefa: "Pinks", quantidade: "25" },
          { tarefa: "Porções de franguito 300g", quantidade: "30" },
        ]
      },
      {
        card: "JOÃO VICTOR - Pré-preparo",
        tarefas: [
          { tarefa: "Bolinhas de coxinhas rústica", quantidade: "400" },
        ]
      },
    ],

    "domingo": [
      {
        card: "ALAN RICARDO - Ilha dia/Chapeiro",
        tarefas: [
          { tarefa: "Cartão avaliação", quantidade: "100" },
          { tarefa: "Montagem da ilha quente", quantidade: null },
        ]
      },
      {
        card: "SAMUEL - Ilha dia/Montador",
        tarefas: [
          { tarefa: "Montagem da ilha fria", quantidade: null },
          { tarefa: "Cartão avaliação", quantidade: "100" },
        ]
      },
      {
        card: "DINA",
        tarefas: [
          { tarefa: "Livre para supervisão", quantidade: null },
        ]
      },
      {
        card: "LOHAINE - Ilha dia/Fritadeira",
        tarefas: [
          { tarefa: "Filtrar óleo da fritadeira 3", quantidade: null },
          { tarefa: "Saladas ceaser", quantidade: "8" },
          { tarefa: "Abastecimento da geladeira e freezer de batata", quantidade: null },
        ]
      },
      {
        card: "GABRIEL KHALYL",
        tarefas: [
          { tarefa: "Hamburguer", quantidade: null },
          { tarefa: "Organização câmaras", quantidade: null },
        ]
      },
    ],
  },

  // ===== TURNO: NOITE (Sandro) =====
  "Noite": {
    "segunda-feira": [
      {
        card: "HENRIQUE - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Pés de alface processar e embalar em pacotes de 1kg e 6 pacotes de 500g", quantidade: "40 pés" },
          { tarefa: "Descascar cebola roxa", quantidade: "20 kg" },
          { tarefa: "Descascar cebola branca", quantidade: "20 kg" },
          { tarefa: "Pinks - abater estoque", quantidade: "20" },
          { tarefa: "Frango sassami just chiken limpar e cortar", quantidade: "8 kg" },
          { tarefa: "Bater Maionese e colocar na geladeira", quantidade: "150 kg" },
        ]
      },
      {
        card: "BRUNO - Ilha 3/Chapeiro",
        tarefas: [
          { tarefa: "Fritar bacon", quantidade: "140 kg" },
          { tarefa: "Cebola Caramelizada - 3 receitas", quantidade: "60 kg" },
        ]
      },
      {
        card: "FABIO",
        tarefas: [
          { tarefa: "Queijo prato", quantidade: "70 kg" },
          { tarefa: "Filé de frango cortar e empanar", quantidade: "10 kg" },
        ]
      },
      {
        card: "DAVI - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Pinks", quantidade: "20" },
          { tarefa: "Cebola roxa descascar", quantidade: "10 kg" },
          { tarefa: "Alface processar", quantidade: "20 pés" },
        ]
      },
    ],

    "terça-feira": [
      {
        card: "HENRIQUE - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Sachê de mayo de 30", quantidade: "2300" },
          { tarefa: "Sachê de mayo de 100", quantidade: "30" },
          { tarefa: "Sachê de cheddar de 100", quantidade: "50" },
          { tarefa: "Sachê de cheddar de 30", quantidade: "250" },
          { tarefa: "Sachê de just de 30", quantidade: "150" },
          { tarefa: "Frango Sassami chiken: Empanar e Pré fritar", quantidade: "8 kg" },
        ]
      },
      {
        card: "PEDRO - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Pinks", quantidade: "20" },
          { tarefa: "Kilos de picles – fatiar no processador", quantidade: "30 kg" },
          { tarefa: "Cebola roxa descascar", quantidade: "10 kg" },
        ]
      },
      {
        card: "DAVI - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Potinhos de bacon 70g", quantidade: "100" },
          { tarefa: "Potinhos de cheddar 70g", quantidade: "100" },
          { tarefa: "Porções supreme (12 unidades)", quantidade: "80" },
        ]
      },
      {
        card: "BRUNO - Ilha 3/Chapeiro",
        tarefas: [
          { tarefa: "Bacon triturado", quantidade: "15 kg" },
          { tarefa: "Frango para massa coxinha", quantidade: "60 kg" },
          { tarefa: "Frango para saladas", quantidade: "10 kg" },
        ]
      },
      {
        card: "FABIO",
        tarefas: [
          { tarefa: "Queijo prato", quantidade: "60 kg" },
          { tarefa: "Queijo coalho", quantidade: "12 kg" },
          { tarefa: "Filé de frango cortar e empanar", quantidade: "10 kg" },
        ]
      },
    ],

    "quarta-feira": [
      {
        card: "HENRIQUE - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Pinks", quantidade: "20" },
          { tarefa: "Cebola branca descascar", quantidade: "15 kg" },
          { tarefa: "Alface processar e embalar", quantidade: "20 pés" },
        ]
      },
      {
        card: "PEDRO - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Bolinhas de coxinha rústica", quantidade: "300" },
          { tarefa: "Kilos de picles – fatiar no processador", quantidade: "20 kg" },
        ]
      },
      {
        card: "DAVI - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Sachê de mayo de 30", quantidade: "1000" },
          { tarefa: "Sachê de cheddar de 30", quantidade: "150" },
          { tarefa: "Potinhos de bacon 70g", quantidade: "80" },
        ]
      },
    ],

    "quinta-feira": [
      {
        card: "HENRIQUE - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Pinks", quantidade: "20" },
          { tarefa: "Descascar cebola roxa", quantidade: "20 kg" },
          { tarefa: "Sachê de mayo de 30", quantidade: "1500" },
          { tarefa: "Sachê de cheddar de 30", quantidade: "200" },
        ]
      },
      {
        card: "PEDRO - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Bolinhas de coxinha rústica", quantidade: "400" },
          { tarefa: "Porções de crinkles", quantidade: "80" },
        ]
      },
      {
        card: "DAVI - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Alface processar e embalar", quantidade: "20 pés" },
          { tarefa: "Potinhos de cheddar 70g", quantidade: "100" },
          { tarefa: "Potinhos de bacon 70g", quantidade: "100" },
        ]
      },
      {
        card: "BRUNO - Ilha 3/Chapeiro",
        tarefas: [
          { tarefa: "Fritar bacon", quantidade: "130 kg" },
          { tarefa: "Cebola Caramelizada - 3 receitas", quantidade: "60 kg" },
        ]
      },
      {
        card: "FABIO",
        tarefas: [
          { tarefa: "Filé de frango cortar e empanar", quantidade: "20 kg" },
          { tarefa: "Sal temperado - conforme receita", quantidade: "10 kg" },
        ]
      },
    ],

    "sexta-feira": [
      {
        card: "HENRIQUE - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Pinks", quantidade: "20" },
          { tarefa: "Sachê de mayo de 30", quantidade: "1500" },
          { tarefa: "Sachê de cheddar de 30", quantidade: "200" },
          { tarefa: "Frango Sassami chiken: Empanar e Pré fritar", quantidade: "8 kg" },
        ]
      },
      {
        card: "PEDRO - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Bolinhas de coxinhas rústica", quantidade: "500" },
          { tarefa: "Kilos de picles – fatiar no processador", quantidade: "30 kg" },
        ]
      },
      {
        card: "DAVI - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Alface processar e embalar", quantidade: "20 pés" },
          { tarefa: "Cebola roxa descascar", quantidade: "15 kg" },
        ]
      },
      {
        card: "BRUNO - Ilha 3/Chapeiro",
        tarefas: [
          { tarefa: "Fritar bacon", quantidade: "130 kg" },
          { tarefa: "Cebola Caramelizada - 3 receitas", quantidade: "60 kg" },
          { tarefa: "Frango para massa coxinha", quantidade: "40 kg" },
        ]
      },
      {
        card: "FÁBIO",
        tarefas: [
          { tarefa: "Queijo prato", quantidade: "50 kg" },
          { tarefa: "Filé de frango cortar e empanar", quantidade: "15 kg" },
        ]
      },
    ],

    "sábado": [
      {
        card: "PEDRO - Pré-preparo/Estagiário",
        tarefas: [
          { tarefa: "Pinks", quantidade: "20" },
          { tarefa: "Bolinhas de coxinha rústica", quantidade: "300" },
          { tarefa: "Alface processar e embalar", quantidade: "15 pés" },
        ]
      },
      {
        card: "BRUNO - Ilha 3/Chapeiro",
        tarefas: [
          { tarefa: "Fritar bacon", quantidade: "100 kg" },
          { tarefa: "Cebola Caramelizada", quantidade: "40 kg" },
        ]
      },
      {
        card: "FABIO",
        tarefas: [
          { tarefa: "Queijo prato", quantidade: "50 kg" },
          { tarefa: "Filé de frango cortar e empanar", quantidade: "10 kg" },
        ]
      },
    ],

    "domingo": [
      {
        card: "BRUNO - Ilha 3/Chapeiro",
        tarefas: [
          { tarefa: "Fritar bacon", quantidade: "80 kg" },
          { tarefa: "Cebola Caramelizada", quantidade: "30 kg" },
        ]
      },
      {
        card: "FABIO",
        tarefas: [
          { tarefa: "Queijo prato", quantidade: "40 kg" },
          { tarefa: "Filé de frango cortar e empanar", quantidade: "8 kg" },
        ]
      },
    ],
  }
};

// Ordem dos dias da semana
const DIAS_SEMANA = [
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
  "domingo"
];

// Emojis e cores por card/setor
const CARD_COLORS = [
  "#E63946", "#F4A261", "#2A9D8F", "#264653", "#E9C46A",
  "#A8DADC", "#457B9D", "#1D3557", "#6D6875", "#B5838D",
  "#E76F51", "#52B788"
];

function getCardColor(index) {
  return CARD_COLORS[index % CARD_COLORS.length];
}

// Retorna o dia atual da semana
function getDiaAtual() {
  const dias = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
  return dias[new Date().getDay()];
}
