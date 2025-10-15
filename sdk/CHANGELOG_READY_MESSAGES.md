# 🔄 Changelog - Ready Messages Client

## 📅 Data: 15 de Outubro de 2025

### ✨ Mudanças Implementadas

O `ReadyMessageClient` foi completamente atualizado para refletir a refatoração do backend que migrou de SQL raw para Prisma ORM.

---

## 🔀 Breaking Changes

### 1️⃣ **Tipos Atualizados**

#### ❌ ANTES (Legado)
```typescript
interface ReadyMessage {
  CODIGO: number;
  TITULO: string;
  SETOR: number;
  TEXTO_MENSAGEM: string;
  ARQUIVO: string;
  ARQUIVO_CODIGO: string;
  LAST_UPDATE: Date;
}
```

#### ✅ AGORA (Novo)
```typescript
interface ReadyMessage {
  id: number;               // CODIGO → id
  instance: string;         // NOVO: identificador da instância
  sectorId: number;         // SETOR → sectorId
  title: string;            // TITULO → title
  message: string;          // TEXTO_MENSAGEM → message
  fileId: number | null;    // ARQUIVO_CODIGO → fileId (agora tipado)
  fileName: string | null;  // ARQUIVO → fileName
  onlyAdmin: boolean;       // NOVO: flag para mensagens exclusivas de admin
  createdAt: Date;          // NOVO: data de criação
  updatedAt: Date;          // LAST_UPDATE → updatedAt
}
```

### 2️⃣ **Assinatura de Métodos**

#### `createReadyMessage()`

##### ❌ ANTES
```typescript
await client.createReadyMessage(
  file,           // File primeiro
  "Título",       // Parâmetros separados
  "Mensagem",
  10
);
```

##### ✅ AGORA
```typescript
await client.createReadyMessage(
  {                          // Objeto DTO
    TITULO: "Título",
    TEXTO_MENSAGEM: "Mensagem",
    SETOR: 10,               // Opcional!
    APENAS_ADMIN: false
  },
  file                       // File por último
);
```

**Benefícios:**
- ✅ Parâmetros nomeados (menos erros)
- ✅ SETOR opcional (usa setor do usuário se omitido)
- ✅ Suporte a `APENAS_ADMIN`

#### `updateReadyMessage()`

##### ❌ ANTES
```typescript
await client.updateReadyMessage(
  123,
  entireReadyMessageObject,  // Objeto completo obrigatório
  file
);
```

##### ✅ AGORA
```typescript
await client.updateReadyMessage(
  123,
  {                           // Apenas campos que quer atualizar
    TITULO: "Novo Título"
  },
  file                        // Opcional
);
```

**Benefícios:**
- ✅ Update parcial (só envia o que mudou)
- ✅ File opcional
- ✅ Validação no backend

#### `deleteReadyMessage()`

##### ❌ ANTES
```typescript
await client.deleteReadyMessage(chatId);  // Nome confuso
```

##### ✅ AGORA
```typescript
await client.deleteReadyMessage(id);      // Nome correto
```

---

## 📚 Novos DTOs

### `CreateReadyMessageDto`
```typescript
interface CreateReadyMessageDto {
  TITULO: string;                 // Obrigatório
  TEXTO_MENSAGEM: string;         // Obrigatório
  SETOR?: number;                 // Opcional - usa setor do usuário
  APENAS_ADMIN?: boolean;         // Opcional - padrão: false
}
```

### `UpdateReadyMessageDto`
```typescript
interface UpdateReadyMessageDto {
  TITULO?: string;                // Todos opcionais
  TEXTO_MENSAGEM?: string;
  APENAS_ADMIN?: boolean;
}
```

---

## 🚀 Guia de Migração

### Passo 1: Atualizar Criação

#### ❌ Código Antigo
```typescript
const message = await readyMessageClient.createReadyMessage(
  imageFile,
  "Mensagem de Boas-vindas",
  "Olá! Bem-vindo ao nosso atendimento.",
  10
);
```

#### ✅ Código Novo
```typescript
const message = await readyMessageClient.createReadyMessage(
  {
    TITULO: "Mensagem de Boas-vindas",
    TEXTO_MENSAGEM: "Olá! Bem-vindo ao nosso atendimento.",
    SETOR: 10,  // Opcional se usuário estiver em um setor
    APENAS_ADMIN: false
  },
  imageFile  // Pode ser null
);
```

### Passo 2: Atualizar Listagem

#### ❌ Código Antigo
```typescript
const messages = await readyMessageClient.getReadyMessages();

messages.forEach(msg => {
  console.log(msg.TITULO);      // UPPERCASE
  console.log(msg.CODIGO);
  console.log(msg.SETOR);
});
```

#### ✅ Código Novo
```typescript
const messages = await readyMessageClient.getReadyMessages();

messages.forEach(msg => {
  console.log(msg.title);       // camelCase
  console.log(msg.id);
  console.log(msg.sectorId);
  console.log(msg.onlyAdmin);   // Novo campo!
  console.log(msg.instance);    // Novo campo!
});
```

### Passo 3: Atualizar Updates

#### ❌ Código Antigo
```typescript
const fullMessage = await readyMessageClient.getReadyMessages();
const messageToUpdate = fullMessage.find(m => m.CODIGO === 123);

messageToUpdate.TITULO = "Novo Título";

await readyMessageClient.updateReadyMessage(
  123,
  messageToUpdate,
  null
);
```

#### ✅ Código Novo
```typescript
// Muito mais simples!
await readyMessageClient.updateReadyMessage(
  123,
  { TITULO: "Novo Título" }  // Só o que mudou
  // file é opcional
);
```

### Passo 4: Atualizar Deleção

#### ❌ Código Antigo
```typescript
await readyMessageClient.deleteReadyMessage(chatId);
```

#### ✅ Código Novo
```typescript
await readyMessageClient.deleteReadyMessage(messageId);
```

---

## 🎯 Novos Recursos

### 1. **Mensagens Exclusivas para Admin**
```typescript
const adminOnlyMessage = await client.createReadyMessage({
  TITULO: "Mensagem Interna",
  TEXTO_MENSAGEM: "Apenas admins veem isso",
  APENAS_ADMIN: true  // 🔒 Novo!
});
```

### 2. **Setor Automático**
```typescript
// Se usuário já está em um setor, não precisa informar
const message = await client.createReadyMessage({
  TITULO: "Resposta Rápida",
  TEXTO_MENSAGEM: "Obrigado pelo contato!"
  // SETOR omitido - usa setor do usuário logado
});
```

### 3. **Update Parcial**
```typescript
// Atualizar só o título
await client.updateReadyMessage(123, {
  TITULO: "Novo Título"
});

// Atualizar só a mensagem
await client.updateReadyMessage(123, {
  TEXTO_MENSAGEM: "Nova mensagem"
});

// Atualizar apenas flag admin
await client.updateReadyMessage(123, {
  APENAS_ADMIN: true
});
```

### 4. **Upload Opcional**
```typescript
// Sem arquivo
await client.updateReadyMessage(123, {
  TITULO: "Atualizado"
});

// Com arquivo
await client.updateReadyMessage(123, {
  TITULO: "Atualizado"
}, newFile);
```

---

## 🔒 Melhorias de Segurança

1. ✅ **SQL Injection Eliminado** - Migração para Prisma
2. ✅ **Validação de Tipos** - TypeScript strict mode
3. ✅ **Validação de Permissões** - Backend valida setor
4. ✅ **Sanitização de Dados** - DTOs validados

---

## 📊 Compatibilidade

### Tipo Legado Mantido

Para facilitar migração gradual, o tipo legado ainda está disponível:

```typescript
import { ReadyMessageLegacy } from './types/ready-messages.types';

// ⚠️ Depreciado - use ReadyMessage
const oldMessage: ReadyMessageLegacy = {
  CODIGO: 1,
  TITULO: "Test",
  // ...
};
```

**Aviso:** `ReadyMessageLegacy` será removido na v3.0.0

---

## 🧪 Exemplos Práticos

### Criar Mensagem Simples
```typescript
const client = new ReadyMessageClient("http://localhost:8000");
client.setAuth(userToken);

const message = await client.createReadyMessage({
  TITULO: "Horário de Atendimento",
  TEXTO_MENSAGEM: "Atendemos de segunda a sexta, 8h às 18h",
});

console.log(`Mensagem criada com ID: ${message.id}`);
```

### Criar com Arquivo
```typescript
const fileInput = document.getElementById('file') as HTMLInputElement;
const file = fileInput.files?.[0];

const message = await client.createReadyMessage(
  {
    TITULO: "Catálogo de Produtos",
    TEXTO_MENSAGEM: "Confira nosso catálogo em anexo",
    SETOR: 5
  },
  file
);

console.log(`Arquivo anexado: ${message.fileName}`);
```

### Listar e Filtrar
```typescript
const allMessages = await client.getReadyMessages();

// Filtrar apenas mensagens de admin
const adminMessages = allMessages.filter(m => m.onlyAdmin);

// Filtrar por setor
const sectorMessages = allMessages.filter(m => m.sectorId === 10);

// Ordenar por título
const sorted = allMessages.sort((a, b) => 
  a.title.localeCompare(b.title)
);
```

### Atualizar Incrementalmente
```typescript
const messageId = 123;

// Primeiro: atualizar título
await client.updateReadyMessage(messageId, {
  TITULO: "Título Atualizado"
});

// Depois: adicionar arquivo
const newFile = await fetchFileFromSomewhere();
await client.updateReadyMessage(messageId, {}, newFile);

// Por fim: tornar admin-only
await client.updateReadyMessage(messageId, {
  APENAS_ADMIN: true
});
```

---

## ❓ FAQ

### Por que os DTOs ainda usam UPPERCASE?

Para manter compatibilidade com o frontend existente que envia dados nesse formato. O controller faz a conversão para camelCase internamente.

### Posso usar os dois formatos?

Não. O backend agora retorna apenas camelCase. Atualize seu código para usar os novos tipos.

### E se eu não quiser especificar o setor?

Não precisa! Se omitido, o backend usa automaticamente o setor do usuário logado (exceto TI que pode escolher).

### Como sei se meu usuário é TI?

Usuários do setor 3 são considerados TI e podem criar mensagens para qualquer setor.

---

## 📞 Suporte

Dúvidas sobre a migração? 
- Consulte `docs/refatoracao-ready-messages.md` no whatsapp-service
- Veja os testes em `src/services/ready-messages.service.spec.ts`

---

**Versão do SDK:** 3.0.0  
**Data de Release:** 15/10/2025  
**Breaking Changes:** Sim  
**Migration Guide:** Este documento
