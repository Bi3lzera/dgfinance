# Progresso Atual do Projeto (DGFinance)

Este documento registra o progresso atual, documentando o processo de construção e estruturação da persistência de dados da API, seguindo estritamente a arquitetura proposta no mapa mental/relacional original (`database.dbml`).

## Fluxo de Criação e Implementação

### 1. Parametrização e Estruturação de Models
A primeira fase do processo de engenharia do programa se deu em alinhar as classes Model (`api/app/Models/`) para servirem perfeitamente o ORM Eloquent. Sem apagar ou criar novos arquivos a princípio, configuramos:
- Associação forçada explícita de nomeação de tabelas (ex: `users_bank_accounts` no `$table`).
- Customização de IDs das tabelas refletindo o banco (ex: `protected $primaryKey = 'idAccount'`).
- Abertura de permissão para injeção via Model através de arrays `$fillable` cobrindo todos as colunas reais.
- Amarração forte de relacionamentos em todas as direções via métodos de Relational Mapping (`hasMany`, `belongsTo`).

### 2. Calibragem Fina das Migrations
Garantimos que o motor do banco de dados físico acompanhasse o ORM ajustando arquivos da pasta `api/database/migrations`.
- Modificação na chave primária padrão do Laravel (`$table->id()`) para respeitar restrições da regra de negócio (ex: `$table->id('idUser')`).
- Construção de Migrations ausentes essenciais pelo Artisan para tabelas como `banks` e `transaction`.
- Estruturação focada de tipagem garantindo a coesão do modelo (Double/Decimals adequados para transações, colunas `nullables` tratadas conforme contexto).

### 3. Geração de Massa de Dados Realistas (Factories & Seeders)
A etapa de automatização do fluxo de Fake Data consistiu em desenvolver uma massa populacional que seja realista sob os atributos do mercado brasileiro. 
- Refatoração dos arquivos da pasta `api/database/factories`. Retirando fakers muito vagos por bibliotecas curadas de:
  - **Bancos Físicos e Digitais** (Bradesco, Nubank, Itaú, com seus respectivos COMPE).
  - **Categorias** diárias reais, variando as que servem para toda aplicação (globais/`idUser=null`) e outras de um usuário específico.
  - **Métodos de pagamento** (Pix, Cartão, Dinheiro).
- Implementação de um manipulador cronológico coeso onde toda e qualquer `Factory` que possua uma Data opere estritamente num fuso/vão temporal randômico coerente de **6 meses atrás e 12 meses no futuro**.
- As transações agora captam devidamente e de maneira dinâmica IDs em tabelas secundárias como as **Parcelas (Installments)**.
- O arquétipo de "Sementeira" principal (`DatabaseSeeder.php`) orquestrou perfeitamente as dependências sequenciais das tabelas.

## Status e Conclusão Parcial

O progresso é tido como um enorme salto estrutural e validado empiricamente, uma vez que a cascata final obteve sucesso através do comando limpo: `php artisan migrate:fresh --seed`. Este comando limpou todos os rastros, recriou do zero o relacional, e as `Factories` injetaram com perfeição mihares de requisições coerentes (como 1000 installments e 2000 transactions).

O projeto conta agora com sua base de dados centralizada, forte e ricamente gerada para debug. Prontas para consumirem regras de controle e integrações web/backend!
